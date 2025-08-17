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

   const { getPageText } =
        usePageLanguage("userDashboard");

  const apiThumbnails = ["/userDashboard/yoruba/elderly-yoruba-woman.png"];

  const allCoursesWithThumbnails = Array.isArray(allCourses?.data)
    ? allCourses?.data.map((step: Record<string, any>, index: number) => ({
        ...step,
        thumbnailImage:
          apiThumbnails[index] || "/userDashboard/yoruba/coming-soon.svg",
      }))
    : [];

  const coursesToMap = [
    ...allCoursesWithThumbnails,
    {
      thumbnailImage: "/userDashboard/yoruba/journey-colors.png",
      title: "Colors, Shapes, Descriptions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/yoruba-family.png",
      title: "Family & Social Interactions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/stop-watch.png",
      title: "Numbers, Time & Daily Activities",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/golden-heart.png",
      title: "Politeness & Respect",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/big-baby.png",
      title: "Emotions & Expressions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/food.png",
      title: "Food & Market Culture",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/mat.png",
      title: "Clothing & Self-Presentation",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/chores.png",
      title: "Home & Housing",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/health.png",
      title: "Health & Well-being",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/map-of-nigeria.png",
      title: "Travel & Places",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/travel.png",
      title: "Transport & Getting Around",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/sunset.svg",
      title: "Weather, Nature & Spirituality",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/reading.svg",
      title: "Work, School & Aspirations",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/dialogue-art.png",
      title: "Conflict Resolution & Apologies",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/culture.png",
      title: "Proverbs & Everyday Wisdom",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/talking-drums.png",
      title: "Music, Dance & Pop Culture",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/festival-drums.png",
      title: "Festivals & Traditions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/customer-care.png",
      title: "Technology & Modern Life",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/nigeria-flag-and-woman.png",
      title: "News, Politics & Community Issues",
      estimatedDuration: 20,
      totalLessons: 10,
    },
  ];

  return (
    <div className="flex gap-[30px]">
      <section className="flex-1 xl:max-w-[100%] w-full">
        <UserLessonDataComponent
          title={getPageText("journey_hub")}
          subtitle={getPageText("learning_tagline")}
          maxWidth="100%"
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
                (lessonProgressData: Record<string, any>, index: number) => (
                  <div key={index}>
                    <LessonsCard
                      data={lessonProgressData}
                      isClickable={index === 0}
                    />
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
