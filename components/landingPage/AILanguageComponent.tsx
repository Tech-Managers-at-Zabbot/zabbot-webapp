import React from "react";
import Image from "next/image";

const AILanguageComponent = () => {
  return (
    <div>
      <main className="flex flex-col-reverse xl:flex-row gap-8 xl:gap-[100px] py-12 xl:py-24 px-6 sm:px-8 md:px-16 xl:px-[112px]">
        {/* Image section - shows second on mobile (due to flex-col-reverse) */}
        <section className="w-full xl:w-1/2 flex justify-center mt-8 xl:mt-0">
          <div className="relative w-full max-w-[600px] xl:max-w-[759.57px]">
            <Image
              src="/landingPage/phone-world-map.svg"
              alt="two phones on a world map with flags"
              width={759.57}
              height={496.64}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* Text content section - shows first on mobile */}
        <section className="w-full xl:w-1/2 flex flex-col gap-4 xl:gap-[24px]">
          <div className="bg-[#333333] text-white font-[500] w-full xl:max-w-[277px] flex text-center justify-center items-center p-2 xl:p-[10px] rounded-xl xl:rounded-[16px] text-sm xl:text-[15px] leading-[100%]">
            AI-Powered Language Mastery:
          </div>

          <div>
            <h1 className="text-3xl xl:text-[48px] font-[500] leading-tight xl:leading-[100%] text-[#333333]">
              Unlock AI-Powered <br className="hidden xl:block" />
              <span className="text-[#D95225]">Language Mastery!</span>
            </h1>
          </div>

          <div className="text-[#333333] font-[400] text-sm xl:text-[16px] leading-relaxed xl:leading-[189%]">
            Coming in 2026, our AI-driven features will revolutionize your
            language learning journey—personalized, adaptive, and powered by
            cutting-edge technology to help you master any language faster than
            ever before!
          </div>
        </section>
      </main>
    </div>
  );
};

export default AILanguageComponent;
