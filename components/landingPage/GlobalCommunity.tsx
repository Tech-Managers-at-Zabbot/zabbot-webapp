import React from "react";
import Image from "next/image";

const GlobalCommunityComponent = () => {
  return (
    <div className="text-black flex p-0">
      <main className="flex w-full p-0 justify-between">
        <section className="flex">
          <div className="relative">
            <Image
              src="/landingPage/community.svg"
              alt="two phones on a world map with flags"
              width={700}
                height={533.87}
              className="object-contain"
              priority
            />
          </div>
        </section>
        <section className="flex justify-end items-end p-0">
        <div className="relative">
            <Image
              src="/landingPage/global-orange.svg"
              alt="two phones on a world map with flags"
              width={850}
              height={600}
              className="object-contain"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default GlobalCommunityComponent;
