/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface QuestionProps {
  activeStep?: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const PreliminaryLanding: React.FC<QuestionProps> = ({
  activeStep,
  setActiveStep,
}) => {
  return (
    <div className="relative mt-10">
      <Image
        src="/preliminaryQuestions/question-one.png"
        alt="Let’s tailor your learning plan by asking a few questions..."
        height={300}
        width={600}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default PreliminaryLanding;
