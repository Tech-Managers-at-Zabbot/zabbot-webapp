import React from 'react';
import { Box, CircularProgress } from "@mui/material";

const skeletonPulse = {
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "@keyframes pulse": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
  },
};

export const DailyGoalsSkeleton = () => {
  return (
    <div
      className="bg-white justify-between shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
      style={{ fontFamily: "Lexend" }}
    >
      <section>
        {/* Title skeleton */}
        <div
          className="h-[24px] sm:h-[28px] md:h-[32px] bg-gray-200 rounded w-[120px] mb-2"
          style={skeletonPulse}
        />
        {/* Subtitle skeleton */}
        <div
          className="h-[14px] sm:h-[16px] md:h-[18px] bg-gray-200 rounded w-full max-w-[300px]"
          style={skeletonPulse}
        />
        <div
          className="h-[14px] sm:h-[16px] md:h-[18px] bg-gray-200 rounded w-[80%] mt-1"
          style={skeletonPulse}
        />
      </section>

      <section className="flex h-full justify-center items-center my-2 sm:my-4">
        {/* Circular progress skeleton */}
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={5}
            sx={{
              color: "#F2F4F7",
            }}
          />
          <CircularProgress
            variant="determinate"
            value={0}
            size={120}
            thickness={5}
            sx={{
              color: "#E5E7EB",
              position: "absolute",
              left: 0,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Percentage text skeleton */}
            <div
              className="h-[24px] w-[40px] bg-gray-200 rounded"
              style={skeletonPulse}
            />
          </Box>
        </Box>
      </section>
    </div>
  );
};

export const WordForTheDaySkeleton = () => {
  return (
    <div
      className="bg-white justify-between items-center shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Title skeleton */}
      <div
        className="h-[23px] sm:h-[26px] md:h-[30px] bg-gray-200 rounded w-[140px]"
        style={skeletonPulse}
      />

      {/* Main word skeleton */}
      <div
        className="h-[36px] sm:h-[42px] md:h-[48px] bg-gray-200 rounded w-[160px] my-2 sm:my-4"
        style={skeletonPulse}
      />

      <div className="flex flex-col gap-[12px] sm:gap-[16px] md:gap-[20px] w-full">
        {/* Description skeleton */}
        <div className="space-y-2">
          <div
            className="h-[16px] sm:h-[18px] md:h-[20px] bg-gray-200 rounded w-full"
            style={skeletonPulse}
          />
          <div
            className="h-[16px] sm:h-[18px] md:h-[20px] bg-gray-200 rounded w-[85%]"
            style={skeletonPulse}
          />
        </div>

        {/* Speaker button skeleton */}
        <div className="flex justify-center items-center">
          <div
            className="rounded-full w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] bg-gray-200 border border-gray-300"
            style={skeletonPulse}
          />
        </div>
      </div>
    </div>
  );
};

export const DashboardMetricCardSkeleton = () => {
return (
  <div
    className="bg-white w-full border border-gray-200 flex flex-col gap-[24px] rounded-lg p-4 sm:p-6 shadow-sm animate-pulse"
    style={{ fontFamily: "Lexend" }}
  >
    <div className="flex justify-start items-center mb-2 sm:mb-4">
      <div className="h-5 sm:h-6 lg:h-7 bg-gray-200 rounded w-3/4 max-w-xs"></div>
    </div>

    <div className="flex justify-between items-start sm:items-center gap-4">
      <div className="mb-2 sm:mb-4 flex-1">
        <div className="h-6 sm:h-8 lg:h-9 bg-gray-200 rounded w-1/2 max-w-sm mb-2"></div>
      </div>

      <div className="flex justify-start sm:justify-end flex-shrink-0">
        <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);
};