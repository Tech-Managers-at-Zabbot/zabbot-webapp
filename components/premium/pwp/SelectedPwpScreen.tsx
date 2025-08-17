import React from 'react';
import Image from 'next/image';
import { PronunciationProps } from '../types';

import { usePronunciationFeedback } from '@/services/generalApi/pronounciations/mutation';

const PwpTipScreen: React.FC<{ data: PronunciationProps }> = ({ data }) => {
    const [speaking, setSpeaking] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false);
    const [audioURL, setAudioURL] = React.useState<string | null>(null);
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const chunks = React.useRef<Blob[]>([]);

    const { mutateAsync: getPronunciationFeedback, isPending: getFeedbackLoading } =
        usePronunciationFeedback();

    const handleListen = async (audioFile: string | undefined) => {
        if (!audioFile) {
            console.error("No audio file provided");
            return;
        }

        try {
            const audio = new Audio(audioFile);

            audio.onplaying = () => {
                setSpeaking(true);
            };

            // Listen for when audio finishes
            audio.onended = () => {
                setSpeaking(false);
            };

            // Optional: handle loading errors
            audio.onerror = (err) => {
                console.error('Audio playback error:', err);
                setSpeaking(false);
            };

            audio.play();

            setSpeaking(false);
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunks.current, { type: "audio/webm" });
                chunks.current = [];
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
    
                try {
                    await getPronunciationFeedback({ id: data.id, file: blob });
                    console.log("✅ Feedback uploaded successfully");
                } catch (error) {
                    console.error("❌ Upload failed:", error);
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    return (
        <div className="mt-10 p-10 border-[6px] border-solid gradient-border border-r-8 ml-5 bg-[#00527849]">
            <div className='flex flex-col justify-center' style={{
                fontFamily: "Lexend", textAlign: "center"
            }}>
                <div className='text-[#FCFFFF] mb-1 text-[25px] md:text-[30px] lg:text-[44px]'>{data.yorubaWord.toLocaleUpperCase()}</div>

                <div className='text-[#F9C10F] mb-4 text-[18px] md:text-[20px] lg:text-[26px]'>{data.tone}</div>

                {speaking && (<div className='text-white text-l justify-center items-center flex p-2'><Image src='/general/song-icon.svg' alt="song-icon" height={15} width={15} /> Playing audio. </div>)}
                {isRecording && (<div className='text-[#FBCCBD] text-l justify-center items-center flex p-2'><Image src='/general/recording-circle-icon.svg' alt="song-icon" height={15} width={15} /> Recording in Progress </div>)}

                <div className='flex flex-col lg:flex-row justify-center items-center gap-2 mb-4'>
                    <button
                        onClick={() => handleListen(data.maleVoice)}
                        disabled={speaking}
                        className="bg-[#42C2FE] cursor-pointer flex justify-center text-white px-4 py-2 mt-3 rounded hover:bg-[#42C2FE]-500 min-w-[175px]"
                    > <Image src='/general/song-icon.svg' alt="song-icon" height={15} width={15} className='mr-4' />
                        {!getFeedbackLoading && speaking ? 'Listening...' : 'Listen'}
                    </button>

                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={speaking}
                        className={`bg-[#F15B29] flex justify-center cursor-pointer text-white px-4 py-2 mt-3 rounded hover:bg-[#F15B29]-700 min-w-[175px] ${isRecording ? 'bg-[#F15B29] hover:bg-[#f15b29]-500' : 'bg-[#03A7F3] hover:bg-[#03A7F3]-500'}`}
                    > <Image src='/general/record-mic-icon.svg' alt="song-icon" height={15} width={15} className='mr-4' />
                        {isRecording ? 'Stop Recording' : 'Record'}
                    </button>
                </div>

                {audioURL && (
                    <div className='flex justify-center'><audio controls src={audioURL} className="mt-4 w-full max-w-sm" /></div>
                )}
            </div>
        </div>
    );
};

export default PwpTipScreen;