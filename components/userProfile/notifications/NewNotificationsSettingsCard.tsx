/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { SlBell } from "react-icons/sl";
import { IoToggleOutline } from "react-icons/io5";
import { LiaToggleOffSolid } from "react-icons/lia";
import InAppButton from "@/components/InAppButton";
import { RiSaveLine } from "react-icons/ri";
import { LuSun } from "react-icons/lu";
import { TbCalendarWeek, TbCalendarRepeat } from "react-icons/tb";
import { IoNotificationsOffOutline } from "react-icons/io5";
import {
  useGetUserNotificationSettings,
  useUpdateUserNotification,
} from "@/services/generalApi/users/mutation";
import { useAlert } from "next-alert";
import NewNotificationsSettingsCardSkeleton from "@/components/loadingComponent/NotificationCardLoader";

const NewNotificationsSettingsCard = () => {
  const [selectedSetting, setSelectedSetting] = useState<number | null | any>(
    null
  );
  const { addAlert } = useAlert();
  const [userNotificationsSettings, setUserNotificationSettings] = useState<
    number | null
  >(null);

  const { data: notification, isPending } = useGetUserNotificationSettings();

  const {
    mutate: changeUserNotificationSettings,
    isPending: userNotificationChangeLoading,
  } = useUpdateUserNotification();

  useEffect(() => {
    if (notification?.data?.notification?.frequency) {
      const freq = notification.data.notification.frequency;

      const freqToIdMap: Record<string, number> = {
        daily: 1,
        weekly: 2,
        biweekly: 3,
        never: 4,
      };

      setSelectedSetting(freqToIdMap[freq] ?? null);
    }
  }, [notification?.data]);

  useEffect(() => {
    if (notification?.data?.notification?.frequency) {
      const freq = notification.data.notification.frequency;
      const freqToIdMap: Record<string, number> = {
        daily: 1,
        weekly: 2,
        biweekly: 3,
        never: 4,
      };
      setUserNotificationSettings(freqToIdMap[freq] ?? null);
    }
  }, [notification?.data]);

  const handleSubmit = async () => {
    const freqToIdMap: Record<number, string> = {
      1: "daily",
      2: "weekly",
      3: "biweekly",
      4: "never",
    };

    const newFrequency = freqToIdMap[selectedSetting];

    // return;
    changeUserNotificationSettings(
      {
        frequency: newFrequency,
        dailyReminders: selectedSetting === 1,
        weeklyReminders: selectedSetting === 2,
        biWeeklyReminders: selectedSetting === 3,
        noNotificationsAndReminders: selectedSetting === 4,
      },
      {
        onSuccess: () => {
          addAlert("Success", "Notification Updated successfully", "success");
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message ||
            "An error occurred, please try again",
            "error"
          );
        },
      }
    );
  };

  const toggleSetting = (id: number) => {
    if (selectedSetting === id) {
      setSelectedSetting(2);
    } else {
      setSelectedSetting(id);
    }
  };

  const settingsItemsArray = [
    {
      id: 1,
      label: "Daily Reminders",
      subLabel:
        "Get reminders every day to stay consistent with your Yorùbá learning.",
      icon: <LuSun size={20} color="#155DFC" />,
      iconBackground: "#EFF6FF",
    },
    {
      id: 2,
      label: "Weekly Reminders",
      subLabel: "Receive updates once every week.",
      icon: <TbCalendarWeek size={20} color="#9810FA" />,
      iconBackground: "#FAF5FF",
    },
    {
      id: 3,
      label: "Bi-Weekly Reminders",
      subLabel: "Receive updates every two weeks.",
      icon: <TbCalendarRepeat size={20} color="#009966" />,
      iconBackground: "#ECFDF5",
    },
    {
      id: 4,
      label: "Never",
      subLabel: "Turn off all reminders and notifications",
      icon: <IoNotificationsOffOutline size={20} color="#E17100" />,
      iconBackground: "#FFFBEB",
    },
  ];

  if (isPending) return <NewNotificationsSettingsCardSkeleton />;

  return (
    <div
      className="bg-white border shadow-lg flex flex-col border-[#FEF3C6] rounded-2xl px-4 sm:px-6 py-6 sm:py-10"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
        <div className="rounded-2xl bg-[#1671D9] p-3 sm:p-4 flex-shrink-0">
          <SlBell size={25} />
        </div>
        <div>
          <p className="text-[#101828] text-base sm:text-lg font-[400] leading-snug sm:leading-[170%]">
            Notification Preferences
          </p>
          <p className="text-[#4A5565] font-normal text-sm sm:text-base leading-snug sm:leading-[170%]">
            Manage how you receive updates from Zabbot
          </p>
        </div>
      </div>

      {/* Settings Items */}
      <div>
        <div className="flex flex-col gap-4 sm:gap-8 mb-6">
          {settingsItemsArray.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#FEF3C6] py-2 sm:py-4"
            >
              <div className="flex gap-4 items-start sm:items-center w-full">
                <div
                  className="p-3 sm:p-4 rounded-[14px] flex-shrink-0"
                  style={{ backgroundColor: item.iconBackground }}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <p className="text-[#101828] text-sm sm:text-base font-[400] leading-tight sm:leading-[88%]">
                    {item.label}
                  </p>
                  <p className="text-[#4A5565] font-normal text-xs sm:text-sm leading-snug sm:leading-[170%]">
                    {item.subLabel}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer mt-2 sm:mt-0"
                onClick={() => toggleSetting(item.id)}
              >
                {selectedSetting === item.id ? (
                  <IoToggleOutline size={36} color="#1671D9" />
                ) : (
                  <LiaToggleOffSolid size={36} color="#A0AEC0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="w-full mt-4">
          <InAppButton
            background="#1671D9"
            width="100%"
            borderRadius="8px"
            disabled={
              isPending ||
              userNotificationChangeLoading ||
              selectedSetting === userNotificationsSettings ||
              selectedSetting === null
            }
            onClick={handleSubmit}
          >
            <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
              <RiSaveLine size={24} />
              <div>Save Changes</div>
            </div>
          </InAppButton>
        </div>
      </div>
    </div>
  );
};

export default NewNotificationsSettingsCard;
