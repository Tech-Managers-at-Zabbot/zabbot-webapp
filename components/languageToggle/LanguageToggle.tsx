/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { appColors } from "@/constants/colors";

const LanguageToggle = () => {
  const [isActiveLanguage, setIsActiveLanguage] = useState("english");

  const setLanguageFunction = (language: string) => {
    localStorage.setItem("currentLanguage", language);
    setIsActiveLanguage(language);
  };

  useEffect(() => {
    const currentLanguage = localStorage.getItem("currentLanguage");
    if (currentLanguage) {
      setIsActiveLanguage(currentLanguage);
    } else {
      localStorage.setItem("currentLanguage", isActiveLanguage);
    }
  }, []);

  return (
    <div
      className="w-[160px] sm:w-[232px] h-[32px] sm:h-[40px] leading-[100%] font-[400] flex rounded-lg"
      style={{ fontFamily: "Lexend" }}
    >
      <section
        className="flex flex-1 rounded-tl-lg rounded-bl-lg hover:cursor-pointer items-center justify-center gap-[6px] sm:gap-[8px] py-[8px] sm:py-[10px] px-[12px] sm:px-[16px] transition-all duration-300 ease-in-out"
        style={{
          backgroundColor:
            isActiveLanguage === "english"
              ? appColors.darkRoyalBlueForBtn
              : appColors.languageToggleLightBlue,
          color:
            isActiveLanguage === "english"
              ? appColors.white
              : appColors.darkRoyalBlueForBtn,
        }}
        onClick={() => setLanguageFunction("english")}
      >
        <div className="transition-transform duration-300 ease-in-out text-sm sm:text-base">
          <BsGlobe />
        </div>
        <div className="transition-all duration-300 ease-in-out text-xs sm:text-sm font-medium">
          <span className="block sm:hidden">EN</span>
          <span className="hidden sm:block">English</span>
        </div>
      </section>
      <section
        className="flex flex-1 rounded-tr-lg rounded-br-lg hover:cursor-pointer items-center justify-center gap-[6px] sm:gap-[8px] py-[8px] sm:py-[10px] px-[12px] sm:px-[16px] transition-all duration-300 ease-in-out"
        style={{
          backgroundColor:
            isActiveLanguage === "yoruba"
              ? appColors.darkRoyalBlueForBtn
              : appColors.languageToggleLightBlue,
          color:
            isActiveLanguage === "yoruba"
              ? appColors.white
              : appColors.darkRoyalBlueForBtn,
        }}
        onClick={() => setLanguageFunction("yoruba")}
      >
        <div className="transition-transform duration-300 ease-in-out text-sm sm:text-base">
          <BsGlobe />
        </div>
        <div className="transition-all duration-300 ease-in-out text-xs sm:text-sm font-medium">
          <span className="block sm:hidden">YR</span>
          <span className="hidden sm:block">Yorùbá</span>
        </div>
      </section>
    </div>
  );
};

export default LanguageToggle;
