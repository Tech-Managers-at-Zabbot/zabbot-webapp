import React from "react";
import { SlBell } from "react-icons/sl";
import { LuBookOpen } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
import { TbTag } from "react-icons/tb";
import { IoToggleOutline } from "react-icons/io5";
import { LiaToggleOffSolid } from "react-icons/lia";
import InAppButton from "@/components/InAppButton";
import { RiSaveLine } from "react-icons/ri";

const NotificationsSettingsCard = () => {
    const [enabledSettings, setEnabledSettings] = React.useState<number[]>([1, 3]);

  const toggleSetting = (id: number) => {
    if (enabledSettings.includes(id)) {
      setEnabledSettings(enabledSettings.filter((settingId) => settingId !== id));
    } else {
      setEnabledSettings([...enabledSettings, id]);
    }
  };



  const settingsItemsArray = [
    {
      id: 1,
      label: "Learning Reminders",
      subLabel: "Get reminders to continue your Yoruba learning journey",
      icon: <LuBookOpen size={20} color="#155DFC" />,
      iconBackground: "#EFF6FF",
    },
    {
      id: 2,
      label: "New Course Alerts",
      subLabel: "Be notified when new courses and lessons are added",
      icon: <BsStars size={20} color="#9810FA" />,
      iconBackground: "#FAF5FF",
    },
    {
      id: 3,
      label: "Subscription Updates",
      subLabel: "Receive updates about your subscription and billing",
      icon: <FiCreditCard size={20} color="#009966" />,
      iconBackground: "#ECFDF5",
    },
    {
      id: 4,
      label: "Promotional Offers",
      subLabel: "Get notified about special discounts and promotions",
      icon: <TbTag size={20} color="#E17100" />,
      iconBackground: "#FFFBEB",
    },
  ];

  return (
    <div
      className="bg-[white] border shadow-lg flex flex-col border-[#FEF3C6] rounded-2xl px-6 py-10"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="justify-start items-center flex gap-6">
        <div className="rounded-2xl bg-[#1671D9] p-4">
          <SlBell size={25} />
        </div>
        <div>
          <p className="text-[#101828] text-base font-[400] leading-[170%]">
            Notification Preferences
          </p>
          <p className="text-[#4A5565] font-normal text-sm leading-[170%]">
            Manage how you receive updates from Zabbot
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8">
      <div>
        {settingsItemsArray.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-1 border-b border-[#FEF3C6] items-center mt-6"
          >
            <div className="flex p-2 gap-4 items-center">
              <div
                className="p-4 rounded-[14px]"
                style={{ backgroundColor: item.iconBackground }}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-[#101828] text-base font-[400] leading-[88%]">
                  {item.label}
                </p>
                <p className="text-[#4A5565] font-normal text-sm leading-[170%]">
                  {item.subLabel}
                </p>
              </div>
            </div>
            <div
              className="cursor-pointer translate-0.5"
              onClick={() => toggleSetting(item.id)}
            >
              {enabledSettings.includes(item.id) ? (
                <IoToggleOutline size={36} color="#1671D9" />
              ) : (
                <LiaToggleOffSolid size={36} color="#A0AEC0" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full">
        <InAppButton
        background="#1671D9"
        width="100%"
        borderRadius="8px"
        >
            <div className="flex items-center justify-center gap-6 w-full">
                <div><RiSaveLine size={24} /></div>
                <div >Save Changes</div>
            </div>
        </InAppButton>
      </div>
      </div>

    </div>
  );
};

export default NotificationsSettingsCard;