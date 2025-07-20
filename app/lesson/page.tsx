/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import InAppButton from "@/components/InAppButton";
import LanguageToggle from "@/components/languageToggle/LanguageToggle";
import { FaArrowRight } from "react-icons/fa6";
import { Clock, Volume2, CheckCircle, Headphones } from 'lucide-react';
import { useRouter } from "next/navigation";
import { CustomSpinner } from "@/components/CustomSpinner";
import { LuAudioWaveform } from "react-icons/lu";
import { TalkingDrumIcon } from "@/constants/SvgPaths";

const LessonDescriptionComponent = () => {

  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const router = useRouter();

  return (
    <div
      className="bg-[#fef7d0] w-full relative"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Language Toggle */}
      <section className="flex px-[3%] md:px-[5%] justify-end pt-6 md:pt-10 items-center">
        <LanguageToggle backgroundColor="#162B6E" color="#FFFFFF" dropDownBgColor="#162B6E"/>
      </section>

      {/* Main Content */}
      <section className="px-[3%] md:px-[5%] mt-6 md:mt-10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 pb-24 md:pb-32">
        
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          {/* Badge */}
          <div className="text-[#B6822E] font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] bg-[#FBF1E1] p-3 md:p-[10px] max-w-full md:max-w-[380px] rounded-2xl text-center md:text-left">
            Your First Step Into Yoruba Culture
          </div>

          {/* Main Heading */}
          <div className="text-[#242424] font-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] leading-[1.2] mt-4 md:mt-6 text-center md:text-left">
            <h4>
              Learn <span className="text-[#F76C1D]">Yorùbá</span>
            </h4>
            <h4>with Confidence</h4>
          </div>

          {/* Description */}
          <div className="text-[#667185] font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] mt-4 md:mt-6 text-center md:text-left">
            Ready to begin your Yoruba adventure? Each lesson is carefully
            crafted to build your skills progressively, from basic greetings to
            meaningful conversations.
          </div>

          {/* Feature Cards */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 text-[#333333] mt-6 md:mt-8">
            {/* Native Audio Card */}
            <div className="bg-[#FFFFFF] w-full sm:max-w-[284px] flex items-center gap-3 p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-[#FBF1E1] rounded-full flex items-center justify-center flex-shrink-0">
                <LuAudioWaveform size={24} className="text-[#BB910B]"/>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[18px] md:text-[20px] truncate">Native Audio</span>
                <span className="font-[400] text-[14px] md:text-[16px] text-[#667185]">
                  Authentic pronunciation
                </span>
              </div>
            </div>

            {/* Cultural Context Card */}
            <div className="bg-[#FFFFFF] w-full sm:max-w-[284px] flex items-center gap-3 p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-[#E3EFFC] rounded-full flex items-center justify-center flex-shrink-0">
                <TalkingDrumIcon />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[18px] md:text-[20px] truncate">
                  Cultural Context
                </span>
                <span className="font-[400] text-[14px] md:text-[16px] text-[#667185]">
                  Language meets culture
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
            <div className="w-full ">
              <InAppButton
                borderRadius="6px"
                border="1px solid #F76E1B"
                background="transparent"
                width="100%"
                height="64px"
                onClick={() => { setDashboardLoading(true); router.push("/user-dashboard") }}
                disabled={startLoading || dashboardLoading}
              >
                {dashboardLoading ? (
                  <CustomSpinner spinnerColor="#F86F1A"/>
                ) : (
                  <div className="text-[#F86F1A] font-medium text-[16px] md:text-[18px]">Back to Dashboard</div>
                )}
              </InAppButton>
            </div>
            <div className="w-full ">
              <InAppButton
                borderRadius="6px"
                background="linear-gradient(to right, #EF4642, #F87118)"
                width="100%"
                height="64px"
                onClick={() => { setStartLoading(true); router.push("/lesson/lessonData") }}
                disabled={startLoading || dashboardLoading}
              >
                 {startLoading ? (
                  <CustomSpinner spinnerColor="#FFFFFF"/>
                ) : (
                <div className="flex items-center gap-2 justify-center font-medium text-[16px] md:text-[18px]">
                  Start Now <FaArrowRight color="#EBEBEB" size={16} />
                </div>
                )}
              </InAppButton>
            </div>
          </div>
        </div>
       
        {/* Right Side - Lesson Card */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center items-center relative p-4 md:p-8 lg:p-20">
          {/* SAY HELLO Button - Floating */}
          <div className="absolute top-2 md:top-8 lg:top-24 left-1/2 transform -translate-x-1/2 rotate-2 md:rotate-4 z-10">
            <InAppButton
              borderRadius="6px"
              background="linear-gradient(to right, #EF4642, #F87118)"
              disabledColor="linear-gradient(to right, #EF4642, #F87118)"
              width="160px"
              height="48px"
              disabled={true}
            >
              <div className="flex items-center gap-2 justify-center text-white font-medium text-[14px] md:text-[16px]">
                SAY HELLO
              </div>
            </InAppButton>
          </div>

          {/* Tilted Lesson Card */}
          <div 
            className="bg-white rounded-2xl w-full max-w-[400px] md:max-w-[500px] lg:w-[70%] p-4 md:p-6 shadow-lg transform rotate-1 md:rotate-2 lg:rotate-3 mt-8 md:mt-12"
            style={{ transformOrigin: "center" }}
          >
            {/* Image Container */}
            <div className="relative mb-4 rounded-xl overflow-hidden">
              <img 
                src="/userDashboard/say-hello.svg" 
                alt="Yoruba Culture" 
                className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover object-top rounded-lg"
              />
            </div>

            {/* Card Content */}
            <div className="space-y-3">
              <h3 className="text-[#333333] font-bold text-[20px] md:text-[22px] lg:text-[24px]">Say Hello</h3>
              <p className="text-[#666666] text-[13px] md:text-[14px] leading-relaxed">
                Let's learn how to say HELLO depending on the time of day
              </p>
              
              {/* Duration and Stats */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#999999] text-[11px] md:text-[12px] font-medium">10-15 minutes</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">⚡</span>
                    </div>
                    <span className="text-[#333333] text-[11px] md:text-[12px] font-medium">7</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px]">❤</span>
                    </div>
                    <span className="text-[#333333] text-[11px] md:text-[12px] font-medium">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[80px] md:min-h-[100px]">
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
