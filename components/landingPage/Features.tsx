"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const FeaturesSection = () => {
  const imageArray = [
    { src: "/landingPage/conversation.svg", alt: "AI Conversational Tutor Feature" },
    { src: "/landingPage/pronunciation.svg", alt: "Pronunciation Feedback Feature" },
    { src: "/landingPage/interactive.png", alt: "Interactive Practice with Story-based learning Feature" },
    { src: "/landingPage/progress.svg", alt: "Real Conversations, Real Progress Feature" },
  ];

  const flipVariants: Variants = {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } // ✅ valid easing value
    },
    exit: { 
      rotateY: 180, 
      opacity: 0, 
      transition: { duration: 0.6, ease: "easeIn" } // ✅ valid easing value
    },
  };

  return (
    <div
      className="bg-[#0488c8] gap-12 lg:gap-[72.24px] flex flex-col text-[#EFF0F3] py-16 md:py-[96px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px]"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Header Section */}
      <section className="flex flex-col justify-center items-center gap-3 lg:gap-[14.45px]">
        <div className="text-[#FFFFFF] font-[600] text-3xl sm:text-4xl md:text-5xl leading-normal lg:leading-[19.86px]">
          Key Features
        </div>
        <div className="lg:text-[30px] text-center leading-[28px] lg:leading-[45.78px]">
          Built for heritage language learners who want more than just vocabulary drills.
        </div>
      </section>

      {/* Images Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {imageArray.map((image, index) => (
          <motion.div
            key={index}
            className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 [transform-style:preserve-3d]"
            variants={flipVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      25vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default FeaturesSection;
