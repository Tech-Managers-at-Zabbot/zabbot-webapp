/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useAlert } from "next-alert";
import React, { useState, useRef } from "react";
import { X } from "lucide-react";

// Import the actual API hook
import { usePronunciationFeedback } from "@/services/generalApi/pronounciations/mutation";

// Remove the mock API simulation function
// const simulateFeedbackAPI = async (formData: FormData): Promise<any> => { ... }

const ScoreBar = ({ finalScore }: { finalScore: number }) => {
  const getScoreColor = (finalScore: number) => {
    return "#9FDEBC";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent!";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs improvement — listen and try again.";
  };

  return (
    <div className="w-full max-w-md" style={{ fontFamily: "Lexend" }}>
      <div className="flex justify-center mb-2 w-full text-center">
        <span className="text-[#FFDAB6] text-xl md:text-4xl font-bold">
          {finalScore}%
        </span>
      </div>
      <div className="text-center mt-2">
        <span
          className="text-xl font-semibold"
          style={{ color: getScoreColor(finalScore) }}
        >
          {getScoreLabel(finalScore)}
        </span>
      </div>
    </div>
  );
};

interface InLessonRecordWithParaProps {
  onClose: () => void;
  isOpen: boolean;
  word: string;
  files: Record<string, any>[];
  // pronunciationId: string;
}

const InLessonRecordWithPara = ({
  onClose,
  isOpen,
  word,
  files,
  // pronunciationId,
}: InLessonRecordWithParaProps) => {
  const [speaking, setSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<any>(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const { addAlert } = useAlert();
  const audioFiles = files.filter((file) => file.contentType === "audio");
  const audioUrl = audioFiles[0]?.filePath;

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use the actual API hook
  const {
    mutateAsync: getPronunciationFeedback,
    isPending: getFeedbackLoading,
  } = usePronunciationFeedback();

  if (!isOpen) return null;

  const handleListen = async () => {
    if (files.length === 0) return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplaying = () => setSpeaking(true);
      audio.onended = () => setSpeaking(false);
      audio.onerror = (err) => {
        console.error("Audio playback error:", err);
        setSpeaking(false);
      };

      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setSpeaking(false);
    }
  };

  const startRecording = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsProcessing(false);
      setAudioURL(null);
      setProcessedData(null);
      setHasRecorded(false);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        chunksRef.current = [];

        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setHasRecorded(true);

        const fileName = `recording-${Date.now()}.wav`;
        const formData = new FormData();
        formData.append("file", blob, fileName);
        formData.append("isInLesson", "true");
        formData.append("isInLessonUrl", audioUrl);
        formData.append("isInLessonAudioId", audioFiles[0]?.id);

        try {
          // Use the actual API call instead of mock
          const feedbackRes = await getPronunciationFeedback(
            {
              id: audioFiles[0]?.id,
              payload: formData,
            },
            {
              onError: (error:any) => {
                addAlert("Error", `${error.response.data.message || "Unable to get feedback, try again please"}`, "error");
              },
            }
          );

          if (!feedbackRes) {
            setIsProcessing(false);
            return;
          }

          if (feedbackRes?.status === "success" && feedbackRes?.data) {
            setProcessedData({
              embeddingSimilarity: feedbackRes.data.embeddingSimilarity,
              finalScore: feedbackRes.data.finalScore,
              plot: feedbackRes.data.plot,
              remark: feedbackRes.data.remark,
              textSimilarity: feedbackRes.data.textSimilarity,
            });
          } else {
            console.error("Feedback request failed");
          }
        } catch (error) {
          console.error("❌ Upload failed:", error);
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      addAlert("Error", "Unable to access microphone. Please check your permissions.", "error");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream
      .getTracks()
      .forEach((track) => track.stop());
    setIsRecording(false);
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (mediaRecorderRef.current && isRecording) {
      stopRecording();
    }
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }

    setSpeaking(false);
    setIsRecording(false);
    setIsProcessing(false);
    setAudioURL(null);
    setProcessedData(null);
    setHasRecorded(false);

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      style={{ fontFamily: "Lexend" }}
    >
      <div
        className="relative w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl"
        style={{
          backgroundImage: "url('/lessons/green-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative px-9 flex justify-end">
          <button
            onClick={handleClose}
            className="mt-10 cursor-pointer inline-block text-sm font-medium hover:text-[#FFDAB6] text-white/90 underline"
          >
            <X size={32} strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="">
              <h2 className="text-white text-xl md:text-2xl font-bold">
                {word}
              </h2>
            </div>

            {processedData && processedData.finalScore > 0 && (
              <div className="flex flex-col items-center">
                <ScoreBar finalScore={processedData.finalScore} />
              </div>
            )}

            {audioURL && (
              <div className="w-full mt-6 max-w-md mb-6">
                <audio
                  controls
                  src={audioURL}
                  className="w-full rounded-lg"
                  style={{ filter: "invert(1) hue-rotate(180deg)" }}
                />
              </div>
            )}

            {processedData && (
              <div className="w-full max-w-2xl space-y-6 mt-4">
                {/* {processedData.remark && processedData.remark.length > 0 && (
                  <div className="bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-black text-lg text-center">
                      {processedData.remark}
                    </p>
                  </div>
                )} */}

                {processedData.plot && (
                  <div className="rounded-lg bg-white w-full">
                    <p className="text-gray-700 text-sm mb-2 text-center font-medium">
                      Quality of Intonation (Comparison)
                    </p>
                    <img
                      src={processedData.plot}
                      alt="Pronunciation comparison"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="min-h-[60px]">
              {speaking && (
                <div className="flex items-center justify-center gap-2 text-white text-lg">
                  <svg
                    className="w-5 h-5 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                  Playing audio...
                </div>
              )}

              {isRecording && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-300 text-lg font-medium">
                      Recording in Progress...
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-400 rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.random() * 20}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {isProcessing && (
                  <div className="flex items-center justify-center gap-2 text-white text-lg">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing your recording...
                  </div>
                )}

              {!speaking && !isRecording && !isProcessing && !hasRecorded && (
                <p className="text-[#9FDEBC] text-lg font-[700]">
                  Click "Listen" to hear the pronunciation, then "Record" to
                  practice
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-md">
              <button
                onClick={handleListen}
                disabled={speaking || isProcessing || isRecording}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
                {speaking ? "Playing..." : "Listen"}
              </button>

              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={speaking || isProcessing}
                className={`flex-1 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-orange-500 hover:bg-orange-600"
                } disabled:bg-gray-500 disabled:cursor-not-allowed text-white`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
                {isRecording ? "Stop Recording" : "Record"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InLessonRecordWithPara;
