import React from "react";
import Image from "next/image";

const UseCaseComponent = () => {
  return (
    <div>
      <main className="flex flex-col xl:flex-row gap-8 xl:gap-[150px] py-12 xl:py-24 px-6 sm:px-8 md:px-16 lg:px-[112px]">
        {/* Text content section - comes first on stacked views */}
        <section className="flex flex-col gap-4 xl:gap-[24px]">
          <div className="bg-[#333333] text-white font-[500] w-fit max-w-[130px] flex text-center justify-center items-center p-2 xl:p-[10px] rounded-xl xl:rounded-[16px] text-sm xl:text-[15px] leading-[100%]">
            Use Case
          </div>
          <div>
            <h1 className="text-3xl xl:text-[48px] font-[500] leading-tight xl:leading-[100%] text-black">
              Gamified Learning
              <br className="hidden xl:block" />
              Experience
            </h1>
          </div>
          <div className="text-[#333333] font-[400] text-sm xl:text-[16px] leading-relaxed xl:leading-[189%]">
            Turn language learning into a fun adventure with interactive
            challenges, rewards, and progress tracking—learn while you play and
            stay motivated every step of the way!
          </div>
        </section>

        {/* Image section - comes second on stacked views */}
        <section className="mt-6 xl:mt-0">
          <div className="relative w-full max-w-[600px] xl:max-w-none mx-auto">
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
      </main>
    </div>
  );
};

export default UseCaseComponent;
