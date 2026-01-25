// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// // import { ScrollArrow } from "../ScrollArrow";
// import { Modal, useModal } from "../general/Modal"; // Adjust path as needed
// import InAppButton from "../InAppButton"; // Adjust path as needed
// import { useTheme } from "@/contexts/ThemeProvider";
// import { usePageLanguage } from "@/contexts/LanguageContext";

// const AchievementsCard = () => {

//   const { getPageText } = usePageLanguage("userDashboard");

//   const { getPageText: badgesText } = usePageLanguage("badges");

//   const achievements = [
//     { name: badgesText('first_steps'), isCompleted: true },
//     { name: badgesText('7_day_streak'), isCompleted: false },
//     { name: badgesText('14_Day_streak'), isCompleted: false },
//     { name: badgesText('30_day_streak'), isCompleted: false },
//     { name: badgesText('social_scholar'), isCompleted: false },
//     { name: badgesText('tone_tamer'), isCompleted: false },
//     { name: badgesText('vocab_master'), isCompleted: false },
//     { name: badgesText('grammar_pro'), isCompleted: false },
//     { name: badgesText('daily_spark'), isCompleted: false },
//     { name: badgesText('word_warrior'), isCompleted: false },
//     { name: badgesText('tone_boss'), isCompleted: false },
//     { name: badgesText('culture_keeper'), isCompleted: false },
//     // { name: "Chatterbox", isCompleted: false },
//     // { name: "Audio Ace", isCompleted: false },
//     // { name: "Story Seeker", isCompleted: false },
//     // { name: "Phrase Crafter", isCompleted: false },
//     // { name: "Sound Sensei", isCompleted: false },
//     // { name: "Flashcard Fan", isCompleted: false },
//     // { name: "Quiz King/Queen", isCompleted: false },
//     // { name: "Consistency Champ", isCompleted: false },
//     // { name: "Voice Verified", isCompleted: false },
//     // { name: "Language Guardian", isCompleted: false },
//     // { name: "Zabbot Star", isCompleted: false },
//   ];

//   const { theme } = useTheme();

//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isScrolling, setIsScrolling] = useState<"left" | "right" | null>(null);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   // Modal hook
//   const { isOpen: isModalOpen, openModal, closeModal } = useModal();

//   // Check if screen is mobile
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768); // md breakpoint
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const startScrolling = (direction: "left" | "right") => {
//     setIsScrolling(direction);
//   };

//   const stopScrolling = () => {
//     setIsScrolling(null);
//   };

//   const updateArrowVisibility = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       setShowLeftArrow(scrollLeft > 0);
//       setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
//     }
//   };

//   useEffect(() => {
//     if (!isMobile) {
//       updateArrowVisibility();
//       const ref = scrollRef.current;
//       if (ref) {
//         ref.addEventListener("scroll", updateArrowVisibility);
//       }
//       return () => {
//         if (ref) ref.removeEventListener("scroll", updateArrowVisibility);
//       };
//     }
//   }, [isMobile]);

//   useEffect(() => {
//     if (isScrolling && scrollRef.current && !isMobile) {
//       const scrollDistance = isScrolling === "left" ? -30 : 30;

//       intervalRef.current = setInterval(() => {
//         if (scrollRef.current) {
//           scrollRef.current.scrollBy({
//             left: scrollDistance,
//             behavior: "auto",
//           });
//         }
//       }, 16); // ~60fps for smooth scrolling
//     } else {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     }
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isScrolling, isMobile]);

//   // Mobile render
//   if (isMobile) {
//     return (
//       <>
//         <div
//           className={`relative flex flex-col gap-4 z-1 ${
//             theme === "dark" ? "bg-[#1E375A]" : "bg-white"
//           } items-center justify-between p-6 rounded-lg w-full`}
//           style={{
//             fontFamily: "Lexend",
//             boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)",
//           }}
//         >
//           {/* Left Section */}
//           <section className="flex-shrink-0">
//             <div className="flex flex-col gap-[14px]">
//               <div className="text-[#737477] flex flex-col gap-2 text-center font-[400] text-[14px] leading-[100%]">
//                 <span className="whitespace-nowrap">
//                   {getPageText("achievements")}
//                 </span>
//                 <span className="whitespace-nowrap text-[#F96129]">
//                   {getPageText("unlocked")} 1/23
//                 </span>
//               </div>
//               {/* <div className="font-bold text-center text-[#ED2DA0] text-[18px] leading-[100%] whitespace-nowrap">
//                 RANK #12 / 90
//               </div> */}
//             </div>
//           </section>

//           {/* Button Section */}
//           <section className="">
//             <InAppButton
//               title="See Badges"
//               onClick={openModal}
//               width="auto"
//               height="60px"
//               paddingLeft="16px"
//               paddingRight="16px"
//               background={"#162B6E"}
//               color="white"
//               borderRadius="8px"
//             />
//           </section>
//         </div>

//         {/* Modal */}
//         <Modal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           title="Your Badges"
//           size="lg"
//         >
//           <div className="p-6">
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//               {achievements.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col justify-center items-center gap-[10px] p-4 rounded-lg"
//                 >
//                   <div
//                     className="flex-shrink-0 flex justify-center items-center rounded-full w-[51.94px] h-[51.94px]"
//                     style={{
//                       backgroundColor: item.isCompleted ? "#24A5EE" : "#E4E4E4",
//                     }}
//                   >
//                     {/* {item.icon ? (
//                       <div className="text-white text-[24px]">
//                         {item.icon}
//                       </div>
//                     ) : ( */}
//                     <div className="relative w-[24px] h-[24px]">
//                       <Image
//                         src="/userDashboard/dashboard-streak-badge.svg"
//                         alt="Badge"
//                         fill
//                         priority
//                         className="object-contain"
//                       />
//                     </div>
//                     {/* )} */}
//                   </div>
//                   <div
//                     className="text-[12px] text-[#333333] font-[400] leading-[145%] text-center"
//                     style={{ color: item.isCompleted ? "#333333" : "#CCCCCC" }}
//                   >
//                     {item.name}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Modal>
//       </>
//     );
//   }

//   // Desktop render (original layout)
//   return (
//     <div
//       className={`relative flex z-1 ${
//         theme === "dark" ? "bg-[#1E375A]" : "bg-white"
//       } items-center p-6 rounded-lg gap-10 w-full overflow-hidden`}
//       style={{
//         fontFamily: "Lexend",
//         boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)",
//       }}
//     >
//       {/* Left Section */}
//       <section className="min-w-[100px] flex-shrink-0">
//         <div className="flex flex-col gap-[14px]">
//           <div className="text-[#737477] flex flex-col gap-2 font-[700] text-[14px] leading-[100%]">
//             <span className="whitespace-nowrap">
//               {getPageText("achievements")}
//             </span>
//             <span className="whitespace-nowrap text-[#F96129]">
//               {getPageText("unlocked")} 1/23
//             </span>
//           </div>
//           {/* <div className="font-bold text-[#ED2DA0] text-[18px] leading-[100%] whitespace-nowrap">
//             RANK #12 / 90
//           </div> */}
//         </div>
//       </section>

//       {/* Scroll Arrows */}
//       {/* {showLeftArrow && (
//         <div className="absolute z-1 left-45 top-1/2">
//           <ScrollArrow
//             direction="left"
//             onMouseDown={() => startScrolling("left")}
//             onMouseUp={stopScrolling}
//             onMouseLeave={stopScrolling}
//             onTouchStart={() => startScrolling("left")}
//             onTouchEnd={stopScrolling}
//           />
//         </div>
//       )}
//       {showRightArrow && (
//         <div className="absolute z-1 top-1/2 right-2">
//           <ScrollArrow
//             direction="right"
//             onMouseDown={() => startScrolling("right")}
//             onMouseUp={stopScrolling}
//             onMouseLeave={stopScrolling}
//             onTouchStart={() => startScrolling("right")}
//             onTouchEnd={stopScrolling}
//           />
//         </div>
//       )} */}

//       {/* Achievements Section */}
//       <section ref={scrollRef} className="flex overflow-x-auto scroll-hidden">
//         {achievements.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-shrink-0 flex-col justify-center items-center gap-[10px] p-4 rounded-lg"
//           >
//             <div
//               className="flex-shrink-0 flex justify-center items-center rounded-full w-[51.94px] h-[51.94px]"
//               style={{
//                 backgroundColor: item.isCompleted ? "#24A5EE" : "#E4E4E4",
//               }}
//             >
//               {/* {item.icon ? (
//                 <div className="text-white text-[24px]">
//                   {item.icon}
//                 </div>
//               ) : ( */}
//               <div className="relative w-[24px] h-[24px]">
//                 <Image
//                   src="/userDashboard/dashboard-streak-badge.svg"
//                   alt="Badge"
//                   fill
//                   priority
//                   className="object-contain"
//                 />
//               </div>
//               {/* )} */}
//             </div>
//             <div
//               className="text-[14px] font-[400] leading-[145%] whitespace-nowrap text-center"
//               style={{
//                 color:
//                   item.isCompleted && theme === "dark"
//                     ? "#F0F0F0"
//                     : item.isCompleted && theme === "light"
//                     ? "#333333"
//                     : "#CCCCCC",
//               }}
//             >
//               {item.name}
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default AchievementsCard;

"use client";
import React from "react";
// import { useTheme } from "@/contexts/ThemeProvider";
import {
  FaWalking,
  FaFire,
  FaBook,
  FaBullhorn,
  FaLanguage,
  // FaStar,
  FaCrown,
} from "react-icons/fa";

export const achievementsData = [
  {
    key: "first_steps",
    title: "First Steps",
    description: "Completed your very first learning activity.",
    icon: FaWalking,
    isCompleted: true,
  },
  {
    key: "7_day_streak",
    title: "7-Day Streak",
    description: "Practiced consistently for 7 consecutive days.",
    icon: FaFire,
    isCompleted: false,
  },
  {
    key: "14_day_streak",
    title: "14-Day Streak",
    description: "Maintained learning momentum for 14 straight days.",
    icon: FaFire,
    isCompleted: false,
  },
  {
    key: "30_day_streak",
    title: "30-Day Streak",
    description: "A full month of uninterrupted learning. Outstanding!",
    icon: FaFire,
    isCompleted: false,
  },
  {
    key: "vocab_master",
    title: "Vocabulary Master",
    description: "Learned and mastered a wide range of new words.",
    icon: FaBook,
    isCompleted: false,
  },
  {
    key: "grammar_pro",
    title: "Grammar Pro",
    description: "Demonstrated strong grammar understanding.",
    icon: FaLanguage,
    isCompleted: false,
  },
  {
    key: "tone_boss",
    title: "Tone Boss",
    description: "Mastered conversational tone and expressions.",
    icon: FaBullhorn,
    isCompleted: false,
  },
  {
    key: "culture_keeper",
    title: "Culture Keeper",
    description: "Explored and understood cultural nuances.",
    icon: FaCrown,
    isCompleted: false,
  },
];

const AchievementsPage = () => {
  // const { theme } = useTheme();

  const completedCount = achievementsData.filter(
    (a) => a.isCompleted
  ).length;

  return (
    <div
      className={`w-full rounded-2xl p-6 sm:p-8 
        // theme === "dark" ? "bg-[#1E375A]" : "bg-white"
      shadow-md`}
      style={{ fontFamily: "Lexend" }}
    >
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-[500] text-[#101828]">
          Your Achievements
        </h2>
        <p className="text-sm text-[#4A5565] mt-1">
          Track your progress and unlock new milestones.
        </p>

        <div className="mt-4 text-sm font-medium text-[#1671D9]">
          {completedCount} / {achievementsData.length} achievements unlocked
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementsData.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <div
              key={index}
              className={`border rounded-xl p-5 transition-all
                ${
                  achievement.isCompleted
                    ? "border-[#1671D9] bg-[#F0F7FF]"
                    : "border-[#E4E7EC] bg-[#FAFAFA]"
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* ICON */}
                <div
                  className={`flex items-center justify-center rounded-full w-12 h-12
                    ${
                      achievement.isCompleted
                        ? "bg-[#1671D9] text-white"
                        : "bg-[#E4E4E4] text-[#98A2B3]"
                    }
                  `}
                >
                  <Icon size={20} />
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-[500] text-[#101828]">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    {achievement.description}
                  </p>

                  <span
                    className={`mt-2 inline-block text-xs font-medium px-3 py-1 rounded-full w-fit
                      ${
                        achievement.isCompleted
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {achievement.isCompleted ? "Unlocked" : "Locked"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
