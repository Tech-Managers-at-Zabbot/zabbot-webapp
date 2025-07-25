/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { DashboardMetricCardSkeleton } from "../skeletonLoaders/DashboardSkeletons";

export interface MetricData {
  title: string;
  value: string;
  imgSrc?: string;
  icon?: any;
  loading?: boolean;
}

interface DashboardMetricCard2Props {
  data: MetricData;
}

export const DashboardMetricCard2: React.FC<DashboardMetricCard2Props> = ({
  data,
}) => {
  return (
    <>
      {data?.loading ? (
        <DashboardMetricCardSkeleton />
      ) : (
        <div
          className="bg-white w-full border border-gray-200 flex flex-col gap-[24px] rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          style={{ fontFamily: "Lexend" }}
        >
          <div className="flex justify-start items-center mb-2 sm:mb-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl leading-[100%] font-semibold text-[#162B6E] break-words">
              {data?.title}
            </h3>
          </div>

          <div className="flex justify-between items-start sm:items-center gap-4">
            <div className="mb-2 sm:mb-4 flex-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 break-words">
                {data?.value}
              </div>
            </div>

            <div className="flex justify-start sm:justify-end flex-shrink-0">
              {data?.icon}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
