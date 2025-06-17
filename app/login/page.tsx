"use client";
import LoginAuth from "@/components/authPage/LoginAuth";
import Head from "next/head";
import LoginAuthBanner from "@/components/authPage/LoginAuthBanner";
import { useState } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [isLanguageToggle, setIsLanguageToggle] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const handleToggle = () => setIsLanguageToggle(!isLanguageToggle);
  return (
    <div>
      <Head>
        <title>Zabbot - Login Page</title>
        <meta
          name="description"
          content="Login to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col min-h-screen md:flex-row relative">
        {/* Top Right: Logo (small screens only) + Language Toggle (all screens) */}
       <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-50 w-full sm:w-auto justify-between sm:justify-end">
        {/* Logo: show only on small screens */}
        <div className="block md:hidden">
          <Link href="/">
            <div className="relative h-8 w-24 sm:h-10 sm:w-28">
              <Image
                src="/general/zabbot-single-logo-blue.png"
                alt="Zabbot Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Language Toggle: visible on all screens */}
        <div
          className="hover:cursor-pointer mr-4 relative p-2 transition-all duration-200"
          onClick={handleToggle}
          onMouseEnter={() => setIsToggleHovered(true)}
          onMouseLeave={() => setIsToggleHovered(false)}
        >
          {isLanguageToggle ? (
            <BsToggleOn fill="#162B6E" size={28} />
          ) : (
            <BsToggleOff fill="#162B6E" size={28} />
          )}
          {isToggleHovered && (
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#101928] text-white p-2 rounded-md font-[400] text-xs leading-[145%] whitespace-nowrap z-50 shadow-lg"
              style={{ fontFamily: "Inter" }}
            >
              {isLanguageToggle ? "Switch to English" : "Switch to Yorùbá"}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#101928] rotate-45" />
            </div>
          )}
        </div>
      </div>

        <section className="hidden md:block md:w-1/2 lg:w-1/2">
          <LoginAuthBanner />
        </section>
        <section className="bg-white w-full md:w-1/2 lg:w-1/2 flex flex-col min-h-screen">
          {/* <div className="mt-10 flex justify-end mx-20">
            <div className="flex fixed flex-col justify-center items-center">
              <div
                className="hover:cursor-pointer relative"
                onClick={handleToggle}
                onMouseEnter={() => setIsToggleHovered(true)}
                onMouseLeave={() => setIsToggleHovered(false)}
              >
                {isLanguageToggle ? (
                  <BsToggleOn fill="#162B6E" size={35} />
                ) : (
                  <BsToggleOff fill="#162B6E" size={35} />
                )}
                {isToggleHovered && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 bg-[#101928] p-[6.47px] rounded-[3.24px] font-[400] text-[10.66px] leading-[145%] whitespace-nowrap z-50"
                    style={{ fontFamily: "Inter" }}
                  >
                    {isLanguageToggle
                      ? "Switch to English"
                      : "Switch to Yorùbá"}
                  </div>
                )}
              </div>
            </div>
          </div> */}

          <div className="w-full mt-40 px-4 sm:px-6 md:px-8 py-10 flex justify-center items-center">
            <LoginAuth />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
