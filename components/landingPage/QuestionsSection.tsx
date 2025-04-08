import React from "react";
import FAQDropdown from "./FAQDropdown";
import Image from "next/image";

const QuestionsSection = () => {
  return (
    <div className="bg-white flex py-20 flex-col gap-[50px] px-6 sm:px-8 md:px-16 lg:px-[112px]">
      <header className="text-[48px]  flex text-center items-center justify-center font-[500] text-[#0B0B0B] leading-[100%]">
        We’ve got you {""} <span className="text-[#F15B29]"> Covered</span>
      </header>
      <main className="flex justify-between">
        <section className="w-[50%] flex flex-col gap-[30px]">
          <div>
            <FAQDropdown
              placeholder="How does ZABBOT work?"
              options={[
                "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
              ]}
            />
          </div>
          <div>
            <FAQDropdown
              placeholder="What languages can I learn?"
              options={[
                "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
              ]}
            />
          </div>
          <div>
            <FAQDropdown
              placeholder="Is there a mobile app?"
              options={[
                "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
              ]}
            />
          </div>
        </section>
        <section className="w-[50%] flex flex-col gap-[30px]">
          <div>
            <FAQDropdown
              placeholder="When will the AI-powered features be available?"
              options={[
                "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
              ]}
            />
          </div>
          <div>
            <FAQDropdown
              placeholder="How do I track my progress?"
              options={[
                "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
              ]}
            />
          </div>
          <div>
            <FAQDropdown
              placeholder="Can I practice with other learners?"
              options={[
                "Our AI-powered features are set to launch in 2026. Once available, they will offer personalized, adaptive learning experiences that will make mastering a language faster and more intuitive. Stay tuned for exciting updates as we approach the release!",
              ]}
            />
          </div>
        </section>
      </main>

      <footer>
         <div className="flex items-center">
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
