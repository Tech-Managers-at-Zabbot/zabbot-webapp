/**
 * Browser MediaRecorder often produces WebM or MP4. A .wav filename alone does
 * not convert it to WAV. Decode its actual bytes and encode 16-bit PCM RIFF WAV.
 * Used only for the user's local playback/download; keep the original blob
 * for upload so the existing backend media processing remains unchanged.
 */
export async function convertRecordingToWav(recording: Blob): Promise<Blob> {
  const audioContext = new AudioContext();
  try {
    const source = await recording.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(source.slice(0));
    const channels = Math.min(2, decoded.numberOfChannels);
    const frames = decoded.length;
    const sampleRate = decoded.sampleRate;
    if (!channels || !frames || !Number.isFinite(sampleRate) || sampleRate <= 0) {
      throw new Error("Recording could not be decoded as audio");
    }

    const bytesPerSample = 2;
    const dataBytes = frames * channels * bytesPerSample;
    // The WAV RIFF size is unsigned 32-bit. Refuse any oversized recording.
    if (dataBytes > 0xFFFFFFFF - 44) {
      throw new Error("Recording is too large for PCM WAV");
    }
    const wav = new ArrayBuffer(44 + dataBytes);
    const view = new DataView(wav);
    const putText = (offset: number, value: string) => {
      for (let index = 0; index < value.length; index++) {
        view.setUint8(offset + index, value.charCodeAt(index));
      }
    };
    putText(0, "RIFF");
    view.setUint32(4, 36 + dataBytes, true);
    putText(8, "WAVE");
    putText(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * bytesPerSample, true);
    view.setUint16(32, channels * bytesPerSample, true);
    view.setUint16(34, 16, true);
    putText(36, "data");
    view.setUint32(40, dataBytes, true);
    const channelData = Array.from({ length: channels }, (_, i) => decoded.getChannelData(i));
    let offset = 44;
    for (let frame = 0; frame < frames; frame++) {
      for (let channel = 0; channel < channels; channel++) {
        const sample = Math.max(-1, Math.min(1, channelData[channel][frame]));
        const pcm = sample < 0 ? Math.round(sample * 32768) : Math.round(sample * 32767);
        view.setInt16(offset, pcm, true);
        offset += 2;
      }
    }
    return new Blob([wav], { type: "audio/wav" });
  } finally {
    await audioContext.close();
  }
}
