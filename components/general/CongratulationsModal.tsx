/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  imageUrl?: string;
  imageAlt?: string;
  darkMode?: boolean;
  buttonText?: string;
  showConfetti?: boolean;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  imageUrl,
  imageAlt = "Congratulations",
  darkMode = false,
  buttonText = "Continue",
  showConfetti = true,
}) => {
  const { width = 0, height = 0 } = useWindowSize();
  const [confettiRun, setConfettiRun] = useState(false);

  useEffect(() => {
    console.log("dime", width, height);
    if (isOpen) {
      setConfettiRun(true);
      document.body.style.overflow = "hidden";
      // Start confetti immediately when modal opens
    } else {
      document.body.style.overflow = "auto";
      // Reset confetti when modal closes
      setConfettiRun(false);
    }

    return () => {
      document.body.style.overflow = "auto";
      setConfettiRun(false);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
            gravity={0.4}
            tweenDuration={10000}
            run={confettiRun}
            style={{
              zIndex: 9999,
            }}
          />
        )}
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 bg-opacity-50"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div
          className={`relative z-[110] w-full max-w-md rounded-2xl p-6 shadow-xl ${
            darkMode ? "bg-[#012657] text-white" : "bg-[#dff9fb] text-[#162B6E]"
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute right-4 top-4 rounded-full p-1 ${
              darkMode
                ? "text-white hover:bg-[#013a7f]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="flex flex-col items-center text-center">
            {/* Image */}
            {imageUrl && (
              <div className="mb-6 h-32 w-32">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
            )}

            {/* Title */}
            <h2
              className={`mb-3 text-2xl font-bold ${
                darkMode ? "text-[#D0F7F6]" : "text-[#202124]"
              }`}
            >
              {title}
            </h2>

            {/* Message */}
            <p
              className={`mb-6 ${
                darkMode ? "text-[#FFFAEB]" : "text-[#333333]"
              }`}
            >
              {message}
            </p>

            {/* Button */}
            <button
              onClick={onClose}
              className={`rounded-lg px-6 py-2 font-medium transition-colors ${
                darkMode
                  ? "bg-[#D0F7F6] text-[#012657] hover:bg-[#a8e5e4]"
                  : "bg-[#012657] text-white hover:bg-[#013a7f]"
              }`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CongratulationsModal;
