/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
} from "./UserLessonDataComponent";
// import { DailyGoals, WordForTheDay } from "./UserGoals";
import { useUser } from "@/contexts/UserContext";
import { useGetCoursesWithLessons, useGetAllLessons } from "@/services/generalApi/lessons/mutation";
import { EmptyStateCard } from "../general/EmptyState";
import { DashboardMetricCardSkeleton } from "../skeletonLoaders/DashboardSkeletons";
// import { useRouter } from "next/navigation";
// import { getShuffledImages } from "@/utilities/utilities";
import { usePageLanguage } from "@/contexts/LanguageContext";

// const imagePathsArr: string[] = ["/userDashboard/say-hello.svg"];

const ProgressSection = () => {
  const { getPageText } = usePageLanguage("userDashboard");
  const { data: allLessonsData, isLoading: allLessonsLoading } = useGetAllLessons();

  return (
    <div className="flex flex-col xl:flex-row gap-[20px] w-full z-10">
      <section className="flex-1 xl:w-[58%] w-full">
        <UserLessonDataComponent
          title={getPageText("immersion_tagline")}
          subtitle={getPageText("empowering_you")}
          maxWidth="100%"
        >
          <section className="flex gap-[15px] min-w-max">
            {allLessonsLoading ? (
              <div className="flex gap-[15px] min-w-max">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DashboardMetricCardSkeleton key={index} />
                ))}
              </div>
            ) : !allLessonsData?.data || !allLessonsData.data.length ? (
              <div className="flex gap-[15px] min-w-max">
                <EmptyStateCard
                  // key={index}
                  title="No data"
                  subtitle="No Lesson yet"
                />
              </div>
            ) : (
              allLessonsData?.data?.map(
                (lessonData: Record<string, any>, index: number) => (
                  <div key={index} className="flex-shrink-0">
                    <LessonProgressCard
                      data={lessonData}
                      courseId={lessonData?.courseId}
                      lessonId={lessonData?.id}
                      imagePath={lessonData.lessonImg || "/userDashboard/yoruba/coming-soon.svg"
                      }
                      isClickable={lessonData?.isActive}
                    />
                  </div>
                )
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>

      {/* <section className="flex-shrink-0 xl:w-[40%] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <div className="h-full">
            <DailyGoals />
          </div>
          <div className="h-full">
            <WordForTheDay />
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ProgressSection;
