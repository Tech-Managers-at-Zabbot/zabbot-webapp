"use client";
import LessonOneIntro from "@/components/lessons/LessonOneIntro";
import LessonOneIntroTwo from "@/components/lessons/LessonOneIntro2";
import LessonOneReady from "@/components/lessons/LessonOneReady";
import React, { useState } from "react";

const LessonData = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div
      className="bg-[#fef7d0] relative min-h-screen w-full"
      style={{ fontFamily: "Lexend" }}
    >
      <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-center bg-no-repeat min-h-[250px]"></header>
      <section className="flex flex-col py-2">
        {step === 1 && <LessonOneIntro onClick={handleNextStep} />}

        {step === 2 && <LessonOneIntroTwo onClick={handleNextStep} />}

        {step === 3 && <LessonOneReady onClick={handleNextStep} />}
      </section>
      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[100px]"></footer>
    </div>
  );
};

export default LessonData;
