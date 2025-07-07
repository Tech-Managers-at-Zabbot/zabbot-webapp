import React from "react";
import Image from "next/image";

const Advert = () => {
  return (
    <div className="flex gap-[18.54px] justify-center items-center">
      <div className="flex-shrink-0 flex justify-center items-center rounded-full">
        <div className="relative w-[490px] h-[300px]">
          <Image
            src="/userDashboard/proverbs-card.png"
            alt="Badge"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-shrink-0 flex justify-center items-center rounded-full">
        <div className="relative w-[490px] h-[300px]">
          <Image
            src="/userDashboard/consonant-card.png"
            alt="Badge"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-shrink-0 flex justify-center items-center rounded-full">
        <div className="relative w-[490px] h-[300px]">
          <Image
            src="/userDashboard/invite-friends.png"
            alt="Badge"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Advert;
