/* eslint-disable @next/next/no-img-element */
import { usePageLanguage } from "@/contexts/LanguageContext";
import React, { useState } from "react";

const ProverbsComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const { getPageText } =
        usePageLanguage("userDashboard");

  return (
    <section
      className="relative w-full items-center justify-center flex min-h-[200px] sm:min-h-[250px] md:min-h-[280px] lg:min-h-[320px] bg-[url('/userDashboard/proverbs-history-card.png')] bg-cover bg-center rounded-lg md:rounded-xl overflow-hidden"
      style={{
        boxShadow:
          "-4px 4px 12px rgba(0, 0, 0, 0.1), -8px 8px 20px rgba(0, 0, 0, 0.15)",
        fontFamily: "Lexend",
      }}
    >
      <div className="flex-1 absolute gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:top-40 lg:left-20 xl:top-40 xl:left-25 2xl:left-45 lg:transform-none flex justify-center items-center flex-col w-full">
        <div className="font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-white">
          <h3>{getPageText("proverbs")},</h3>
          <h3>{getPageText("history")} {getPageText("and")}</h3>
          <h3>{getPageText("humour")}</h3>
        </div>
        <div className="flex justify-center items-center mt-2">
          <button
            className="px-3 sm:px-4 md:px-5 hover:bg-transparent hover:text-white hover:border hover:border-white font-bold text-xs sm:text-sm md:text-base text-center leading-tight text-[#127978] py-2 sm:py-2.5 md:py-3 bg-white rounded-full transition-all duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isHovered}
          >
            {isHovered ? getPageText("coming_soon") : getPageText("learn_more")}
          </button>
        </div>
      </div>

      <div className="absolute right-0 bottom-0">
        <img
          src="/userDashboard/grandpa-owl-book.png"
          alt="Grandpa owl reading a book"
          className="w-16 sm:w-20 md:w-28 lg:w-36 xl:w-44 h-20 sm:h-24 md:h-32 lg:h-40 xl:h-52 object-fill"
        />
      </div>
    </section>
  );
};

const ConsonantComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
    const { getPageText } =
        usePageLanguage("userDashboard");
  return (
    <section
      className="relative w-full flex-col min-h-[200px] sm:min-h-[250px] md:min-h-[280px] lg:min-h-[320px] justify-between items-center flex bg-[#FFFF79] rounded-lg md:rounded-xl overflow-hidden"
      style={{
        boxShadow:
          "-4px 4px 12px rgba(0, 0, 0, 0.1), -8px 8px 20px rgba(0, 0, 0, 0.15)",
        fontFamily: "Lexend",
      }}
    >
      <div className="flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <div className="text-[#5DA0D7] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
          <h3>{getPageText("consonant")}</h3>
          <h3>{getPageText("toolkit")}</h3>
        </div>
        <div className="flex justify-center items-center mt-2 sm:mt-3">
          <button
            className="px-3 sm:px-4 md:px-5 hover:bg-transparent hover:text-[#207EC5] hover:border hover:border-[#207EC5] font-bold text-xs sm:text-sm md:text-base text-center leading-tight text-white py-2 sm:py-2.5 md:py-3 bg-[#207EC5] rounded-full transition-all duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isHovered}
          >
            {isHovered ? getPageText("coming_soon") : getPageText("learn_more")}
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-end flex-grow">
        <img
          src="/userDashboard/nesting-bird.png"
          alt="A nesting bird"
          className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 h-auto max-h-28 sm:max-h-32 md:max-h-36 lg:max-h-40 object-contain"
        />
      </div>
    </section>
  );
};

const InviteFriendsComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

   const { getPageText } =
        usePageLanguage("userDashboard");

  return (
    <section
      className="relative w-full flex justify-around md:justify-between min-h-[200px] sm:min-h-[250px] md:min-h-[280px] lg:min-h-[320px] bg-[#60C6A0] rounded-lg md:rounded-xl overflow-hidden"
      style={{
        boxShadow:
          "-4px 4px 12px rgba(0, 0, 0, 0.1), -8px 8px 20px rgba(0, 0, 0, 0.15)",
        fontFamily: "Lexend",
      }}
    >
      <div className="flex flex-1 flex-col pl-4 sm:pl-6 md:pl-8 lg:pl-6 w-full max-w-1/2 items-start justify-center py-4 sm:py-6 gap-3 sm:gap-4 md:gap-5">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-white">
            <h2>{getPageText("invite")}</h2>
            <h2>{getPageText("friends")}</h2>
          </div>

          <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-tight text-white">
            <h2>{getPageText("win_prizes")}</h2>
          </div>
        </div>

        <div className="flex justify-start items-center">
          <button
            className="px-3 sm:px-4 md:px-5 hover:bg-transparent hover:border hover:border-white hover:text-white font-bold text-xs sm:text-sm md:text-base text-center leading-tight text-white py-2 sm:py-2.5 md:py-3 bg-[#266950] rounded-full transition-all duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isHovered}
          >
            {isHovered ? getPageText("coming_soon") : getPageText("get_link")}
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 flex justify-right items-end">
        <img
          src="/userDashboard/parrot-mascot.png"
          alt="A parrot on a tree branch"
          className="w-20 sm:w-24 md:w-48 lg:w-40 xl:w-40 h-auto max-h-full object-fill"
        />
      </div>
    </section>
  );
};

const Advert = () => {
  return (
    <div className="w-full" style={{ fontFamily: "Lexend" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <ProverbsComponent />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <ConsonantComponent />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <InviteFriendsComponent />
        </div>
      </div>
    </div>
  );
};

export default Advert;
