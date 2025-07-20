import React from "react";
import UserLessonDataComponent, {
  CoursesCard,
  LessonProps,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";

const PopularCourses = () => {
  return (
    <div className="flex gap-[30px]">
      <section className="flex-1 xl:max-w-[100%] w-full">
        <UserLessonDataComponent
          title={"Popular Courses"}
          subtitle={"Top Yorùbá courses learners love!"}
          maxWidth="100%"
        >
          <section className="flex gap-[15px] min-w-max">
            {lessonProgressData.map(
              (lessonProgressData: LessonProps, index: number) => (
                <div key={index}>
                  <CoursesCard {...lessonProgressData} />
                </div>
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>
    </div>
  );
};

export default PopularCourses;
