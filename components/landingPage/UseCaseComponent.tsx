import React from "react";
import Image from "next/image";

const UseCaseComponent = () => {
  return (
    <div>
      <main className="flex gap-[150px] py-24 px-6 sm:px-8 md:px-16 lg:px-[112px]">
        <section className="flex flex-col gap-[24px]">
          <div className="bg-[#333333] text-white font-[500] max-w-[130px] flex text-center justify-center items-center p-[10px] rounded-[16px] text-[15px] leading-[100%]">
            Use Case
          </div>
          <div>
            <h1 className="text-[48px] font-[500] leading-[100%] text-black">
              Gamified Learning
              <br />
              Experience
            </h1>
          </div>
          <div className="text-[#333333] font-[400] text-[16px] leading-[189%]">
            Turn language learning into a fun adventure with interactive <br />
            challenges, rewards, and progress tracking—learn while <br />
            you play and stay motivated every step of the way!
          </div>
        </section>
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
      </main>
    </div>
  );
};

export default UseCaseComponent;
