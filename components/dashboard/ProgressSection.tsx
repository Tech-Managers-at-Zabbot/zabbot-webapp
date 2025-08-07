/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
} from "./UserLessonDataComponent";
import { DailyGoals, WordForTheDay } from "./UserGoals";
import { useUserGoals } from "@/contexts/UserGoalsContext";
import { useGetCoursesWithLessons } from "@/services/generalApi/lessons/mutation";
import { EmptyStateCard } from "../general/EmptyState";
import { DashboardMetricCardSkeleton } from "../skeletonLoaders/DashboardSkeletons";
import { useRouter } from "next/navigation";
import { getShuffledImages } from "@/utilities/utilities";


const imagePathsArr: string[] = [
  "/userDashboard/yoruba/yoruba1.png",
  "/userDashboard/yoruba/yoruba2.png",
  "/userDashboard/yoruba/yoruba3.png",
  "/userDashboard/yoruba/yoruba4.png",
  "/userDashboard/yoruba/yoruba5.png",
];


const ProgressSection = () => {
  const { userDetails } = useUserGoals();

  const router = useRouter();

  const { data: coursesWithLessons, isLoading: lessonsLoading } =
    useGetCoursesWithLessons(userDetails?.languageId);

  const course = coursesWithLessons?.data?.course;

  const courseLessons = coursesWithLessons?.data?.lessons;

    // Prepare a shuffled copy of images to assign to lessons without repetition
    const shuffledImages = useMemo(() => getShuffledImages(imagePathsArr), []);

    // Keep track of next image index (wrap around)
    // const [imageIndex, setImageIndex] = useState(0);
  
    // Map lessons with assigned images based on imageIndex and reset logic
    const lessonsWithImages = useMemo(() => {
      if (!courseLessons) return [];
      return courseLessons.map((lesson:Record<string, any>, idx:number) => {
        const img = shuffledImages[idx % shuffledImages.length];
        return { ...lesson, imagePath: img };
      });
    }, [courseLessons, shuffledImages]);
    
  return (
    <div className="flex flex-col xl:flex-row gap-[20px] w-full">
      <section className="flex-1 xl:w-[58%] w-full">
        <UserLessonDataComponent
          title={"Immersing you in Yorùbá, one step at a time"}
          subtitle={
            courseLessons?.length && courseLessons?.length > 0
              ? `Almost there! Just ${courseLessons?.length} more ${
                  courseLessons?.length === 1 ? "step" : "steps"
                } in your journey`
              : "No data yet"
          }
          maxWidth="100%"
        >
          <section className="flex gap-[15px] min-w-max">
            {lessonsLoading ? (
              <div className="flex gap-[15px] min-w-max">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DashboardMetricCardSkeleton key={index} />
                ))}
              </div>
            ) : !coursesWithLessons?.data || !courseLessons?.length ? (
              <div className="flex gap-[15px] min-w-max">
                <EmptyStateCard
                  // key={index}
                  title="No data"
                  subtitle="No courses yet"
                />
              </div>
            ) : (
              lessonsWithImages?.map(
                (lessonData: Record<string, any>, index: number) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    onClick={() =>
                      router.push(
                        `/lesson/${course?.id}/${lessonData?.id}/learn-intro`
                      )
                    }
                  >
                    <LessonProgressCard
                      data={lessonData} 
                      courseId={course?.id}
                      lessonId={lessonData?.id}
                      imagePath={lessonData.imagePath}
                    />
                  </div>
                )
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>

      <section className="flex-shrink-0 xl:w-[40%] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <div className="h-full">
            <DailyGoals />
          </div>
          <div className="h-full">
            <WordForTheDay />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressSection;
