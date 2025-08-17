"use client";
import React from "react";
import { LessonProvider } from "@/contexts/LessonContext";
import LessonContent from "@/components/lessons/LessonContent";
const LessonPage = () => {
  return (
    <LessonProvider>
      <LessonContent />
    </LessonProvider>
  );
};

export default LessonPage;
