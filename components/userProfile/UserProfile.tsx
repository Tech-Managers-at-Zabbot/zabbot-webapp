import React from "react";
import Image from "next/image";
import { PiCalendarBlank } from "react-icons/pi";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const UserProfileDetailsComponent = () => {
  return (
    <div
      className="p-6 text-[#F9FAFB] bg-[#0089C8] rounded-2xl"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex items-center gap-6">
        <section>
          <div className="relative w-[96px] h-[96px] aspect-[3/4] rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <Image
              src={"/creators/mr-iniobong.svg"}
              alt={""}
              fill
              className="object-cover"
            />
          </div>
        </section>
        <section>
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-[24px] font-[600] leading-[120%]">
              Iniobong Ekpenyong
            </h1>
            <p className="font-[400] leading-[150%] text-[20px]">
              iniobongekpenyong@gmail.com
            </p>
            <div className="flex leading-[142.857%] items-center font-[400] text-[18px] gap-6">
              <div className="flex items-center gap-2">
                <div>
                  <PiCalendarBlank size={20} />
                </div>
                <div>Joined March 2024</div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <HiMiniArrowTrendingUp size={20} />
                </div>
                <div>Level 5</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfileDetailsComponent;
