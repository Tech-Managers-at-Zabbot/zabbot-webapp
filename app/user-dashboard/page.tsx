import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import Head from "next/head";
import AchievementsCard from "@/components/dashboard/AchievementsCard";

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className="min-h-screen bg-[#dff9fb] px-[100px] pt-6"
        style={{ fontFamily: "Lexend" }}
      >
        <header className="relative">
            <div className="absolute inset-0 bg-[url('/userDashboard/clouds.svg')] bg-cover bg-center"></div>
            <div className="flex relative z-10 mt-10 justify-between">
          <div className="flex-shrink-0">
            <div className="relative w-[156px] h-[46.91px]">
              <Image
                src="/general/zabbot-logo-blue.svg"
                alt="Zabbot blue Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
          <div className="absolute top-[60] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[113px] h-[137px]">
              <Image
                src="/userDashboard/parrot-head.svg"
                alt="Centralized rounded parrot mascot"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right - Text and Menu */}
          <div className="flex gap-20 flex-shrink-0">
            <div className="flex flex-col gap-[8px] text-right">
              <span className="font-bold text-[35.53px] leading-[100%] text-[#202124]">
                Káàrọ̀ Iniobong
              </span>
              <span className="text-[#333333] font-[400] text-[13px] leading-[145%]">
                Learn Yorùbá. Speak Proudly. Belong Deeply.
              </span>
            </div>
            <div className="flex pt-2">
              <HiMenuAlt3 color="#737477" size={24} />
            </div>
          </div>
            </div>
        </header>

        <section className="mt-6">
            <AchievementsCard />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
