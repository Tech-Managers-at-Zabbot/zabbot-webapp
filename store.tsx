// DASHBOARD NEW


/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import Head from "next/head";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import GoPremiumCard from "@/components/dashboard/GoPremiumCard";
import { metricsData } from "@/constants/data-to-populate/dashboardData";
import { DashboardMetricCard } from "@/components/dashboard/DashboardMetricCard";
import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
import ProgressSection from "@/components/dashboard/ProgressSection";
import PopularCourses from "@/components/dashboard/PopularCourses";
import Advert from "@/components/dashboard/Advert";

const Dashboard = () => {
  const handleClosePremiumTag = () => setGoPremium(false);

  const [timeSunMoonLink, setTimeSunMoonLink] = useState("")

useEffect(() => {
  const currentTime = new Date()
  const hours = currentTime.getHours()
  
  if (hours >= 6 && hours < 12) {
    // Morning: 6 AM to 12 PM
    setTimeSunMoonLink("/userDashboard/morning-sun.png")
  } else if (hours >= 12 && hours < 18) {
    // Afternoon: 12 PM to 6 PM
    setTimeSunMoonLink("/userDashboard/afternoon-sun.png")
  } else {
    // Night: 6 PM to 6 AM
    setTimeSunMoonLink("/userDashboard/moon.png")
  }
}, [])

  const [goPremium, setGoPremium] = useState(true);
  return (
    <div>
      <Head>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className="min-h-screen py-0 my-0 pt-6 relative pb-50 bg-[#dff9fb] px-[5%]"
        style={{ fontFamily: "Lexend" }}
      >
        <header className="relative">
  <div className="absolute inset-0 bg-[url('/userDashboard/clouds.svg')] bg-cover bg-center"></div>
  
  {/* Mobile/Tablet greeting at top */}
  <div className="lg:hidden relative z-10 pt-4 px-4">
    <div className="flex flex-col gap-[4px] text-center">
      <span className="font-bold text-[20px] sm:text-[24px] md:text-[28px] leading-[100%] text-[#202124]">
        Káàrọ̀ JeconaihSmith
      </span>
      <span className="text-[#333333] font-[400] text-[11px] sm:text-[12px] md:text-[13px] leading-[145%]">
        Learn Yorùbá. Speak Proudly. Belong Deeply.
      </span>
    </div>
  </div>

  <div className="flex relative z-10 mt-6 lg:mt-10 px-4 lg:px-0 justify-between items-center">
    {/* Logo - always on left */}
    <div className="flex-shrink-0">
      <div className="relative w-[120px] h-[36px] sm:w-[140px] sm:h-[42px] lg:w-[156px] lg:h-[46.91px]">
        <Image
          src="/general/zabbot-logo-blue.svg"
          alt="Zabbot blue Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>

    {/* Parrot mascot - center on large screens, right on small/medium */}
    <div className="lg:absolute lg:top-[60px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 flex-shrink-0">
      <div className="w-[80px] h-[97px] sm:w-[90px] sm:h-[109px] md:w-[100px] md:h-[110px] lg:w-[113px] lg:h-[137px] relative">
        <Image
          src="/userDashboard/parrot-head.svg"
          alt="Centralized rounded parrot mascot"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>

    {/* Right section - greeting and menu (large screens only) */}
    <div className="hidden lg:flex gap-20 flex-shrink-0">
      <div className="flex flex-col gap-[8px] text-right">
        <span className="font-bold text-[35.53px] leading-[100%] text-[#202124]">
          Káàrọ̀ Iniobong
        </span>
        <span className="text-[#333333] font-[400] text-[13px] leading-[145%]">
          Learn Yorùbá. Speak Proudly. Belong Deeply.
        </span>
      </div>
      <div className="flex pt-2">
        <HiMenuAlt3 color="#737477" size={24} />
      </div>
    </div>
  </div>
</header>

         {/* <section className="absolute top-20 right-30">
          <img src={`${timeSunMoonLink}`} alt="image of the sun/moon" />
        </section>  */}

        <section className="z-10">
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
      <section className="">
        <UserDashboardFooter />
      </section>

    </div>
  );
};

