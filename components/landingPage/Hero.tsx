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
          <div className="bg-[#EB5017] text-center py-1 px-3 w-fit text-sm sm:text-base font-[600] leading-[145%] rounded-xl text-[#FFFFFF]">
            ENDLESS SUMMER SALE
          </div>

          <div className="text-4xl sm:text-5xl md:text-[56px] font-[400] leading-[112%]">
            Practice Learning a Language
            with Ease—We&apos;re So Glad
            You&apos;re Here! Get Ready to
            Explore, Grow, and Have Fun
            Along the Way. Let&apos;s See Where
            This Adventure Takes You!
          </div>

          <div className="text-lg sm:text-xl md:text-[25px] font-[400]">
            From your first words to fluent conversations, we&apos;re here{" "}
            to make learning natural, engaging, and fun.
            Start practicing today and watch your confidence grow!
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-[18px] items-start sm:items-center">
            <ColouredButton
              paddingBottom="16.31px"
              paddingLeft="16.31px"
              paddingRight="16.31px"
              paddingTop="16.31px"
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

        {/* Images Section */}
        <section className="lg:w-[50%] relative">
          <main className="flex justify-between">
            <div className="relative mt-10">
              <Image
                src="/landingPage/hundred-plus-score.svg"
                alt="over 90 percent acheve 100 plus score"
                height={96}
                width={200}
                className="object-contain"
                priority
              />
            </div>
            <div className="relative">
              <Image
                src="/landingPage/join-others.svg"
                alt="more features"
                height={82}
                width={321}
                className="object-contain"
                priority
              />
            </div>
          </main>

          <main className="relative">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px]">
              <Image
                src="/landingPage/landing-map.svg"
                alt="two phones on a world map with flags"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[30%] max-w-[230px] aspect-[230/80]">
              <Image
                src="/landingPage/landing-lessons-songs.svg"
                alt="lessons and songs illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </main>
        </section>
      </main>
    </div>
  );
};

export default HeroSection;