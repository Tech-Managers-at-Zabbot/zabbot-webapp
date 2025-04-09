import React from "react";
import Image from "next/image";

const GlobalCommunityComponent = () => {
  return (
    <div className="text-black">
      <main className="flex flex-col justify-between md:flex-row w-full p-0">
        {/* Right image (shows first on mobile) */}
        <section className="order-2 md:order-1 flex justify-center md:justify-end w-full md:w-auto">
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
        
        {/* Left image (shows second on mobile) */}
        <section className="order-1 md:order-2 flex justify-center md:justify-end w-full md:w-auto">
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