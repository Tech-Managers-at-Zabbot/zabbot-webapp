/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import InAppButton from "@/components/InAppButton";
import LanguageToggle from "@/components/languageToggle/LanguageToggle";
import { FaArrowRight } from "react-icons/fa6";
import { Clock, Volume2, CheckCircle, Headphones } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { CustomSpinner } from "@/components/CustomSpinner";
import { LuAudioWaveform } from "react-icons/lu";
import { TalkingDrumIcon } from "@/constants/SvgPaths";
import { useGetLessonWithContents } from "@/services/generalApi/lessons/mutation";
import { FaArrowLeft } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";

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
      {/* <section className="flex px-[3%] md:px-[5%] justify-end pt-6 md:pt-10 items-center">
        <LanguageToggle
          backgroundColor="#162B6E"
          color="#FFFFFF"
          dropDownBgColor="#162B6E"
        />
      </section> */}
      <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-bottom bg-no-repeat min-h-[250px]"></header>
      {/* Main Content */}
      <div className="relative flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 px-4 sm:px-[5%] mt-4 sm:mt-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`cursor-pointer ${
              startLoading || dashboardLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } text-[#ebebeb] hover:text-[#B6822E] p-2 sm:p-3 rounded-full transition`}
            onClick={() => {
              if (startLoading || dashboardLoading) return;
              setDashboardLoading(true);
              router.push("/user-dashboard");
            }}
          >
            <FaArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>

          <div className="cursor-pointer p-2 sm:p-3 rounded-full hover:bg-white/10 transition">
            <img
              src="/lessons/lessons-home.svg"
              alt="home"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-[55px] md:h-[55px]"
            />
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4">
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
        </div>
      </div>
      <section className="relative px-[3%] md:px-[5%] mt-6 md:mt-10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 pb-24 md:pb-32">
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          {/* Badge */}
          <div className="flex mb-6">
            <div className="bg-[#CF0A5C] font-[500] leading-[100%] text-[14px] p-5 rounded-lg">
              {lesson?.totalContents} Steps
            </div>
          </div>
          <div className="text-[#B6822E] flex flex-col gap-2 font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] max-w-full md:max-w-[380px] rounded-2xl text-center md:text-left">
            <div className="text-[#AA0000]">SPARK {lesson?.orderNumber}</div>

            <div className="text-[#620000] font-[600] text-[40px] leading-[110%]">
              {lesson?.title}
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-[#EB5017] font-bold text-[26px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-[1.2] mt-4 md:mt-6 text-center md:text-left">
            <h4>{lesson?.headLineTag}</h4>
          </div>

          {/* Description */}
          <div className="text-[#667185] font-medium text-[16px] md:text-[16px] lg:text-[16px] leading-[1.6] mt-4 md:mt-6 text-center md:text-left">
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
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center relative p-4 md:p-8 lg:p-20">
          <div
            className="rounded-2xl w-full max-w-[400px] md:max-w-[500px] shadow-lg rotate-1 sm:rotate-2 lg:rotate-3 mt-6"
            style={{ transformOrigin: "center" }}
          >
            {/* Image Container */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={lesson?.lessonImg || "/lessons/yoruba.png"}
                // "/lessons/yoruba.png"
                alt="Yoruba Culture"
                className="w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[300px] object-cover"
              />
            </div>
          </div>
          <div
            className={`
  ${
    startLoading || dashboardLoading
      ? "cursor-not-allowed bg-[#E0E1E6]"
      : "cursor-pointer bg-[#EB5017]"
  }
  absolute
  bottom-4 sm:bottom-0
  right-4 sm:right-10 md:right-20 lg:right-40
  p-4 sm:p-6 md:p-10
  rounded-full
  border-[10px] border-white
`}
            onClick={() => {
              if (startLoading || dashboardLoading) return;
              setStartLoading(true);
              router.push(`/lesson/${lesson?.courseId}/${lesson?.id}`);
            }}
          >
            {startLoading ? (
              <CustomSpinner spinnerColor="#FFFFFF" isShowTitle={false} />
            ) : (
              <FaArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[80px] md:min-h-[100px]"></footer>
    </div>
  );
};

const LessonPreviewComponent = ({
  lesson,
}: {
  lesson: Record<string, any>;
}) => {
  const bulletPoints = lesson?.objectives
    .split(/\(\d+\)\s*/)
    .filter((item: any) => item.trim() !== "");

  const lines = lesson?.outcomes.split("\n");
  // const title = lines[0];
  const lessonOutcomes = lines.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 px-6 flex items-center justify-center">
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
                <span className="font-medium">
                  {lesson?.estimatedDuration} minutes
                </span>
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
                {bulletPoints.map((point: string, index: number) => (
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
                {lessonOutcomes.map((outcome: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 leading-relaxed text-lg">
                      {outcome.replace("✅", "").trim()}
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
              <h2 className={`text-2xl text-[#012657] font-bold`}>
                Data is Loading...
              </h2>
              {/* <p>Gathering your language experience…</p> */}
            </div>
          </div>
        </section>
      ) : (
        <section className="">
          <section className="flex justify-end items-center">
            <LessonDescriptionComponent lesson={lesson} />
          </section>
          <section>
            <LessonPreviewComponent lesson={lesson} />
          </section>
        </section>
      )}
    </div>
  );
};

export default Page;
