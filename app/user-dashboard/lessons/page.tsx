/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import UserLessons from "@/components/dashboard/UserLessons";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import AllCourses from "@/components/dashboard/Lessons/AllCourses";
import { useTheme } from "@/contexts/ThemeProvider";

const Lessons = () => {
  const [greeting, setGreeting] = useState("Kàbọ̀");

  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");

  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");

  const { theme } = useTheme();

  const [logoUrl, setLogoUrl] = useState("/general/zabbot-logo-blue.svg");

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 6 && hours < 12) {
      // Morning: 6 AM to 12 PM
      setGreeting("Káàrọ̀");
    } else if (hours >= 12 && hours < 18) {
      // Afternoon: 12 PM to 6 PM
      setGreeting("Káàsán");
    } else {
      // Night: 6 PM to 6 AM
      setGreeting("Káalẹ́");
    }
  }, []);

  useEffect(() => {
    setBackgroundColor(theme === "dark" ? "#012657" : "#dff9fb");
    setCloudsUrl(
      theme === "dark"
        ? "/userDashboard/dark-clouds.svg"
        : "/userDashboard/light-clouds.svg"
    );
    setLogoUrl(
      theme === "dark"
        ? "/general/zabbot-logo-white.svg"
        : "/general/zabbot-logo-blue.svg"
    );
  }, [theme]);

  return (
    <div className="">
      <Head>
        <title>Lessons Page</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className="min-h-screen relative pb-50 px-[5%] overflow-x-hidden"
        style={{
          fontFamily: "Lexend",
          color: "#162B6E",
          background: backgroundColor,
        }}
      >
        <div
          className="absolute bg-cover inset-0 top-0 h-40 bg-center"
          style={{ backgroundImage: `url(${cloudsUrl})` }}
        ></div>
        <div className="max-w-screen-2xl">
          <div className="w-full">
            <div className="flex absolute top-0 right-[5%] items-center z-10 gap-20 flex-shrink-0">
              <div className="w-[70px] mt-1 flex">
                <div className="h-[80px]">
                  <Image
                    src="/userDashboard/parrot-head.svg"
                    alt="Centralized rounded parrot mascot"
                    width={300}
                    height={80}
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="hidden lg:flex">
                <SettingsBreadcrumb isDark={theme === 'dark'} />
              </div>
            </div>
          </div>
          <header className="relative">
            <div className="flex relative z-10 mt-6 justify-between text-[24px] font-semibold leading-[100%] text-[#162B6E]">
              <div className="flex-shrink-0">
                {/* <div className="relative w-[156px] h-[46.91px]">
                  <Image
                    src="/general/zabbot-logo-blue.svg"
                    alt="Zabbot blue Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div> */}
                <span
                  className="text-sm md:text-sm lg:text-2xl"
                  style={{ color: theme === 'dark' ? "#D0F7F6" : "#202124" }}
                >
                  Welcome! Start Learning{" "}
                </span>
              </div>
            </div>
          </header>

          <section className="mt-36">
            <UserLessons />
          </section>

          <section className="mt-6">
            <AllCourses />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
