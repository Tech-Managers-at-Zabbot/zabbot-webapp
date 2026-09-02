/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
// import MediaComponents from "./MediaRendererComponent";
import ProverbsContentComponent from "./contents/ProverbsContent";
import NormalComponentComponent from "./contents/NormalContent";
import GrammarRuleComponent from "./contents/GrammarRuleContent";
import { useLessonContext } from "@/contexts/LessonContext";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

interface ContentRendererProps {
  content: any;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastContent: boolean;
  onComplete: () => void;
  lessonTitle?: string;
  lessonImg?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  onNext,
  onPrevious,
  canGoBack,
  isLastContent,
  onComplete,
  lessonImg,
  // lessonTitle,
}) => {
  const [completeLoading, setCompleteLoading] = useState(false);

  const { goToContent } = useLessonContext();

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
      {content?.contentType === "proverb" && (
        <div className="">
          <ProverbsContentComponent content={content} />
        </div>
      )}

      {content?.contentType === "normal" && (
        <div className="w-full flex items-center justify-center">
          <NormalComponentComponent
            content={content}
            lessonImg={lessonImg || ""}
          />
        </div>
      )}

      {content.isGrammarRule && (
        <div className="w-full flex items-center justify-center">
          <GrammarRuleComponent content={content} />
        </div>
      )}

      {canGoBack && (
        <div
          className="text-[#F15B29] mt-4 hover:cursor-pointer hover:text-[#5A2E10]"
          onClick={() => goToContent(0)}
        >
          Go back to the beginning
        </div>
      )}

      {/* <div className="border-t-1 h-[0.5px] mt-6 border-[#FCD2C2] w-full"></div> */}

      {/* Navigation Buttons */}
      <div className="px-[2%] sm:px-[5%] absolute bottom-5 -translate-y-1/2 z-30 gap-2 md:gap-0 flex w-full justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <InAppButton
            onClick={onPrevious}
            disabled={!canGoBack || completeLoading}
            disabledColor="#C98F5DCC"
            background={canGoBack ? `#5A2E10` : `#C98F5DCC`}
            borderRadius="100%"
            height="60px"
            width="60px"
          >
            <div className="flex justify-center items-center">
              <FaArrowLeft className="text-base sm:text-xl md:text-2xl" />
            </div>
          </InAppButton>
        </div>

        <div className="pointer-events-auto">
          <InAppButton
            onClick={handleNext}
            background={`#5A2E10`}
            disabled={completeLoading}
            disabledColor="#C98F5DCC"
            borderRadius="100%"
            height="60px"
            width="60px"
          >
            <div>
              {isLastContent ? (
                <div className="flex justify-center items-center">
                  <FaArrowRight className="text-base sm:text-xl md:text-2xl" />
                </div>
              ) : completeLoading ? (
                <CustomSpinner />
              ) : (
                <div className="flex justify-center items-center">
                  <FaArrowRight className="text-base sm:text-xl md:text-2xl" />
                </div>
              )}
            </div>
          </InAppButton>
        </div>
      </div>
    </div>
  );
};

export default ContentRenderer;
