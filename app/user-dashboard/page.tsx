"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import GoPremiumCard from "@/components/dashboard/GoPremiumCard";
// import { metricsData } from "@/constants/data-to-populate/dashboardData";
import // DashboardMetricCard,
"@/components/dashboard/DashboardMetricCard";
import { BsPeople } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
// import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
import ProgressSection from "@/components/dashboard/ProgressSection";
import PopularCourses from "@/components/dashboard/PopularCourses";
import Advert from "@/components/dashboard/Advert";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import { DashboardMetricCard2 } from "@/components/dashboard/DashboardMetricCard2";
import { useGetUserCount } from "@/services/generalApi/users/query";
import { HiOutlineTrophy } from "react-icons/hi2";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeProvider";
import PremiumFeaturesComponents from "@/components/dashboard/PremiumFeatures";

const Dashboard = () => {
  const [goPremium, setGoPremium] = useState(true);

  const handleClosePremiumTag = () => setGoPremium(false);

  const { data: userCountData, isLoading: userCountLoading } =
    useGetUserCount();

  const { goalsCount, userGoalsLoading } = useUser();

  const userCount = userCountData?.data || 0;

  const [greeting, setGreeting] = useState("");

  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");

  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");

  const { theme } = useTheme();

  const [logoUrl, setLogoUrl] = useState("/general/zabbot-logo-blue.svg");

  const dashboardMetricData = [
    {
      title: "Your Completed Daily Goals",
      value: `${goalsCount} ${goalsCount === 1 ? "goal" : "goals"}`,
      icon: (
        <div className="transform -scale-x-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#162B6E]">
          <HiOutlineTrophy />
        </div>
      ),
      loading: userGoalsLoading || userCountLoading,
      isEmpty: !goalsCount,
    },
    {
      title: "Your Completed Courses",
      value: "0 courses",
      icon: (
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#162B6E]">
          <FaGraduationCap />
        </div>
      ),
      loading: userGoalsLoading || userCountLoading,
    },

    {
      title: "Active Learners",
      value: `${userCount} learners`,
      icon: (
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#162B6E]">
          <BsPeople />
        </div>
      ),
      loading: userCountLoading || userGoalsLoading,
      isEmpty: !userCount,
    },
  ];

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

  const { userDetails } = useUser();

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
                  style={{ color: theme === "dark" ? "#D0F7F6" : "#202124" }}
                >
                  <span className="text-[10px] sm:text-[18px] md:text-[20px] lg:text-[28px]">
                    {greeting}
                  </span>{" "}
                  {userDetails?.firstName || "User"}
                </span>
                <span
                  className="font-[400] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-[145%] max-w-[150px] sm:max-w-[200px] md:max-w-none"
                  style={{ color: theme === "dark" ? "#FFFAEB" : "#333333" }}
                >
                  Learn Yorùbá. Speak Proudly. Belong Deeply.
                </span>
              </div>
              {/* Menu */}
              <div className="hidden lg:flex mt-1">
                <SettingsBreadcrumb isDark={theme === "dark"} />
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

          {/* <section className="relative flex lg:hidden"> */}
          <section className="relative flex lg:hidden z-10 mt-4 sm:mt-6 md:mt-10 items-start">
            {/* Parrot - Hidden on large screens, shown on small+ */}
            <div className="absolute top-[30px] right-0 sm:right-0 md:left-0 left-auto">
              <div className="w-[80px] h-[80px]">
                <Image
                  src="/userDashboard/parrot-head.svg"
                  alt="Centralized rounded parrot mascot"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </section>
          {/* </section> */}

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

          {/* <section className="mt-6 flex flex-wrap lg:flex-nowrap w-full transition-all duration-300 ease-in-out gap-6">
            {metricsData.map((metric, index) => (
              <DashboardMetricCard key={index} data={metric} />
            ))}
          </section> */}

          <section className="mt-6 flex flex-wrap lg:flex-nowrap w-full transition-all duration-300 ease-in-out gap-6">
            {dashboardMetricData?.map((metric, index) => (
              <DashboardMetricCard2 key={index} data={metric} />
            ))}
          </section>

          <section className="mt-10">
            <PremiumFeaturesComponents />
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
