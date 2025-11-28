import React from "react";
import { SlBell } from "react-icons/sl";
import { IoToggleOutline } from "react-icons/io5";
import { LiaToggleOffSolid } from "react-icons/lia";
import InAppButton from "@/components/InAppButton";
import { RiSaveLine } from "react-icons/ri";
import { LuSun } from "react-icons/lu";
import { TbCalendarWeek, TbCalendarRepeat } from "react-icons/tb";
import { IoNotificationsOffOutline } from "react-icons/io5";

const NewNotificationsSettingsCard = () => {
  const [selectedSetting, setSelectedSetting] = React.useState<number | null>(1);

  const toggleSetting = (id: number) => {
    if (selectedSetting === id) {
      setSelectedSetting(null);
    } else {
      setSelectedSetting(id);
    }
  };


const settingsItemsArray = [
  {
    id: 1,
    label: "Daily Reminders",
    subLabel: "Manage how you receive updates from Zabbot",
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
        <InAppButton background="#1671D9" width="100%" borderRadius="8px">
          <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
            <RiSaveLine size={24} />
            <div>Save Changes</div>
          </div>
        </InAppButton>
      </div>
    </div>
  );
};

export default NewNotificationsSettingsCard;
