/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useParams } from "next/navigation";
import {
  useGetCourseLessons
} from "@/services/generalApi/lessons/mutation";

import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";
import { EmptyStateCard } from "@/components/general/EmptyState";
import { LessonsCard2 } from "../dashboard/UserLessonDataComponent";
import { useTheme } from "@/contexts/ThemeProvider";

const AllCourseLessons = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { theme } = useTheme();

  const { data: _courseLessons, isLoading: isCourseLessonsLoading } =
    useGetCourseLessons(courseId);

  const courseInfo = _courseLessons?.data;

  return (
    <div
      className="z-2 shadow-lg gap-4 md:gap-6 lg:gap-10 flex flex-col rounded-lg w-full max-w-full overflow-hidden"
      style={{
        fontFamily: "Lexend",
        color: "#162B6E",
        padding: "16px",
        background: theme === "dark" ? "#012657" : "white",
      }}
    >
      {/* Header Section - Made fully responsive */}
      <header className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <section className="min-w-0 flex-1">
          <span
            className="font-semibold flex flex-col text-[18px] sm:text-[20px] lg:text-[24px] leading-tight text-[#162B6E]"
            style={{ color: theme === "dark" ? "white" : "#162B6E" }}
          >
            {/* Immersing you in Yorùbá, one step at a time */}
            {isCourseLessonsLoading
              ? "Loading course details..."
              : courseInfo[0]?.course?.title || "Course Title"}
          </span>
          <span
            className="font-semibold text-[12px] sm:text-[13px] lg:text-[15px] leading-tight text-[#207EC5] mt-1"
            style={{ color: "#207EC5" }}
          >
            {/* Building fluency through culture, sound, and everyday moments. */}
            {isCourseLessonsLoading
              ? null
              : courseInfo[0]?.course?.description || "Course Description"}
          </span>
        </section>
      </header>

      {/* Courses Grid Section - Fully responsive grid */}
      <section className="w-full min-w-0">
        <div className="w-full">
          {isCourseLessonsLoading ? (
            <div className="w-full flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardMetricCardSkeleton key={index} />
              ))}
            </div>
          ) : !courseInfo ||
            courseInfo.length === 0 ? (
            <div className="w-full flex gap-2">
              <EmptyStateCard title="No data" subtitle="No courses yet" />
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] auto-rows-fr">
              {courseInfo?.map(
                (lessonProgressData: Record<string, any>, index: number) => (
                  <div
                    key={index}
                    className="min-w-0 w-full flex justify-center"
                  >
                    <div className="w-full max-w-[278px]">
                      <LessonsCard2
                        data={lessonProgressData}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#EAECF0] w-full"></div>
    </div>
  );
};

export default AllCourseLessons;
