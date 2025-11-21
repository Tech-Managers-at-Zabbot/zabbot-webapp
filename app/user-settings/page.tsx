"use client";

import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { GoPerson } from "react-icons/go";
import { IoMdNotificationsOutline, IoMdClose } from "react-icons/io";
import { LuWallet } from "react-icons/lu";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { SlBell } from "react-icons/sl";
import { useSearchParams } from "next/navigation";
import UserProfileDetailsComponent from "@/components/userProfile/profile/UserProfileDetailsCard";
import UserAnalytics from "@/components/userProfile/profile/UserAnalytics";
import EditProfileCard from "@/components/userProfile/profile/EditProfileCard";
import ChangePasswordCard from "@/components/userProfile/profile/ChangePasswordCard";
import { useRouter } from "next/navigation";

import Table from "@/components/general/Table";

import SubscriptionAnnual from "@/components/userProfile/paymentHistory/AnnualSubscriptionCard";
import SubscriptionLifetime from "@/components/userProfile/paymentHistory/LifetimeSubscriptionCard";
import SubscriptionMonthly from "@/components/userProfile/paymentHistory/MonthlySubscriptionCard";

import InAppButton from "@/components/InAppButton";
import SubscriptionSection from "@/components/landingPage/SubscriptionSection";
import { Modal } from "@/components/general/Modal";
import NotificationsSettingsCard from "@/components/userProfile/notifications/NotificationsSettingsCard";

interface MenuItemsData {
  title: string;
  icon: ReactElement;
  keyword: string;
}

