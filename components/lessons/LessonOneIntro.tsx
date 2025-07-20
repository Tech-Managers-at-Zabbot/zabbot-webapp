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
      className="bg-[#fef7d0] min-h-screen w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-12 px-4 md:px-6 py-8"
    >
      {/* Mascot Image */}
      <div className="flex-shrink-0">
        <img
          src="/general/zabbot-mascot-left.svg"
          alt="Lesson One Intro"
          className="w-[250px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[250px] xl:h-[300] object-contain"
        />
      </div>

      {/* Lesson Title */}
      <div className="font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[40px] leading-[1.2] text-[#F15B29] text-center">
        LESSON ONE
      </div>

      {/* Next Button */}
      <div className="w-full max-w-[397px] px-4">
        <InAppButton
          borderRadius="1000px"
          background="#5A2E10"
          width="100%"
          height="80px"
          onClick={handleClick}
          disabled={startLoading}
        >
          {startLoading ? (
            <CustomSpinner spinnerColor="#F86F1A" />
          ) : (
            <div className="flex font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[160%] items-center gap-2 justify-center">
              Next <FaArrowRight color="#EBEBEB" size={18} />
            </div>
          )}
        </InAppButton>
      </div>
    </div>
  );
};

export default LessonOneIntro;
