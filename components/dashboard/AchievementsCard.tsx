

"use client";
import React from "react";
import { useUser } from "@/contexts/UserContext";

import {
  FaWalking,
  FaFire,
  FaBook,
  FaBullhorn,
  FaLanguage,
  // FaStar,
  FaCrown,
} from "react-icons/fa";

export const achievementsData = [
  {
    key: "first_steps",
    title: "First Steps",
    description: "Completed your very first learning activity.",
    icon: FaWalking,
    isCompleted: true,
    isVisible: true,
    expectedPoint: 0,
  },
  {
    key: "7_day_streak",
    title: "7-Day Streak",
    description: "Practiced consistently for 7 consecutive days.",
    icon: FaFire,
    isCompleted: false,
    isVisible: true,
    expectedPoint: 7,
  },
  {
    key: "14_day_streak",
    title: "14-Day Streak",
    description: "Maintained learning momentum for 14 straight days.",
    icon: FaFire,
    isCompleted: false,
    isVisible: true,
    expectedPoint: 14,
  },
  {
    key: "30_day_streak",
    title: "30-Day Streak",
    description: "A full month of uninterrupted learning. Outstanding!",
    icon: FaFire,
    isCompleted: false,
    isVisible: true,
    expectedPoint: 30,
  },
  {
    key: "vocab_master",
    title: "Vocabulary Master",
    description: "Learned and mastered a wide range of new words.",
    icon: FaBook,
    isCompleted: false,
    isVisible: false,
    expectedPoint: 50,
  },
  {
    key: "grammar_pro",
    title: "Grammar Pro",
    description: "Demonstrated strong grammar understanding.",
    icon: FaLanguage,
    isCompleted: false,
    isVisible: false,
    expectedPoint: 100
  },
  {
    key: "tone_boss",
    title: "Tone Boss",
    description: "Mastered conversational tone and expressions.",
    icon: FaBullhorn,
    isCompleted: false,
    isVisible: false,
    expectedPoint: 150
  },
  {
    key: "culture_keeper",
    title: "Culture Keeper",
    description: "Explored and understood cultural nuances.",
    icon: FaCrown,
    isCompleted: false,
    isVisible: false,
    expectedPoint: 200
  },
];

const AchievementsPage = () => {
  const { userDetails } = useUser();

  const completedCount = achievementsData.filter(
    (a) => a.isCompleted
  ).length;

  const visibleCount = achievementsData.filter(
    (a) => a.isVisible
  ).length;



  return (
    <div
      className={`w-full rounded-2xl p-6 sm:p-8 
        // theme === "dark" ? "bg-[#1E375A]" : "bg-white"
      shadow-md`}
      style={{ fontFamily: "Lexend" }}
    >
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-[500] text-[#101828]">
          Your Achievements
        </h2>
        <p className="text-sm text-[#4A5565] mt-1">
          Track your progress and unlock new milestones.
        </p>

        <div className="mt-4 text-sm font-medium text-[#1671D9]">
          {completedCount} / {visibleCount} achievements unlocked
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementsData.filter((a) => a.isVisible).map((achievement, index) => {
          const Icon = achievement.icon;
          const isUnlocked = achievement.isCompleted && userDetails.longestStreak >= achievement.expectedPoint;

          return (
            <div
              key={index}
              className={`border rounded-xl p-5 transition-all
                ${isUnlocked
                  ? "border-[#1671D9] bg-[#F0F7FF]"
                  : "border-[#E4E7EC] bg-[#FAFAFA]"
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* ICON */}
                <div
                  className={`flex items-center justify-center rounded-full w-12 h-12
                    ${isUnlocked
                      ? "bg-[#1671D9] text-white"
                      : "bg-[#E4E4E4] text-[#98A2B3]"
                    }
                  `}
                >
                  <Icon size={20} />
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-[500] text-[#101828]">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    {achievement.description}
                  </p>

                  <span
                    className={`mt-2 inline-block text-xs font-medium px-3 py-1 rounded-full w-fit
                      ${isUnlocked
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {isUnlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
