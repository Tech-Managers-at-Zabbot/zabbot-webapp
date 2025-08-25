/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
// import MediaComponents from "./MediaRendererComponent";
import ProverbsContentComponent from "./contents/ProverbsContent";
import NormalComponentComponent from "./contents/NormalContent";
import GrammarRuleComponent from "./contents/GrammarRuleContent";

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
        <div className="">
          <ProverbsContentComponent content={content} />
        </div>
      )}

      {content?.contentType === "normal" && (
        <div className="w-full flex items-center justify-center">
          <NormalComponentComponent content={content} />
        </div>
      )}

      {content.isGrammarRule && (
        <div className="w-full flex items-center justify-center">
          <GrammarRuleComponent content={content} />
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
