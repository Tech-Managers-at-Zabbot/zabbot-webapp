"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeProvider";
import SearchBar from "@/components/general/SearchBar";
import { IoSearchOutline } from "react-icons/io5";
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
import { useGetUserCount } from "@/services/generalApi/users/query";
import LatestQuiz from "@/components/dashboard/LatestQuiz";

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
      value: `${goalsCount} ${
        goalsCount === 1 ? getPageText("goal") : getPageText("goals")
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
      value: `${userCoursesCount} ${
        userCoursesCount === 1 ? getPageText("step") : getPageText("steps")
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

            <div className="relative flex w-full justify-between items-center py-[20px] z-40">
              <div className="flex flex-shrink-0 items-center gap-6 z-20">
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

              <div className="w-[50%] z-10">
                <SearchBar
                  placeholder="Search sparks, journeys, flashcards, and more..."
                  icon={<IoSearchOutline />}
                  background={"#BBE1E1"}
                  className="z-20"
                />
              </div>

              <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-shrink-0 items-start">
                {/* Text section */}
                <div className="flex flex-col gap-[4px] sm:gap-[6px] md:gap-[8px] text-right z-10">
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
                    {getPageText("learn_speak_belong")}
                  </span>
                </div>

                {/* Settings */}
                <div className="hidden lg:flex mt-1">
                  <SettingsBreadcrumb isDark={theme === "dark"} />
                </div>
              </div>
            </div>
          </section>

          <div className="flex gap-6">
            {/* Left Section ==> Totay's Word, Flash Cards, Leader Board */}
            <section className="flex flex-col xl:w-[23%] w-auto flex-shrink-0 py-[40px] gap-6">
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
            
             <section className="flex flex-col flex-grow xl:w-[77%] py-[40px] gap-10 overflow-x-hidden">
              <div className="z-10">
                <ProgressSection />
              </div>
              <div className="w-full">
                <PopularCourses />
              </div>
              <div className="w-full">
                <LatestQuiz />
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
