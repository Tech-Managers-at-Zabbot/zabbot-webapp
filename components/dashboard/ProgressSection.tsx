/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
} from "./UserLessonDataComponent";
import { useGetLanguageLessons, useGetUserLessons } from "@/services/generalApi/lessons/mutation";
import { useUser } from "@/contexts/UserContext";
import { EmptyStateCard } from "../general/EmptyState";
import { DashboardMetricCardSkeleton } from "../skeletonLoaders/DashboardSkeletons";
import { usePageLanguage } from "@/contexts/LanguageContext";
import { useSubscriptionEntitlement } from "@/lib/subscription-gating/useSubscriptionEntitlement";
import { resolveTileAccess } from "@/lib/subscription-gating/tileAccess";
import { isFreePreviewLesson } from "@/lib/subscription-gating/freePreview";
import { SubscriptionTileOverlay } from "@/lib/subscription-gating/SubscriptionTileOverlay";
import { orderStepsByJourney } from "@/lib/steps/orderStepsByJourney";

const ProgressSection = () => {
  const { getPageText } = usePageLanguage("userDashboard");
  const { userDetails } = useUser();
  const { state: entitlementState } = useSubscriptionEntitlement();
  const gatingEnabled = process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE === "true";
  // Reuse the same language-scoped, Journey-enriched dataset as the Steps page.
  const { data: allLessonsData, isLoading: allLessonsLoading } = useGetLanguageLessons(userDetails?.languageId);
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
              // Keep the Home carousel in exactly the same Journey/Step order as the Steps page.
              orderStepsByJourney(allLessonsData.data)
                .map(
                  (lessonData: Record<string, any>, index: number) => (
                    <div key={lessonData?.id ?? index} className="relative flex-shrink-0">
                      {(() => {
                        const tileState = resolveTileAccess({
                          isActive: lessonData?.isActive === true && lessonData?.course?.isActive !== false,
                          isFreePreview: isFreePreviewLesson(lessonData?.id),
                          entitlement: entitlementState,
                        });
                        return (
                          <>
                            <LessonProgressCard
                              data={{
                                ...lessonData,
                                // Progress belongs to this authenticated learner, not a shared lesson record.
                                userProgress: lessonData?.isActive === false ? 0 : (progressByLesson.get(lessonData?.id)?.percentageCompletion ?? 0),
                                isCompleted: lessonData?.isActive !== false && progressByLesson.get(lessonData?.id)?.isCompleted === true,
                              }}
                              courseId={lessonData?.courseId}
                              lessonId={lessonData?.id}
                              imagePath={lessonData.lessonImg || "/userDashboard/yoruba/coming-soon.svg"}
                              isClickable={gatingEnabled ? tileState === "accessible" : lessonData?.isActive === true}
                            />
                            {gatingEnabled && <SubscriptionTileOverlay state={tileState} />}
                          </>
                        );
                      })()}
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
