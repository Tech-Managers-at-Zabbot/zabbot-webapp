import React from "react";
import UserLessonDataComponent, {
  CoursesCard,
  LessonProps,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";

const PopularCourses = () => {
  return (
    <div className="flex gap-[30px] overflow-x-scroll">
      <section>
        <UserLessonDataComponent
          title={"Journey into Yorùbá language & life."}
          subtitle={"You're 4 lessons away from the finish line!"}
          maxWidth=""
        >
          <section className="flex gap-[15px]">
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
