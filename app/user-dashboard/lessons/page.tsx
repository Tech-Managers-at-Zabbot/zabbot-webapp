"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import UserLessons from "@/components/dashboard/UserLessons";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import AllCourses from "@/components/dashboard/Lessons/AllCourses";

const Lessons = () => {
  return (
    <div className="">
      <Head>
        <title>Lessons Page</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className="min-h-screen relative pb-50 bg-[#dff9fb]  px-[5%] overflow-x-hidden"
        style={{ fontFamily: "Lexend", color: "#162B6E" }}
      >
        <div className="max-w-screen-2xl">
          <div className="w-full">
            <div className="flex absolute top-0 right-[5%] items-center z-10 gap-15 flex-shrink-0">
              <div className="w-[70px] mt-1 flex">
                <div className="h-[80px]">
                  <Image
                    src="/userDashboard/parrot-head.svg"
                    alt="Centralized rounded parrot mascot"
                    width={300}
                    height={80}
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="">
                <SettingsBreadcrumb />
              </div>
            </div>
          </div>
          <header className="relative">
            <div className="absolute min-h-20 inset-0 bg-[url('/userDashboard/clouds.svg')] bg-cover bg-center"></div>
            <div className="flex relative z-10 mt-10 justify-between text-[24px] font-semibold leading-[100%] text-[#162B6E]">
              <div className="flex-shrink-0">
                {/* <div className="relative w-[156px] h-[46.91px]">
                  <Image
                    src="/general/zabbot-logo-blue.svg"
                    alt="Zabbot blue Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div> */}
                <span>Welcome! Start Learning </span>
              </div>
            </div>
          </header>

          <section className="mt-20">
            <UserLessons />
          </section>

          <section className="mt-6">
            <AllCourses />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
