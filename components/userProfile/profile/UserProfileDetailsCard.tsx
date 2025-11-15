import React from "react";
import Image from "next/image";
import { PiCalendarBlank } from "react-icons/pi";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const UserProfileDetailsComponent = () => {
  return (
    <div
      className="p-4 sm:p-6 text-[#F9FAFB] bg-[#0089C8] rounded-2xl"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        {/* Avatar */}
        <section>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <Image
              src="/creators/mr-iniobong.svg"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* User Info */}
        <section className="text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4">
            
            <h1 className="text-xl sm:text-2xl font-semibold leading-tight">
              Iniobong Ekpenyong
            </h1>

            <p className="text-base sm:text-lg font-normal leading-snug">
              iniobongekpenyong@gmail.com
            </p>

            {/* Extra profile info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 text-base sm:text-lg font-normal leading-relaxed">
              
              <div className="flex items-center gap-2">
                <PiCalendarBlank size={20} />
                <span>Joined March 2024</span>
              </div>

              <div className="flex items-center gap-2">
                <HiMiniArrowTrendingUp size={20} />
                <span>Level 5</span>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default UserProfileDetailsComponent;