const UserSettings = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = searchParams.get("tab") || "profile";

  const [menuKeyword, setMenukeyword] = useState(defaultTab);
  const [subscriptionModalOpen, setSubScriptionModalOpen] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("monthly");

  const openSubscriptionModal = () => setSubScriptionModalOpen(true);

  const columns = [
    {
      key: "date",
      header: "Date",
      width: "25%",
      align: "left" as const,
    },
    {
      key: "planType",
      header: "Plan Type",
      width: "25%",
      align: "left" as const,
    },
    {
      key: "amount",
      header: "Amount",
      width: "25%",
      align: "right" as const,
    },
    {
      key: "status",
      header: "Status",
      width: "25%",
      align: "center" as const,
      render: (value: string) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {value}
        </span>
      ),
    },
  ];

  const myData = [
    {
      date: "Nov 1, 2025",
      planType: "Annual Plan",
      amount: "US$69.99",
      status: "Paid",
    },
    {
      date: "Nov 1, 2024",
      planType: "Annual Plan",
      amount: "US$69.99",
      status: "Paid",
    },
    {
      date: "Oct 1, 2024",
      planType: "Annual Plan",
      amount: "US$69.99",
      status: "Paid",
    },
    {
      date: "Sep 1, 2024",
      planType: "Annual Plan",
      amount: "US$69.99",
      status: "Paid",
    },
    {
      date: "Aug 1, 2024",
      planType: "Annual Plan",
      amount: "US$69.99",
      status: "Paid",
    },
  ];

  const menuItemsArray: MenuItemsData[] = [
    { title: "My Profile", icon: <GoPerson size={20} />, keyword: "profile" },
    {
      title: "Payment History",
      icon: <LuWallet size={20} />,
      keyword: "payment",
    },
    {
      title: "Notifications",
      icon: <IoMdNotificationsOutline size={20} />,
      keyword: "notifications",
    },
  ];

  return (
    <div className="min-h-screen font-[Lexend] z-50">
      <Head>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="Join users and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* MAIN CONTAINER px-4 sm:px-6 md:px-10 */}
      <div className="flex flex-col z-20 min-h-screen px-[5%] py-6 bg-[#F9FAFB] gap-6">
        {/* PAGE HEADER */}
        <section>
          <h1 className="text-[#0A0A0A] text-xl sm:text-2xl font-[500]">
            My Profile
          </h1>
          <p className="text-[#4A5565] text-sm sm:text-base mt-1">
            Manage your account settings, view progress, and track payment
            history.
          </p>
        </section>

        {/* MENU TABS */}
        <section className="relative">
          <div className="flex overflow-x-auto no-scrollbar shadow-lg bg-white rounded-2xl gap-4 p-2">
            {menuItemsArray.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 hover:cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base
          ${
            menuKeyword === item.keyword
              ? "text-white bg-[#1671D9]"
              : "text-[#1A1A1A] hover:border hover:border-[#1671D9]"
          }`}
                onClick={() => {
  setMenukeyword(item.keyword);
  router.push(`/user-settings?tab=${item.keyword}`);
}}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator - only visible on small screens */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/90 to-transparent pointer-events-none flex items-center justify-end pr-2 sm:hidden rounded-r-2xl">
            <div className="animate-pulse">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-[#1671D9]"
              >
                <path
                  d="M7 4L13 10L7 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* PROFILE SECTION */}
        <section className="mt-4">
          {menuKeyword === "profile" && (
            <div className="flex flex-col gap-6">
              <UserProfileDetailsComponent />
              <UserAnalytics />
              <EditProfileCard />
              <ChangePasswordCard />
            </div>
          )}

          {/* PAYMENT SECTION */}
          {menuKeyword === "payment" && (
            <section className="flex flex-col gap-12 pt-6 pb-20">
              {/* Subscription Cycle */}
              <div className="w-full mx-auto">
                {subscriptionType === "monthly" && (
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => setSubscriptionType("annual")}
                  >
                    <SubscriptionMonthly />
                  </div>
                )}
                {subscriptionType === "annual" && (
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => setSubscriptionType("lifetime")}
                  >
                    <SubscriptionAnnual />
                  </div>
                )}
                {subscriptionType === "lifetime" && (
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => setSubscriptionType("monthly")}
                  >
                    <SubscriptionLifetime />
                  </div>
                )}
              </div>

              {/* Subscription Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <div className="max-w-[320px] w-full">
                  <InAppButton
                    background="#1671D9"
                    color="#FFFFFF"
                    borderRadius="8px"
                    padding="12px 24px"
                    width="100%"
                    onClick={openSubscriptionModal}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MdOutlinePublishedWithChanges size={20} />
                      <span>Change Plan</span>
                    </div>
                  </InAppButton>
                </div>

                <div className="max-w-[320px] w-full">
                  <InAppButton
                    background="#FFF"
                    border="1px solid #D42620"
                    borderRadius="8px"
                    padding="12px 24px"
                    width="100%"
                    onClick={() => {}}
                  >
                    <div className="flex items-center justify-center gap-2 text-[#D42620]">
                      <IoMdClose size={20} />
                      <span>Cancel Subscription</span>
                    </div>
                  </InAppButton>
                </div>
              </div>

              {/* Payment Table */}
              <div className="p-6 shadow-lg border border-[#FEF3C6] rounded-2xl bg-white flex flex-col gap-8">
                <div>
                  <h2 className="text-xl font-[400] text-[#101828]">
                    Payment History
                  </h2>
                  <p className="text-sm text-[#4A5565] mt-1">
                    View all past transactions
                  </p>
                </div>

                <div className="w-full overflow-x-auto">
                  <Table columns={columns} data={myData} />
                </div>
              </div>
            </section>
          )}

          {/* NOTIFICATIONS SECTION */}
          {menuKeyword === "notifications" && (
            <section className="flex flex-col gap-6">
              <NotificationsSettingsCard />

              <div className="px-4 py-6 bg-gradient-to-r from-[#FFFBEB] to-[#FFF7ED] border border-[#FEE685] rounded-2xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <div className="rounded-xl bg-[#FE9A00] p-2">
                  <SlBell size={20} />
                </div>

                <div>
                  <p className="text-[#101828] font-[400]">
                    Email Notifications
                  </p>
                  <p className="text-sm text-[#4A5565]">
                    Notifications will be sent to adewale.ogunleye@example.com.
                    You can update your email in the Profile section.
                  </p>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>

      {/* SUBSCRIPTION MODAL */}
      <Modal
        isOpen={subscriptionModalOpen}
        onClose={() => setSubScriptionModalOpen(false)}
        size="full"
        containerClassName="w-full"
      >
        <div className="p-6 w-full font-[Lexend]">
          <SubscriptionSection
            setSubscriptionType={setSubscriptionType}
            onCloseModal={() => setSubScriptionModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserSettings;
