"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";

const SettingsBreadcrumb = ({isDark}: {isDark: boolean}) => {
    const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(false);
    const [iconSize, setIconSize] = useState(35);

      useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setIconSize(25);
      else if (width < 768) setIconSize(30);
      else setIconSize(35);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dropdownOptions = [
    {
      name: "Settings",
      icon: "/userDashboard/settings.svg",
      path: "",
    },
    {
      name: "Profile",
      icon: "/userDashboard/profile.svg",
      path: "",
    },
    {
      name: "Notifications",
      icon: "/userDashboard/notifications.svg",
      path: "",
    },
    {
      name: "Logout",
      icon: "/userDashboard/logout.svg",
      path: "",
    },
  ];
  return (
    <div className="flex p-0 z-20 relative">
      <HiMenuAlt3
        color={isDark ? "#FFFAEB" : "#737477"}
        className="hover:cursor-pointer"
        size={iconSize}
        onClick={() => setIsBreadcrumbOpen(!isBreadcrumbOpen)}
      />
      {isBreadcrumbOpen && (
        <div
          className="absolute right-0 top-8 sm:top-10 md:top-12 bg-white shadow-lg rounded-l-[18px] rounded-br-[18px] rounded-tr-lg min-w-[160px] sm:min-w-[180px]"
          style={{ zIndex: 1000, fontFamily: "Lexend" }}
        >
          <ul className="p-2 flex flex-col gap-1 sm:gap-2">
            {dropdownOptions.map((option, index) => (
              <li
                key={index}
                className="flex items-center gap-2 font-medium leading-[145%] p-1.5 sm:p-2 hover:bg-gray-100 cursor-pointer rounded"
              >
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={window.innerWidth < 640 ? 20 : 25}
                  height={window.innerWidth < 640 ? 20 : 25}
                />
                <span className="text-[14px] sm:text-[16px] font-medium text-[#4C4F55] leading-[145%]">
                  {option.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsBreadcrumb;