/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
} from "./UserLessonDataComponent";
import { useGetAllLessons, useGetUserLessons } from "@/services/generalApi/lessons/mutation";
import { useUser } from "@/contexts/UserContext";
import { EmptyStateCard } from "../general/EmptyState";
import { DashboardMetricCardSkeleton } from "../skeletonLoaders/DashboardSkeletons";
import { usePageLanguage } from "@/contexts/LanguageContext";

const ProgressSection = () => {
  const { getPageText } = usePageLanguage("userDashboard");
  const { userDetails } = useUser();
  const { data: allLessonsData, isLoading: allLessonsLoading } = useGetAllLessons();
  const { data: userLessonsData, isLoading: userLessonsLoading } = useGetUserLessons();
  const trackedLessons = Array.isArray(userLessonsData?.data) ? userLessonsData.data : [];
  const progressByLesson = new Map<string, { percentageCompletion?: number; isCompleted?: boolean }>(
    trackedLessons
      .filter((item: { lessonId?: string; languageId?: string }) =>
        item.lessonId && item.languageId === userDetails?.languageId)
      .map((item: { lessonId: string; percentageCompletion?: number; isCompleted?: boolean }) => [item.lessonId, item])
  );

  return (
    <div className="flex flex-col xl:flex-row gap-[20px] w-full z-10">
      <section className="flex-1 xl:w-[58%] w-full">
        <UserLessonDataComponent
          title={getPageText("immersion_tagline")}
          subtitle={getPageText("empowering_you")}
          maxWidth="100%"
        >
          <section className="flex gap-[15px] min-w-max">
            {allLessonsLoading || userLessonsLoading ? (
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
              [...allLessonsData.data]
                .sort(
                  (a: Record<string, any>, b: Record<string, any>) =>
                    Number(Boolean(b?.isActive)) - Number(Boolean(a?.isActive))
                )
                .map(
                  (lessonData: Record<string, any>, index: number) => (
                    <div key={index} className="flex-shrink-0">
                      <LessonProgressCard
                        data={{
                          ...lessonData,
                          // Progress belongs to this authenticated learner, not a shared lesson record.
                          userProgress: progressByLesson.get(lessonData?.id)?.percentageCompletion ?? 0,
                          isCompleted: progressByLesson.get(lessonData?.id)?.isCompleted === true,
                        }}
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
    </div>
  );
};

export default ProgressSection;
