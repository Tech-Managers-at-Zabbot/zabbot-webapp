"use client";
import AllCourses from "@/components/dashboard/Lessons/AllCourses";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeProvider";

const CoursePage = () => {
  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");
  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");
  const { theme } = useTheme();
  //   const [logoUrl, setLogoUrl] = useState("/general/zabbot-logo-blue.svg");

  // useEffect(() => {
  //   const currentTime = new Date();
  //   const hours = currentTime.getHours();

  //   if (hours >= 6 && hours < 12) {
  //     // Morning: 6 AM to 12 PM
  //     //   setGreeting("Káàrọ̀");
  //   } else if (hours >= 12 && hours < 18) {
  //     // Afternoon: 12 PM to 6 PM
  //     //   setGreeting("Káàsán");
  //   } else {
  //     // Night: 6 PM to 6 AM
  //     //   setGreeting("Káalẹ́");
  //     // setBackgroundColor("#012657");
  //     // setCloudsUrl("/userDashboard/dark-clouds.svg");
  //     //   setLogoUrl("/general/zabbot-logo-white.svg");
  //   }
  // }, []);

  useEffect(() => {
    setBackgroundColor(theme === "dark" ? "#012657" : "#dff9fb");
    setCloudsUrl(
      theme === "dark"
        ? "/userDashboard/dark-clouds.svg"
        : "/userDashboard/light-clouds.svg"
    );
  }, [theme]);

  return (
    <div>
      <Head>
        <title>Course Page</title>
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
            {/* <div className="mt-6">
             <span
                  className="text-sm md:text-sm lg:text-2xl"
                  style={{ color: isDark ? "#D0F7F6" : "#202124" }}
                >
                  Welcome! Start Learning{" "}
                </span>
            </div> */}
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
                <SettingsBreadcrumb isDark={theme === "dark"} />
              </div>
            </div>
          </div>
          <section className="mt-50 flex">
            <AllCourses />
          </section>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
