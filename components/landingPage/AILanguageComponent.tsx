import React from "react";
import Image from "next/image";

const AILanguageComponent = () => {
  return (
    <div>
      <main className="flex gap-[100px] py-24 px-6 sm:px-8 md:px-16 lg:px-[112px]">
        <section>
          <div className="relative">
            <Image
              src="/landingPage/phone-world-map.svg"
              alt="two phones on a world map with flags"
              width={759.57}
              height={496.64}
              className="object-contain"
              priority
            />
          </div>
        </section>
        <section className="flex flex-col gap-[24px]">
          <div className="bg-[#333333] text-white font-[500] max-w-[277px] flex text-center justify-center items-center p-[10px] rounded-[16px] text-[15px] leading-[100%]">
            AI-Powered Language Mastery:
          </div>
          <div>
            <h1 className="text-[48px] font-[500] leading-[100%] text-[#333333]">
              Unlock AI-Powered <br />
              <span className="text-[#D95225]">Language Mastery!</span>
            </h1>
          </div>
          <div className="text-[#333333] font-[400] text-[16px] leading-[189%]">
            Coming in 2026, our AI-driven features will revolutionize <br />
            your language learning journey—personalized, adaptive, <br />
            and powered by cutting-edge technology to help you <br />
            master any language faster than ever before!
          </div>
        </section>
      </main>
    </div>
  );
};

export default AILanguageComponent;
