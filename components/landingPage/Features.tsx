"use client";
import React from "react";
import Image from "next/image";
// import Image from "next/image";
// import Dropdown from "./landingDropDown";
// import device from "@/constants/breakpoints";
// import { useMatchMediaQuery } from "@/hooks/viewPorts";

const FeaturesSection = () => {
  return (
    <div className="bg-[#1E1E1E] gap-[72.24px] flex flex-col flex-wrap text-[#EFF0F3] py-[96px] px-4 sm:px-6 md:px-8 lg:px-[112px]">
      <section className="flex flex-col justify-center items-center gap-[14.45px]">
        <div className="text-[#FFFFFF] font-[400] text-[14.45px] leading-[19.86px]">
          Core Features
        </div>
        <div className="text-[56px]">
          Here are the <span className="text-[#F6E2C2]">reasons</span> you try
        </div>
      </section>
      <section className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[517px] lg:w-[390px]">
            <Image
              src="/landingPage/personalised-learning.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[517px] lg:w-[390px]">
            <Image
              src="/landingPage/stay-motivated.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[517px] lg:w-[390px]">
            <Image
              src="/landingPage/learn-anytime.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      <section>
      <div className="flex items-center justify-center">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[251px] lg:w-full">
            <Image
              src="/landingPage/auto-learn.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain w-full"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
