/* eslint-disable @next/next/no-img-element */
"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import InAppButton from "@/components/InAppButton";
import LessonConclusionComponent from "@/components/lessons/LessonConclusionComponent";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Modal } from "@/components/general/Modal";
import { useLoading } from "@/contexts/LoadingProvider";
import { useLessonContext } from "@/contexts/LessonContext";
import { BiHomeAlt2 } from "react-icons/bi";
import InLessonPackages from "@/components/lessons/contents/InLessonPackages";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Page = () => {
  const {
    lesson,
  } = useLessonContext();

    const { width = 0, height = 0 } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false)

  const router = useRouter();

  const params = useParams();

  const { courseId } = params;

  const [navigationLoading, setNavigationLoading] = useState(false);
  const { setLoading } = useLoading();
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [homeModal, setHomeModal] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);

  const handleRedirectHome = () => {
    setLoading(true);
    setHomeLoading(true);
    setDashboardLoading(true);
    router.push("/user-dashboard");
  };

  useEffect(()=> {
setShowConfetti(true)
  },[])

  return (
    <div
      className="bg-[#FEECBC] flex flex-col justify-start py-6 items-center min-h-screen"
      style={{ fontFamily: "Lexend" }}
    >
          {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
            gravity={0.4}
            tweenDuration={10000}
            run={showConfetti}
            style={{
              zIndex: 9999,
            }}
          />
        )}
      <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-center bg-no-repeat min-h-[200px]"></header>
      <div className="flex w-full relative items-center gap-3 sm:gap-4">
        <button
          className={`cursor-pointer ${
            dashboardLoading ? "cursor-not-allowed" : "cursor-pointer"
          } text-[#ebebeb] hover:text-[#B6822E] p-2 sm:p-3 rounded-full transition`}
          onClick={() => {
            setHomeModal(true);
          }}
          disabled={dashboardLoading}
        >
          <FaArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>

        <button
          className="cursor-pointer p-2 sm:p-3 rounded-full hover:bg-white/10 transition"
          onClick={() => {
            setHomeModal(true);
          }}
          disabled={dashboardLoading}
        >
          <img
            src="/lessons/lessons-home.svg"
            alt="home"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-[55px] md:h-[55px]"
          />
        </button>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-red-800 text-sm font-semibold tracking-wider uppercase mb-2">
          LESSON {lesson?.orderNumber}
        </h2>
        <h1 className="text-red-900 text-4xl md:text-5xl font-bold">
          {lesson?.title}
        </h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <LessonConclusionComponent />
      </div>

      {/* Stats */}
      <section className="flex justify-center items-center w-full">
        <div className="flex flex-col sm:flex-row w-full max-w-[800px] items-center justify-center gap-6 sm:gap-10">
          {/* Left Stat */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center">
            <div className="text-[#AA0000] font-[400] text-[14px] sm:text-[18px] leading-[110%]">
              POSITION ON LEADERBOARD
            </div>
            <div className="text-[#EB5017] font-[600] text-[36px] sm:text-[48px] leading-[100%]">
              20th
            </div>
          </div>

          {/* Divider */}
          <div
            className="
        bg-[#B2ABAB]
        w-16 h-[1px]
        sm:w-[1px] sm:h-12
      "
          />

          {/* Right Stat */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center">
            <div className="text-[#EB5017] font-[600] text-[36px] sm:text-[48px] leading-[100%]">
              85%
            </div>
            <div className="text-[#AA0000] font-[400] text-[14px] sm:text-[18px] leading-[110%]">
              OVERALL SCORE
            </div>
          </div>
        </div>
      </section>

      <div className="z-50 mt-10">
        <InAppButton
          background="#EB5017"
          onClick={() => {
            setNavigationLoading(true);
            router.push(`/lesson/${courseId}`);
          }}
          disabled={navigationLoading}
          disabledColor="#C98F5DCC"
        >
          {navigationLoading ? (
            <CustomSpinner spinnerColor="black" title="Redirecting..." />
          ) : (
            <div className="flex items-center justify-center gap-4">
              <div>
                <BiHomeAlt2 size={24} />
              </div>
              <div>Back to lessons</div>
            </div>
          )}
        </InAppButton>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <hr className="bg-[#94612C] w-16 sm:w-40 h-0.5" />

        <div className="text-[#AA0000] font-[400] text-[14px] sm:text-[18px] leading-[110%] text-center whitespace-nowrap">
          OTHER THINGS TO TRY OUT
        </div>

        <hr className="bg-[#94612C] w-16 sm:w-40 h-0.5" />
      </div>

      <div>
        <InLessonPackages btnDisable={navigationLoading} />
      </div>

      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[100px]"></footer>

      {homeModal && (
        <Modal
          isOpen={homeModal}
          onClose={() => setHomeModal(false)}
          title="Are you sure you?"
          showCloseButton={false}
        >
          <div className="p-6 text-center">
            <p className="text-lg leading-[30px] text-[#252525] font-[400] mb-6">
              Your progress is automatically saved, so you can pick up right
              where you left off. Feel free to exit at any time everything will
              be here when you return.
            </p>
            <div className="flex justify-center gap-4">
              <InAppButton
                background="#EBEBEB"
                onClick={() => setHomeModal(false)}
                disabled={homeLoading}
              >
                <div className="text-[#252424]">Stay</div>
              </InAppButton>
              <InAppButton
                background="#5A2E10"
                color="#FFFFFF"
                onClick={handleRedirectHome}
                disabled={homeLoading}
              >
                {homeLoading ? <CustomSpinner /> : "Exit"}
              </InAppButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
