/* eslint-disable @next/next/no-img-element */
import React from "react";
import InAppButton from "@/components/InAppButton";
import LanguageToggle from "@/components/languageToggle/LanguageToggle";
import { FaArrowRight } from "react-icons/fa6";
import { Clock, Volume2, CheckCircle, Headphones } from 'lucide-react';

const LessonDescriptionComponent = () => {
  return (
    <div
      className="bg-[#fef7d0] min-h-screen w-full"
      style={{ fontFamily: "Lexend" }}
    >
      <section className="flex px-[5%] justify-end mt-10 items-center">
        <LanguageToggle backgroundColor="#162B6E" color="#FFFFFF" dropDownBgColor="#162B6E"/>
      </section>

      <section className="px-[5%] mt-10 flex justify-between items-center">
        {/* left side */}
        <div >
          <div className="text-[#B6822E] font-medium text-[20px] leading-[43px] bg-[#FBF1E1] p-[10px] max-w-[380px] rounded-2xl">
            Your First Step Into Yoruba Culture
          </div>
          <div className="text-[#242424] font-bold text-[60px] leading-[71px]">
            <h4>
              Learn <span className="text-[#F76C1D]">Yorùbá</span>
            </h4>
            <h4>with Confidence</h4>
          </div>
          <div className="text-[#667185] font-medium text-[20px] leading-[43px]">
            Ready to begin your Yoruba adventure? Each lesson is carefully
            crafted to build your skills progressively, from basic greetings to
            meaningful conversations.
          </div>

          <div className="flex gap-2 text-[#333333]">
            <div className="bg-[#FFFFFF] max-w-[284px] flex items-center gap-3 p-4 rounded-xl">
              <div>
                <svg width="43" height="43" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#FBF1E1" />
                  <polygon points="10,8 16,12 10,16" fill="#BB910B" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[20px]">Native Audio</span>
                <span className="font-[400] text-[16px]">
                  Authentic pronunciation
                </span>
              </div>
            </div>
            <div className="bg-[#FFFFFF] max-w-[284px] flex items-center gap-3 p-4 rounded-xl">
              <div>
                <svg width="43" height="43" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#E3EFFC" />
                  <polygon points="10,8 16,12 10,16" fill="#007AB2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[20px]">
                  Cultural Context
                </span>
                <span className="font-[400] text-[16px]">
                  Language meets culture
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <div>
              <InAppButton
                borderRadius="6px"
                border="1px solid #F76E1B"
                background="transparent"
                width="303px"
                height="74px"
              >
                <div className="text-[#F86F1A]">Back to Dashboard</div>
              </InAppButton>
            </div>
            <div>
              <InAppButton
                borderRadius="6px"
                background="linear-gradient(to right, #EF4642, #F87118)"
                width="303px"
                height="74px"
              >
                <div className="flex items-center gap-2 justify-center">
                  Start Now <FaArrowRight color="#EBEBEB" />
                </div>
              </InAppButton>
            </div>
          </div>
        </div>
       {/* right side */}
<div className="flex relative p-20 flex-col min-w-1/2 items-center">
      <div className="mb-8 absolute top-10 rotate-4 z-10 flex justify-center items-center">
    <InAppButton
      borderRadius="6px"
      background="linear-gradient(to right, #EF4642, #F87118)"
      width="200px"
      height="60px"
    >
      <div className="flex items-center gap-2 justify-center text-white font-medium">
        SAY HELLO <FaArrowRight color="#FFFFFF" />
      </div>
    </InAppButton>
  </div>

  {/* Tilted Lesson Card */}
  <div 
    className="bg-white rounded-2xl w-[70%] p-6 shadow-lg transform rotate-3"
    style={{ transformOrigin: "center" }}
  >
    {/* Card Header with SAY HELLO button */}

    {/* Image Container */}
    <div className="relative mb-4 rounded-xl overflow-hidden">
      <img 
        src="/userDashboard/say-hello.svg" 
        alt="Yoruba Culture" 
        className="w-full h-[300px] object-fit rounded-lg"
      />
    </div>

    {/* Card Content */}
    <div className="space-y-3">
      <h3 className="text-[#333333] font-bold text-[24px]">Say Hello</h3>
      <p className="text-[#666666] text-[14px]">
        Let's learn how to say HELLO depending on the time of day
      </p>
      
      {/* Duration and Stats */}
      <div className="flex items-center justify-between">
        <span className="text-[#999999] text-[12px]">10-15 minutes</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">⚡</span>
            </div>
            <span className="text-[#333333] text-[12px] font-medium">7</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px]">❤</span>
            </div>
            <span className="text-[#333333] text-[12px] font-medium">5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </section>
       <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-contain bg-center min-h-[100px]">
       </footer>
    </div>
  );
};


