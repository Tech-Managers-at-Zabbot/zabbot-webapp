"use client";
import AuthBanner from "@/components/authPage/AuthBanner";
import RegisterAuth from "@/components/authPage/RegisterAuth";
import Head from "next/head";
import { useState } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

const SignupPage = () => {
  const [isLanguageToggle, setIsLanguageToggle] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const handleToggle = () => setIsLanguageToggle(!isLanguageToggle);

  return (
    <div>
      <Head>
        <title>Zabbot - Signup Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex gap-0 min-h-screen md:flex-row relative">
        <section className="hidden border-0 md:block md:w-1/2 lg:w-1/2">
          <AuthBanner />
        </section>
        <section className="bg-white border-0 flex w-full md:w-1/2 lg:w-1/2 flex-col">
          <div className="mt-10 flex justify-end mx-20">
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
                    Switch to Yorùbá
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:px-6 md:px-8 py-10 flex justify-center items-center">
            <RegisterAuth />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
