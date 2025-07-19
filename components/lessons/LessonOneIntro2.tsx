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
      className="bg-[#fef7d0] min-h-screen w-full flex flex-col items-center justify-center gap-10"
    >
      <div>
        <img
          src="/userDashboard/say-hello.svg"
          alt="Lesson One Intro"
          className="w-[450px] h-[400px] object-cover rounded-lg"
        />
      </div>

      <div className="relative">
        <div className="absolute top-10 right-10">
          <img
            src="/general/grand-ma-owl.png"
            alt="Zabbot Grand Ma Mascot Owl"
            className="w-[152px] h-[162px] object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="text-center flex flex-col items-center gap-7">
        <div className="font-bold text-[60px] leading-[47px] text-[#F15B29]">
          SAY HELLO
        </div>

        <div className="text-center font-[400] text-[24px] leading-[32px] text-[#1C2024]">
          Let's learn how to say HELLO depending <br /> on the time of day
        </div>
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

      <div className="border-t-4 border-[#F77A4A] w-full"></div>
    </div>
  );
};

export default LessonOneIntroTwo;
