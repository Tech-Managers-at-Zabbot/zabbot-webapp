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

const Dashboard = () => {
  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");
  const [logoUrl, setLogoUrl] = useState("/general/zabbot-logo-blue.svg");
  const [greeting, setGreeting] = useState("");

  const { getPageText, 
    // isPageLoading: isLanguageLoading 
} =
    usePageLanguage("userDashboard");

  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");

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

      <div
        style={{ fontFamily: "Lexend", background: backgroundColor }}
        className="min-h-screen"
      >
        <section>
          <div
            className="absolute bg-cover inset-0 top-0 h-40 bg-center"
            style={{ backgroundImage: `url(${cloudsUrl})` }}
          ></div>

          <div className="flex w-full justify-between px-[5%] py-[30px] z-40">
            <div className="flex flex-shrink-0 gap-10">
              <div className="relative h-[30px] w-full sm:h-[36px] md:h-[46.91px]">
                <Image
                  src="/userDashboard/bird-logo.png"
                  alt="Centralized rounded parrot mascot"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="relative w-[100px] h-[30px] sm:w-[120px] sm:h-[36px] md:w-[156px] md:h-[46.91px]">
                <Image
                  src={logoUrl}
                  alt="Zabbot Logo"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="w-[50%]">
              <SearchBar
                placeholder="Search sparks, journeys, flashcards, and more..."
                icon={<IoSearchOutline />}
                background={"#BBE1E1"}
                className="z-20"
              />
            </div>

            <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-shrink-0 items-start order-3">
              {/* Text section - responsive */}
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
              {/* Menu */}
              <div className="hidden lg:flex mt-1">
                <SettingsBreadcrumb isDark={theme === "dark"} />
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </section>
      </div>
    </div>
  );
};
export default Dashboard;
