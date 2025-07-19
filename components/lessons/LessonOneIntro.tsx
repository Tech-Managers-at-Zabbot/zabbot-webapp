/* eslint-disable @next/next/no-img-element */
"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import InAppButton from "@/components/InAppButton";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const LessonOneIntro = ({ onClick }: { onClick: () => void }) => {
  const [startLoading, setStartLoading] = useState(false);

    const handleClick = () => {
        setStartLoading(true);
        onClick();
    };

  return (
    <div
      style={{ fontFamily: "Lexend" }}
      className="bg-[#fef7d0] min-h-screen w-full flex flex-col items-center justify-center gap-16"
    >
      <div>
        <img
          src="/general/zabbot-mascot-left.svg"
          alt="Lesson One Intro"
          className="w-[400px] h-[400px] object-contain"
        />
      </div>

      <div className="font-bold text-[60px] leading-[47px] text-[#F15B29]">
        LESSON ONE
      </div>

      <div>
        <InAppButton
          borderRadius="1000px"
          background="#5A2E10"
          width="397px"
          height="93px"
          onClick={handleClick}
          disabled={startLoading}
        >
          {startLoading ? (
            <CustomSpinner spinnerColor="#F86F1A" />
          ) : (
            <div className="flex font-bold text-[24px] leading-[160%] items-center gap-2 justify-center">
              Next <FaArrowRight color="#EBEBEB" />
            </div>
          )}
        </InAppButton>
      </div>
    </div>
  );
};

export default LessonOneIntro;
