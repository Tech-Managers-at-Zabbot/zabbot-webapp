import React from "react";
import Image from "next/image";
import Link from "next/link";

const WaitingAuthBanner = () => {
  return (
    <div className="hidden md:flex mx-auto bg-[#333333] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full h-full flex-col">
      <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-[78px] animate__animated animate__fadeIn animate__delay-1s">
        <Link href="/">
          <div className="flex items-center">
            <div className="relative h-10 w-28 sm:h-12 sm:w-32 md:h-14 md:w-36 lg:h-[77px] lg:w-[273px]">
              <Image
                src={"/general/zabbot-logo-white.svg"}
                alt="Èdèdún Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Link>
      </section>

      <section className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[562px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[50px] leading-snug md:leading-normal lg:leading-[1.2] font-semibold mb-3 sm:mb-4 md:mb-5 lg:mb-6 animate__animated animate__fadeInUp">
          <span className="block">Zabbot AI Powered</span>
          <span className="block">Language Platform</span>
        </h1>
        <p className="text-sm sm:text-base md:text-[17px] lg:text-[19px] xl:text-[20px] font-[400] leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
          <br />
          Join us and contribute to the Zabbot AI Powered Yorùbá Platform (APYP)
        </p>
      </section>

      <section className="relative flex mt-4 sm:mt-6 md:mt-8 animate__animated animate__fadeInUp animate__delay-1s">
        <div className="relative flex justify-center h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[400px] w-full max-w-[500px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
          <Image
            src="/general/flying-owl.svg"
            alt="Authentication Page Image"
            fill
            className="object-contain rounded-xl"
            priority
          />
        </div>
      </section>
    </div>
  );
};

export default WaitingAuthBanner;
