"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";

export interface LessonProps {
  courseImage: string;
  courseTitle: string;
  courseSummary: string;
  courseDuration: number;
  courseTotalLessons: number;
  userProgress: number;
  courseUserLevel: string;
}

export const LessonProgressCard: React.FC<LessonProps> = (
  data: LessonProps
) => {

  const router = useRouter();

  const { setLoading } = useLoading();

  return (
    <div
      className="bg-white flex relative gap-[10px] w-[350px] sm:w-[400px] h-[188px] rounded-sm border flex-shrink-0"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="w-1/2 flex-shrink-0">
        <div className="relative w-[170px] sm:w-[194px] h-[188px]">
          <Image
            src={`${data.courseImage}`}
            alt="An image of a boy prostrating before an elderly woman in greeting"
            fill
            priority
            className="object-cover rounded-l-sm"
          />
        </div>
      </section>

      <section className="absolute hover:cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      onClick={() => {router.push("/lesson"); setLoading(true)}}
      >
        <div className="flex-shrink-0">
          <div className="relative w-[40px] sm:w-[48px] h-[40px] sm:h-[48px]">
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

      <section className="flex flex-col justify-between p-[10px] w-1/2 pr-4 min-w-0">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[16px] sm:text-[18px] leading-[100%] text-[#000000] line-clamp-2">
            {data.courseTitle}
          </h3>
          <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%] line-clamp-3">
            {data.courseSummary}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
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
  const router = useRouter();
  const { setLoading } = useLoading();
  
  return (
    <div
      className="bg-white flex flex-col relative gap-[20px] w-full max-w-[278px] min-w-[200px] h-[325px] rounded-sm border border-[#E1E1E1] flex-shrink-0 mx-auto"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="w-full">
        <div className="relative w-full h-[150px]">
          <Image
            src={`${data.courseImage}`}
            alt="An image of a boy prostrating before an elderly woman in greeting"
            fill
            priority
            className="object-cover object-top rounded-t-sm"
          />
        </div>
      </section>

      <section className="absolute hover:cursor-pointer top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2"
      onClick={() => {router.push("/lesson"); setLoading(true)}}
      >
        <div className="flex-shrink-0">
          <div className="relative w-[58px] sm:w-[68px] h-[58px] sm:h-[68px]">
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

      <section className="flex px-[10px] font-[400] text-[11px] sm:text-[12px] leading-[100%]">
        <div
          className={`px-[12px] py-[8px] border rounded-md`}
          style={{
            color:
              data.courseUserLevel === "Foundation"
                ? "#D3AF37"
                : data.courseUserLevel === "Builder"
                ? "#CF0A5C"
                : "#169A9C",
          }}
        >
          {data.courseUserLevel}
        </div>
      </section>

      <section className="flex flex-col gap-[16px] justify-between p-[10px] flex-1">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[16px] sm:text-[18px] leading-[100%] text-[#000000]">
            {data.courseTitle.length > 15 ? data.courseTitle.slice(0, 15) + "..." : data.courseTitle}
          </h3>
          <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%]">
            {data.courseSummary.length > 50 ? data.courseSummary.slice(0, 50) + "..." : data.courseSummary}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
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
  gap?: string;
  padding?: string;
  totalItems?: number;
  visibleItems?: number;
  maxWidth?: string;
}

const UserLessonDataComponent: React.FC<UserLessonDataComponentProps> = ({
  title,
  subtitle,
  children,
  gap = "24px",
  padding = "24px",
  maxWidth = "100%",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState<'left' | 'right' | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScrolling = (direction: 'left' | 'right') => {
    setIsScrolling(direction);
  };

  const stopScrolling = () => {
    setIsScrolling(null);
  };

  const updateArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    updateArrowVisibility();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateArrowVisibility);
      // Check on resize
      const resizeObserver = new ResizeObserver(updateArrowVisibility);
      resizeObserver.observe(ref);
      
      return () => {
        ref.removeEventListener("scroll", updateArrowVisibility);
        resizeObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (isScrolling && scrollRef.current) {
      const scrollDistance = isScrolling === 'left' ? -50 : 50;
      
      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({
            left: scrollDistance,
            behavior: 'auto'
          });
        }
      }, 16); // ~60fps for smooth scrolling
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <div
      className={`flex flex-col gap-[${gap}] border shadow-sm border-[#EAECF0] rounded-lg bg-white w-full`}
      style={{
        fontFamily: "Lexend", 
        maxWidth, 
        padding,
      }}
    >
      <section className="flex justify-between items-start flex-wrap gap-4">
        <div className="min-w-0 flex-1 flex flex-col gap-2">
          <h3 className="font-semibold text-[20px] sm:text-[24px] leading-[100%] text-[#162B6E]">
            {title}
          </h3>
          <span className="font-semibold text-[13px] sm:text-[15px] leading-[100%] text-[#207EC5]">
            {subtitle}
          </span>
        </div>
        <div className="flex gap-[16px] flex-shrink-0">
          <TfiArrowCircleLeft
            size={32}
            color={showLeftArrow ? "#737477" : "#cccccc"}
            className={`select-none ${showLeftArrow ? "hover:cursor-pointer" : "cursor-not-allowed"}`}
            onMouseDown={showLeftArrow ? () => startScrolling('left') : undefined}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={showLeftArrow ? () => startScrolling('left') : undefined}
            onTouchEnd={stopScrolling}
          />
          <TfiArrowCircleRight
            size={32}
            color={showRightArrow ? "#737477" : "#cccccc"}
            className={`select-none ${showRightArrow ? "hover:cursor-pointer" : "cursor-not-allowed"}`}
            onMouseDown={showRightArrow ? () => startScrolling('right') : undefined}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={showRightArrow ? () => startScrolling('right') : undefined}
            onTouchEnd={stopScrolling}
          />
        </div>
      </section>
      <section 
        className="overflow-x-auto scrollbar-hide" 
        ref={scrollRef}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {children}
      </section>
    </div>
  );
};

export default UserLessonDataComponent;