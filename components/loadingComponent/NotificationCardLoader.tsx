"use client";
import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

const NewNotificationsSettingsCardSkeleton = () => {
  return (
    <div
      className="bg-white border shadow-lg flex flex-col border-[#FEF3C6] rounded-2xl px-4 sm:px-6 py-6 sm:py-10"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
        <Skeleton className="rounded-2xl h-12 w-12" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4 sm:gap-8 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#FEF3C6] py-2 sm:py-4"
          >
            <div className="flex gap-4 items-start sm:items-center w-full">
              <Skeleton className="h-12 w-12 rounded-[14px]" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-52" />
              </div>
            </div>
            <Skeleton className="h-8 w-14 mt-2 sm:mt-0 rounded-full" />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
};

export default NewNotificationsSettingsCardSkeleton;
