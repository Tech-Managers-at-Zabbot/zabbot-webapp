/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaThermometerHalf } from "react-icons/fa";

const UserAnalytics = () => {
  const analyticsDataArray = [
    {
      title: "Current Streak",
      data: "12 Days",
      percentage: "40",
      increase: true,
    },
    {
      title: "Badges Earned",
      data: "8 badges",
      percentage: "40",
      increase: true,
    },
    {
      title: "Progress",
      data: "45 / 120 lessons",
      percentage: "40",
      increase: false,
    },
    {
      title: "Total hours of all learners",
      data: "2,420 hours",
      percentage: "40",
      increase: true,
    },
  ];

  return (
    <div
      className="bg-[#FEFEFF] p-4 sm:p-6 flex flex-col gap-6"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Analytics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsDataArray.map((item, index) => (
          <div
            key={index}
            className="bg-[#FEFEFF] flex flex-col gap-4 rounded-xl border border-[#E4E7EC] 
                       p-4 w-full shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Title */}
            <div className="text-[#475367] text-sm sm:text-base font-normal leading-[145%]">
              {item.title}
            </div>

            {/* Data + Icon */}
            <div className="flex items-center justify-between">
              <div className="text-[#344054] font-medium text-xl sm:text-2xl">
                {item.data}
              </div>
              <div className="p-2 border border-[#E4E7EC] rounded-full">
                <FaThermometerHalf size={26} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Learning Progress Section */}
      <section className="border p-4 sm:p-6 border-[#d6dfd6] bg-[#EFF8EE] rounded-xl">
        <div className="flex flex-col gap-6">

          {/* Header */}
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-[#0A0A0A] text-base sm:text-lg leading-tight">
              Learning Progress
            </h4>
            <p className="text-[#717182] text-sm sm:text-base">
              You've completed 45 out of 120 lessons
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-2">
            <div className="w-full h-2 bg-[#CEE8CB] rounded-full overflow-hidden border border-[#CEE8CB]">
              <div className="bg-[#3B6D35] h-full w-[30%]" />
            </div>

            <p className="text-[#0F973D] text-sm font-medium">
              30% complete
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserAnalytics;