export default Dashboard;



//Go Premium Card NEW

import React from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";

interface GoPremiumProps {
    onClose?:() => void
}

const GoPremiumCard: React.FC<GoPremiumProps> = ({onClose}) => {

    return (
    <div className='bg-[#FFFAEB] flex mt-6 p-3 sm:p-[14px] justify-between items-start lg:items-center rounded-md'
    style={{fontFamily: 'Lexend'}}
    >
        <section className='flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-10 items-start sm:items-center flex-1 pr-4'>
            <div className='flex-shrink-0'>
                <button className='bg-[#DC6803] hover:cursor-pointer rounded-[49px] py-[6px] px-4 sm:px-[20px] text-white text-sm sm:text-base whitespace-nowrap'>
                    Go Premium!
                </button>
            </div>
            <div className='text-[#B54708] text-sm sm:text-base leading-relaxed'>
                <span className='hidden sm:inline'>Unlock the Full Yorùbá Experience. Upgrade now & take your Yorùbá to the next level.</span>
                <span className='sm:hidden'>Unlock the Full Yorùbá Experience. Upgrade now!</span>
            </div>
        </section>
        <section onClick={onClose} className='hover:cursor-pointer flex-shrink-0'>
            <AiOutlineCloseCircle color='#B54708' size={20}/>
        </section>
    </div>
    );
}

export default GoPremiumCard;

