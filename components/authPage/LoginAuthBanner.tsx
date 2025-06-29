import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePageLanguage } from "@/contexts/LanguageContext";
import { CustomSpinner } from "../CustomSpinner";

const LoginAuthBanner = () => {
  const { getPageText, isPageLoading: isLanguageLoading } =
    usePageLanguage("login");

  // bg-[url('/auth-pages/auth-page-left-background.png')]
  return (
    <div className=" bg-[#012657] text-[white] border-0 bg-cover bg-center pl-16 pr-10 pt-16 max-w-full h-full flex justify-between flex-col">
      {isLanguageLoading ? (
        <div className="flex justify-center items-center min-h-[100%]">
          <CustomSpinner spinnerColor="white" />
        </div>
      ) : (
        <>
          <section className=" animate__animated animate__fadeIn animate__delay-1s">
            <Link href="/">
              <div className="flex items-center">
                <div className="relative h-12 w-32 lg:h-[77px] lg:w-[273px]">
                  <Image
                    src={"/general/zabbot-logo-white.svg"}
                    alt="Zabbot Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>
          </section>

          <section className="text-[40px]" style={{ fontFamily: "Lexend" }}>
            <h1
              className={
                "leading-[50px] font-semibold animate__animated animate__fadeInUp"
              }
            >
              <span className="block ">
                {/* Welcome! */}
                {getPageText("welcome!")}
              </span>
              <span className="block">
                {/* Keep Living Yorùbá. */}
                {getPageText("keep_living_yoruba")}
                </span>
            </h1>
            <p className="leading-[70px] font-[300] animate__animated animate__fadeInUp animate__delay-1s">
              {getPageText("login_to_learn")}
            </p>
          </section>

          <section className="relative bottom-0 flex items-center justify-center animate__animated animate__fadeInUp animate__delay-1s">
            <div className="relative flex items-center justify-center">
              <Image
                src="/general/para-single-mascot.svg"
                alt="Zabbot Grand Ma Mascot Owl"
                // fill
                width={323}
                height={600}
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default LoginAuthBanner;
