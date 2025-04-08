import React from "react";
import FAQDropdown from "./FAQDropdown";
import Image from "next/image";

const QuestionsSection = () => {
  return (
    <div className="bg-white flex py-12 xl:py-20 flex-col gap-8 xl:gap-[50px] px-6 sm:px-8 md:px-16 lg:px-[112px]">
      <header className="text-3xl lg:text-4xl xl:text-[48px] text-center font-[500] text-[#0B0B0B] leading-tight xl:leading-[100%]">
        <div className="inline-flex flex-wrap justify-center gap-x-1">
          We&apos;ve got you <span className="text-[#F15B29] whitespace-nowrap">Covered</span>
        </div>
      </header>
      
      <main className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8 xl:gap-12">
        {/* FAQ Section 1 */}
        <section className="w-full lg:w-[48%] flex flex-col gap-4 xl:gap-[30px]">
          <FAQDropdown
            placeholder="How does ZABBOT work?"
            options={[
              "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
            ]}
          />
          <FAQDropdown
            placeholder="What languages can I learn?"
            options={[
              "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
            ]}
          />
          <FAQDropdown
            placeholder="Is there a mobile app?"
            options={[
              "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
            ]}
          />
        </section>

        {/* FAQ Section 2 */}
        <section className="w-full lg:w-[48%] flex flex-col gap-4 xl:gap-[30px]">
          <FAQDropdown
            placeholder="When will the AI-powered features be available?"
            options={[
              "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
            ]}
          />
          <FAQDropdown
            placeholder="How do I track my progress?"
            options={[
              "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
            ]}
          />
          <FAQDropdown
            placeholder="Can I practice with other learners?"
            options={[
              "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
            ]}
          />
        </section>
      </main>

      <footer>
        <div className="flex items-center justify-center lg:justify-start">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[48.85px] lg:w-[172px]">
            <Image
              src="/general/zabbot-logo-black.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuestionsSection;