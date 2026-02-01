/* eslint-disable @next/next/no-img-element */
import React from "react";
import InAppButton from "../InAppButton";

interface QuizFailureModalProps {
  onClose: () => void;
  isAttemptExhausted: boolean;
  onNext: () => void;
}

const QuizFailureModal: React.FC<QuizFailureModalProps> = ({
  onClose,
  isAttemptExhausted,
  onNext,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/70 bg-opacity-70"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 flex flex-col w-full items-center justify-center p-8 text-center">
        <img
          src="/userDashboard/sad-grandma-owl.png"
          alt="Failure"
          className="w-50 h-65"
        />

        {/* Failure text */}
        <div className="absolute top-[80%] left-[2%] right-[2%] bg-[#FBEAE9] flex gap-4 items-center justify-center py-10 border-t-8 border-[#D42620]">
          <div>
            <img
              src="/lessons/quiz-wrong-icon.png"
              alt="Success"
              className="w-10 h-10"
            />
          </div>
          <div>
            <h4 className="text-xl font-semibold leading-[145%] text-[#D42620] mb-2">
              {isAttemptExhausted
                ? "You have exhausted your attemtps for this question. Try the next one"
                : "Try Again!"}
            </h4>
            {/* <div className="text-xl text-[#475367]">Great Job</div> */}
          </div>
        </div>

        {/* Close button (optional) */}
      </div>
      <div className="z-[999] absolute bottom-10 md:bottom-40">
        <InAppButton
          onClick={isAttemptExhausted ? onNext : onClose}
          background={"#008000"}
        >
          {isAttemptExhausted ? "Next" : "Try Again!"}
        </InAppButton>
      </div>
    </div>
  );
};

export default QuizFailureModal;
