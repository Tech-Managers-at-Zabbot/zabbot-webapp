/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import InAppButton from "@/components/InAppButton";
import LanguageToggle from "@/components/languageToggle/LanguageToggle";
import { FaArrowRight } from "react-icons/fa6";
import { Clock, Volume2, CheckCircle, Headphones } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { CustomSpinner } from "@/components/CustomSpinner";
import { LuAudioWaveform } from "react-icons/lu";
import { TalkingDrumIcon } from "@/constants/SvgPaths";
import { useGetLessonWithContents } from "@/services/generalApi/lessons/mutation";

const LessonDescriptionComponent = ({
  lesson,
}: {
  lesson: Record<string, any>;
}) => {
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
        <LanguageToggle
          backgroundColor="#162B6E"
          color="#FFFFFF"
          dropDownBgColor="#162B6E"
        />
      </section>

      {/* Main Content */}
      <section className="px-[3%] md:px-[5%] mt-6 md:mt-10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 pb-24 md:pb-32">
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          {/* Badge */}
          <div className="text-[#B6822E] font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] bg-[#FBF1E1] p-3 md:p-[10px] max-w-full md:max-w-[380px] rounded-2xl text-center md:text-left">
            {lesson?.headLineTag}
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
            {lesson?.description}
          </div>

          {/* Feature Cards */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 text-[#333333] mt-6 md:mt-8">
            {/* Native Audio Card */}
            <div className="bg-[#FFFFFF] w-full sm:max-w-[284px] flex items-center gap-3 p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-[#FBF1E1] rounded-full flex items-center justify-center flex-shrink-0">
                <LuAudioWaveform size={24} className="text-[#BB910B]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[18px] md:text-[20px] truncate">
                  Native Audio
                </span>
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
                onClick={() => {
                  setDashboardLoading(true);
                  router.push("/user-dashboard");
                }}
                disabled={startLoading || dashboardLoading}
              >
                {dashboardLoading ? (
                  <CustomSpinner spinnerColor="#F86F1A" />
                ) : (
                  <div className="text-[#F86F1A] font-medium text-[16px] md:text-[18px]">
                    Back to Dashboard
                  </div>
                )}
              </InAppButton>
            </div>
            <div className="w-full ">
              <InAppButton
                borderRadius="6px"
                background="linear-gradient(to right, #EF4642, #F87118)"
                width="100%"
                height="64px"
                onClick={() => {
                  setStartLoading(true);
                  router.push(`/lesson/${lesson?.courseId}/${lesson?.id}`);
                }}
                disabled={startLoading || dashboardLoading}
              >
                {startLoading ? (
                  <CustomSpinner spinnerColor="#FFFFFF" />
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
                {lesson?.title}
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
                // "/lessons/yoruba.png"
                alt="Yoruba Culture"
                className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover object-top rounded-lg"
              />
            </div>

            {/* Card Content */}
            <div className="space-y-3">
              <h3 className="text-[#333333] font-bold text-[20px] md:text-[22px] lg:text-[24px]">
                {lesson?.title}
              </h3>
              <p className="text-[#666666] text-[13px] md:text-[14px] leading-relaxed">
                {lesson?.headLineTag}
              </p>

              {/* Duration and Stats */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#999999] text-[11px] md:text-[12px] font-medium">
                  {lesson?.estimatedDuration} minutes
                </span>
                {/* <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">
                        ⚡
                      </span>
                    </div>
                    <span className="text-[#333333] text-[11px] md:text-[12px] font-medium">
                      7
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px]">❤</span>
                    </div>
                    <span className="text-[#333333] text-[11px] md:text-[12px] font-medium">
                      5
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[80px] md:min-h-[100px]"></footer>
    </div>
  );
};

const LessonPreviewComponent= ({ lesson }: {lesson:Record<string, any>}) => {

  const bulletPoints = lesson?.objectives.split(/\(\d+\)\s*/).filter((item:any) => item.trim() !== '');

  const lines = lesson?.outcomes.split('\n');
// const title = lines[0];
const lessonOutcomes = lines.slice(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 p-6 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-100 mb-4 tracking-wide">
            LESSON PREVIEW
          </h1>
          <p className="text-xl text-amber-200 font-medium">
            Get A Glimpse Of What Awaits You In This Lesson
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
                <h2 className="text-2xl font-bold text-gray-800">
                  {lesson?.title}
                </h2>
                <p className="text-lg text-red-600 font-medium">
                  {lesson?.headLineTag}
                </p>
              </div>
            </div>

            {/* Duration and Audio Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{lesson?.estimatedDuration} minutes</span>
              </div>
              {/* {hasAudio && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Volume2 className="w-5 h-5" />
                  <span className="font-medium">Audio Included</span>
                </div>
              )} */}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              {lesson?.description}
            </p>

            {/* You'll Learn Section */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                You'll Learn:
              </h3>
              <ul className="space-y-3">
                {bulletPoints.map((point:string, index:number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {point}
                    </span>
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Learning Outcomes
                </h2>
              </div>

              <p className="text-lg font-semibold text-green-700 mb-8">
                By The End Of This Lesson, You'll Be Able To:
              </p>

              {/* Outcomes List */}
              <ul className="space-y-4 mb-8">
                {lessonOutcomes.map((outcome:any, index:number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 leading-relaxed text-lg">
                    {outcome.replace('✅', '').trim()}
                    </span>
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
                    <p className="font-semibold text-green-800">
                      Cultural Context
                    </p>
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

const Page = () => {
  const params = useParams();

  const { courseId, lessonId } = params;

  const { data: lessonData, isLoading } = useGetLessonWithContents(lessonId);

  const lesson = lessonData?.data?.lesson;

  const contents = lessonData?.data?.contents;

  console.log("lezz", lessonData, lesson, contents);

  return (
    <div>
      {!lessonData?.data?.lesson || !lesson || isLoading ? (
        <section className="bg-[#fef7d0] min-h-screen w-full relative">
          <div
            className={`fixed inset-0 flex flex-col items-center justify-center w-full min-h-screen overflow-hidden z-[9999] transition-colors opacity-96`}
            style={{ fontFamily: "Lexend" }}
          >
            <div className="relative w-80 h-80 mb-6">
              <img
                src="/general/loader-parrot.gif"
                alt="Zabbot is loading"
                className="w-[1000px] object-cover"
              />
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <img
                  src={"/general/zabbot-logo-blue.png"}
                  alt="Zabbot is loading"
                  className="w-[1000px] animate-pulse object-cover"
                />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className={`text-2xl text-[#012657] font-bold`}>Data is Loading...</h2>
              {/* <p>Gathering your language experience…</p> */}
            </div>
          </div>
        </section>
      ) : (
        <section className="">
          <section className="flex justify-end items-center">
            <LessonDescriptionComponent lesson={lesson} />
          </section>
          <section><LessonPreviewComponent lesson={lesson} /></section>
        </section>
      )}
    </div>
  );
};

export default Page;