//POPULAR COURSES NEW
import React from "react";
import UserLessonDataComponent, {
  CoursesCard,
  LessonProps,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";

const PopularCourses = () => {
  return (
    <div className="flex gap-[30px]">
      <section className="flex-1 min-w-[200px]">
        <UserLessonDataComponent
          title={"Popular Courses"}
          subtitle={"Top Yorùbá courses learners love!"}
          maxWidth="100%"
        >
          <section className="flex gap-[15px] min-w-max">
            {lessonProgressData.map(
              (lessonProgressData: LessonProps, index: number) => (
                <div key={index}>
                  <CoursesCard {...lessonProgressData} />
                </div>
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>
    </div>
  );
};

export default PopularCourses;


//PROGRESS SECTION NEW
import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
  LessonProps,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import { DailyGoals, WordForTheDay } from "./UserGoals";

const ProgressSection = () => {
  return (
    <div className="flex flex-wrap gap-[10px] w-full">
      <section className="flex-1 min-w-[200px]">
        <UserLessonDataComponent
          title={"Journey into Yorùbá language & life."}
          subtitle={"You're 4 lessons away from the finish line!"}
          maxWidth="100%"
        >
          <section className="flex gap-[15px]">
            {lessonProgressData.map(
              (lessonProgressData: LessonProps, index: number) => (
                <div key={index}>
                  <LessonProgressCard {...lessonProgressData} />
                </div>
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>
      <section className="flex flex-col lg:flex-row gap-[10px] min-w-[250px] flex-[0.5]">
  <DailyGoals />
  <WordForTheDay />
</section>

    </div>
  );
};

export default ProgressSection;


//USERDASHBOARD NAV NEW
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MainDropdown from "../MainDropdown";
import LanguageToggle from "../languageToggle/LanguageToggle";

const UserDashboardNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userDashboardDetails = [
    {
      name: "Home",
      route: "/user-dashboard",
      iconPath: "/userDashboard/isHomeInactive.svg",
      isActiveIconPath: "/userDashboard/isHomeActive.svg",
    },
    {
      name: "Lessons",
      route: "/user-dashboard/lessons",
      iconPath: "/userDashboard/isLessons.svg",
      isActiveIconPath: "/userDashboard/isLessonsActive.svg",
    },
    {
      name: "Achievements",
      route: "#",
      iconPath: "/userDashboard/isAchievements.svg",
      isActiveIconPath: "",
    },
    {
      name: "Marketplace",
      route: "#",
      iconPath: "/userDashboard/isMarketplace.svg",
      isActiveIconPath: "",
    },
    {
      name: "Billing",
      route: "#",
      iconPath: "/userDashboard/isBilling.svg",
      isActiveIconPath: "",
    },
  ];

  const dropdownOptions = [
    {
      name: "Chat with Ọ̀rẹ́",
      icon: "/userDashboard/trophy.svg",
      path: "",
    },
    {
      name: "Listen & Practice",
      icon: "/userDashboard/bag.svg",
      path: "",
    },
    {
      name: "Speech Feedback",
      icon: "/userDashboard/dropdownProfile.svg",
      path: "",
    },
  ];

  const getCurrentPageName = () => {
    const currentItem = userDashboardDetails.find(item => item.route === pathname);
    return currentItem ? currentItem.name : "Menu";
  };

  const handleMenuItemClick = (route:string) => {
    router.push(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="bg-[#162B6E] z-50 flex justify-between items-center font-[700] text-sm leading-[100%] px-[5%] py-[16px] relative"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Desktop Navigation */}
      <section className="hidden lg:flex gap-[60px]">
        <div className="flex gap-[60px]">
          {userDashboardDetails.map((item, index) => (
            <nav
              className={`flex hover:cursor-pointer hover:text-[${
                pathname === item.route ? "#162B6E" : "#FFE933"
              }] rounded-4xl px-[16px] py-0 text-[${
                pathname === item.route ? "#162B6E" : "white"
              }] justify-center items-center`}
              key={index}
              onClick={() => router.push(`${item.route}`)}
              style={{backgroundColor: pathname === item.route ? "#FFE933" : ""}}
            >
              <Image
                src={pathname === item.route ? item.isActiveIconPath : item.iconPath}
                height={45}
                width={45}
                alt="Icon image"
              />
              <div>{item.name}</div>
            </nav>
          ))}
        </div>
        <MainDropdown
          options={dropdownOptions}
          placeholder="Go Premium"
          icon={
            <Image
              src={"/userDashboard/isPremiumImage.svg"}
              height={45}
              width={45}
              alt="Icon image"
            />
          }
        />
      </section>

      {/* Mobile Breadcrumb Dropdown */}
      <section className="lg:hidden flex items-center">
        <div className="relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-white hover:text-[#FFE933] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>{getCurrentPageName()}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
              <div className="py-2">
                {userDashboardDetails.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleMenuItemClick(item.route)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                      pathname === item.route
                        ? "bg-[#FFE933] text-[#162B6E]"
                        : "text-gray-700"
                    }`}
                  >
                    <Image
                      src={pathname === item.route ? item.isActiveIconPath : item.iconPath}
                      height={24}
                      width={24}
                      alt="Icon image"
                    />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
                
                {/* Premium Section in Mobile */}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide">
                    Premium Features
                  </div>
                  {dropdownOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Handle premium option click
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      <Image
                        src={option.icon}
                        height={24}
                        width={24}
                        alt="Icon image"
                      />
                      <span className="font-medium">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Language Toggle - Always visible */}
      <section className="flex items-center">
        <LanguageToggle 
          backgroundColor="#162B6E" 
          color="#FFFFFF" 
          borderColor="#D9F3FF" 
          dropDownBgColor="#24a6ee" 
        />
      </section>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default UserDashboardNavbar;

//USER GOALS NEW
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { HiOutlineSpeakerWave } from "react-icons/hi2";


const DailyGoals = () => {
    return (
    <div className='bg-white min-w-[220px] w-full justify-between shadow-md flex rounded-lg border border-[#EAECF0] flex-col h-full p-[24px]' style={{fontFamily: "Lexend"}}>
        <section>
            <h1 className='font-semibold text-[24px] leading-[100%] text-[#162B6E]'>Daily Goal</h1>
            <span className='font-semibold text-[15px] leading-[100%] text-[#207EC5]'>Keep building your Yorùbá fluency - let’s complete today’s journey!</span>
        </section>
        <section className='flex h-full justify-center items-center'>
  <Box position="relative" display="inline-flex">
  <CircularProgress
    variant="determinate"
    value={100}
    size={144}
    thickness={5}
    sx={{
      color: '#F2F4F7', // Background track color
    }}
  />
  <CircularProgress
    variant="determinate"
    value={60}
    size={144}
    thickness={5}
    sx={{
      color: '#CDA674', // Progress bar color
      position: 'absolute',
      left: 0,
      '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
    }}
  />
  <Box
    top={0}
    left={0}
    bottom={0}
    right={0}
    position="absolute"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Typography
      variant="h6"
      component="div"
      color="textPrimary"
      fontWeight={600}
    >
      {`${Math.round(60)}%`}
    </Typography>
  </Box>
</Box>
        </section>
    </div>
    );
}

const WordForTheDay = () => {
    return (
    <div className='bg-white w-full min-w-[220px] text-center justify-between items-center shadow-md flex rounded-lg border border-[#EAECF0] flex-col h-full p-[24px]' style={{fontFamily: "Lexend"}}>
        <div className='font-semibold text-[23px] leading-[100%] text-[#162B6E]'>
            Today’s Word
        </div>
        <div className='font-bold text-[#000000CC] text-[36px] leading-[100%]'>
            àlàáfíà
        </div>
        <div className='flex flex-col gap-[24px]'>
            <h3 className='font-[400] text-[16px] leading-[100%] text-[#666666]'>Mastering alphabet sounds builds your Yorùbá fluency and tone precision.</h3>
            <div className='flex hover:cursor-pointer justify-center items-center'>
                <div className='rounded-full p-[10px] border-[#CDA674] border'><HiOutlineSpeakerWave size={40} color='#CDA674'/></div>
            </div>
        </div>
    </div>
    );
}




export {
    DailyGoals,
    WordForTheDay
};



//USER LESSON DATA COMPONENT NEW
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";

export interface LessonProps {
  courseImage: string;
  courseTitle: string;
  courseSummary: string;
  courseDuration: number;
  courseTotalLessons: number;
  userProgress: number;
  courseUserLevel: string;
}

export const LessonProgressCard: React.FC<LessonProps> = (
  data: LessonProps
) => {
  return (
    <div
      className="bg-white flex relative gap-[10px] w-[400px] h-[188px] rounded-sm border"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="w-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[194px] h-[188px]">
            <Image
              src={`${data.courseImage}`}
              alt="An image of a boy prostrating before an elderly woman in greeting"
              fill
              priority
              className="object-cover rounded-l-sm"
            />
          </div>
        </div>
      </section>

      <section className="absolute hover:cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[48px] h-[48px]">
            <Image
              src="/userDashboard/hand-click-element.svg"
              alt="A hand clicking the card"
              fill
              priority
              className="object-cover rounded-l-sm"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between p-[10px] w-1/2 pr-4">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[18px] leading-[100%] text-[#000000]">
            {data.courseTitle}
          </h3>
          <div className="font-light text-[#666666] text-[12px] leading-[100%]">
            {data.courseSummary}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data.courseDuration} min</span>
            <span>{data.courseTotalLessons} lessons</span>
          </div>
          <div className="w-full">
            <LinearProgress
              className=""
              value={data.userProgress}
              variant="determinate"
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#6FB6C8",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#162B6E",
                  borderRadius: 5,
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export const CoursesCard: React.FC<LessonProps> = (data: LessonProps) => {
  return (
    <div
      className="bg-white flex flex-col relative gap-[20px] w-[278px] h-[325px] rounded-sm border"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="w-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[276px] h-[150px]">
            <Image
              src={`${data.courseImage}`}
              alt="An image of a boy prostrating before an elderly woman in greeting"
              fill
              priority
              className="object-cover object-top rounded-t-sm"
            />
          </div>
        </div>
      </section>

      <section className="absolute hover:cursor-pointer top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[68px] h-[68px]">
            <Image
              src="/userDashboard/hand-click-element.svg"
              alt="A hand clicking the card"
              fill
              priority
              className="object-cover rounded-l-sm"
            />
          </div>
        </div>
      </section>

      <section className="flex px-[10px] font-[400] text-[12px] leading-[100%]">
        <div
          className={`px-[12px] py-[8px] border rounded-md`}
          style={{
            color:
              data.courseUserLevel === "Foundation"
                ? "#D3AF37"
                : data.courseUserLevel === "Builder"
                ? "#CF0A5C"
                : "#169A9C",
          }}
        >
          {data.courseUserLevel}
        </div>
      </section>

      <section className="flex flex-col gap-[16px] justify-between p-[10px]">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[18px] leading-[100%] text-[#000000]">
            {data.courseTitle}
          </h3>
          <div className="font-light text-[#666666] text-[12px] leading-[100%]">
            {data.courseSummary}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data.courseDuration} min</span>
            <span>{data.courseTotalLessons} lessons</span>
          </div>
        </div>
      </section>
    </div>
  );
};

interface UserLessonDataComponentProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  gap?: string;
  padding?: string;
  totalItems?: number;
  visibleItems?: number;
  maxWidth?: string;
}

const UserLessonDataComponent: React.FC<UserLessonDataComponentProps> = ({
  title,
  subtitle,
  children,
  gap = "24px",
  padding = "24px",
  maxWidth = "100%",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState<'left' | 'right' | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScrolling = (direction: 'left' | 'right') => {
    setIsScrolling(direction);
  };

  const stopScrolling = () => {
    setIsScrolling(null);
  };

  useEffect(() => {
    if (isScrolling && scrollRef.current) {
      const scrollDistance = isScrolling === 'left' ? -50 : 50;
      
      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({
            left: scrollDistance,
            behavior: 'auto'
          });
        }
      }, 16); // ~60fps for smooth scrolling
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <div
      className={`flex flex-col gap-[${gap}] border shadow-sm border-[#EAECF0] rounded-lg bg-white w-full`}
      style={{
        fontFamily: "Lexend", 
        maxWidth, 
        padding,
      }}
    >
      <section className="flex justify-between">
        <div>
          <h3 className="font-semibold text-[24px] leading-[100%] text-[#162B6E]">
            {title}
          </h3>
          <span className="font-semibold text-[15px] leading-[100%] text-[#207EC5]">
            {subtitle}
          </span>
        </div>
        <div className="flex gap-[16px]">
          <TfiArrowCircleLeft
            size={40}
            color={"#737477"}
            className="hover:cursor-pointer select-none"
            onMouseDown={() => startScrolling('left')}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={() => startScrolling('left')}
            onTouchEnd={stopScrolling}
          />
          <TfiArrowCircleRight
            size={40}
            color={"#737477"}
            className="hover:cursor-pointer select-none"
            onMouseDown={() => startScrolling('right')}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={() => startScrolling('right')}
            onTouchEnd={stopScrolling}
          />
        </div>
      </section>
      <section 
        className="overflow-x-auto overflow-y-hidden" 
        ref={scrollRef}
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        <div className="scrollbar-hide">
          {children}
        </div>
      </section>
    </div>
  );
};

export default UserLessonDataComponent;






import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
  LessonProps,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import { DailyGoals, WordForTheDay } from "./UserGoals";

const ProgressSection = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-[30px] w-full">
      {/* Main lesson component */}
      <section className="flex-1 w-full xl:min-w-[50%]">
        <UserLessonDataComponent
          title={"Journey into Yorùbá language & life."}
          subtitle={"You're 4 lessons away from the finish line!"}
          maxWidth="100%"
        >
          <section className="flex gap-[15px] pb-4 overflow-x-auto">
            {lessonProgressData.map(
              (lessonProgressData: LessonProps, index: number) => (
                <div key={index} className="flex-shrink-0">
                  <LessonProgressCard {...lessonProgressData} />
                </div>
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>
      
      {/* Side cards */}
      <section className="flex-shrink-0 xl:w-auto w-full">
        <div className="flex flex-col sm:flex-row xl:flex-col gap-[30px] w-full">
          <div className="flex-1 xl:flex-none xl:w-[250px]">
            <DailyGoals />
          </div>
          <div className="flex-1 xl:flex-none xl:w-[250px]">
            <WordForTheDay />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressSection;