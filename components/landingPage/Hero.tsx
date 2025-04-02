import React from "react";
import Image from "next/image";
import ColouredButton from "../ColouredButton";
import TransparentButton from "../TransparentButton";
import {
  ColouredButtonArrow,
  TransparentButtonArrow,
} from "@/constants/SvgPaths";

const HeroSection = () => {
  return (
    <div
      className="bg-[#FFFAF2] text-[#000000] px-6 sm:px-8 md:px-16 lg:px-[112px] pt-12 md:pt-16 lg:pt-[100px]"
      style={{ fontFamily: "Inter" }}
    >
      <main className="flex flex-col lg:flex-row gap-10">
        {/* Text Content Section */}
        <section className="flex flex-col pb-10 gap-6 md:gap-[24px] lg:w-[55%]">
          <div className="bg-[#3D89DF] text-center py-1 px-3 w-fit text-sm sm:text-base font-[600] leading-[145%] rounded-xl text-[#FFFFFF]">
            ENDLESS SUMMER SALE
          </div>
          
          <div className="text-4xl sm:text-5xl md:text-[56px] font-[400] leading-[112%]">
            Practice Language <br className="hidden sm:block" />
            easier with <span className="font-[600]">Zabbot</span>{" "}
            <br className="hidden sm:block" />
            <span className="font-[600]">and</span> Speak fluent with <br className="hidden sm:block" />
            <span className="font-[600]">Confidence</span>
          </div>
          
          <div className="text-lg sm:text-xl md:text-[25px] font-[400]">
            Practice smarter, not harder, with our simple and interactive tools.{" "}
            <br className="hidden md:block" />
            Start speaking confidently today!
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-[18px] items-start sm:items-center">
            <ColouredButton
              paddingBottom="16.31px"
              paddingLeft="16.31px"
              paddingRight="16.31px"
              paddingTop="16.31px"
            //   width="100% sm:w-[230px]"
            >
              <main className="flex gap-[10.19px] items-center justify-center">
                <div className="font-[600] text-sm sm:text-[16.31px] leading-[145%]">
                  Get Started
                </div>
                <div>
                  <ColouredButtonArrow />
                </div>
              </main>
            </ColouredButton>
            
            <TransparentButton
              paddingBottom="16.31px"
              paddingLeft="21px"
              paddingRight="21px"
              paddingTop="16.31px"
            //   width="100% sm:w-[266px]"
            >
              <main className="flex gap-[10px] items-center justify-center">
                <div className="font-[600] text-sm sm:text-[16.31px] leading-[145%]">
                  I Have An Account Already
                </div>
                <div>
                  <TransparentButtonArrow />
                </div>
              </main>
            </TransparentButton>
          </div>
        </section>

        {/* Image Section */}
        <section className="lg:w-[45%] flex items-center">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px]">
            <Image
              src="/landingPage/landing-map.svg"
              alt="two phones on a world map with flags"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeroSection;