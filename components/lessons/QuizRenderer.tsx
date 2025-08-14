/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
import QuizSuccessModal from "./QuizSuccessModal";
import QuizFailureModal from "./QuizFailureModal";
import { FaKeyboard } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

enum QuizType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  FILL_IN_BLANK = "FILL_IN_BLANK",
}

interface QuizRendererProps {
  quiz: Record<string, any>;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuiz: boolean;
  onComplete: () => void;
  lessonTitle?: string;
  onQuizSubmit?: (
    quizId: string,
    userAnswer: string,
    isCorrect: boolean
  ) => void;
}

const QuizRenderer: React.FC<QuizRendererProps> = ({
  quiz,
  onNext,
  onPrevious,
  canGoBack,
  isLastQuiz,
  onComplete,
  // lessonTitle,
  onQuizSubmit,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [fillInAnswer, setFillInAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    console.log("QuizRenderer mounted with quiz:", quiz);
  }, []);

  if (!quiz) return null;

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
    const correct = option === quiz.correctOption;
    setIsCorrect(correct);
    setShowResult(true);
    setHasSubmitted(correct); // Only lock if correct

    if (onQuizSubmit) {
      onQuizSubmit(quiz.id, option, correct);
    }
  };

  const handleFillInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasSubmitted) {
      setFillInAnswer(e.target.value);
    }
  };

  const handleSubmitAnswer = () => {
    let userAnswer = "";
    let correct = false;

    if (quiz.quizType === QuizType.MULTIPLE_CHOICE) {
      userAnswer = selectedAnswer;
      correct = selectedAnswer === quiz.correctOption;
    } else if (quiz.quizType === QuizType.FILL_IN_BLANK) {
      userAnswer = fillInAnswer.trim();
      correct = userAnswer.toLowerCase() === quiz.correctAnswer?.toLowerCase();
    }

    setIsCorrect(correct);
    setShowResult(true);
    setHasSubmitted(correct); // Only lock if correct

    if (onQuizSubmit) {
      onQuizSubmit(quiz.id, userAnswer, correct);
    }
  };

  const handleNext = () => {
    if (isLastQuiz) {
      setCompleteLoading(true);
      onComplete();
    } else {
      setSelectedAnswer("");
      setFillInAnswer("");
      setShowResult(false);
      setIsCorrect(false);
      setHasSubmitted(false);
      onNext();
    }
  };

  const canSubmit = () => {
    if (isCorrect) return false;
    if (quiz.quizType === QuizType.MULTIPLE_CHOICE) {
      return selectedAnswer !== "";
    } else if (quiz.quizType === QuizType.FILL_IN_BLANK) {
      return fillInAnswer.trim() !== "";
    }
    return false;
  };

  const renderMultipleChoice = () => (
    <div
      className="space-y-3 w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl px-4"
      style={{ fontFamily: "Lexend" }}
    >
      {quiz.options?.map((option: string, index: number) => (
        <button
          key={index}
          onClick={() => handleOptionSelect(option)}
          disabled={hasSubmitted && isCorrect}
          className={`
            w-full p-3 md:p-4 text-center rounded-[28px] border-2 transition-all duration-200
            ${
              selectedAnswer === option
                ? hasSubmitted
                  ? isCorrect && selectedAnswer === option
                    ? "bg-green-100 border-green-500 text-green-800"
                    : !isCorrect && selectedAnswer === option
                    ? "bg-red-100 border-red-500 text-red-800"
                    : "bg-blue-100 border-blue-500 text-blue-800"
                  : "bg-blue-100 border-blue-500 text-blue-800"
                : hasSubmitted && option === quiz.correctOption
                ? "bg-green-100 border-green-500 text-green-800"
                : "bg-white border-[#0F973D] text-[#202124] hover:border-gray-400"
            }
            ${
              hasSubmitted && isCorrect
                ? "cursor-default"
                : "cursor-pointer hover:shadow-md"
            }
          `}
        >
          <span className="font-medium text-sm md:text-base">{option}</span>
        </button>
      ))}
    </div>
  );

  const renderFillInBlank = () => (
    <div className="w-full px-4 md:px-10 flex flex-col sm:flex-row justify-around items-center gap-3 sm:gap-6 md:gap-10 rounded-xl bg-[#40B869] py-2 md:py-[3.87px] max-w-3xl">
      <div className="hidden sm:block">
        <div className="rounded-[10.83px] bg-[#1671D9] w-full p-2">
          <FaKeyboard size={24} color="#A6DFFF" />
        </div>
      </div>
      <input
        type="text"
        value={fillInAnswer}
        onChange={handleFillInChange}
        disabled={hasSubmitted && isCorrect}
        placeholder="Type here to fill in the blank...."
        className={`
          w-full p-3 md:p-4 rounded-lg border-2 text-[#98A2B3] text-sm md:text-lg font-medium
          ${
            hasSubmitted
              ? isCorrect
                ? "bg-green-100 border-green-500 text-green-800"
                : "bg-red-100 border-red-500 text-red-800"
              : "bg-white border-gray-300 focus:border-blue-500 focus:outline-none"
          }
        `}
      />

      <div className="w-full flex justify-end sm:w-auto">
        <button
          className={`rounded-[10.83px] w-auto p-2 ${
            canSubmit()
              ? "bg-[#1671D9] hover:bg-blue-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmitAnswer}
          disabled={!canSubmit()}
        >
          <IoIosSend size={24} color="#EBEBEB" />
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="items-center z-10 flex flex-col justify-center w-full h-full mx-auto px-2 sm:px-4 relative"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="mt-6 md:mt-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-[#F15B29] font-bold mb-4 sm:mb-6 text-center">
          {quiz?.instruction}
        </h2>
      </div>

      <section className="flex gap-4 sm:gap-6 w-full justify-center">
        <div className="bg-[url('/lessons/questionFrame.svg')] min-h-[300px] sm:min-h-[400px] w-full max-w-[300px] sm:max-w-[400px] flex flex-col justify-center items-center bg-center bg-contain bg-no-repeat p-4 sm:p-8 mb-4 sm:mb-6">
          <div className="w-[80%] px-2 sm:px-4 flex flex-col items-center">
            <div className="text-center w-full max-w-[500px] mb-4 sm:mb-8">
              <h3 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed break-words whitespace-normal">
                {quiz.question}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {quiz.quizType === QuizType.FILL_IN_BLANK &&
        quiz.options &&
        quiz.options.length > 0 && (
          <div className="flex flex-col gap-2 w-full max-w-[500px] items-center justify-center mb-4 sm:mb-6">
            <div className="text-[#F15B29] text-sm sm:text-base">
              Suggestions
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2 w-full">
              {quiz.options?.map((option: string, index: number) => (
                <p
                  key={index}
                  className={`
                    w-full p-2 sm:p-4 text-center rounded-[28px] border-2 transition-all duration-200
                    bg-white border-[#0F973D] text-[#202124] text-sm sm:text-base
                  `}
                >
                  <span className="font-medium">{option}</span>
                </p>
              ))}
            </div>
          </div>
        )}

      <div className="w-full flex flex-col items-center mb-4 sm:mb-6">
        {quiz.quizType === QuizType.MULTIPLE_CHOICE && renderMultipleChoice()}
        {quiz.quizType === QuizType.FILL_IN_BLANK && renderFillInBlank()}
      </div>

      <div className="border-t-1 h-[0.5px] mt-4 sm:mt-6 border-[#FCD2C2] w-full"></div>

      {/* Navigation Buttons */}
      <div className="px-2 sm:px-[5%] z-10 mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 w-full justify-between items-center">
        <InAppButton
          onClick={onPrevious}
          disabled={!canGoBack || completeLoading}
          disabledColor="#C98F5DCC"
          background={canGoBack ? `#5A2E10` : `#C98F5DCC`}
          // className="w-full sm:w-auto"
        >
          <div
            className={`px-4 sm:px-6 py-2 sm:py-3 z-10 rounded-lg font-medium text-sm sm:text-base`}
          >
            ← Previous
          </div>
        </InAppButton>

        <InAppButton
          onClick={handleNext}
          background={`#5A2E10`}
          disabled={!(hasSubmitted && isCorrect) || completeLoading}
          disabledColor="#C98F5DCC"
          // className="w-full sm:w-auto mt-2 sm:mt-0"
        >
          <div className="text-sm sm:text-base">
            {isLastQuiz ? (
              "Complete Quiz"
            ) : completeLoading ? (
              <CustomSpinner />
            ) : (
              "Next →"
            )}
          </div>
        </InAppButton>
      </div>

      {showResult &&
        (isCorrect ? (
          <QuizSuccessModal onClose={() => setShowResult(false)} />
        ) : (
          <QuizFailureModal onClose={() => setShowResult(false)} />
        ))}
    </div>
  );
};

export default QuizRenderer;
