/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Modal } from "../general/Modal";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
import { useAlert } from "next-alert";
import Cookies from "js-cookie";

const SettingsBreadcrumb = ({ isDark }: { isDark: boolean }) => {
  const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(false);
  const [iconSize, setIconSize] = useState(35);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  const { addAlert } = useAlert();

  const handleLogout = () => {
    setLogoutLoading(true);
    addAlert("Success", "Logout successful", "success");
    localStorage.removeItem("userProfile");
    Cookies.remove("access_token");
    Cookies.remove("userProfile");
    router.push("/login");
  };

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
      action: () => "",
      isActive: false,
    },
    {
      name: "Profile",
      icon: "/userDashboard/profile.svg",
      action: () => "",
      isActive: false,
    },
    {
      name: "Notifications",
      icon: "/userDashboard/notifications.svg",
      action: () => "",
      isActive: false,
    },
    {
      name: "Logout",
      icon: "/userDashboard/logout.svg",
      action: () => setShowLogoutModal(true),
      isActive: true,
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
                className={`flex items-center gap-2 font-medium leading-[145%] p-1.5 sm:p-2 ${
                  !option.isActive
                    ? "hover:cursor-not-allowed"
                    : "hover:bg-gray-300 hover:cursor-pointer"
                } rounded`}
                onClick={() => {
                  option.action();
                  setIsBreadcrumbOpen(false);
                }}
              >
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={window.innerWidth < 640 ? 20 : 25}
                  height={window.innerWidth < 640 ? 20 : 25}
                />
                <span
                  className={`text-[14px] sm:text-[16px] font-medium leading-[145%] ${
                    !option.isActive ? "text-[#666666]" : "text-[#162B6E]"
                  }`}
                >
                  {option.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          title="Are you sure you want to logout?"
          showCloseButton={false}
        >
          <div className="p-6 text-center">
            <p className="text-lg leading-[30px] text-[#252525] font-[400] mb-6">
              You're on a streak! Logging out now might break your momentum.
              Ready to keep leveling up instead?
            </p>
            <div className="flex justify-center gap-4">
              <InAppButton
                background="#EBEBEB"
                onClick={() => setShowLogoutModal(false)}
                disabled={logoutLoading}
              >
                <div className="text-[#252424]">Cancel</div>
              </InAppButton>
              <InAppButton
                background="#5A2E10"
                color="#FFFFFF"
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? <CustomSpinner /> : "Logout"}
              </InAppButton>
            </div>
          </div>
        </Modal>
      )}
      {/* <Alerts
        position="top-left"
        direction="right"
        timer={5000}
        className="rounded-md relative z-1000 !w-80"
      /> */}
    </div>
  );
};

export default SettingsBreadcrumb;
