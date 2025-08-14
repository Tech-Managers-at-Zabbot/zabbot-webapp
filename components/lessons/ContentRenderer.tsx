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
    <div className="items-center flex flex-col justify-center w-full h-full mx-auto px-4 relative"
    style={{ fontFamily: "Lexend" }}
    >
      <div>
        <h2 className="text-2xl text-[#F15B29] md:text-3xl font-bold mb-6 text-center">
          {lessonTitle}
        </h2>
      </div>
      <div className="bg-[url('/lessons/questionFrame.svg')] h-[400px] flex flex-col justify-center items-center max-w-[500px] w-full bg-center bg-cover bg-no-repeat p-8 mb-6">
        <div>
          {/* Content Display */}
          <div className="text-center mb-8">
            <div className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed">
              {cleanContent.split("–").map((part: string, index: number) => (
                <div
                  key={index}
                  className={index > 0 ? "block mt-2" : "inline"}
                >
                  {part.trim()}
                </div>
              ))}
            </div>

            {content?.translation && (
              <div className="mb-6">
                <div className="p-4 rounded-lg">
                  <p className="text-lg text-[#EBEBEB]">
                    {content?.translation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Grammar Rule Indicator */}
          {content?.isGrammarRule && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-yellow-800 font-medium">📚 Grammar Rule</p>
            </div>
          )}

          {/* Media Components (Audio, Video, Images) */}
          {content?.files?.length > 0 && (
            <MediaComponents files={content.files} />
          )}
        </div>
      </div>

      <div className="border-t-1 mt-6 border-[#FCD2C2] w-full">2</div>

      {/* Navigation Buttons */}
      <div className="px-[5%] mt-6 flex w-full justify-between items-center">
        <InAppButton
          onClick={onPrevious}
          disabled={!canGoBack || completeLoading}
          disabledColor="#C98F5DCC"
          background={canGoBack ? `#5A2E10` : `#C98F5DCC`}
        >
          <div className={`px-6 py-3 rounded-lg font-medium`}>← Previous</div>
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
