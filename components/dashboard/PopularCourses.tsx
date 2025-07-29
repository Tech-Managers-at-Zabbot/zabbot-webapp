import React from "react";
import UserLessonDataComponent, {
  LessonProps,
  LessonsCard,
} from "./UserLessonDataComponent";
// import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import { useUserGoals } from "@/contexts/UserGoalsContext";
import { useGetAllCourses } from "@/services/generalApi/lessons/mutation";
import { EmptyStateCard } from "../general/EmptyState";
import { DashboardMetricCardSkeleton } from "../skeletonLoaders/DashboardSkeletons";

const PopularCourses = () => {
  const { userDetails } = useUserGoals();
  const { data: allCourses, isLoading: coursesLoading } = useGetAllCourses(
    userDetails?.languageId
  );

  return (
    <div className="flex gap-[30px]">
      <section className="flex-1 xl:max-w-[100%] w-full">
        <UserLessonDataComponent
          title={"Journey Catalog"}
          subtitle={"Meaningful Yorùbá learning — one Journey at a time"}
          maxWidth="100%"
        >
          {coursesLoading ? (
            <div className="flex gap-[15px] min-w-max">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardMetricCardSkeleton key={index} />
              ))}
            </div>
          ) : !allCourses?.data ? (
            <div className="flex gap-[15px] min-w-max">
              {Array.from({ length: 6 }).map((_, index) => (
                <EmptyStateCard
                  key={index}
                  title="No data"
                  subtitle="No courses yet"
                />
              ))}
            </div>
          ) : (
            <section className="flex gap-[15px] min-w-max">
              {allCourses?.data.map(
                (lessonProgressData: LessonProps, index: number) => (
                  <div key={index}>
                    <LessonsCard {...lessonProgressData} />
                  </div>
                )
              )}
            </section>
          )}
        </UserLessonDataComponent>
      </section>
    </div>
  );
};

export default PopularCourses;
