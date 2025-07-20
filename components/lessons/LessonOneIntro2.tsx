/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import InAppButton from "@/components/InAppButton";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const LessonOneIntroTwo = ({ onClick }: { onClick: () => void }) => {
  const [startLoading, setStartLoading] = useState(false);

  const handleClick = () => {
    setStartLoading(true);
    onClick();
  };

  return (
    <div
      style={{ fontFamily: "Lexend" }}
      className="min-h-screen relative w-full flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 py-8"
    >
      {/* Main Image Container */}
      <div className="relative flex-shrink-0">
        <img
          src="/userDashboard/say-hello.svg"
          alt="Lesson One Intro"
          className="w-[300px] h-[200px] sm:w-[350px] sm:h-[230px] md:w-[400px] md:h-[260px] lg:w-[450px] lg:h-[300px] object-cover object-top rounded-lg shadow-lg"
        />
        
        {/* Owl Mascot - Positioned over the image */}
        <div className="absolute -bottom-4 left-1/2 top-40 md:top-50 lg:top-60 transform -translate-x-1/2 z-10">
          <img
            src="/general/grand-ma-owl.png"
            alt="Zabbot Grand Ma Mascot Owl"
            className="w-[80px] h-[85px] sm:w-[100px] sm:h-[107px] md:w-[120px] md:h-[128px] lg:w-[152px] lg:h-[162px] object-cover"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center mt-8 md:mt-12 lg:mt-20 flex flex-col items-center gap-4 md:gap-6 lg:gap-7 max-w-2xl">
        <div className="font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[1.2] text-[#F15B29]">
          SAY HELLO
        </div>

        <div className="text-center font-[400] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[1.4] text-[#1C2024] px-4">
          Let's learn how to say HELLO depending <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>on the time of day
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full max-w-[397px] px-4 mt-4 md:mt-6">
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

      {/* Bottom Border */}
      <div className="border-t-2 z-10 md:border-t-4 border-[#F77A4A] w-full mt-6 md:mt-8"></div>
    </div>
  );
};

export default LessonOneIntroTwo;
