/* eslint-disable @typescript-eslint/no-explicit-any */
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

      <div className="bg-[url('/lessons/questionFrame.svg')] min-h-[300px] sm:min-h-[400px] w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] flex flex-col justify-center items-center bg-center bg-contain bg-no-repeat p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <div className="w-[80%] px-2 sm:px-4 flex flex-col justify-center items-center text-center">
          {/* Main Content */}
          <div className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed">
            {cleanContent.split("–").map((part: string, index: number) => (
              <div key={index} className={index > 0 ? "block mt-2" : "inline"}>
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
