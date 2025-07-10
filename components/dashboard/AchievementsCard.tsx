"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollArrow } from "../ScrollArrow";

const AchievementsCard = () => {
  const achievements = [
    { name: "7-Day Streak", isCompleted: true },
    { name: "14-Day Streak", isCompleted: true },
    { name: "30-Day Streak", isCompleted: false },
    { name: "Vocab Master", isCompleted: false },
    { name: "Grammar Pro", isCompleted: false },
    { name: "Tonal Hero", isCompleted: false },
    { name: "Culture Keeper", isCompleted: false },
    { name: "Language Master", isCompleted: true },
    { name: "History Hero", isCompleted: true },
    { name: "Tonal Hero", isCompleted: false },
    { name: "Culture Keeper", isCompleted: false },
    { name: "Language Master", isCompleted: true },
    { name: "History Hero", isCompleted: true },
    { name: "Tonal Hero", isCompleted: false },
    { name: "Culture Keeper", isCompleted: false },
    { name: "Language Master", isCompleted: true },
    { name: "History Hero", isCompleted: true },
     { name: "Culture Keeper", isCompleted: false },
    { name: "Language Master", isCompleted: true },
    { name: "History Hero", isCompleted: true },
    { name: "Tonal Hero", isCompleted: false },
    { name: "Culture Keeper", isCompleted: false },
    { name: "Language Master", isCompleted: true },
  ];

  const scrollRef: any = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = (direction: any) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
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
    }
    return () => {
      if (ref) ref.removeEventListener("scroll", updateArrowVisibility);
    };
  }, []);

  return (
<div
  className="relative flex bg-white items-center p-6 rounded-lg gap-10 w-full overflow-hidden"
  style={{ 
    fontFamily: "Lexend",
    boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)"
  }}
>
      {/* Left Section */}
      <section className="min-w-[100px] flex-shrink-0">
        <div className="flex flex-col gap-[14px]">
          <div className="text-[#737477] flex flex-col gap-2 font-[400] text-[14px] leading-[100%]">
            <span className="whitespace-nowrap">ACHIEVEMENTS</span>
            <span className="whitespace-nowrap">UNLOCKED</span>
          </div>
          <div className="font-bold text-[#ED2DA0] text-[18px] leading-[100%] whitespace-nowrap">
            RANK #12 / 90
          </div>
        </div>
      </section>

      {/* Scroll Arrows */}
      {showLeftArrow && (
        <div className="absolute z-50 left-45 top-1/2">
          <ScrollArrow direction="left" onClick={() => handleScroll("left")} />
        </div>
      )}
      {showRightArrow && (
        <div className="absolute z-50 top-1/2 right-2">
          <ScrollArrow
            direction="right"
            onClick={() => handleScroll("right")}
          />
        </div>
      )}

      {/* Achievements Section */}
      <section ref={scrollRef} className="flex overflow-x-auto scrollbar-hide">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex flex-shrink-0 flex-col justify-center items-center gap-[10px] p-4 rounded-lg"
          >
            <div className="flex-shrink-0 z-10 flex justify-center items-center rounded-full w-[51.94px] h-[51.94px]"
            style={{backgroundColor: item.isCompleted ? "#24A5EE" : "#E4E4E4"}}
            >
              <div className="relative w-[24px] h-[24px]">
                <Image
                  src="/userDashboard/dashboard-streak-badge.svg"
                  alt="Badge"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-[14px] text-[#333333] font-[400] leading-[145%] whitespace-nowrap text-center"
            style={{color: item.isCompleted ? "#333333" : "#CCCCCC"}}
            >
              {item.name}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AchievementsCard;
