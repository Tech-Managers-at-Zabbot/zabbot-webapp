/* eslint-disable @next/next/no-img-element */
"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import InAppButton from "@/components/InAppButton";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const LessonOneReady = ({ onClick }: { onClick: () => void }) => {
  const [startLoading, setStartLoading] = useState(false);

  const handleClick = () => {
    setStartLoading(true);
    onClick();
  };

  return (
    <div
      style={{ fontFamily: "Lexend" }}
      className="bg-[#fef7d0] min-h-screen w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 py-8"
    >
      {/* Images Container */}
      <div className="flex items-center justify-center md:justify-between w-full relative">
        {/* Left Confetti - Hidden on mobile, visible on larger screens */}
        <img
          src="/general/confetti.png"
          alt="Confetti"
          className="hidden md:block w-[120px] h-[240px] lg:w-[150px] lg:h-[300px] xl:w-[200px] xl:h-[400px] object-contain flex-shrink-0"
        />
        
        {/* Center Owl - Always visible */}
        <div className="flex-shrink-0 z-10">
          <img
            src="/general/grandma-adorned-owl.png"
            alt="Grandma Adorned Owl"
            className="w-[200px] h-[207px] sm:w-[220px] sm:h-[227px] md:w-[240px] md:h-[248px] lg:w-[260px] lg:h-[268px] xl:w-[280px] xl:h-[289px] object-contain"
          />
        </div>
        
        {/* Right Confetti - Hidden on mobile, visible on larger screens */}
        <img
          src="/general/confetti.png"
          alt="Confetti"
          className="hidden md:block w-[120px] h-[240px] lg:w-[150px] lg:h-[300px] xl:w-[200px] xl:h-[400px] object-contain flex-shrink-0"
        />

        {/* Mobile Confetti - Positioned absolutely for mobile */}
        <img
          src="/general/confetti.png"
          alt="Confetti"
          className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 w-[60px] h-[120px] object-contain opacity-70 z-0"
        />
        <img
          src="/general/confetti.png"
          alt="Confetti"
          className="md:hidden absolute right-0 top-1/2 transform -translate-y-1/2 w-[60px] h-[120px] object-contain opacity-70 z-0"
        />
      </div>

      {/* Text Content */}
      <div className="text-center font-[400] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[1.45] text-[#777980] max-w-md px-4">
        Ready to level up? <br />
        Finish this lesson and see what awaits you
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

export default LessonOneReady;
