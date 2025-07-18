import React, { useState } from "react";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";

const SettingsBreadcrumb = () => {
    const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(false);
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
    <div
      className="flex p-0 z-20"
      // style={{ position: "relative", zIndex: 1000 }}
    >
      <HiMenuAlt3
        color="#737477"
        className="hover:cursor-pointer"
        size={35}
        onClick={() => setIsBreadcrumbOpen(!isBreadcrumbOpen)}
      />
      {isBreadcrumbOpen && (
        <div
          className="absolute right-0 mt-6 bg-white shadow-lg rounded-l-[18px] rounded-br-[18px] rounded-tr-lg"
          style={{ zIndex: 1000, fontFamily: "Lexend" }}
        >
          <ul className="p-2 flex flex-col gap-2">
            {dropdownOptions.map((option, index) => (
              <li
                key={index}
                className="flex items-center gap-2 font-medium leading-[145%] p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={25}
                  height={25}
                />
                <span className="text-[16px] font-medium text-[#4C4F55] leading-[145%]">
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
