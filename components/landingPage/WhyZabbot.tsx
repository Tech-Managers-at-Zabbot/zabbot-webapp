import React from "react";
import Image from "next/image";

const WhyZabbotComponent = () => {
  return (
    <div className="p-0 relative bg-white">
      <main className="text-[#000000] w-full flex flex-col lg:flex-row justify-between px-4 sm:px-8 md:px-16 lg:px-[100px] gap-8 lg:gap-0">
        {/* Text Content Section */}
        <section className="flex flex-col gap-6 sm:gap-8 lg:gap-[31px] w-full lg:w-[55%] pt-12 md:pt-16 lg:pt-[100px]">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#000000] font-[500] leading-[100%]">
            Why Zabbot Stands Out <br className="hidden sm:block" />
            from the rest
          </div>

          <div className="gap-4 sm:gap-[16px] flex flex-col">
            <div className="font-[500] text-2xl sm:text-[28px] leading-[112%]">
              Tailored Learning Experience
            </div>
            <div className="font-[400] text-base sm:text-lg leading-[145%]">
              <span className="font-[700] text-[#333333]">ZABBOT</span>{" "}
              customizes lessons to match your goals and pace, ensuring you stay
              engaged and make steady progress
            </div>
          </div>

          <div className="gap-4 sm:gap-[16px] flex flex-col">
            <div className="font-[500] text-2xl sm:text-[28px] leading-[112%]">
              Immerse Yourself in Culture
            </div>
            <div className="font-[400] text-base sm:text-lg leading-[145%]">
              Learn the language in the context of its rich culture, traditions,
              and real-world applications for a deeper connection
            </div>
          </div>

          <div className="gap-4 sm:gap-[16px] flex flex-col">
            <div className="font-[500] text-2xl sm:text-[28px] leading-[112%]">
              Interactive & Immersive Practice
            </div>
            <div className="font-[400] text-base sm:text-lg leading-[145%]">
              From real-world scenarios to conversational practice, we immerse
              you in the language for quicker, more effective learning
            </div>
          </div>
        </section>

        {/* Image Section - Will stack below on mobile */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end items-start pt-8 lg:pt-0">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/landingPage/global.svg"
              alt="Zabbot global illustration"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WhyZabbotComponent;
