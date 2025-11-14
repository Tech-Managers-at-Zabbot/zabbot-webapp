"use client";
import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { GoPerson } from "react-icons/go";
import UserProfileDetailsComponent from "@/components/userProfile/profile/UserProfileDetailsCard";
import UserAnalytics from "@/components/userProfile/profile/UserAnalytics";
import { IoMdNotificationsOutline } from "react-icons/io";
import EditProfileCard from "@/components/userProfile/profile/EditProfileCard";
import ChangePasswordCard from "@/components/userProfile/profile/ChangePasswordCard";
import { LuWallet } from "react-icons/lu";
import Table from "@/components/general/Table";
import SubscriptionAnnual from "@/components/userProfile/paymentHistory/AnnualSubscriptionCard";
import SubscriptionLifetime from "@/components/userProfile/paymentHistory/LifetimeSubscriptionCard";
import SubscriptionMonthly from "@/components/userProfile/paymentHistory/MonthlySubscriptionCard";
import InAppButton from "@/components/InAppButton";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import SubscriptionSection from "@/components/landingPage/SubscriptionSection";
import { Modal } from "@/components/general/Modal";
import { SlBell } from "react-icons/sl";
import NotificationsSettingsCard from "@/components/userProfile/notifications/NotificationsSettingsCard";

interface MenuItemsData {
  title: string;
  icon: ReactElement;
  keyword: string;
}
const UserSettings = () => {
  const [menuKeyword, setMenukeyword] = useState("profile");
  const openSubscriptionModal = () => setSubScriptionModalOpen(true);
  const [subscriptionModalOpen, setSubScriptionModalOpen] = useState(false);

  const [subscriptionType, setSubscriptionType] = useState("monthly");

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
      keyword: "notifications",
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

          {menuKeyword === "payment" && (
            <section className="flex pt-10 pb-20 flex-col gap-16">
              <div className="w-full">
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

              <div className="flex gap-6">
                <div>
                  <InAppButton
                    background="#1671D9"
                    color="#FFFFFF"
                    borderRadius="8px"
                    padding="12px 24px"
                    onClick={openSubscriptionModal}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div>
                        <MdOutlinePublishedWithChanges size={20} />
                      </div>
                      <div>Change Plan</div>
                    </div>
                  </InAppButton>
                </div>

                <div>
                  <InAppButton
                    background="#FFF"
                    color="#FFFFFF"
                    borderRadius="8px"
                    padding="12px 24px"
                    width="300px"
                    border="1px solid #D42620"
                    onClick={() => {}}
                  >
                    <div className="flex text-[#D42620] items-center gap-2 justify-center">
                      <div>
                        <IoMdClose size={25} />
                      </div>
                      <div>Cancel Subscription</div>
                    </div>
                  </InAppButton>
                </div>
              </div>

              <div className="p-6 shadow-lg border-[#FEF3C6] border flex flex-col gap-12 rounded-2xl">
                <div>
                  <h2 className="text-[#101828] text-2xl font-[400] leading-[122%] mb-4">
                    Payment History
                  </h2>
                  <p className="text-[#4A5565] text-base font-[400] leading-[150%]">
                    View all your past transactions and invoices
                  </p>
                </div>
                <div>
                  <Table columns={columns} data={myData} />
                </div>
              </div>
            </section>
          )}

          {menuKeyword === "notifications" && (
            <section className="flex min-h-screen flex-col gap-6">
              <div>
                <NotificationsSettingsCard />
              </div>
              <div className="px-6 py-6 bg-gradient-to-r from-[#FFFBEB] to-[#FFF7ED] justify-start items-center border-[#FEE685] border rounded-2xl flex gap-6">
                <div className="rounded-xl bg-[#FE9A00] p-2">
                  <SlBell  size={20}/>
                </div>
                <div>
                  <p className="text-[#101828] text-base font-[400] leading-[150%]">
                    Email Notifications
                  </p>
                  <p className="text-[#101828] font-normal text-base leading-[150%]">
                    All notifications will be sent to
                    adewale.ogunleye@example.com. You can update your email
                    address in the Profile section.
                  </p>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>

      <section className="w-full">
        <Modal
          isOpen={subscriptionModalOpen}
          onClose={() => setSubScriptionModalOpen(false)}
          // title={modalTitle}
          size="full"
          containerClassName="w-full"
          // disableClose={saveQuizLoading || createQuizLoading}
        >
          <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
            <SubscriptionSection
              setSubscriptionType={setSubscriptionType}
              onCloseModal={() => setSubScriptionModalOpen(false)}
            />
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default UserSettings;
