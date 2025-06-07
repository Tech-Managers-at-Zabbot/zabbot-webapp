import React from "react";
import Image from "next/image";
import Link from "next/link";
import { appColors } from "@/constants/colors";

const AuthBanner = () => {
  return (
    <div className="bg-[url('/auth-pages/auth-page-left-background.png')] border-0 bg-cover bg-center px-16 pt-16 max-w-full h-full flex justify-between flex-col">
      <section className=" animate__animated animate__fadeIn animate__delay-1s">
        <Link href="/">
          <div className="flex items-center">
            <div className="relative h-12 w-32 lg:h-[77px] lg:w-[273px]">
              <Image
                src={"/general/zabbot-logo-blue.svg"}
                alt="Èdèdún Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Link>
      </section>

      <section
        className="text-[50px]"
        style={{ color: appColors.darkRoyalBlueForBtn, fontFamily: "Lexend" }}
      >
        <h1
          className={
            "leading-[70px] font-semibold animate__animated animate__fadeInUp"
          }
        >
          <span className="block ">Celebrate Your Heritage.</span>
          <span className="block">Start with Yorùbá.</span>
        </h1>
        <p className="leading-[70px] font-[300] animate__animated animate__fadeInUp animate__delay-1s">
          Learn. Speak. Belong.
        </p>
      </section>

      <section className="relative bottom-0 flex items-center justify-center animate__animated animate__fadeInUp animate__delay-1s">
        <div className="relative flex items-center justify-center">
          <Image
            src="/general/grand-ma-owl.png"
            alt="Zabbot Grand Ma Mascot Owl"
            // fill
            width={650}
            height={600}
            className="object-contain rounded-xl"
            priority
          />
        </div>
      </section>
    </div>
  );
};

export default AuthBanner;
