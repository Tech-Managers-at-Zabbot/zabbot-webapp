"use client";
import { useLessonContext } from "@/contexts/LessonContext";
import LessonIntro from "./LessonOneIntro";
import ContentRenderer from "./ContentRenderer";
// import ProgressBar from './ProgressBar';
import Loader from "../general/Loader";
// import LessonComplete from './LessonComplete';
// import { useState } from 'react';
import { EmptyStateCard } from "../general/EmptyState";

const LessonContent = () => {
  // const [ showIntro, setShowIntro ] = useState(true);

  const {
    lesson,
    currentContent,
    // currentContentIndex,
    navigateToCompletion,
    contents,
    isLoading,
    nextContent,
    previousContent,
    completeLesson,
    startLesson,
    currentContentIndex,
    // progressPercentage,
    isFirstContent,
    isLastContent,
  } = useLessonContext();

  const showIntro = currentContentIndex === -1;

  if (isLoading) {
    return <Loader />;
  }

  if (!lesson || contents.length === 0) {
    return (
      <div className="bg-[#fef7d0] min-h-screen text-[black]">
        <EmptyStateCard title="No Data" subtitle="Lesson not found" />
      </div>
    );
  }
  return (
    <div
      className="bg-[#fef7d0] flex justify-center relative min-h-screen w-full"
      style={{ fontFamily: "Lexend" }}
    >
      <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-center bg-no-repeat min-h-[200px]"></header>

      {/* Progress Bar */}
      {/* <div className='pt-20'>
      <ProgressBar progress={progressPercentage} />
        </div> */}

      <section className="flex flex-col justify-center w-full items-center">
        {showIntro ? (
          <LessonIntro
            // lesson={lesson}
            lessonNumber={lesson?.orderNumber}
            onClick={startLesson}
          />
        ) : (
          <ContentRenderer
            content={currentContent}
            onNext={isLastContent ? completeLesson : nextContent}
            onPrevious={previousContent}
            canGoBack={!isFirstContent}
            isLastContent={isLastContent}
            onComplete={navigateToCompletion}
          />
        )}
      </section>

      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[100px]"></footer>
    </div>
  );
};

export default LessonContent;
