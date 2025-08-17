/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";

const UserLessons = () => {
  return (
    <div className="relative flex z-1 flex-col xl:flex-row gap-[30px] w-full">
      <section className="flex-1 w-full">
        <UserLessonDataComponent
          title={"Immersing you in Yorùbá, one step at a time"}
          subtitle={"Almost there! Just 4 more steps in your journey"}
          maxWidth="100%"
        >
          <section className="flex gap-[15px] pb-4">
            {lessonProgressData.map(
              (lessonProgressData: Record<string, any>, index: number) => (
                <div key={index} className="flex-shrink-0">
                  <LessonProgressCard data={lessonProgressData} />
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