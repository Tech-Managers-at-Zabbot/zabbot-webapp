import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
  LessonProps,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";

const UserLessons = () => {
  return (
    <div className="relative flex z-1 flex-col xl:flex-row gap-[30px] w-full">
      <section className="flex-1 w-full">
        <UserLessonDataComponent
          title={"Journey into Yorùbá language & life."}
          subtitle={"You're 4 lessons away from the finish line!"}
          maxWidth="100%"
        >
          <section className="flex gap-[15px] pb-4">
            {lessonProgressData.map(
              (lessonProgressData: LessonProps, index: number) => (
                <div key={index} className="flex-shrink-0">
                  <LessonProgressCard {...lessonProgressData} />
                </div>
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>
    </div>
  );
};

export default UserLessons;