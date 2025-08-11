/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";
import { useTheme } from "@/contexts/ThemeProvider";

export const LessonProgressCard = ({
  data,
  courseId,
  lessonId,
  imagePath = '/lessons/yoruba.avif',
  isClickable = true
}: {
  data: Record<string, any>;
  courseId?: string;
  lessonId?: string;
  imagePath?:string;
  isClickable?: boolean;
}) => {
  const router = useRouter();

  const { setLoading } = useLoading();



  return (
    <div
  className={`bg-white flex relative transition-all duration-300 gap-[10px] w-[350px] sm:w-[400px] h-[188px] rounded-sm border flex-shrink-0 ${
    isClickable 
      ? 'hover:cursor-pointer transform hover:scale-105 hover:shadow-xl' 
      : 'opacity-60 cursor-not-allowed'
  }`}
  style={{ fontFamily: "Lexend" }}
  onClick={() => {
    if (isClickable) {
      router.push(`/lesson/${courseId}/${lessonId}/learn-intro`);
      setLoading(true);
    }
  }}
>
      <section className="w-1/2 flex-shrink-0">
        <div className="relative w-[170px] sm:w-[194px] h-full">
          <Image
            src={imagePath}
            alt="An image of a boy prostrating before an elderly woman in greeting"
            fill
            priority
            className="object-cover rounded-l-sm"
          />
        </div>
      </section>
      {/* 
      <section
        className="absolute hover:cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={() => {
          router.push("/lesson");
          setLoading(true);
        }}
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
      </section> */}

      <section className="flex flex-col justify-between p-[10px] w-1/2 pr-4 min-w-0">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[16px] sm:text-[18px] leading-[100%] text-[#000000] line-clamp-2">
            {data?.title?.length > 15
              ? data?.title.slice(0, 15) + "..."
              : data?.title}
          </h3>
          {/* <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%] line-clamp-3">
          {data?.description?.length > 50
              ? data?.description.slice(0, 50) + "..."
              : data?.description}
          </div> */}
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data?.estimatedDuration} min</span>
            <span>{data?.totalContents} sparks</span>
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

export const CoursesCard = ({ data, isClickable = false }: { data: any; isClickable?: boolean }) => {
  const router = useRouter();
  const { setLoading } = useLoading();

  const { theme } = useTheme();


  return (
    <div
      className={`flex flex-col relative gap-[20px] w-full h-[330px] rounded-[14px] border border-[#254E83] ${ isClickable ? 'hover:cursor-pointer transform hover:scale-105 hover:shadow-xl' : 'opacity-60 cursor-not-allowed'}`}
      style={{
        fontFamily: "Lexend",
        background: theme === "dark" ? "#012657" : "#FFFFFF",
      }}
      onClick={() => {
        if(isClickable){
        router.push(`/lesson/${data?.id}`);
        setLoading(true);
        }
      }}
    >
      <section className="w-full rounded-lg p-2">
        <div className="relative rounded-lg w-full p-2 h-[200px]">
          <Image
            src={data?.thumbnailImage || "/lessons/yoruba.avif"}
            alt="Course Banner Image"
            fill
            priority
            className="object-cover rounded-lg object-top rounded-t-sm"
          />
        </div>
      </section>

      {/* <section
        className="absolute hover:cursor-pointer top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2"
        onClick={() => {
          router.push("/lesson");
          setLoading(true);
        }}
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
      </section> */}

      {/* <section className="flex px-[10px] font-[400] text-[11px] sm:text-[12px] leading-[100%]">
        <div
          className={`px-[12px] py-[8px] border rounded-md`}
          style={{
            color:
              data?.level === "foundation"
                ? "#D3AF37"
                : data.level === "builder"
                ? "#CF0A5C"
                : "#169A9C",
          }}
        >
          {data?.level}
        </div>
      </section> */}

      <section className="flex flex-col gap-[16px] justify-between p-[10px] flex-1">
        <div className="flex flex-col gap-[8px]">
          <h3
            className="font-medium text-[16px] sm:text-[18px] leading-[100%]"
            style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}
          >
            {data?.title?.length > 50
              ? data?.title.slice(0, 50) + "..."
              : data?.title}
          </h3>
          {/* <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%]">
            {data?.description?.length > 50
              ? data?.description.slice(0, 50) + "..."
              : data?.description}
          </div> */}
        </div>

        <div className="flex flex-col gap-[4px]">
          <div
            className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%]"
            style={{ color: theme === "dark" ? "#7AACD3" : "#333333" }}
          >
            <span>{data?.estimatedDuration} min</span>
            <span>
              {data?.totalLessons} {data?.totalLessons === 1 ? "step" : "steps"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LessonsCard = ({ data, isClickable = false }: { data: any; isClickable?:boolean }) => {
  const router = useRouter();
  const { setLoading } = useLoading();

  return (
    <div
      // className="bg-white hover:cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col relative gap-[20px] w-full max-w-[278px] min-w-[200px] h-[325px] rounded-lg border border-[#E1E1E1] flex-shrink-0 mx-auto"
      className={`flex flex-col relative gap-[20px] w-full h-[330px] max-w-[278px] min-w-[300px] rounded-[14px] border border-[#254E83] ${ isClickable ? 'hover:cursor-pointer transform hover:scale-105 hover:shadow-xl' : 'opacity-60 cursor-not-allowed'}`}
      style={{ fontFamily: "Lexend" }}
      onClick={() => {
        if(isClickable){
        router.push(`/lesson/${data?.id}`);
        setLoading(true);
        }
      }}
    >
      <section className="w-full p-1">
        <div className="relative w-full h-[200px]">
          <Image
            src={data?.thumbnailImage || "/lessons/yoruba.avif"}
            alt="An image of a boy prostrating before an elderly woman in greeting"
            fill
            priority
            className="object-cover object-top rounded-lg"
          />
        </div>
      </section>

      {/* <section
        className="absolute hover:cursor-pointer top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2"
        onClick={() => {
          router.push("/lesson");
          setLoading(true);
        }}
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
      </section> */}

      {/* <section className="flex px-[10px] font-[400] text-[11px] sm:text-[12px] leading-[100%]">
        <div
          className={`px-[12px] py-[8px] border rounded-md`}
          style={{
            color:
              data.level === "foundation"
                ? "#D3AF37"
                : data.level === "builder"
                ? "#CF0A5C"
                : "#169A9C",
          }}
        >
          {data?.level}
        </div>
      </section> */}

      <section className="flex flex-col gap-[16px] justify-between p-[10px] flex-1">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[16px] sm:text-[18px] leading-[100%] text-[#000000]">
            {data?.title?.length > 50
              ? data?.title.slice(0, 50) + "..."
              : data?.title}
          </h3>
          {/* <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%]">
            {data?.description?.length > 50
              ? data?.description.slice(0, 50) + "..."
              : data?.description}
          </div> */}
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data?.estimatedDuration} min</span>
            <span>
              {data?.totalLessons} {data?.totalLessons === 1 ? "step" : "steps"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LessonsCard2 = ({ data, isClickable = false }: { data: any; isClickable?:boolean }) => {
  const router = useRouter();
  const { setLoading } = useLoading();
  const { theme } = useTheme();

  return (
    <div
      // className="bg-white hover:cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col relative gap-[20px] w-full max-w-[278px] min-w-[200px] h-[300px] rounded-lg border border-[#E1E1E1] flex-shrink-0 mx-auto"
      className={`flex flex-col relative gap-[20px] w-full h-[300px] rounded-[14px] border border-[#254E83] ${ isClickable ? 'hover:cursor-pointer transform hover:scale-105 hover:shadow-xl' : 'opacity-60 cursor-not-allowed'}`}
      style={{ fontFamily: "Lexend" }}
      onClick={() => {
        if(isClickable){
        router.push(`/lesson/${data?.courseId}/${data?.id}/learn-intro`);
        setLoading(true);
        }
      }}
    >
      <section className="w-full p-1">
        <div className="relative w-full h-[170px]">
          <Image
            src={data?.thumbnailImage}
            alt="An image of a boy prostrating before an elderly woman in greeting"
            fill
            priority
            className="object-cover rounded-[14px] object-top"
          />
        </div>
      </section>

      {/* <section
        className="absolute hover:cursor-pointer top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2"
        onClick={() => {
          router.push("/lesson");
          setLoading(true);
        }}
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
      </section> */}

      {/* <section className="flex px-[10px] font-[400] text-[11px] sm:text-[12px] leading-[100%]">
        <div
          className={`px-[12px] py-[8px] border rounded-md`}
          style={{
            color:
              data.level === "foundation"
                ? "#D3AF37"
                : data.level === "builder"
                ? "#CF0A5C"
                : "#169A9C",
          }}
        >
          {data?.level}
        </div>
      </section> */}

      <section className="flex flex-col gap-[16px] justify-between p-[10px] flex-1">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-medium text-[16px] sm:text-[18px] leading-[100%]"
          style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}
          >
            {data?.title?.length > 50
              ? data?.title.slice(0, 50) + "..."
              : data?.title}
          </h3>
          {/* <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%]">
            {data?.description?.length > 50
              ? data?.description.slice(0, 50) + "..."
              : data?.description}
          </div> */}
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data?.estimatedDuration} min</span>
            <span>
              {data?.totalContents}{" "}
              {data?.totalContents === 1 ? "step" : "steps"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};


export const StepsCard = ({ data, isClickable = false }: { data: any; isClickable?: boolean }) => {
  const router = useRouter();
  const { setLoading } = useLoading();

  const { theme } = useTheme();


  return (
    <div
      className={`flex flex-col relative gap-[20px] w-full h-[330px] rounded-[14px] border border-[#254E83] ${ isClickable ? 'hover:cursor-pointer transform hover:scale-105 hover:shadow-xl' : 'opacity-60 cursor-not-allowed'}`}
      style={{
        fontFamily: "Lexend",
        background: theme === "dark" ? "#012657" : "#FFFFFF",
      }}
      onClick={() => {
        if(isClickable){
        router.push(`/lesson/${data?.courseId}/${data?.id}/learn-intro`);
        setLoading(true);
        }
      }}
    >
      <section className="w-full p-2">
        <div className="relative rounded-lg w-full p-2 h-[200px]">
          <Image
            src={data?.thumbnailImage || "/userDashboard/yoruba/coming-soon.svg"}
            alt="Course Banner Image"
            fill
            priority
            className="object-cover object-top rounded-t-sm"
          />
        </div>
      </section>

      {/* <section
        className="absolute hover:cursor-pointer top-1/2 right-0.5 transform -translate-x-1/2 -translate-y-1/2"
        onClick={() => {
          router.push("/lesson");
          setLoading(true);
        }}
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
      </section> */}

      {/* <section className="flex px-[10px] font-[400] text-[11px] sm:text-[12px] leading-[100%]">
        <div
          className={`px-[12px] py-[8px] border rounded-md`}
          style={{
            color:
              data?.level === "foundation"
                ? "#D3AF37"
                : data.level === "builder"
                ? "#CF0A5C"
                : "#169A9C",
          }}
        >
          {data?.level}
        </div>
      </section> */}

      <section className="flex flex-col gap-[16px] justify-between p-[10px] flex-1">
        <div className="flex flex-col gap-[8px]">
          <h3
            className="font-medium text-[16px] sm:text-[18px] leading-[100%]"
            style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}
          >
            {data?.title?.length > 50
              ? data?.title.slice(0, 50) + "..."
              : data?.title}
          </h3>
          {/* <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%]">
            {data?.description?.length > 50
              ? data?.description.slice(0, 50) + "..."
              : data?.description}
          </div> */}
        </div>

        <div className="flex flex-col gap-[4px]">
          <div
            className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%]"
            style={{ color: theme === "dark" ? "#7AACD3" : "#333333" }}
          >
            <span>{data?.estimatedDuration} min</span>
            <span>
              {data?.totalContents} {data?.totalContents === 1 ? "spark" : "sparks"}
            </span>
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
  const [isScrolling, setIsScrolling] = useState<"left" | "right" | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScrolling = (direction: "left" | "right") => {
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
      const scrollDistance = isScrolling === "left" ? -50 : 50;

      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({
            left: scrollDistance,
            behavior: "auto",
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
      className={`flex flex-col h-full min-h-[350px] gap-[${gap}] border shadow-sm border-[#EAECF0] rounded-lg bg-white w-full`}
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
            className={`select-none ${
              showLeftArrow ? "hover:cursor-pointer" : "cursor-not-allowed"
            }`}
            onMouseDown={
              showLeftArrow ? () => startScrolling("left") : undefined
            }
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={
              showLeftArrow ? () => startScrolling("left") : undefined
            }
            onTouchEnd={stopScrolling}
          />
          <TfiArrowCircleRight
            size={32}
            color={showRightArrow ? "#737477" : "#cccccc"}
            className={`select-none ${
              showRightArrow ? "hover:cursor-pointer" : "cursor-not-allowed"
            }`}
            onMouseDown={
              showRightArrow ? () => startScrolling("right") : undefined
            }
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={
              showRightArrow ? () => startScrolling("right") : undefined
            }
            onTouchEnd={stopScrolling}
          />
        </div>
      </section>
      <section
        className="overflow-x-auto scrollbar-hide"
        ref={scrollRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </section>
    </div>
  );
};

export default UserLessonDataComponent;
