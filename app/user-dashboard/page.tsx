"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeProvider";
// import SearchBar from "@/components/general/SearchBar";
// import { IoSearchOutline } from "react-icons/io5";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import { usePageLanguage } from "@/contexts/LanguageContext";
import {
  // DailyGoals,
  WordForTheDay,
} from "@/components/dashboard/UserGoals";
import Leaderboard from "@/components/dashboard/LeaderBoard";
import FlashCard from "@/components/dashboard/FlashCard";
import PopularCourses from "@/components/dashboard/PopularCourses";
import ProgressSection from "@/components/dashboard/ProgressSection";
import Advert from "@/components/dashboard/Advert";
import { DashboardMetricCard2 } from "@/components/dashboard/DashboardMetricCard2";
import { HiOutlineTrophy } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { useGetUserCompletedCourses } from "@/services/generalApi/lessons/mutation";
import { useLoading } from "@/contexts/LoadingProvider";
import { useGetUserCount } from "@/services/generalApi/users/mutation";
// import LatestQuiz from "@/components/dashboard/LatestQuiz";
import PremiumFeaturesComponents from "@/components/dashboard/PremiumFeatures";

const Dashboard = () => {
  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");
  const [logoUrl, setLogoUrl] = useState("/general/zabbot-logo-blue.svg");
  const [greeting, setGreeting] = useState("");
  const { userDetails } = useUser();

  const { getPageText, isPageLoading: isLanguageLoading } =
    usePageLanguage("userDashboard");

  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");

  const { data: userCountData, isLoading: userCountLoading } =
    useGetUserCount();
  const { goalsCount, userGoalsLoading } = useUser();

  const { loading, setLoading } = useLoading();

  function LanguageCheck() {
    if (isLanguageLoading) {
      if (!loading) {
        return setLoading(true);
      }
    }
    return setLoading(false);
  }

  const userCount = userCountData?.data || 0;

  const {
    data: userCompletedCoursesCount,
    isLoading: isUserCompletedCoursesCountLoading,
  } = useGetUserCompletedCourses(userDetails.languageId, true);

  const userCoursesCount = userCompletedCoursesCount?.data || 0;

  const dashboardMetricData = [
    {
      title: getPageText("completed_daily_goals"),
      value: `${goalsCount} ${goalsCount === 1 ? getPageText("goal") : getPageText("goals")
        }`,
      icon: (
        <div className="transform -scale-x-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#162B6E]">
          <HiOutlineTrophy />
        </div>
      ),
      loading:
        userGoalsLoading ||
        userCountLoading ||
        isUserCompletedCoursesCountLoading,
      isEmpty: !goalsCount && goalsCount !== 0,
    },
    {
      title: getPageText("completed_courses"),
      value: `${userCoursesCount} ${userCoursesCount === 1 ? getPageText("step") : getPageText("steps")
        }`,
      icon: (
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#162B6E]">
          <FaGraduationCap />
        </div>
      ),
      loading:
        userGoalsLoading ||
        userCountLoading ||
        isUserCompletedCoursesCountLoading,
      isEmpty: !userCoursesCount && userCoursesCount !== 0,
    },

    {
      title: getPageText("active_learners"),
      value: `${userCount} ${getPageText("learners")}`,
      icon: (
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#162B6E]">
          <BsPeople />
        </div>
      ),
      loading:
        userCountLoading ||
        userGoalsLoading ||
        isUserCompletedCoursesCountLoading,
      isEmpty: !userCount,
    },
  ];

  useEffect(() => {
    LanguageCheck();
  }, [isLanguageLoading]);

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

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 1 && hours < 12) {
      // Morning: 1 AM to 12 PM
      setGreeting("Káàrọ̀");
    } else if (hours >= 12 && hours < 18) {
      // Afternoon: 12 PM to 6 PM
      setGreeting("Káàsán");
    } else {
      // Night: 6 PM to 1 AM
      setGreeting("Káalẹ́");
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

      <div
        style={{ fontFamily: "Lexend", background: backgroundColor }}
        className="min-h-screen"
      >
        <main className="px-[5%]">
          <section className="">
            <div
              className="absolute bg-cover inset-0 top-0 h-40 bg-center"
              style={{ backgroundImage: `url(${cloudsUrl})` }}
            ></div>

            <div
              className="
    relative 
    w-full 
    py-[20px] 
    z-40
    flex 
    flex-col 
    lg:flex-row 
    lg:items-center 
    lg:justify-between 
    gap-4
  "
            >
              {/* ---- ROW 1: Logos + Settings (mobile) ---- */}
              <div className="flex w-full items-center justify-between lg:justify-start lg:gap-6">
                {/* Logos group */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Bird logo */}
                  <div className="relative w-[36px] h-[30px] sm:w-[46px] sm:h-[36px] md:w-[70px] md:h-[76.91px]">
                    <Image
                      src="/userDashboard/bird-logo.png"
                      alt="Centralized rounded parrot mascot"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  {/* Zabbot logo */}
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

                {/* Settings → visible on mobile here, hidden on desktop */}
                <div className="flex lg:hidden">
                  <SettingsBreadcrumb isDark={theme === "dark"} />
                </div>
              </div>

              {/* ---- ROW 3: Search bar (full width on mobile, center on large) ---- */}
              <div className="w-full z-10">
                {/* <SearchBar
                  placeholder="Search sparks, journeys, flashcards, and more..."
                  icon={<IoSearchOutline />}
                  background={"#BBE1E1"}
                  className="w-full"
                /> */}
              </div>

              {/* ---- ROW 2: Greeting text (mobile centered, desktop right-aligned) ---- */}
              <div className="flex w-full justify-start lg:justify-end lg:order-none z-20">
                <div className="flex flex-col text-left lg:text-right gap-1 z-20">
                  <span
                    className="
          font-bold 
          text-[18px] z-20 sm:text-[24px] md:text-[28px] lg:text-[35.53px]
          leading-[100%]
          break-words
        "
                    style={{ color: theme === "dark" ? "#D0F7F6" : "#202124" }}
                  >
                    <span className="text-[12px] sm:text-[18px] md:text-[20px] lg:text-[28px]">
                      {greeting}
                    </span>{" "}
                    {userDetails?.firstName || "User"}
                  </span>

                  <span
                    className="
          font-[400] 
          text-[11px] sm:text-[12px] md:text-[13px] 
          leading-[145%] 
          max-w-[300px] z-20
        "
                    style={{ color: theme === "dark" ? "#FFFAEB" : "#333333" }}
                  >
                    {getPageText("learn_speak_belong")}
                  </span>
                </div>
              </div>

              {/* Settings on desktop */}
              <div className="hidden lg:flex mt-1">
                <SettingsBreadcrumb isDark={theme === "dark"} />
              </div>
            </div>
          </section>

          <div className="flex gap-6 flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Left Section ==> Totay's Word, Flash Cards, Leader Board */}
            <section
              className="
    flex 
    flex-col 
    gap-6
    py-[40px]

    w-full                /* mobile: full width (stacks) */
    lg:w-[40%]            /* large: take ~40% */
    xl:w-[23%]            /* xl: desktop size */
    flex-shrink-0
  "
            >
              <div className="z-30">
                <WordForTheDay />
              </div>

              <div className="">
                <FlashCard />
              </div>
              <div className="">
                <Leaderboard />
              </div>
            </section>

            <section className="flex flex-col w-full lg:w-[60%] xl:w-[77%] py-[40px] gap-10">
              <div className="z-10">
                <ProgressSection />
              </div>
              <div className="w-full">
                <PopularCourses />
              </div>
              <div className="w-full">
                {/* <LatestQuiz /> */}
                <PremiumFeaturesComponents />
              </div>
              <div>
                <Advert />
              </div>
              <div className="mt-6 flex flex-wrap lg:flex-nowrap w-full transition-all duration-300 ease-in-out gap-6">
                {dashboardMetricData?.map((metric, index) => (
                  <DashboardMetricCard2 key={index} data={metric} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
