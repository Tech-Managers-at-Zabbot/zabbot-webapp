import React from "react";
import UserLessonDataComponent, {
  LessonProgressCard,
  LessonProps,
} from "./UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import { DailyGoals, WordForTheDay } from "./UserGoals";

const ProgressSection = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-[20px] w-full">
      <section className="flex-1 xl:w-[58%] w-full">
        <UserLessonDataComponent
          title={"Immersing you in Yorùbá, one step at a time"}
          subtitle={"Almost there! Just 4 more steps in your journey"}
          maxWidth="100%"
        >
          <section className="flex gap-[15px]">
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