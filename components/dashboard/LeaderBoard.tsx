/* eslint-disable @next/next/no-img-element */
import { useGetAllLeaderboard } from "@/services/generalApi/leaderboard/tanstack";
import React, { useState } from "react";
import LeaderboardLoader from "../loadingComponent/LoaderBoardLoader";
import { usePageLanguage } from "@/contexts/LanguageContext";

// Types
type TimeFrame = "today" | "week" | "allTime";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  color?: string;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  renderIcon?: (rank: number) => React.ReactNode;
  renderAvatar?: (entry: LeaderboardEntry) => React.ReactNode;
}

interface LeaderboardProps {
  initialTimeFrame?: TimeFrame;
  getData?: (timeFrame: TimeFrame) => LeaderboardEntry[];
}

// Reusable Table Component (Compact)
const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  renderIcon,
  renderAvatar,
}) => {
  const getDefaultIcon = (rank: number) => {
    if (rank === 1) return "🏆";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank.toString();
  };

  const getDefaultAvatar = (entry: LeaderboardEntry) => (
    <img
      src={entry.avatar}
      alt={entry.name}
      className="w-6 h-6 rounded-full object-cover"
    />
  );

  const getRowColor = (rank: number, customColor?: string) => {
    if (customColor) return customColor;
    if (rank === 1) return "bg-[#fef9a7]";
    if (rank === 2) return "bg-[#d6dde8]";
    if (rank === 3) return "bg-[#F5C9A8]";
    return "";
  };


  return (
    <div className="overflow-x-auto">
      <div className="min-w-[200px] space-y-1">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center justify-center px-3 py-2 rounded-lg ${getRowColor(
              entry.rank,
              entry.color,
            )} transition-all hover:shadow`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center justify-center w-6 text-xl font-bold text-gray-600">
                {renderIcon
                  ? renderIcon(entry.rank)
                  : getDefaultIcon(entry.rank)}
              </div>

              <div className="border-[0.5px] border-black/20 rounded-full p-1 flex-shrink-0">
                {renderAvatar ? renderAvatar(entry) : getDefaultAvatar(entry)}
              </div>

              <span
                className="font-semibold text-[13px] text-gray-800 truncate max-w-[100px]"
                title={entry.name}
              >
                {entry.name}
              </span>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <span className="text-[13px] font-bold text-gray-800">
                  {entry.points}
                </span>
                <span className="text-sm text-gray-500 ml-1">pts</span>
              </div>

              {/* <div className="text-sm text-gray-500 w-12 text-right">
              {entry.time}
            </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Leaderboard Component
const Leaderboard: React.FC<LeaderboardProps> = ({
  initialTimeFrame = "today",
}) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(initialTimeFrame);
  const { getPageText } = usePageLanguage("userDashboard");
  const periodMap = {
    today: "daily",
    week: "weekly",
    allTime: "allTime",
  } as const;

  const { data: leaderboardData, isLoading: leaderBoardLoading } =
    useGetAllLeaderboard(periodMap[timeFrame], 15);

  const currentData = leaderboardData?.data?.leaderboard || [];

  const tabs: { key: TimeFrame; label: string }[] = [
    { key: "today", label: getPageText("today") },
    { key: "week", label: getPageText("week") },
    { key: "allTime", label: getPageText("all_time") },
  ];

  const customIconRenderer = (rank: number) => {
    if (rank === 1) return <span className="text-3xl">🏆</span>;
    if (rank === 2) return <span className="text-3xl">🥈</span>;
    if (rank === 3) return <span className="text-3xl">🥉</span>;
    return <span className="text-gray-500 font-bold">{rank}</span>;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-[#d3ebeb] backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <h1 className="text-4xl sm:text-4xl md:text-3xl font-bold text-teal-700 mb-6">
            {getPageText("leaderboard")}
          </h1>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 bg-teal-100/50 rounded-xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setTimeFrame(tab.key)}
                className={`flex-1 py-3 text-[15px] px-6 rounded-lg font-semibold transition-all ${timeFrame === tab.key
                  ? "bg-white text-gray-800 shadow-md"
                  : "text-teal-700 hover:bg-white/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Leaderboard Table */}
          {leaderBoardLoading ? (
            <LeaderboardLoader count={15} /> // matches your limit of 15
          ) : currentData.length > 0 ? (
            <LeaderboardTable
              entries={currentData}
              renderIcon={customIconRenderer}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export both components
export default Leaderboard;
export { LeaderboardTable };