interface LearningOutcome {
  text: string;
}

interface LessonPreviewProps {
  lessonTitle?: string;
  lessonSubtitle?: string;
  duration?: string;
  hasAudio?: boolean;
  description?: string;
  learningPoints?: string[];
  outcomes?: LearningOutcome[];
}

const LessonPreviewComponent: React.FC<LessonPreviewProps> = ({
  lessonTitle = "Lesson One",
  lessonSubtitle = "E Kú Àárọ̀ - Good Morning Greetings",
  duration = "10-15 Minutes",
  hasAudio = true,
  description = "Start your Yoruba journey with the most essential skill - greeting people properly. Learn how to say good morning, introduce yourself, and respond to common greetings like a native speaker.",
  learningPoints = [
    "Basic greeting phrases for different times of day",
    "How to introduce yourself with confidence",
    "Cultural context: Why greetings matter in Yoruba culture",
    "Pronunciation tips for tonal accuracy"
  ],
  outcomes = [
    { text: "Greet someone in Yoruba naturally" },
    { text: "Introduce yourself by name" },
    { text: "Understand when and how to use different greetings" },
    { text: "Recognize the importance of respect in Yoruba communication" }
  ]
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 p-6 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-100 mb-4 tracking-wide">
            LESSON PREVIEW
          </h1>
          <p className="text-xl text-amber-200 font-medium">
            Get A Glimpse Of What Awaits You In Your First Yoruba Lesson
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Card - Lesson Details */}
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{lessonTitle}</h2>
                <p className="text-lg text-red-600 font-medium">{lessonSubtitle}</p>
              </div>
            </div>

            {/* Duration and Audio Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{duration}</span>
              </div>
              {hasAudio && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Volume2 className="w-5 h-5" />
                  <span className="font-medium">Audio Included</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {description}
            </p>

            {/* You'll Learn Section */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">You'll Learn:</h3>
              <ul className="space-y-3">
                {learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Card - Learning Outcomes */}
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-8 translate-x-8 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200 rounded-full translate-y-8 -translate-x-8 opacity-40"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Learning Outcomes</h2>
              </div>

              <p className="text-lg font-semibold text-green-700 mb-8">
                By The End Of This Lesson, You'll Be Able To:
              </p>

              {/* Outcomes List */}
              <ul className="space-y-4 mb-8">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 leading-relaxed text-lg">{outcome.text}</span>
                  </li>
                ))}
              </ul>

              {/* Special Features */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-6 text-center">
                  What Makes Our Lessons Special
                </h3>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Headphones className="w-8 h-8 text-green-700" />
                    </div>
                    <p className="font-semibold text-green-800">Native Audio</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Volume2 className="w-8 h-8 text-green-700" />
                    </div>
                    <p className="font-semibold text-green-800">Cultural Context</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative leaf patterns */}
            <div className="absolute bottom-4 right-4 opacity-20">
              <div className="w-16 h-16 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="">
      <section className="flex justify-end items-center">
        <LessonDescriptionComponent />
      </section>

      <section>
        <LessonPreviewComponent />
      </section>
    </div>
  );
};

export default page;
