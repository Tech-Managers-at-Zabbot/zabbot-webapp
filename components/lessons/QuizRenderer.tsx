/* eslint-disable @typescript-eslint/no-explicit-any */
import React, 
{ 
  // useEffect, 
  useState 
} from "react";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
import QuizSuccessModal from "./QuizSuccessModal";
import QuizFailureModal from "./QuizFailureModal";
import { FaKeyboard } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { removeYorubaDiacritics } from "@/utilities/utilities";
import { useAlert } from "next-alert";

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
    isCorrect: boolean,
    newAttemptCount: number,
    scoreEarned: number
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
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [maxAttempts] = useState<number>(3);

  const { addAlert } = useAlert();
  
  if (!quiz) return null;

  const handleOptionSelect = (option: string) => {
    if (attemptCount >= maxAttempts) {
      return addAlert(
        "Error",
        "You have exhausted your attempts for this question",
        "error"
      );
    }
    setSelectedAnswer(option);
    const correct = option === quiz.correctOption;
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);

    // Save attempt count
    // localStorage.setItem(
    //   `quiz_attempts_${quiz.id}`,
    //   JSON.stringify({
    //     attempts: newAttemptCount,
    //     hasSubmitted: correct || newAttemptCount >= maxAttempts,
    //     isCorrect: correct,
    //     lastAttempt: new Date().toISOString(),
    //   })
    // );
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setHasSubmitted(correct);
      const scoreEarned =
        newAttemptCount === 1
          ? 10 + 5 // Base score + first attempt bonus
          : 10; // Base score only

      if (onQuizSubmit) {
        onQuizSubmit(quiz.id, option, correct, newAttemptCount, scoreEarned);
      }
    } else if (newAttemptCount >= maxAttempts) {
      // Out of attempts
      setHasSubmitted(true);
      if (onQuizSubmit) {
        onQuizSubmit(quiz.id, option, false, newAttemptCount, 0);
      }
    }
  };

  const handleFillInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasSubmitted) {
      setFillInAnswer(e.target.value);
    }
  };

  const handleSubmitAnswer = () => {
    if (attemptCount >= maxAttempts) {
      return addAlert(
        "Error",
        "You have exhausted your attempts for this question",
        "error"
      );
    }
    let userAnswer = "";
    let correct = false;

    if (quiz.quizType === QuizType.MULTIPLE_CHOICE) {
      userAnswer = selectedAnswer;
      correct = selectedAnswer === quiz.correctOption;
    } else if (quiz.quizType === QuizType.FILL_IN_BLANK) {
      userAnswer = fillInAnswer.trim();
      correct =
        removeYorubaDiacritics(userAnswer).toLowerCase() ===
        removeYorubaDiacritics(quiz.correctAnswer)?.toLowerCase();
    }

    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setHasSubmitted(true);
      const scoreEarned =
        newAttemptCount === 1
          ? 10 + 5 // Base score + first attempt bonus
          : 10; // Base score only

      if (onQuizSubmit) {
        onQuizSubmit(
          quiz.id,
          userAnswer,
          correct,
          newAttemptCount,
          scoreEarned
        );
      }
    } else if (newAttemptCount >= maxAttempts) {
      setHasSubmitted(true);
      if (onQuizSubmit) {
        onQuizSubmit(quiz.id, userAnswer, false, newAttemptCount, 0);
      }
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
      setAttemptCount(0);
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
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl px-4"
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

      {/* ATTEMPT INDICATOR UI */}
      <div className="mb-4 sm:mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
          <span className="text-sm font-medium text-gray-700">Attempts:</span>
          {[...Array(maxAttempts)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < attemptCount
                  ? isCorrect && i === attemptCount - 1
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        {attemptCount > 0 && !isCorrect && attemptCount < maxAttempts && (
          <p className="text-sm text-orange-600 mt-2 font-medium">
            {maxAttempts - attemptCount} attempt
            {maxAttempts - attemptCount !== 1 ? "s" : ""} remaining
          </p>
        )}
        {attemptCount >= maxAttempts && !isCorrect && (
          <p className="text-sm text-red-600 mt-2 font-medium">
            No attempts remaining. Correct answer:{" "}
            {quiz.correctAnswer || quiz.correctOption}
          </p>
        )}
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
      <div className="px-2 sm:px-[5%] z-10 mt-4 sm:mt-6 mb-10 flex flex-col sm:flex-row gap-2 w-full justify-between items-center">
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
          disabled={!hasSubmitted || completeLoading}
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
          <QuizSuccessModal
            onNext={handleNext}
            onClose={() => setShowResult(false)}
          />
        ) : (
          <QuizFailureModal
            onNext={handleNext}
            isAttemptExhausted={attemptCount >= maxAttempts}
            onClose={() => setShowResult(false)}
          />
        ))}
    </div>
  );
};

export default QuizRenderer;
