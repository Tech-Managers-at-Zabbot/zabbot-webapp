/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import InAppButton from "@/components/InAppButton";
import { numberToWords } from "@/utilities/utilities";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const LessonOneIntro = ({ onClick, lessonNumber, lesson }: { onClick: () => void, lessonNumber:number, lesson:Record<string, any> }) => {
  const [startLoading, setStartLoading] = useState(false);
  const [activeIntro, setActiveIntro] = useState("1");

  const handleClick = () => {
    setStartLoading(true);
    onClick();
  };

  return (
    <div
      style={{ fontFamily: "Lexend" }}
      className="bg-[#fef7d0] min-h-screen w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-12 px-4 md:px-6 py-8"
    >
      {activeIntro === "1" && (
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-[800px]">
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
        SPARK {numberToWords(lessonNumber).toUpperCase()}
      </div>

      {/* Next Button */}
      <div className="w-full max-w-[397px] px-4">
        <InAppButton
          borderRadius="1000px"
          background="#5A2E10"
          width="100%"
          height="80px"
          onClick={() => setActiveIntro("2")}
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
      )}

       {activeIntro === "2" && (
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-[800px]">
      {/* Mascot Image */}
      <div className="flex-shrink-0">
        <img
          src={"/userDashboard/say-hello.svg"}
          alt="Lesson Intro"
          style={{borderRadius: "30px"}}
          className="w-[250px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[350px] lg:w-[350px] lg:h-[250px] xl:h-[400] object-cover"
        />
      </div>

      {/* Lesson Title */}
      <div className="font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[40px] leading-[1.2] text-[#F15B29] text-center">
        {lesson?.title}
      </div>

      <div className="font-[400] text-[16px] sm:text-[20px] md:text-[20px] lg:text-[20px] leading-[32px] text-[#1C2024] text-center">
        {lesson?.headLineTag}
      </div>

      {/* Next Button */}
      <div className="w-full max-w-[397px] px-4">
        <InAppButton
          borderRadius="1000px"
          background="#5A2E10"
          width="100%"
          height="80px"
          onClick={() => setActiveIntro("3")}
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
      )}

       {activeIntro === "3" && (
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 w-full">
      {/* Mascot Image */}
      <div className="w-full flex justify-between items-center p-4 rounded-lg">
      <div className="flex-shrink-0">
         <img
          src="/general/confetti.png"
          alt="Lesson Intro"
          className="w-[100px] md:w-[150px] h-[200px] sm:h-[300px] md:h-[350px] lg:h-[250px] xl:h-[300] object-contain"
        />
      </div>
      <div className="flex-shrink-0">
        <img
          src="/userDashboard/owe-image.png"
          alt="Lesson Intro"
          className="w-[250px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[250px] xl:h-[300] object-contain"
        />
      </div>
      <div className="flex-shrink-0">
         <img
          src="/general/confetti.png"
          alt="Lesson Intro"
          className="w-[100px] md:w-[150px] h-[200px] sm:h-[300px] md:h-[350px] lg:h-[250px] xl:h-[300] object-contain"
        />
      </div>
      </div>

      {/* Lesson Title */}
      <div>
      <div className="font-[400] text-[20px] text-[#777980] text-center">
        Ready to level up?
      </div>

      <div className="font-[400] text-[20px] text-[#777980] text-center">
        You can do this!
      </div>
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
      )}
    </div>
  );
};

export default LessonOneIntro;
