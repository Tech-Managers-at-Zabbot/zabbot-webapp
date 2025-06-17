"use client";
import AuthBanner from "@/components/authPage/RegisterBanner";
import RegisterAuth from "@/components/authPage/RegisterAuth";
import Head from "next/head";
import { useState } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const SignupPage = () => {
  const [isLanguageToggle, setIsLanguageToggle] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const handleToggle = () => setIsLanguageToggle(!isLanguageToggle);

  return (
    <div className="">
      <Head>
        <title>Zabbot - Signup Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Fixed Language Toggle - Top Right */}
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

      {/* </div> */}

      <main className="flex gap-0 min-h-screen md:flex-row relative">
        <section className="hidden border-0 md:block md:w-1/2 lg:w-1/2">
          <AuthBanner />
        </section>
        <section className="bg-white border-0 flex w-full md:w-1/2 lg:w-1/2 flex-col">
          {/* Spacer to account for fixed toggle on mobile */}
          <div className="pt-16 sm:pt-20 md:pt-8"></div>
          <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-10 flex justify-center items-center flex-1">
            <RegisterAuth />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
