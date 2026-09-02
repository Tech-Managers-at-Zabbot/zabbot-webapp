/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import { useLessonContext } from "@/contexts/LessonContext";

const LessonConclusionComponent = () => {
  const { lesson } = useLessonContext();

  return (
    <div className="min-h-[300px] sm:min-h-[400px] w-full max-w-[800px] sm:max-w-[900px] flex flex-col justify-center items-center"
    style={{ fontFamily: "Lexend" }}
    >
      <section className="w-full">
        <div className="text-center flex flex-col justify-center items-center p-4 w-full mb-8">
          <div className="w-full max-w-[400px] sm:max-w-[500px] mb-6 sm:mb-8 relative">
            {/* Main lesson image */}
            {lesson?.lessonImg && (
              <div className="relative w-full h-[200px] md:h-[320px]">
                <Image
                  src={lesson?.lessonImg}
                  alt="Lesson Image"
                  fill
                  priority
                  className="object-cover rounded-[20px] opacity-50"
                />
              </div>
            )}

            {/* Overlay mascot and text */}
            <div className="absolute inset-0 flex flex-col items-center gap-6 justify-center">
              {/* "All Done!" Text */}
              <h2
                className="text-white text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg"
                style={{ fontFamily: "Lexend" }}
              >
                All done!
              </h2>

              {/* Mascot Image */}
              <div className="relative w-50 h-50 sm:w-80 sm:h-60">
                <img
                  src="/lessons/end-lesson-mascot.png"
                  alt="End Lesson Mascot"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

        </div>


      </section>
    </div>
  );
};

export default LessonConclusionComponent;
