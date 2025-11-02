"use client";
import React from "react";
import Image from "next/image";

const FeaturesSection = () => {
  const imageArray = [
    {
      src: "/landingPage/conversation.svg",
      alt: "AI Conversational Tutor Feature",
    },
    {
      src: "/landingPage/pronunciation.svg",
      alt: "Pronunciation Feedback Feature",
    },
    {
      src: "/landingPage/interactive.png",
      alt: "Interactive Practice with Story-based learning Feature",
    },
    {
      src: "/landingPage/progress.svg",
      alt: "Real Conversations, Real Progress Feature",
    },
  ];

  return (
    <div
      className="bg-[#0488c8] gap-12 lg:gap-[72.24px] flex flex-col text-[#EFF0F3] py-16 md:py-[96px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px]"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Header Section */}
      <section className="flex flex-col justify-center items-center gap-3 lg:gap-[14.45px]">
        <div className="text-[#FFFFFF] font-[600] text-3xl sm:text-4xl md:text-5xl leading-normal lg:leading-[19.86px]">
          Key Features
        </div>
        <div className="text-sm lg:text-[30px] text-center leading-[28px] lg:leading-[45.78px]">
          Built for heritage language learners who want more than just
          vocabulary drills.
        </div>
      </section>

      {/* Images Section */}
      <section className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 w-full py-6">
        {imageArray.map((image, index) => (
          <div
            key={index}
            className="relative w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-16px)] lg:w-[calc(25%-40px)] min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              priority={index < 2} // Only prioritize first two images
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default FeaturesSection;