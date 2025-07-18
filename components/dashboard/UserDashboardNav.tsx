"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MainDropdown from "../MainDropdown";
import LanguageToggle from "../languageToggle/LanguageToggle";

const UserDashboardNavbar = ({showLogo=false}) => {
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
    const currentItem = userDashboardDetails.find(
      (item) => item.route === pathname
    );
    return currentItem ? currentItem.name : "Menu";
  };

  const handleMenuItemClick = (route: string) => {
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
        {showLogo && (
        <div className="flex-shrink-0">
          <div className="relative w-[156px] h-[46.91px]">
            <Image
              src="/general/zabbot-logo-white.svg"
              alt="Zabbot blue Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
        )}

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
              style={{
                backgroundColor: pathname === item.route ? "#FFE933" : "",
              }}
            >
              <Image
                src={
                  pathname === item.route
                    ? item.isActiveIconPath
                    : item.iconPath
                }
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
                      src={
                        pathname === item.route
                          ? item.isActiveIconPath
                          : item.iconPath
                      }
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
