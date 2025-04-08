"use client";
import React from "react";
import Image from "next/image";

const FeaturesSection = () => {
  return (
    <div className="bg-[#1E1E1E] gap-12 lg:gap-[72.24px] flex flex-col text-[#EFF0F3] py-16 md:py-[96px] px-4 sm:px-6 md:px-8 lg:px-[112px]">
      {/* Header Section */}
      <section className="flex flex-col justify-center items-center gap-3 lg:gap-[14.45px]">
        <div className="text-[#FFFFFF] font-[400] text-sm lg:text-[14.45px] leading-normal lg:leading-[19.86px]">
          Core Features
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-center">
          Here are the <span className="text-[#F6E2C2]">reasons</span> you try
        </div>
      </section>

      {/* Top Three Features */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center flex-wrap">
        <div className="relative w-full sm:w-[30%] max-w-[390px] aspect-[390/517]">
          <Image
            src="/landingPage/learn-faster.svg"
            alt="Learn faster feature"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative w-full sm:w-[30%] max-w-[390px] aspect-[390/517]">
          <Image
            src="/landingPage/fun.svg"
            alt="Fun learning feature"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative w-full sm:w-[30%] max-w-[390px] aspect-[390/517]">
          <Image
            src="/landingPage/real-conversations.svg"
            alt="Real conversations feature"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Bottom Feature */}
      <section className="flex justify-center w-full">
        <div className="relative w-full max-w-[1600px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[251px]">
          <Image
            src="/landingPage/on-track.svg"
            alt="Stay on track feature"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1600px"
          />
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
