import React from "react";
import Image from "next/image";
import ColouredButton from "../ColouredButton";
import { appColors } from "@/constants/colors";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div
      className="text-[#000000] lg:px-[112px]"
      style={{ fontFamily: "Lexend", backgroundColor: appColors.primaryBlue }}
    >
      <main className="flex flex-col lg:flex-row gap-10">
        {/* Text Content Section */}
        <section className="flex flex-col justify-center gap-6 md:gap-[50px] lg:w-[55%]">
          <div
            className="text-center w-fit text-[20px] font-[400] leading-[145%]"
            style={{ color: appColors.primaryGrayNormal }}
          >
            Ready to improve your Language today?
          </div>

          <div className="text-[62px] text-[#162B6E] font-[700] leading-[100%]">
            Practice Learning a <br /> Language with Ease.
          </div>

          <div
            className="text-lg sm:text-xl md:text-[25px] font-[400]"
            style={{ color: appColors.black }}
          >
            From your first words to fluent conversations, we&apos;re here to
            make learning natural, engaging, and fun. Start practicing today and
            watch your confidence grow!
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-[18px] items-start sm:items-center">
            <ColouredButton
              paddingBottom="16.31px"
              paddingLeft="16.31px"
              paddingRight="16.31px"
              paddingTop="16.31px"
              backgroundColor={appColors.yellowBtnColor}
              color={appColors.darkRoyalBlueForBtn}
            >
              <main className="flex gap-[10.19px] items-center justify-center">
                <div className="font-[600] text-sm sm:text-[16.31px] leading-[145%]">
                  Get Started
                </div>
                <div>
                  <MdOutlineKeyboardArrowRight
                    size={30}
                    color={appColors.darkRoyalBlueForBtn}
                  />
                </div>
              </main>
            </ColouredButton>

            <ColouredButton
              paddingBottom="16.31px"
              paddingLeft="21px"
              paddingRight="21px"
              paddingTop="16.31px"
              backgroundColor={appColors.darkRoyalBlueForBtn}
              color={appColors.white}
              width="266"
            >
              <main className="flex gap-[10px] items-center justify-center">
                <div
                  className="font-[600] text-sm sm:text-[16.31px] leading-[145%]"
                  style={{ fontFamily: "Inter" }}
                >
                  I Have An Account Already
                </div>
                <div>
                  <MdOutlineKeyboardArrowRight
                    size={30}
                    color={appColors.white}
                  />
                </div>
              </main>
            </ColouredButton>
          </div>
        </section>

        {/* Images Section */}
        <section className="lg:w-[50%] mt-12 md:mt-16 relative">
          <main>
            <div className="rounded-lg">
              <Image
                src="/general/flags.svg"
                alt="Language Flags"
                width={500}
                height={80}
              />
            </div>
          </main>
          <main className="flex justify-start items-center">
            <div className="relative">
              <Image
                src="/landingPage/join-others.svg"
                alt="more features"
                height={100}
                width={380}
                // className="object-contain"
                loading="lazy"
                // priority
              />
            </div>
            <div className="relative">
              <Image
                src="/landingPage/hundred-plus-score.svg"
                alt="over 90 percent acheve 100 plus score"
                height={96}
                width={250}
                className="object-contain"
                priority
              />
            </div>
          </main>

          <main className="relative">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px]">
              <Image
                src="/landingPage/landing-page-parrot.svg"
                alt="Zabbot blue mascot parrot, Para standing on a globe"
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
