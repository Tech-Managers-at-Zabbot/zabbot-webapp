/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MainDropdown from "../MainDropdown";
import LanguageToggle from "../languageToggle/LanguageToggle";
import { Modal } from "../general/Modal";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
import { useAlert } from "next-alert";
import { useLoading } from "@/contexts/LoadingProvider";
import { useUserGoals } from "@/contexts/UserGoalsContext";
import Cookies from "js-cookie";

const UserDashboardNavbar = ({ showLogo = false }) => {
  const { setLoading } = useLoading();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();
  const { addAlert } = useAlert();
  const { userDetails } = useUserGoals();

  const handleLogout = () => {
    setLogoutLoading(true);
    addAlert("Success", "Logout successful", "success");
    localStorage.removeItem("userProfile");
    Cookies.remove("access_token");
    Cookies.remove("userProfile");
    setLoading(true);
    router.push("/login");
  };

  const userDashboardDetails = [
    {
      name: "Home",
      route: "/user-dashboard",
      iconPath: "/userDashboard/isHomeInactive.svg",
      isActiveIconPath: "/userDashboard/isHomeActive.svg",
      action: () => "",
      useAction: false,
      disabled: false,
    },
    {
      name: "Lessons",
      route: "/user-dashboard/lessons",
      iconPath: "/userDashboard/isLessons.svg",
      isActiveIconPath: "/userDashboard/isLessonsActive.svg",
      action: () => "",
      useAction: false,
      disabled: false,
    },
    {
      name: "Achievements",
      route: "#",
      iconPath: "/userDashboard/isAchievements.svg",
      isActiveIconPath: "",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    {
      name: "Marketplace",
      route: "#",
      iconPath: "/userDashboard/isMarketplace.svg",
      isActiveIconPath: "",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    {
      name: "Billing",
      route: "#",
      iconPath: "/userDashboard/isBilling.svg",
      isActiveIconPath: "",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    ...(userDetails?.role === "admin"
      ? [
          {
            name: "Admin",
            route: "/admin/create-course",
            iconPath: "/userDashboard/admin.svg",
            isActiveIconPath: "/userDashboard/adminActive.svg",
            action: () => "",
            useAction: false,
            disabled: false,
          },
        ]
      : []),
  ];

  const userMobileDashboardDetails = [
    {
      name: "Home",
      route: "/user-dashboard",
      iconPath: "/userDashboard/isHomeInactive.svg",
      isActiveIconPath: "/userDashboard/isHomeActive.svg",
      action: () => "",
      useAction: false,
      disabled: false,
    },
    {
      name: "Lessons",
      route: "/user-dashboard/lessons",
      iconPath: "/userDashboard/isLessons.svg",
      isActiveIconPath: "/userDashboard/isLessonsActive.svg",
      action: () => "",
      useAction: false,
      disabled: false,
    },
    {
      name: "Achievements",
      route: "#",
      iconPath: "/userDashboard/isAchievements.svg",
      isActiveIconPath: "#",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    {
      name: "Marketplace",
      route: "#",
      iconPath: "/userDashboard/isMarketplace.svg",
      isActiveIconPath: "#",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    {
      name: "Billing",
      route: "#",
      iconPath: "/userDashboard/isBilling.svg",
      isActiveIconPath: "#",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    {
      name: "Settings",
      route: "#",
      iconPath: "/userDashboard/settings.svg",
      isActiveIconPath: "#",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    {
      name: "Profile",
      route: "#",
      iconPath: "/userDashboard/profile.svg",
      isActiveIconPath: "#",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    {
      name: "Notifications",
      route: "#",
      iconPath: "/userDashboard/notifications.svg",
      isActiveIconPath: "#",
      action: () => "",
      useAction: false,
      disabled: true,
    },
    ...(userDetails?.role === "admin"
      ? [
          {
            name: "Admin",
            route: "/admin/create-course",
            iconPath: "/userDashboard/admin.svg",
            isActiveIconPath: "/userDashboard/adminActive.svg",
            action: () => "",
            useAction: false,
            disabled: false,
          },
        ]
      : []),
    {
      name: "Logout",
      route: "#",
      iconPath: "/userDashboard/logout.svg",
      isActiveIconPath: "#",
      action: () => setShowLogoutModal(true),
      useAction: true,
      disabled: false,
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
      path: "/premium/listen-with-owe",
    },
    {
      name: "Speech Feedback",
      icon: "/userDashboard/dropdownProfile.svg",
      path: "",
    },
  ];

  // const getCurrentPageName = () => {
  //   const currentItem = userDashboardDetails.find(
  //     (item) => item.route === pathname
  //   );
  //   return currentItem ? currentItem.name : "Menu";
  // };

  const handleMenuItemClick = (route: string) => {
    if (route !== "#" && pathname !== route) {
      router.push(route);
      setLoading(true);
      setIsMobileMenuOpen(false);
    }
  };

  const mobilePremiumItemClick = (data: { name?: string; icon?: string; path: string; }) => {
    setIsMobileMenuOpen(false);
    if (!data?.path) return;
    
    router.push(data.path);
  }

  const [backgroundColor, setBackgroundColor] = useState("#162B6E");

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    // if (hours >= 6 && hours < 12) {
    //   // Morning: 6 AM to 12 PM
    //   setGreeting("Káàrọ̀");
    // } else if (hours >= 12 && hours < 18) {
    //   // Afternoon: 12 PM to 6 PM
    //   setGreeting("Káàsán");
    // } else {
    //   // Night: 6 PM to 6 AM
    //   setGreeting("Káalẹ́");

    if (hours >= 18 || hours < 6) {
      // Night: 6 PM to 6 AM
      setBackgroundColor("#012657");
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="z-50 flex justify-between items-center font-[700] text-xs lg:text-xs xl:text-sm leading-[100%] px-[5%] py-[16px] relative"
      style={{ fontFamily: "Lexend", backgroundColor: backgroundColor }}
    >
      {/* Desktop Navigation */}
      <section className="hidden lg:flex gap-[20px] xl:gap-[60px]">
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

        <div className="flex gap-x-[32px] gap-y-[16px] xl:gap-x-[40px] xl:gap-y-0">
          {userDashboardDetails.map((item, index) => (
            <nav
              className={`flex hover:cursor-${
                !item.disabled ? "pointer" : "not-allowed"
              } hover:text-[${
                pathname === item.route
                  ? "#162B6E"
                  : item.disabled
                  ? ""
                  : "#FFE933"
              }] rounded-4xl px-[16px] text-[${
                pathname === item.route
                  ? "#162B6E"
                  : item.disabled
                  ? "#666666"
                  : "white"
              }] justify-center items-center`}
              key={index}
              onClick={() =>
                item.useAction ? item.action() : handleMenuItemClick(item.route)
              }
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
                height={40}
                width={40}
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
            {/* <span>{getCurrentPageName()}</span> */}
            {/* <svg
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
            </svg> */}
          </button>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 max-h-[80vh] overflow-y-auto bg-[#162B6E] rounded-lg shadow-lg border z-50">
              <div className="py-2">
                {userMobileDashboardDetails.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      item.useAction
                        ? item.action()
                        : handleMenuItemClick(item.route)
                    }
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 hover:text-[#162B6E] transition-colors ${
                      pathname === item.route
                        ? "bg-[#FFE933] text-[#162B6E]"
                        : item.disabled
                        ? "text-[#666666]"
                        : "text-[#FFFFFF]"
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
                  <div className="px-4 py-2 text-xs text-gray-300 uppercase tracking-wide">
                    Premium Features
                  </div>
                  {dropdownOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => mobilePremiumItemClick(option)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 hover:text-[#162B6E] transition-colors text-[#FFFFFF]"
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
      <section className="flex items-end">
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
          className="lg:hidden fixed inset-0 bg-black/50 bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
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
    </nav>
  );
};

export default UserDashboardNavbar;
