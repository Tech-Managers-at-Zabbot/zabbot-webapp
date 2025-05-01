'use client';
import ColouredButton from "@/components/ColouredButton";
import PreliminaryLanding from "@/components/preliminaryQuestions/PreliminaryLanding";
import PreliminaryQuestionOne from "@/components/preliminaryQuestions/QuestionOne";
import Head from "next/head";
import React, { useState } from "react";

const PreliminaryQuestionsFlow = () => {

  const [activeStep, setActiveStep] = useState(1);
  
  return (
    <div className="bg-[#1E1E1E]">
      <Head>
        <title>Zabbot - Preliminary Questions Page</title>
        <meta
          name="description"
          content="Preliminary Questions For New Students on the Zabbot Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex justify-between flex-col min-h-screen relative">
        <div className="flex justify-center items-center">
        {activeStep === 1 && (
          <PreliminaryLanding setActiveStep={setActiveStep}/>
        )}

        {activeStep === 2 && (
          <PreliminaryQuestionOne />
        )}
        </div>

        <div className="w-full flex flex-col items-end justify-between gap-[20px] py-10">
          <section className="w-full h-[2px] mb-10 bg-[#FBCCBD] rounded-[3px]"></section>
          <section className="w-[20%]">
            <ColouredButton onClick={()=> setActiveStep(activeStep + 1)} title="Continue" backgroundColor='#EA7831' height="58px" borderRadius="1000px" padding='16px' boxShadow="0 4px 0 0 #C14921" />
          </section>
        </div>
      </main>
    </div>
  );
};

export default PreliminaryQuestionsFlow;
