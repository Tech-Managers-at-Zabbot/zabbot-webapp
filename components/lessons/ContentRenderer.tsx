/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
import MediaComponents from "./MediaRendererComponent";

interface ContentRendererProps {
  content: any;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastContent: boolean;
  onComplete: () => void;
  lessonTitle?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  onNext,
  onPrevious,
  canGoBack,
  isLastContent,
  onComplete,
  lessonTitle,
}) => {
  const [completeLoading, setCompleteLoading] = useState(false);

  if (!content) return null;

// Clean HTML content (remove inline styles for better control)
  const cleanContent = content.customText?.replace(/<[^>]*>/g, "") || "";

  const handleNext = () => {
    if (isLastContent) {
      setCompleteLoading(true);
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <div
      className="items-center z-10 flex flex-col justify-center w-full h-full mx-auto px-4 relative"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="mt-12 md:mt-2">
        <h2 className="text-2xl text-[#F15B29] md:text-3xl font-bold mb-6 text-center">
          {lessonTitle}
        </h2>
      </div>

      {content?.contentType === "proverb" && (
        <div className="flex items-center justify-center flex-col">
          <div className="relative w-full max-w-2xl flex flex-col items-center">
            {/* The main paper section of the scroll */}
            <div
              className={`relative w-11/12 h-auto max-h-[80vh] py-16 px-4 md:px-20 scale-y-100 max-w-2xl bg-[#F5F5DC] border-2 border-[#5A2E10] shadow-lg rounded-lg overflow-hidden transition-all duration-1000 ease-in-out transform origin-top z-10`}
            >
              {/* Top border of the scroll */}
              <div
                className={`absolute top-0 left-0 w-full h-8 bg-[#5A2E10] rounded-t-lg z-20 flex items-center justify-center`}
              >
                <div className="w-10 h-3 bg-white rounded-full opacity-50"></div>
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-[#F15B29] mb-8">
                Language Proverb
              </h1>

              <h1 className="text-gray-800 text-lg md:text-xl font-normal mb-8">
                <span className="text-[#F15B29] font-bold">Proverb:</span>{" "}
                {content?.proverb}
              </h1>

              <h2 className="text-gray-800 text-lg font-normal md:text-xl mb-8">
                <span className="font-bold text-[#F15B29]">
                  Translation:
                </span>{" "}
                A younger person does not give an older person a lecture.
                (Respect elders.)
              </h2>
              {/* Dynamic content area */}
              <div
                className={`text-center leading-relaxed text-lg mb-8`}
                dangerouslySetInnerHTML={{ __html: content?.customText }}
              ></div>

              {/* Media Components */}
              <div className="flex items-center justify-center">
                {content?.files?.length > 0 && (
                  <MediaComponents files={content.files} />
                )}
              </div>

              {/* Bottom border of the scroll */}
              <div
                className={`absolute bottom-0 left-0 w-full h-8 bg-[#5A2E10] rounded-b-lg z-20 flex items-center justify-center`}
              >
                <div className="w-10 h-3 bg-white rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {content?.contentType === "normal" && (
        <div className="bg-[url('/lessons/questionFrame.svg')] min-h-[300px] sm:min-h-[400px] w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] flex flex-col justify-center items-center bg-center bg-contain bg-no-repeat p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="w-[80%] px-2 sm:px-4 flex flex-col justify-center items-center text-center">
            {/* Main Content */}
            <div className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed">
              {cleanContent.split("–").map((part: string, index: number) => (
                <div
                  key={index}
                  className={index > 0 ? "block mt-2" : "inline"}
                >
                  {part.trim()}
                </div>
              ))}
            </div>

            {/* Translation */}
            {content?.translation && (
              <div className="text-[#EBEBEB] flex justify-center items-center text-sm sm:text-base p-3">
                <div className="flex rounded-lg bg-black/30 p-2">
                  {content.translation}
                </div>
              </div>
            )}

            {/* Grammar Rule Indicator */}
            {content?.isGrammarRule && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4">
                <p className="text-yellow-800 font-medium text-sm sm:text-base">
                  📚 Grammar Rule
                </p>
              </div>
            )}

            {/* Media Components */}
            <div className="flex items-center justify-center">
              {content?.files?.length > 0 && (
                <MediaComponents files={content.files} />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="border-t-1 h-[0.5px] mt-6 border-[#FCD2C2] w-full"></div>

      {/* Navigation Buttons */}
      <div className="px-[5%] z-10 mt-6 flex-col md:flex-row gap-2 md:gap-0 flex w-full justify-between items-center">
        <InAppButton
          onClick={onPrevious}
          disabled={!canGoBack || completeLoading}
          disabledColor="#C98F5DCC"
          background={canGoBack ? `#5A2E10` : `#C98F5DCC`}
        >
          <div className={`px-6 py-3 z-10 rounded-lg font-medium`}>
            ← Previous
          </div>
        </InAppButton>

        <InAppButton
          onClick={handleNext}
          background={`#5A2E10`}
          disabled={completeLoading}
          disabledColor="#C98F5DCC"
        >
          <div>
            {isLastContent ? (
              "Complete Lesson"
            ) : completeLoading ? (
              <CustomSpinner />
            ) : (
              "Next →"
            )}
          </div>
        </InAppButton>
      </div>

    </div>
  );
};

export default ContentRenderer;
