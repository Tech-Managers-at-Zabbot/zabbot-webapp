"use client";
import React from "react";

// ─── Skeleton pulse animation ───────────────────────────────────────────────
const skeletonStyle = `
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #e2d5b8 0%,
    #f0e6cc 40%,
    #f5edd8 50%,
    #f0e6cc 60%,
    #e2d5b8 100%
  );
  background-size: 600px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
`;

// ─── Reusable skeleton bar ───────────────────────────────────────────────────
const SkeletonBar = ({
  width = "100%",
  height = 12,
  radius = 9999,
}: {
  width?: string | number;
  height?: number;
  radius?: number;
}) => (
  <div
    className="skeleton-shimmer"
    style={{ width, height, borderRadius: radius }}
  />
);

// ─── Single skeleton row (mimics a leaderboard entry) ────────────────────────
const SkeletonRow = ({ rank }: { rank: number }) => {
  const rowBg =
    rank === 1
      ? "bg-[#fef9a7]/60"
      : rank === 2
        ? "bg-[#d6dde8]/60"
        : rank === 3
          ? "bg-[#F5C9A8]/60"
          : "bg-white/40";

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${rowBg}`}
      style={{ minHeight: 44 }}
    >
      {/* rank badge */}
      <div className="flex items-center justify-center w-6 flex-shrink-0">
        <SkeletonBar width={18} height={18} radius={6} />
      </div>

      {/* avatar circle */}
      <div className="flex-shrink-0 border border-black/10 rounded-full p-0.5">
        <SkeletonBar width={28} height={28} radius={9999} />
      </div>

      {/* name bar – takes remaining space */}
      <div className="flex-1 min-w-0">
        <SkeletonBar width="55%" height={12} />
      </div>

      {/* points bar – right-aligned */}
      <div className="flex-shrink-0 text-right">
        <SkeletonBar width={42} height={12} />
      </div>
    </div>
  );
};

// ─── Tab skeleton (mirrors the real tab bar) ─────────────────────────────────
const SkeletonTabs = () => (
  <div className="flex gap-2 mb-6 bg-teal-100/50 rounded-xl p-1">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-1 py-3 px-6 rounded-lg">
        <SkeletonBar width="60%" height={14} />
      </div>
    ))}
  </div>
);

// ─── LEADERBOARD LOADER ─────────────────────────────────────────────────────
const LeaderboardLoader = ({ count = 10 }: { count?: number }) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: skeletonStyle }} />
    <div className="w-full flex justify-center" style={{ fontFamily: "Lexend" }}>
      <div className="max-w-2xl w-full">
        <div className="bg-[#d3ebeb] backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          {/* title */}
          <div className="mb-6">
            <SkeletonBar width={180} height={28} radius={8} />
          </div>

          {/* tabs */}
          <SkeletonTabs />

          {/* rows */}
          <div className="space-y-1">
            {Array.from({ length: count }, (_, i) => (
              <SkeletonRow key={i} rank={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);


export default LeaderboardLoader;