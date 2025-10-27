import React from "react";
// import Image from "next/image";
import ColouredButton from "../ColouredButton";
import { appColors } from "@/constants/colors";
// import { motion } from "framer-motion";
import MascotComponent from "./MascotComponent";
import { HiOutlinePlay } from "react-icons/hi2";

const HeroSection = () => {
  return (
    <div
      className="text-[#000000] min-h-screen px-4 sm:px-8 md:px-16 lg:px-[112px] py-10 lg:py-20 flex items-center justify-center"
      style={{ fontFamily: "Lexend", backgroundColor: appColors.primaryBlue }}
    >
      <main className="flex flex-col lg:flex-row gap-10">
        {/* Text Content Section */}
        <section className="flex flex-col justify-center gap-6 md:gap-[50px] lg:w-[55%]">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <div className="text-center bg-[#D5F0FF] rounded-4xl text-[#162B6E] py-2 px-4 text-[16px] font-[400] leading-[24px]">
              The spark that powers language & culture.
            </div>
            <div className="bg-[#00C950] shadow-xl text-[#FFFFFF] font-[500] text-[16px] leading-[24px] rounded-4xl py-2 px-4 text-cennter">
              Perfect tone! ✨
            </div>
          </div>

          <div className="text-[62px] text-[#162B6E] font-[700] leading-[76px]">
            Learn your heritage <br /> language through AI-powered conversations
          </div>

          <div className="text-lg sm:text-xl md:text-[25px] leading-[28px] font-[400] text-[#364153]">
            Zabbot blends conversational AI, storytelling, and community to help
            you speak Yoruba with confidence and cultural understanding.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-[18px] items-start sm:items-center">
            <ColouredButton
              paddingBottom="16.31px"
              paddingLeft="16.31px"
              paddingRight="16.31px"
              paddingTop="16.31px"
              backgroundColor="#162B6E"
              color="#FFFFFF"
              boxShadow=""
            >
              <main className="flex gap-[10.19px] items-center justify-center">
                <div className="font-[600] text-[16px] sm:text-[20px] leading-[145%]">
                  Start Learning
                </div>
              </main>
            </ColouredButton>

            <ColouredButton
              paddingBottom="16.31px"
              paddingLeft="21px"
              paddingRight="21px"
              paddingTop="16.31px"
              backgroundColor="#FFFFFF"
              color="#162B6E"
              width="266"
              border="1px solid #012657"
            >
              <main className="flex gap-[10px] items-center justify-center">
                <div
                  className="font-[600] text-[16px] sm:text-[20px] leading-[145%]"
                  style={{ fontFamily: "Inter" }}
                >
                  Watch Demo
                </div>
                <div>
                  <HiOutlinePlay size={30} color="#162B6E" />
                </div>
              </main>
            </ColouredButton>
          </div>
        </section>

        <section>
          <div className="w-full flex items-center justify-center order-2 lg:order-2 pb-8 lg:pb-0">
            <MascotComponent />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeroSection;
