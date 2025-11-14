"use client";
import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { GoPerson } from "react-icons/go";
import UserProfileDetailsComponent from "@/components/userProfile/UserProfile";
import UserAnalytics from "@/components/userProfile/UserAnalytics";
import { IoMdNotificationsOutline } from "react-icons/io";
import EditProfileCard from "@/components/userProfile/EditProfileCard";
import ChangePasswordCard from "@/components/userProfile/ChangePasswordCard";
import { LuWallet } from "react-icons/lu";

interface MenuItemsData {
  title: string;
  icon: ReactElement;
  keyword: string;
}
const UserSettings = () => {
  const [menuKeyword, setMenukeyword] = useState("profile");

  const menuItemsArray: MenuItemsData[] = [
    {
      title: "My Profile",
      icon: <GoPerson size={20} />,
      keyword: "profile",
    },
    {
      title: "Payment History",
      icon: <LuWallet size={20} />,
      keyword: "payment",
    },
    {
      title: "Notifications",
      icon: <IoMdNotificationsOutline size={20} />,
      keyword: "edit",
    },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "Lexend" }}>
      <Head>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div
        style={{ fontFamily: "Lexend" }}
        className="flex flex-col min-h-screen px-[5%] py-[20px] bg-[#F9FAFB] gap-6"
      >
        <section>
          <h1 className="text-[#0A0A0A] text-[24px] font-[500] leading-[150%]">
            My Profile
          </h1>
          <p className="text-[#4A5565] text-[16px] font-[400] leading-[150%]">
            Manage your account settings, view your learning progress, and track
            your payment history.
          </p>
        </section>

        <section>
          <div className="flex shadow-lg justify-center max-w-[600px] bg-[#FEFEFF] rounded-2xl gap-6">
            {menuItemsArray.map((item: MenuItemsData, index: number) => (
              <div
                key={index}
                className={`flex w-full items-center justify-center gap-3 text-[16px] font-[400] leading-[142.857%]
                    ${
                      menuKeyword === item?.keyword
                        ? "text-[#FFFFFF] bg-[#1671D9] p-3 rounded-2xl"
                        : "text-[#1A1A1A] hover:cursor-pointer hover:border-[#1671D9] hover:border hover:rounded-2xl"
                    }
                    `}
                onClick={() => setMenukeyword(item?.keyword)}
              >
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          {menuKeyword === "profile" && (
            <section className="flex flex-col gap-5">
              <div>
                <UserProfileDetailsComponent />
              </div>
              <div>
                <UserAnalytics />
              </div>
              <div>
                <EditProfileCard />
              </div>
              <div>
                <ChangePasswordCard />
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserSettings;
