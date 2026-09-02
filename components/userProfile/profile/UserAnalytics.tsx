import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { useUser } from "@/contexts/UserContext";
import { useGetSingleUserData } from "@/services/generalApi/users/mutation";

const getBadgesEarnedFromStreak = (longestStreak: number) => {
  if (longestStreak >= 30) return 4;
  if (longestStreak >= 14) return 3;
  if (longestStreak >= 7) return 2;
  if (longestStreak >= 1) return 1;
  return 0;
};

const UserAnalytics = () => {
  const { userDetails } = useUser();
  const { data: singleUserData } = useGetSingleUserData();
  const badgesEarned = getBadgesEarnedFromStreak(userDetails?.longestStreak);

  const { completedLessonsCount = 0, totalLessonsCount = 0 } = singleUserData?.data || {};

  const progressPercentage =
    totalLessonsCount > 0
      ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
      : 0;

  const analyticsDataArray = [
    {
      title: "Current Streak",
      data: `${userDetails?.longestStreak} ${userDetails?.longestStreak === 1 ? "Day" : "Days"
        }`,
      percentage: "40",
      increase: true,
    },
    {
      title: "Badges Earned",
      data: `${badgesEarned} ${badgesEarned === 1 ? "badge" : "badges"}`,
      percentage: "40",
      increase: true,
    },
    {
      title: "Progress",
      data: `${completedLessonsCount} / ${totalLessonsCount} lessons`,
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
              {`You've completed ${completedLessonsCount} out of ${totalLessonsCount} lessons`}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-2">
            <div className="w-full h-2 bg-[#CEE8CB] rounded-full overflow-hidden border border-[#CEE8CB]">
              <div
                className="bg-[#3B6D35] h-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <p className="text-[#0F973D] text-sm font-medium">
              {progressPercentage}% complete
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserAnalytics;
