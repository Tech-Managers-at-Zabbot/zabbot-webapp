"use client";
import { useLessonContext } from "@/contexts/LessonContext";
import LessonIntro from "./LessonIntro";
import ContentRenderer from "./ContentRenderer";
import QuizRenderer from "./QuizRenderer";
import Loader from "../general/Loader";
import { EmptyStateCard } from "../general/EmptyState";
import LessonCompleteComponent from "./LessonComplete";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
// import { CustomSpinner } from "../CustomSpinner";

const LessonContent = () => {
  const {
    lesson,
    currentContent,
    currentQuiz,
    navigateToCompletion,
    contents,
    quizzes,
    isLoading,
    nextContent,
    nextQuiz,
    previousContent,
    previousQuiz,
    startQuizPhase,
    completeLesson,
    startLesson,
    // currentContentIndex,
    // currentQuizIndex,
    isFirstContent,
    isLastContent,
    isFirstQuiz,
    isLastQuiz,
    currentStep,
    submitQuizAnswer,
  } = useLessonContext();

  // Handle quiz submission
  const handleQuizSubmit = (
    quizId: string,
    userAnswer: string,
    isCorrect: boolean
  ) => {
    submitQuizAnswer(quizId, userAnswer, isCorrect);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!lesson || (contents.length === 0 && quizzes.length === 0)) {
    return (
      <div className="bg-[#fef7d0] min-h-screen text-[black]">
        <div className="flex flex-col items-center justify-center pt-10">
          <EmptyStateCard
            title="No Data"
            subtitle="Lesson not found, please try again"
          />
        </div>
      </div>
    );
  }

  // Determine what to render based on current step
  const renderContent = () => {
    switch (currentStep) {
      case "intro":
        return (
          <LessonIntro
            lesson={lesson}
            lessonNumber={lesson?.orderNumber}
            onClick={startLesson}
          />
        );

      case "content":
        return (
          <ContentRenderer
            content={currentContent}
            onNext={nextContent}
            onPrevious={previousContent}
            canGoBack={!isFirstContent}
            isLastContent={isLastContent && quizzes.length === 0}
            lessonTitle={lesson?.title}
            onComplete={()=> {completeLesson(); navigateToCompletion()}}
          />
        );

      case "lesson-completed":
        return (
          <div
            style={{ fontFamily: "Lexend" }}
            className="w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-12 px-4 md:px-6 py-8"
          >
            <section className="items-center justify-center">
              <div className="text-[20px] md:text-[36px] text-center font-medium text-[#F15B29] leading-[150%]">
                End of Steps! Practice time.
              </div>
            </section>
            <section className="mt-6 w-full flex items-center justify-center">
              <LessonCompleteComponent />
            </section>
            <section className="z-10 mt-6 flex-col md:flex-row gap-2 md:gap-0 flex w-full max-w-[800px] justify-between items-center">
              <InAppButton
                onClick={previousContent}
                disabledColor="#C98F5DCC"
                background={`#5A2E10`}
              >
                <div className={`px-6 py-3 z-10 rounded-lg font-medium`}>
                  ← Previous
                </div>
              </InAppButton>

              <InAppButton
                onClick={() => {
                  if (quizzes.length > 0) {
                    startQuizPhase();
                  } else {
                  completeLesson(); 
                   navigateToCompletion()
                  }
                }}
                background={`#5A2E10`}
                disabledColor="#C98F5DCC"
              >
                <div>Next →</div>
              </InAppButton>
            </section>
          </div>
        );

      case "quiz":
        return (
          <QuizRenderer
            quiz={currentQuiz}
            onNext={nextQuiz}
            onPrevious={previousQuiz}
            canGoBack={!isFirstQuiz || contents.length > 0}
            isLastQuiz={isLastQuiz}
            lessonTitle={lesson?.title}
            onComplete={()=> {completeLesson(); navigateToCompletion()}}
            onQuizSubmit={handleQuizSubmit}
          />
        );

      case "completed":
        // You can create a LessonCompleted component or navigate directly
        return (
          <div className="text-center">
           <CustomSpinner title="Saving Progress..." spinnerColor="#5A2E10"/>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-[#fef7d0] py-10 flex flex-col relative justify-center min-h-screen w-full"
      style={{ fontFamily: "Lexend" }}
    >
      <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-bottom bg-no-repeat min-h-[150px]"></header>

      {/* Progress Bar */}
      {/* <section className="bg-red-900 h-10 w-full absolute top-0">
      <div className='w-full'>
      <ProgressBar progress={progressPercentage} />
        </div>
      </section> */}

      <section className="flex z-10 flex-col justify-center w-full items-center">
        {renderContent()}
      </section>

      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[100px] z-0"></footer>
    </div>
  );
};

export default LessonContent;
