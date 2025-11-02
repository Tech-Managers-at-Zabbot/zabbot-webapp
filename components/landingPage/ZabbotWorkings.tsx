import React from "react";
import Image from "next/image";

const ZabbotWorkings = () => {
  const workingsDataArray = [
    {
      title: "Select a Lesson",
      description: "Choose from culturally rich lessons tailored to your level",
      icon: "/landingPage/icons/send-icon.svg",
      iconBgColor: "#2B7FFF",
    },
    {
      title: "Speak Yoruba & Get AI Feedback",
      description: "Practice pronunciation with real-time tone correction",
      icon: "/landingPage/icons/send-icon.svg",
      iconBgColor: "rgba(246, 94, 0, 0.92)",
    },
    {
      title: "Unlock Cultural Stories",
      description:
        "Learn through folktales, proverbs, and authentic narratives",
      icon: "/landingPage/icons/plant.svg",
      iconBgColor: "rgba(0, 123, 23, 0.76)",
    },
    {
      title: "Track Your Progress",
      description: "Celebrate milestones as you advance",
      icon: "/landingPage/icons/building-icon.svg",
      iconBgColor: "#8145B5",
    },
  ];

  return (
    <div
      className="relative w-full text-black"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Right-side Image (fixed on right across all screens) */}
      <div className="hidden md:block absolute top-0 right-0 w-[180px] lg:w-[250px] h-full overflow-hidden">
        <Image
          src="/landingPage/zabbotWorkings-right-border.svg"
          alt="Decorative border"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col gap-10 py-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px] relative z-10">
        {/* Header */}
        <section className="text-center">
          <h2 className="text-[#207EC5] font-semibold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[110%]">
            How It Works
          </h2>
          <p className="text-[#4A5565] font-normal text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[30px] mt-2">
            Your journey to fluency, simplified.
          </p>
        </section>

        {/* Steps Section */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
            {workingsDataArray.map((item, index) => (
              <div
                key={index}
                className="flex flex-col text-center rounded-2xl gap-4 py-8 px-6 border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow z-10"
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-2xl"
                  style={{ background: item.iconBgColor }}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={30}
                    height={30}
                  />
                </div>

                {/* Title */}
                <h3 className="text-[#101828] font-medium text-[18px] sm:text-[20px] leading-[28px]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#4A5565] font-normal text-[15px] sm:text-[16px] leading-[24px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ZabbotWorkings;
