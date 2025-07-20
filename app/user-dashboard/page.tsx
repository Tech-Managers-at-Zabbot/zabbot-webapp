/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import GoPremiumCard from "@/components/dashboard/GoPremiumCard";
import { metricsData } from "@/constants/data-to-populate/dashboardData";
import { DashboardMetricCard } from "@/components/dashboard/DashboardMetricCard";
// import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
import ProgressSection from "@/components/dashboard/ProgressSection";
import PopularCourses from "@/components/dashboard/PopularCourses";
import Advert from "@/components/dashboard/Advert";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";

const Dashboard = () => {
  const [goPremium, setGoPremium] = useState(true);

  const handleClosePremiumTag = () => setGoPremium(false);

  const [greeting, setGreeting] = useState("");

  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");

  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");

  const [isDark, setIsDark] = useState(false);

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
      setBackgroundColor("#012657");
      setCloudsUrl("/userDashboard/dark-clouds.svg");
      setIsDark(true);
      setLogoUrl("/general/zabbot-logo-white.svg");
    }
  }, []);

  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    const isClient = typeof window !== "undefined";
    if (isClient) {
      const jsonUserDetails = localStorage.getItem("userProfile");
      if (jsonUserDetails) {
        try {
          setUserDetails(JSON.parse(jsonUserDetails));
        } catch (error) {
          console.error("Failed to parse tenant details", error);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* #06254c, #dff9fb */}
      <div
        className="min-h-screen py-0 my-0 pt-6 relative pb-50 px-[5%] overflow-x-hidden"
        style={{ fontFamily: "Lexend", background: backgroundColor }}
      >
         <div
              className="absolute bg-cover inset-0 top-0 h-40 bg-center"
              style={{ backgroundImage: `url(${cloudsUrl})` }}
            ></div>
        <div className="max-w-screen-2xl mx-auto">
          <section className="relative flex justify-between items-center mb-6">
             {/* <div
              className="absolute min-h-20 inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${cloudsUrl})` }}
            ></div> */}
                          {/* Logo */}
              <div className="flex-shrink-0 order-1">
                <div className="relative w-[100px] h-[30px] sm:w-[120px] sm:h-[36px] md:w-[156px] md:h-[46.91px]">
                  <Image
                    src={logoUrl}
                    alt="Zabbot Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

                            {/* Right section */}
              <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-shrink-0 items-start order-3">
                {/* Text section - responsive */}
                <div className="flex flex-col gap-[4px] sm:gap-[6px] md:gap-[8px] text-right">
                  <span
                    className="font-bold text-[18px] sm:text-[24px] md:text-[28px] lg:text-[35.53px] leading-[100%] break-words"
                    style={{ color: isDark ? "#D0F7F6" : "#202124" }}
                  >
                    {greeting} {userDetails?.firstName || "User"}
                  </span>
                  <span
                    className="font-[400] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-[145%] max-w-[150px] sm:max-w-[200px] md:max-w-none"
                    style={{ color: isDark ? "#FFFAEB" : "#333333" }}
                  >
                    Learn Yorùbá. Speak Proudly. Belong Deeply.
                  </span>
                </div>
                {/* Menu */}
                <div className="hidden lg:flex mt-1">
                  <SettingsBreadcrumb isDark={isDark} />
                </div>
              </div>


          </section>
          <section className="relative">
            {/* <div
              className="absolute min-h-20 inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${cloudsUrl})` }}
            ></div> */}
            <div className="flex relative z-10 mt-4 sm:mt-6 md:mt-10 justify-between items-start">

              {/* Parrot - Hidden on small screens, shown on medium+ */}
              <div className="hidden lg:block absolute top-[60px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 order-2">
                <div className="w-[113px] h-[137px]">
                  <Image
                    src="/userDashboard/parrot-head.svg"
                    alt="Centralized rounded parrot mascot"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-20">
            <AchievementsCard />
          </section>

          <section
            className={`transition-all duration-300 ease-in-out ${
              goPremium
                ? "opacity-100 max-h-96 mb-6"
                : "opacity-0 max-h-0 mb-0 overflow-hidden"
            }`}
          >
            <GoPremiumCard onClose={handleClosePremiumTag} />
          </section>
          {/* grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 */}

          <section className="mt-6 flex flex-wrap lg:flex-nowrap w-full transition-all duration-300 ease-in-out gap-6">
            {metricsData.map((metric, index) => (
              <DashboardMetricCard key={index} data={metric} />
            ))}
          </section>

          <section className="mt-6">
            <ProgressSection />
          </section>

          <section className="mt-6">
            <PopularCourses />
          </section>

          <section className="mt-6">
            <Advert />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
