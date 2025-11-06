"use client";
import React from "react";
// import Image from "next/image";
import ColouredButton from "../ColouredButton";
import { appColors } from "@/constants/colors";
// import { motion } from "framer-motion";
import MascotComponent from "./MascotComponent";
import { HiOutlinePlay } from "react-icons/hi2";
import { useState } from "react";
import { CustomSpinner } from "../CustomSpinner";
import { useRouter } from "next/navigation";


interface HeroSectionProps {
  setHeroLoginRedirect: (value: boolean) => void;
  setHeroWatchDemoRedirect: (value: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  setHeroLoginRedirect,
  setHeroWatchDemoRedirect,
}) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [watchDemoLoading, setWatchDemoLoading] = useState(false);

  const router = useRouter();

  const handleLoginClick = () => {
    if (!loginLoading && !watchDemoLoading) {
      setLoginLoading(true);
      setHeroLoginRedirect(true);
      router.push("/login");
    }
  };

  const handleWatchDemoClick = () => {
    if (!loginLoading && !watchDemoLoading) {
      setWatchDemoLoading(true);
      setHeroWatchDemoRedirect(true);
    }
  };

  return (
    <div
      className="text-[#000000] min-h-screen px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px] py-8 sm:py-12 lg:py-20 flex items-center justify-center"
      style={{ fontFamily: "Lexend", backgroundColor: appColors.primaryBlue }}
    >
      <main className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 max-w-[1400px] w-full">
        {/* Text Content Section */}
        <section className="flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[50px] lg:w-[55%]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <div className="text-center bg-[#FFFFFF] rounded-3xl text-[#162B6E] py-1.5 px-3 sm:py-2 sm:px-4 text-[13px] sm:text-[14px] md:text-[16px] font-[400] leading-[1.5]">
              The spark that powers language & culture.
            </div>
            <div className="bg-[#00C950] shadow-xl text-[#FFFFFF] font-[500] text-[13px] sm:text-[14px] md:text-[16px] leading-[1.5] rounded-3xl py-1.5 px-3 sm:py-2 sm:px-4 text-center whitespace-nowrap">
              Learn Yorùbá {/* Perfect tone! ✨ */}
            </div>
          </div>

          <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] xl:text-[62px] text-[#162B6E] font-[700] leading-[1.2] sm:leading-[1.23]">
            Learn your heritage <br className="hidden sm:block" /> language
            through AI powered cultural immersion
          </h1>
          {/* <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[23px] xl:text-[25px] leading-[1.4] sm:leading-[1.3] font-[400] text-[#364153]">
            Zabbot blends conversational AI, storytelling, and community to help
            you speak Yoruba with confidence and cultural understanding.
          </p> */}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-[18px] items-stretch sm:items-center">
            <ColouredButton
              paddingBottom="14px"
              paddingLeft="14px"
              paddingRight="14px"
              paddingTop="14px"
              backgroundColor="#162B6E"
              color="#FFFFFF"
              boxShadow=""
              onClick={handleLoginClick}
              disabled={loginLoading || watchDemoLoading}
            >
              {loginLoading ? (
                <CustomSpinner
                  title=""
                  spinnerHeight="30px"
                  spinnerWidth="30px"
                  spinnerColor="#FFFFFF"
                />
              ) : (
                <div className="font-[600] text-[16px] sm:text-[18px] md:text-[20px] leading-[145%]">
                  Login
                </div>
              )}
            </ColouredButton>

            <ColouredButton
              paddingBottom="14px"
              paddingLeft="14px"
              paddingRight="14px"
              paddingTop="14px"
              backgroundColor="#FFFFFF"
              color="#162B6E"
              border="1px solid #012657"
              onClick={handleWatchDemoClick}
              disabled={loginLoading || watchDemoLoading}
            >
              <main className="flex gap-[8px] sm:gap-[10px] items-center justify-center">
                {watchDemoLoading ? (
                  <CustomSpinner
                    title=""
                    spinnerHeight="30px"
                    spinnerWidth="30px"
                    spinnerColor="#162B6E"
                  />
                ) : (
                  <>
                    <div
                      className="font-[600] text-[16px] sm:text-[18px] md:text-[20px] leading-[145%]"
                      style={{ fontFamily: "Inter" }}
                    >
                      Watch Demo
                    </div>
                    <div>
                      <HiOutlinePlay
                        size={24}
                        color="#162B6E"
                        className="sm:w-7 sm:h-7"
                      />
                    </div>
                  </>
                )}
              </main>
            </ColouredButton>
          </div>
        </section>

        <section className="lg:w-[45%] flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <MascotComponent />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeroSection;
