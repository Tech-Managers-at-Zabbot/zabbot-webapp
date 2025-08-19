"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollArrow } from "../ScrollArrow";
import { Modal, useModal } from "../general/Modal"; // Adjust path as needed
import InAppButton from "../InAppButton"; // Adjust path as needed
import { useTheme } from "@/contexts/ThemeProvider";
import { usePageLanguage } from "@/contexts/LanguageContext";

const AchievementsCard = () => {
  // const achievements = [
  //   { name: "First Steps", isCompleted: true, icon: "👣" },
  //   { name: "7-Day Streak", isCompleted: false, icon: "🔥" },
  //   { name: "14-Day Streak", isCompleted: false, icon: "📆" },
  //   { name: "30-Day Streak", isCompleted: false, icon: "🏁" },
  //   { name: "Social Scholar", isCompleted: false, icon: "📣" },
  //   { name: "Tone Tamer", isCompleted: false, icon: "🎵" },
  //   { name: "Vocab Master", isCompleted: false, icon: "📖"},
  //   { name: "Grammar Pro", isCompleted: false, icon: "🧠" },
  //   { name: "Daily Spark", isCompleted: false, icon: "⚡" },
  //   { name: "Word Warrior", isCompleted: false, icon: "🗡️" },
  //   { name: "Tone Boss", isCompleted: false, icon: "🎤" },
  //   { name: "Culture Keeper", isCompleted: false, icon: "🪘" },
  //   { name: "Chatterbox", isCompleted: false, icon: "💬" },
  //   { name: "Audio Ace", isCompleted: false, icon: "🎧" },
  //   { name: "Story Seeker", isCompleted: false, icon: "📚" },
  //   { name: "Phrase Crafter", isCompleted: false, icon: "✍️" },
  //   { name: "Sound Sensei", isCompleted: false, icon: "🧘" },
  //   { name: "Flashcard Fan", isCompleted: false, icon: "🃏" },
  //   { name: "Quiz King/Queen", isCompleted: false, icon: "👑" },
  //   { name: "Consistency Champ", isCompleted: false, icon: "⏰" },
  //   { name: "Voice Verified", isCompleted: false, icon: "🗣️" },
  //   { name: "Language Guardian", isCompleted: false, icon: "🤝" },
  //   { name: "Zabbot Star", isCompleted: false, icon: "🌟" },
  // ];


    const { getPageText } =
        usePageLanguage("userDashboard");

    const achievements = [
      { name: "First Steps", isCompleted: true },
    { name: "7-Day Streak", isCompleted: false },
    { name: "14-Day Streak", isCompleted: false },
    { name: "30-Day Streak", isCompleted: false },
    { name: "Social Scholar", isCompleted: false },
    { name: "Tone Tamer", isCompleted: false },
    { name: "Vocab Master", isCompleted: false },
    { name: "Grammar Pro", isCompleted: false },
    { name: "Daily Spark", isCompleted: false },
    { name: "Word Warrior", isCompleted: false },
    { name: "Tone Boss", isCompleted: false },
    { name: "Culture Keeper", isCompleted: false },
    { name: "Chatterbox", isCompleted: false },
    { name: "Audio Ace", isCompleted: false },
    { name: "Story Seeker", isCompleted: false },
    { name: "Phrase Crafter", isCompleted: false },
    { name: "Sound Sensei", isCompleted: false },
    { name: "Flashcard Fan", isCompleted: false },
    { name: "Quiz King/Queen", isCompleted: false },
    { name: "Consistency Champ", isCompleted: false },
    { name: "Voice Verified", isCompleted: false },
    { name: "Language Guardian", isCompleted: false },
    { name: "Zabbot Star", isCompleted: false },
  ];


  const { theme } = useTheme();

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState<"left" | "right" | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Modal hook
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    if (!isMobile) {
      updateArrowVisibility();
      const ref = scrollRef.current;
      if (ref) {
        ref.addEventListener("scroll", updateArrowVisibility);
      }
      return () => {
        if (ref) ref.removeEventListener("scroll", updateArrowVisibility);
      };
    }
  }, [isMobile]);

  useEffect(() => {
    if (isScrolling && scrollRef.current && !isMobile) {
      const scrollDistance = isScrolling === "left" ? -30 : 30;

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
  }, [isScrolling, isMobile]);

  // Mobile render
  if (isMobile) {
    return (
      <>
        <div
          className={`relative flex flex-col gap-4 z-1 ${theme === 'dark' ? 'bg-[#1E375A]' : 'bg-white'} items-center justify-between p-6 rounded-lg w-full`}
          style={{
            fontFamily: "Lexend",
            boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Left Section */}
          <section className="flex-shrink-0">
            <div className="flex flex-col gap-[14px]">
              <div className="text-[#737477] flex flex-col gap-2 text-center font-[400] text-[14px] leading-[100%]">
                <span className="whitespace-nowrap">{getPageText("achievements")}</span>
                <span className="whitespace-nowrap text-[#F96129]">{getPageText("unlocked")} 1/23</span>
              </div>
              {/* <div className="font-bold text-center text-[#ED2DA0] text-[18px] leading-[100%] whitespace-nowrap">
                RANK #12 / 90
              </div> */}
            </div>
          </section>

          {/* Button Section */}
          <section className="">
            <InAppButton
              title="See Badges"
              onClick={openModal}
              width="auto"
              height="60px"
              paddingLeft="16px"
              paddingRight="16px"
              background={"#162B6E"}
              color="white"
              borderRadius="8px"
            />
          </section>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Your Badges"
          size="lg"
        >
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-[10px] p-4 rounded-lg"
                >
                  <div
                    className="flex-shrink-0 flex justify-center items-center rounded-full w-[51.94px] h-[51.94px]"
                    style={{
                      backgroundColor: item.isCompleted ? "#24A5EE" : "#E4E4E4",
                    }}
                  >
                    {/* {item.icon ? (
                      <div className="text-white text-[24px]">
                        {item.icon}
                      </div>
                    ) : ( */}
                      <div className="relative w-[24px] h-[24px]">
                        <Image
                          src="/userDashboard/dashboard-streak-badge.svg"
                          alt="Badge"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    {/* )} */}
                  </div>
                  <div
                    className="text-[12px] text-[#333333] font-[400] leading-[145%] text-center"
                    style={{ color: item.isCompleted ? "#333333" : "#CCCCCC" }}
                  >
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </>
    );
  }

  // Desktop render (original layout)
  return (
    <div
      className={`relative flex z-1 ${theme === 'dark' ? 'bg-[#1E375A]' : 'bg-white'} items-center p-6 rounded-lg gap-10 w-full overflow-hidden`}
      style={{
        fontFamily: "Lexend",
        boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Left Section */}
      <section className="min-w-[100px] flex-shrink-0">
        <div className="flex flex-col gap-[14px]">
          <div className="text-[#737477] flex flex-col gap-2 font-[700] text-[14px] leading-[100%]">
                       <span className="whitespace-nowrap">{getPageText("achievements")}</span>
                <span className="whitespace-nowrap text-[#F96129]">{getPageText("unlocked")} 1/23</span>
          </div>
          {/* <div className="font-bold text-[#ED2DA0] text-[18px] leading-[100%] whitespace-nowrap">
            RANK #12 / 90
          </div> */}
        </div>
      </section>

      {/* Scroll Arrows */}
      {showLeftArrow && (
        <div className="absolute z-1 left-45 top-1/2">
          <ScrollArrow
            direction="left"
            onMouseDown={() => startScrolling("left")}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={() => startScrolling("left")}
            onTouchEnd={stopScrolling}
          />
        </div>
      )}
      {showRightArrow && (
        <div className="absolute z-1 top-1/2 right-2">
          <ScrollArrow
            direction="right"
            onMouseDown={() => startScrolling("right")}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={() => startScrolling("right")}
            onTouchEnd={stopScrolling}
          />
        </div>
      )}

      {/* Achievements Section */}
      <section ref={scrollRef} className="flex overflow-x-auto scroll-hidden">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex flex-shrink-0 flex-col justify-center items-center gap-[10px] p-4 rounded-lg"
          >
            <div
              className="flex-shrink-0 flex justify-center items-center rounded-full w-[51.94px] h-[51.94px]"
              style={{
                backgroundColor: item.isCompleted ? "#24A5EE" : "#E4E4E4",
              }}
            >
              {/* {item.icon ? (
                <div className="text-white text-[24px]">
                  {item.icon}
                </div>
              ) : ( */}
                <div className="relative w-[24px] h-[24px]">
                  <Image
                    src="/userDashboard/dashboard-streak-badge.svg"
                    alt="Badge"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              {/* )} */}
            </div>
            <div
              className="text-[14px] font-[400] leading-[145%] whitespace-nowrap text-center"
              style={{ color: item.isCompleted && theme === 'dark' ? '#F0F0F0' : item.isCompleted && theme === 'light' ? "#333333" : "#CCCCCC" }}
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