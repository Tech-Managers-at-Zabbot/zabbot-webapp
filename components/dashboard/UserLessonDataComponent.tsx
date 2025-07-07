import React from "react";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";

export interface LessonProps {
  courseImage: string;
  courseTitle: string;
  courseSummary: string;
  courseDuration: number;
  courseTotalLessons: number;
  userProgress: number;
  courseUserLevel: string;
}

export const LessonProgressCard: React.FC<LessonProps> = (data: LessonProps) => {
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
            {data.courseSummary}
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


export const CoursesCard: React.FC<LessonProps> = (data: LessonProps) => {
  return (
    <div
      className="bg-white flex flex-col relative gap-[20px] w-[278px] h-[325px] rounded-sm border"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="w-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[278px] h-[150px]">
            <Image
              src={`${data.courseImage}`}
              alt="An image of a boy prostrating before an elderly woman in greeting"
              fill
              priority
              className="object-cover rounded-t-sm"
            />
          </div>
        </div>
      </section>

      <section className="absolute hover:cursor-pointer top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex-shrink-0">
          <div className="relative w-[68px] h-[68px]">
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

      <section className="flex px-[10px] font-[400] text-[12px] leading-[100%]">
      <div className={`px-[12px] py-[8px] border rounded-md`}
      style={{color: data.courseUserLevel === "Foundation" ? "#D3AF37" : data.courseUserLevel === "Builder" ? "#CF0A5C" : "#169A9C" }}
      >
        {data.courseUserLevel}
      </div>
      </section>

      <section className="flex flex-col gap-[16px] justify-between p-[10px]">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[18px] leading-[100%] text-[#000000]">
            {data.courseTitle}
          </h3>
          <div className="font-light text-[#666666] text-[12px] leading-[100%]">
            {data.courseSummary}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data.courseDuration} min</span>
            <span>{data.courseTotalLessons} lessons</span>
          </div>
        </div>
      </section>
    </div>
  );
};


interface UserLessonDataComponentProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  gap?:string;
  padding?:string;
  totalItems?: number;
  visibleItems?: number;
  maxWidth?:string
}

const UserLessonDataComponent: React.FC<UserLessonDataComponentProps> = ({ title, subtitle, children, gap="24px", padding="24px", maxWidth="761px" }) => {
  return (
    <div className={`flex flex-col gap-[${gap}] border shadow-sm border-[#EAECF0] rounded-lg bg-white overflow-x-auto`}
    style={{fontFamily: "Lexend", maxWidth, padding}}
    >
        <section className="flex justify-between">
            <div>
                <h3 className="font-semibold text-[24px] leading-[100%] text-[#162B6E]">{title}</h3>
                <span className="font-semibold text-[15px] leading-[100%] text-[#207EC5]">{subtitle}</span>
            </div>
            <div className="flex gap-[16px]">
                <TfiArrowCircleLeft size={40} color={"#737477"} className="hover:cursor-pointer"/>
                <TfiArrowCircleRight size={40} color={"#737477"} className="hover:cursor-pointer" />
            </div>
        </section>
        <section className="">
          {children}
        </section>
    </div>
  );
};

export default UserLessonDataComponent;
