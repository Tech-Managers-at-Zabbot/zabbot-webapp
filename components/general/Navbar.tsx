"use client";
import React from "react";
import Image from "next/image";
import { appColors } from "@/constants/colors";
import LanguageToggle from "../languageToggle/LanguageToggle";

const Navbar = () => {
  return (
<nav
  className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 h-16 md:h-20 flex justify-between items-center lg:h-[120px] w-full"
  style={{ backgroundColor: appColors.darkRoyalBlueForBtn }}
>
  <div className="flex items-center w-auto justify-center">
    <div className="flex items-center">
      <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[48.85px] lg:w-[200px]">
        <Image
          src="/general/zabbot-logo-white.svg"
          alt="Zabbot Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  </div>
  <div className="hover:cursor-pointer rounded-lg border relative transition-all duration-200">
    <LanguageToggle />
  </div>
</nav>
  );
};

export default Navbar;
