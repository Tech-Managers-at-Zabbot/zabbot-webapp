/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ReactElement, useEffect, useState } from "react";
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
import AchievementsCard from "@/components/dashboard/AchievementsCard";

import Table from "@/components/general/Table";

import SubscriptionAnnual from "@/components/userProfile/paymentHistory/AnnualSubscriptionCard";
import SubscriptionLifetime from "@/components/userProfile/paymentHistory/LifetimeSubscriptionCard";
import SubscriptionMonthly from "@/components/userProfile/paymentHistory/MonthlySubscriptionCard";

import InAppButton from "@/components/InAppButton";
import SubscriptionSection from "@/components/landingPage/SubscriptionSection";
import { Modal } from "@/components/general/Modal";
// import NotificationsSettingsCard from "@/components/userProfile/notifications/NotificationsSettingsCard";
import NewNotificationsSettingsCard from "@/components/userProfile/notifications/NewNotificationsSettingsCard";
// import { useUser } from "@/contexts/UserContext";
import { useGetSingleUserData } from "@/services/generalApi/users/mutation";
import { useGetUserPaymentHistory, useUserSubscriptionCancellation, useGetUserSubscriptionListing } from "@/services/payment/transactions/tanstack";
import NoSubscription from "@/components/userProfile/paymentHistory/NoSubscription";

interface MenuItemsData {
  title: string;
  icon: ReactElement;
  keyword: string;
}

const UserSettings = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = searchParams.get("tab") || "profile";
  const [confirmSubCancellation, setConfirmSubCancellation] = useState(false);

  const {
    data: userProfile,
    // isLoading: userDataLoading
  } = useGetSingleUserData();
  const { data: userPaymentHistory, isLoading: paymentHistoryLoading } =
    useGetUserPaymentHistory();
  const { data: subscriptionListing } = useGetUserSubscriptionListing();
  const { mutate: subscriptionCancellation, isPending: subscriptionCancellationLoading } = useUserSubscriptionCancellation();

  const [menuKeyword, setMenukeyword] = useState(defaultTab);
  const [subscriptionModalOpen, setSubScriptionModalOpen] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [currentPlan, setCurrentPlan] = useState("no-subscription");

  const openSubscriptionModal = () => setSubScriptionModalOpen(true);

  const handleSubscriptionCancellation = () => {
    if (
      subscriptionListing?.data?.id &&
      confirmSubCancellation &&
      !subscriptionCancellationLoading
    ) {
      subscriptionCancellation(subscriptionListing?.data?.id, {
        onSettled: () => setConfirmSubCancellation(false),
      });
    }
  }

  const showCancellationButton = currentPlan !== "no-subscription" && currentPlan !== "lifetime";

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

  useEffect(() => {
    if (userPaymentHistory?.data?.allUserTransactions) {
      const formatted = userPaymentHistory?.data?.allUserTransactions.map(
        (item: any) => ({
          date: new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          planType: item.planType,
          amount: `US$${item.amount}`,
          status: item.status,
        })
      );

      setPaymentHistory(formatted);
    }
    if (userPaymentHistory?.data) {
      setCurrentPlan(userPaymentHistory?.data?.userCurrentPlan || "no-subscription");
    }
  }, [userPaymentHistory]);

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
    {
      title: "Achievements",
      icon: <IoMdNotificationsOutline size={20} />,
      keyword: "achievements",
    }
  ];

  const hideButton = currentPlan !== "lifetime";

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
          ${menuKeyword === item.keyword
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
              <div className="w-full mx-auto">
                {currentPlan === "no-subscription" && (
                  <div>
                    <NoSubscription />
                  </div>
                )}
                {currentPlan === "monthly" && (
                  <div>
                    <SubscriptionMonthly />
                  </div>
                )}
                {currentPlan === "annual" && (
                  <div>
                    <SubscriptionAnnual />
                  </div>
                )}
                {currentPlan === "lifetime" && (
                  <div>
                    <SubscriptionLifetime />
                  </div>
                )}
              </div>

              {/* Subscription Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                {hideButton && (
                  < div className="max-w-[320px] w-full">
                    <InAppButton
                      background="#1671D9"
                      color="#FFFFFF"
                      borderRadius="8px"
                      padding="12px 24px"
                      width="100%"
                      onClick={openSubscriptionModal}
                    >
                      <div>
                        {currentPlan !== "no-subscription" ? (
                          <div className="flex items-center justify-center gap-2">
                            <MdOutlinePublishedWithChanges size={20} />
                            <span>Change Plan</span>
                          </div>
                        ) : (
                          <div className="p-2">Subscribe</div>
                        )}
                      </div>
                    </InAppButton>
                  </div>
                )}

                {showCancellationButton && (
                  <div className="max-w-[320px] w-full">
                    <InAppButton
                      background="#FFF"
                      border="1px solid #D42620"
                      borderRadius="8px"
                      padding="12px 24px"
                      width="100%"
                      disabled={subscriptionCancellationLoading}
                      onClick={() => {
                        if (subscriptionCancellationLoading) return;
                        if (!confirmSubCancellation) {
                          setConfirmSubCancellation(true)
                        } else {
                          handleSubscriptionCancellation()
                        }
                      }}
                    >
                      <div className="flex items-center justify-center gap-2 text-[#D42620]">
                        <IoMdClose size={20} />
                        <span>
                          {subscriptionCancellationLoading
                            ? "Cancelling..."
                            : confirmSubCancellation
                              ? "Confirm Cancellation"
                              : "Cancel Subscription"}
                        </span>
                      </div>
                    </InAppButton>
                  </div>
                )}
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

                {paymentHistoryLoading ? (
                  <div className="text-[#101828]">
                    Loading Payment History...
                  </div>
                ) : !userPaymentHistory?.data?.allUserTransactions ||
                  userPaymentHistory?.data?.allUserTransactions.length === 0 ? (
                  <div className="text-[#101828]">No payment History Yet</div>
                ) : (
                  <div className="w-full overflow-x-auto">
                    <Table columns={columns} data={paymentHistory} />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* NOTIFICATIONS SECTION */}
          {menuKeyword === "notifications" && (
            <section className="flex flex-col gap-6">
              <div className="px-4 py-6 bg-gradient-to-r from-[#FFFBEB] to-[#FFF7ED] border border-[#FEE685] rounded-2xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <div className="rounded-xl bg-[#FE9A00] p-2">
                  <SlBell size={20} />
                </div>

                <div>
                  <p className="text-[#101828] font-[400]">
                    Email Notifications
                  </p>
                  <p className="text-sm text-[#4A5565]">
                    Notifications will be sent to{" "}
                    {userProfile?.data.email ?
                      <span className="text-[#FE9A00] font-[700]">
                        {userProfile?.data.email}
                      </span>
                      : "your email"}
                    . You can update your email by sending an email to
                    hello@zabbot.com.
                  </p>
                </div>
              </div>
              <NewNotificationsSettingsCard />
            </section>
          )}

          {/* ACHIEVEMENTS SECTION */}
          {menuKeyword === "achievements" && (
            <section className="flex flex-col gap-6">
              <div className="p-6 bg-white border border-[#E0E0E0] rounded-2xl shadow-sm">
                <AchievementsCard />
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
        <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
          <SubscriptionSection
            setSubscriptionType={setCurrentPlan}
            onCloseModal={() => setSubScriptionModalOpen(false)}
          />
        </div>
      </Modal>
    </div >
  );
};

export default UserSettings;
