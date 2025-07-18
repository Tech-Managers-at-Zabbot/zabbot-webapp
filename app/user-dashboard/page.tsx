/* eslint-disable @next/next/no-img-element */
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
  const handleClosePremiumTag = () => setGoPremium(false);

  const [greeting, setGreeting] = useState("");

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

  const [goPremium, setGoPremium] = useState(true);

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
      <div
        className="min-h-screen py-0 my-0 pt-6 relative pb-50 bg-[#dff9fb] px-[5%] overflow-x-hidden"
        style={{ fontFamily: "Lexend" }}
      >
        <div className="max-w-screen-2xl mx-auto">
        <header className="relative">
          <div className="absolute min-h-20 inset-0 bg-[url('/userDashboard/clouds.svg')] bg-cover bg-center"></div>
          <div className="flex relative z-10 mt-10 justify-between">
            <div className="flex-shrink-0">
              <div className="relative w-[156px] h-[46.91px]">
                <Image
                  src="/general/zabbot-logo-blue.svg"
                  alt="Zabbot blue Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
            <div className="absolute top-[60] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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

            {/* Right - Text and Menu */}
            <div className="flex relative gap-20 flex-shrink-0">
              <div className="flex flex-col gap-[8px] text-right">
                <span className="font-bold text-[35.53px] leading-[100%] text-[#202124]">
                  {greeting} Iniobong
                </span>
                <span className="text-[#333333] font-[400] text-[13px] leading-[145%]">
                  Learn Yorùbá. Speak Proudly. Belong Deeply.
                </span>
              </div>
              <div>
                <SettingsBreadcrumb />
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6">
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

        <section className="grid mt-6 transition-all duration-300 ease-in-out grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      {/* <section className="">
        <UserDashboardFooter />
      </section> */}
    </div>
  );
};

export default Dashboard;
