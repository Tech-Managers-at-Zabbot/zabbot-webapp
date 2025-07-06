"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MainDropdown from "../MainDropdown";
import LanguageToggle from "../languageToggle/LanguageToggle";

const UserDashboardNavbar = () => {
  const pathname = usePathname();

  const router = useRouter();

  const userDashboardDetails = [
    {
      name: "Home",
      route: "/user-dashboard",
      iconPath: "/userDashboard/isHomeActive.svg",
      isActiveIconPath: "/userDashboard/isHomeActive.svg",
    },
    {
      name: "Lessons",
      route: "#",
      iconPath: "/userDashboard/isLessons.svg",
      isActiveIconPath: "",
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
          ]


  return (
    <nav
      className="bg-[#162B6E] z-50 flex justify-between items-center font-[700] text-sm leading-[100%] px-[100px] py-[16px]"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="flex gap-[60px]">
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
              style={{backgroundColor: pathname === item.route ? "#FFE933" : ""}}
            >
              <Image
                src={item.iconPath}
                height={45}
                width={45}
                alt="Icon image"
              />{" "}
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

      <section>
        <LanguageToggle />
      </section>
    </nav>
  );
};

export default UserDashboardNavbar;
