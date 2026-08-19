/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserLessonDataComponent, {
  LessonsCard,
} from "./UserLessonDataComponent";
// import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import { useUser } from "@/contexts/UserContext";
import { useGetAllCourses } from "@/services/generalApi/lessons/mutation";
import { EmptyStateCard } from "../general/EmptyState";
import { DashboardMetricCardSkeleton } from "../skeletonLoaders/DashboardSkeletons";
import { usePageLanguage } from "@/contexts/LanguageContext";

const PopularCourses = () => {
  const { userDetails } = useUser();
  const { data: allCourses, isLoading: coursesLoading } = useGetAllCourses(
    userDetails?.languageId
  );

  const { getPageText } = usePageLanguage("userDashboard");

  const allCoursesWithThumbnails = Array.isArray(allCourses?.data)
    ? allCourses?.data.map((step: Record<string, any>) => ({
      ...step
    }))
    : [];

  const coursesToMap = [
    ...allCoursesWithThumbnails,
  ];

  return (
    <div className="flex gap-[30px]">
      <section className="flex-1 xl:max-w-[100%] w-full">
        <UserLessonDataComponent
          title={getPageText("journey_into_yoruba")}
          subtitle={getPageText("journey_grows")}
          maxWidth="100%"
          background="#FFF8C7"
        >
          {coursesLoading ? (
            <div className="flex gap-[15px] min-w-max">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardMetricCardSkeleton key={index} />
              ))}
            </div>
          ) : !allCourses?.data || allCourses?.data?.length === 0 ? (
            <div className="flex gap-[15px] min-w-max">
              {/* {Array.from({ length: 6 }).map((_, index) => ( */}
              <EmptyStateCard
                // key={index}
                title="No data"
                subtitle="No courses yet"
              />
              {/* ))} */}
            </div>
          ) : (
            <section className="flex gap-[15px] min-w-max">
              {coursesToMap.map(
                (lessonProgressData: Record<string, any>, index: number) => {

                  return (
                    <div key={index}>
                      <LessonsCard
                        data={lessonProgressData}
                      />

                    </div>
                  )
                }
              )}
            </section>
          )}
        </UserLessonDataComponent>
      </section>
    </div>
  );
};

export default PopularCourses;
