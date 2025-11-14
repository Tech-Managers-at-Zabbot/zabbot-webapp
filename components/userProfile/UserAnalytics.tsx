import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";

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
      data: "45 / 120 lessons ",
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
      className="bg-[#fefeff] p-2 flex flex-col gap-4"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="flex justify-between gap-2">
        {analyticsDataArray.map((item, index) => (
          <div
            key={index}
            className="bg-[#FEFEFF] flex flex-col gap-4 rounded-[12px] border-1 border-[#E4E7EC] p-4 min-w-[300] w-full"
          >
            <div className="text-[#475367] flex items-center text-[16px] leading-[145%] font-[400]">
              {item.title}
            </div>
            <div className="flex items-center justify-between text-[#344054] font-[400] text-[24px]">
              <div>{item.data}</div>
              <div className="p-2 border-1 border-[#E4E7EC] rounded-full">
                <FaThermometerHalf size={30} />
              </div>
            </div>
            <div
              className={`flex gap-2 text-[14px] font-[500] leading-[142.857%]`}
            >
              <span className="flex">
                {item.increase ? (
                  <FaArrowUpLong size={15} color="#00DDA5" />
                ) : (
                  <FaArrowDownLong size={15} color="red" />
                )}{" "}
                <span
                  className={`${
                    item.increase ? "text-[#00DDA5]" : "text-[red]"
                  }`}
                >
                  {item.percentage}%
                </span>
              </span>{" "}
              <span className="text-[#667085]">vs last month</span>
            </div>
          </div>
        ))}
      </section>

      <section className="border p-4 border-[#d6dfd6] bg-[#EFF8EE] rounded-[14px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h4 className="font-[400] text-[#0A0A0A] leading-[100%]">
              Learning Progress
            </h4>
            <p className="text-[#717182] font-[400] leading-[150%]">
              You&apos;ve completed 45 out of 120 lessons
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div
                className="w-full h-2 border bg-[#CEE8CB] rounded-full overflow-hidden"
              >
                <div
                  className="bg-[#3B6D35] h-full w-[30%]"
                />
              </div>
            </div>
            <p className="text-[#0F973D] font-400] leading-[142.857%] text-[14px]">30% complete</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserAnalytics;
