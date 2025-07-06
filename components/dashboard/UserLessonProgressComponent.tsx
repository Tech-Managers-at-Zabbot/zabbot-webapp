import React from "react";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";

export interface LessonProps {
  courseImage: string;
  courseTitle: string;
  courseSummary: string;
  courseDuration: number;
  courseTotalLessons: number;
  userProgress: number;
  courseUserLevel: string;
}

const LessonCard: React.FC<LessonProps> = (data: LessonProps) => {
  return (
    <div
      className="bg-white flex relative gap-[10px] w-[400px] h-[188px] rounded-sm border"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="w-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[194px] h-[188px]">
            <Image
              src={`${data.courseImage}`}
              alt="An image of a boy prostrating before an elderly woman in greeting"
              fill
              priority
              className="object-cover rounded-l-sm"
            />
          </div>
        </div>
      </section>

      <section className="absolute hover:cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[48px] h-[48px]">
            <Image
              src="/userDashboard/hand-click-element.svg"
              alt="A hand clicking the card"
              fill
              priority
              className="object-cover rounded-l-sm"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between p-[10px] w-1/2 pr-4">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[18px] leading-[100%] text-[#000000]">
            {data.courseTitle}
          </h3>
          <div className="font-light text-[#666666] text-[12px] leading-[100%]">
            Let&apos;s learn how to say HELLO depending on the time of day.
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data.courseDuration} min</span>
            <span>{data.courseTotalLessons} lessons</span>
          </div>
          <div className="w-full">
            <LinearProgress
              className=""
              value={data.userProgress}
              variant="determinate"
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#6FB6C8",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#162B6E",
                  borderRadius: 5,
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const UserLessonProgressComponent = () => {
  return (
    <div className="flex max-w-[761px] overflow-x-scroll gap-[15px]">
      {lessonProgressData.map(
        (lessonProgressData: LessonProps, index: number) => (
          <div key={index}>
            <LessonCard {...lessonProgressData} />
          </div>
        )
      )}
    </div>
  );
};

export default UserLessonProgressComponent;
