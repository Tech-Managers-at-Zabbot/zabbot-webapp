/* eslint-disable @next/next/no-img-element */
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
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import LanguageToggle from "../languageToggle/LanguageToggle";
import LessonProgress from "./LessonProgressTracker";
import { Modal } from "../general/Modal";
import { useLoading } from "@/contexts/LoadingProvider";
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
    currentContentIndex,
    // currentQuizIndex,
    isFirstContent,
    isLastContent,
    isFirstQuiz,
    isLastQuiz,
    currentStep,
    submitQuizAnswer,
    goToContent,
  } = useLessonContext();

  // Handle quiz submission
  const handleQuizSubmit = (
    quizId: string,
    userAnswer: string,
    isCorrect: boolean,
    attemptNumber: number,
    scoreEarned: number
  ) => {
    console.log(`Quiz submitted: ${quizId}, Answer: ${userAnswer}, Correct: ${isCorrect}`);
    submitQuizAnswer(quizId, userAnswer, isCorrect, attemptNumber, scoreEarned);
  };
  const { setLoading } = useLoading();
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [homeModal, setHomeModal] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);

  const router = useRouter();

  const handleRedirectHome = () => {
    setLoading(true);
    setHomeLoading(true);
    setDashboardLoading(true);
    router.push("/user-dashboard");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!lesson || (contents.length === 0 && quizzes.length === 0)) {
    return (
      <div className="bg-[#FEECBC] min-h-screen text-[black]">
        <div className="flex flex-col items-center justify-center pt-10">
          <EmptyStateCard
            title="No Data"
            subtitle="Lesson not found, please try again"
          />
        </div>
      </div>
    );
  }

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
            lessonImg={lesson?.lessonImg}
            onComplete={() => {
              completeLesson();
              navigateToCompletion();
            }}
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
            {!isFirstContent && (
              <div
                className="text-[#F15B29] hover:cursor-pointer hover:text-[#5A2E10]"
                onClick={() => goToContent(0)}
              >
                Go back to the beginning
              </div>
            )}
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
                    navigateToCompletion();
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
            onComplete={() => {
              completeLesson();
              navigateToCompletion();
            }}
            onQuizSubmit={handleQuizSubmit}
          />
        );

      case "completed":
        // You can create a LessonCompleted component or navigate directly
        return (
          <div className="text-center">
            <CustomSpinner title="Saving Progress..." spinnerColor="#5A2E10" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-[#fef7d0] flex flex-col pt-10 relative min-h-screen w-full"
      style={{ fontFamily: "Lexend" }}
    >
      <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-bottom bg-no-repeat min-h-[250px]"></header>

      <div className="flex px-[5%] justify-between relative items-center">
        <div className="flex relative items-center gap-3 sm:gap-4">
          <button
            className={`cursor-pointer ${dashboardLoading ? "cursor-not-allowed" : "cursor-pointer"
              } text-[#ebebeb] hover:text-[#B6822E] p-2 sm:p-3 rounded-full transition`}
            onClick={() => {
              setHomeModal(true);
            }}
            disabled={dashboardLoading}
          >
            <FaArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          <button
            className="cursor-pointer p-2 sm:p-3 rounded-full hover:bg-white/10 transition"
            onClick={() => {
              setHomeModal(true);
            }}
            disabled={dashboardLoading}
          >
            <img
              src="/lessons/lessons-home.svg"
              alt="home"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-[55px] md:h-[55px]"
              onClick={() => {
                router.push("/user-dashboard");
              }}
            />
          </button>
        </div>

        {currentStep !== "intro" &&
          currentStep !== "lesson-completed" &&
          currentStep !== "completed" && (
            <div className="flex gap-2 sm:gap-4 items-center">
              <div className="bg-[#FBCCBD] px-3 py-2 sm:p-2 rounded-full flex items-center gap-1 sm:gap-2">
                <img
                  src="/lessons/fire.svg"
                  alt="fire"
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                <span className="text-[#CC400C] font-semibold text-sm sm:text-lg md:text-xl">
                  7
                </span>
              </div>

              <div
                className={`bg-[#EB5017] px-3 py-2 sm:p-2 rounded-full flex items-center gap-1 sm:gap-2 
                             //   startLoading || dashboardLoading
                             //     ? "cursor-not-allowed"
                             //     : "cursor-pointer"
                             // }
                             `}
              // onClick={() => {
              //   if (startLoading || dashboardLoading) return;
              //   setDashboardLoading(true);
              //   router.push("/user-dashboard");
              // }}
              >
                <FiHeart className="w-4 h-4 sm:w-6 sm:h-6" fill="#FEEFEA" />
                <span className="text-[#FEEFEA] font-semibold text-sm sm:text-lg md:text-xl">
                  5
                </span>
              </div>

              <div>
                <LanguageToggle
                  backgroundColor="#064a00"
                  color="#FFFFFF"
                  borderColor="#D9F3FF"
                  dropDownBgColor="#064a00"
                />
              </div>
            </div>
          )}
      </div>

      {/* Progress Bar */}
      {/* <section className="bg-red-900 h-10 w-full absolute top-0">
      <div className='w-full'>
      <ProgressBar progress={progressPercentage} />
        </div>
      </section> */}

      <section className="flex z-10 flex-col gap-10 justify-center w-full items-center">
        {currentStep === "content" && (
          <LessonProgress
            lessonNumber={lesson?.orderNumber}
            lessonTitle={lesson?.title}
            totalSteps={lesson?.totalContents}
            currentStep={currentContentIndex + 1}
          />
        )}
        {renderContent()}
      </section>

      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[100px] z-0"></footer>

      {homeModal && (
        <Modal
          isOpen={homeModal}
          onClose={() => setHomeModal(false)}
          title="Are you sure you?"
          showCloseButton={false}
        >
          <div className="p-6 text-center">
            <p className="text-lg leading-[30px] text-[#252525] font-[400] mb-6">
              Your progress is automatically saved, so you can pick up right
              where you left off. Feel free to exit at any time everything will
              be here when you return.
            </p>
            <div className="flex justify-center gap-4">
              <InAppButton
                background="#EBEBEB"
                onClick={() => setHomeModal(false)}
                disabled={homeLoading}
              >
                <div className="text-[#252424]">Stay</div>
              </InAppButton>
              <InAppButton
                background="#5A2E10"
                color="#FFFFFF"
                onClick={handleRedirectHome}
                disabled={homeLoading}
              >
                {homeLoading ? <CustomSpinner /> : "Exit"}
              </InAppButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LessonContent;
