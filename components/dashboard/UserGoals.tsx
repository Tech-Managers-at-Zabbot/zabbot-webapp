/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import CongratulationsModal from "@/components/general/CongratulationsModal";
import { useGetDailyWord } from "@/services/generalApi/lessons/query";
import {
  DailyGoalsSkeleton,
  WordForTheDaySkeleton,
} from "../skeletonLoaders/DashboardSkeletons";
import { CustomSpinner } from "../CustomSpinner";
import { PlayerEllipse } from "@/constants/SvgPaths";
import { useUserGoals } from "@/contexts/UserGoalsContext";
import { EmptyStateCard } from "../general/EmptyState";

const DailyGoals = () => {
  const { userDailyGoal, goalLoading } = useUserGoals();

  return (
    <>
      {goalLoading ? (
        <DailyGoalsSkeleton />
      ) : !userDailyGoal && userDailyGoal !== 0 ? (
        <EmptyStateCard title="No Data" subtitle="No Data Available Yet"/>
      ) : (
        <div
          className="bg-white justify-between shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
          style={{ fontFamily: "Lexend" }}
        >
          <section>
            <h1 className="font-semibold text-[18px] sm:text-[20px] md:text-[24px] leading-[100%] text-[#162B6E]">
              Daily Goal
            </h1>
            <span className="font-semibold text-[12px] sm:text-[14px] md:text-[15px] leading-[120%] text-[#207EC5] mt-1 block">
              Keep building your Yorùbá fluency - let's complete today's
              journey!
            </span>
          </section>
          <section className="flex h-full justify-center items-center my-2 sm:my-4">
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={100}
                size={120}
                thickness={5}
                sx={{
                  color: "#F2F4F7",
                }}
              />
              <CircularProgress
                variant="determinate"
                value={userDailyGoal}
                size={120}
                thickness={5}
                sx={{
                  color: "#CDA674", // Progress bar color
                  position: "absolute",
                  left: 0,
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="textPrimary"
                  fontWeight={600}
                >
                  {`${Math.round(userDailyGoal)}%`}
                </Typography>
              </Box>
            </Box>
          </section>
        </div>
      )}
    </>
  );
};

const WordForTheDay = () => {
  const [fill, setFill] = useState("white");
  const [color, setColor] = useState("#CDA674");
  const [showCongrats, setShowCongrats] = useState(false);
  const [isGoalComplete, setIsGoalComplete] = useState(false)

  const { 
    userDetails, 
    isGoalCompleted, 
    completeGoal, 
    isCompletingDailyGoal, 
    goalLoading 
  } = useUserGoals();


  useEffect(()=> {
    setIsGoalComplete(isGoalCompleted)
  },[completeGoal, goalLoading, isGoalCompleted, isCompletingDailyGoal])

  const [dailyWordData, setDailyWordData] = useState({
    audioUrls: [],
    englishText: "",
    languageText: "",
    pronunciationNote: ""
  });
  const [audioPlayerLoading, setAudioPlayerLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: dailyWord, isLoading: dailyWordLoading } = useGetDailyWord(
    userDetails?.languageId, userDetails?.id
  );



  const completeUserGoal = () => {
    if (!audioPlayerLoading && !isGoalCompleted) {
      completeGoal(
        () => {
          setShowCongrats(true);
        },
        (error:any) => {
          console.error("Failed to complete goal:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (dailyWord?.data !== undefined) {
      const wordData = dailyWord.data;
      setDailyWordData({
        audioUrls: wordData?.audioUrls,
        englishText: wordData?.englishText,
        languageText: wordData?.languageText,
        pronunciationNote: wordData?.pronunciationNote
      });
    }
  }, [dailyWord]);

  const handlePlayAudio = () => {
    if (!dailyWordData?.audioUrls || dailyWordData?.audioUrls?.length === 0)
      return;

    setAudioPlayerLoading(true);

    const randomIndex = Math.floor(
      Math.random() * dailyWordData?.audioUrls?.length
    );
    const audio = new Audio(dailyWordData?.audioUrls[randomIndex]);

    audio.addEventListener("canplaythrough", async() => {
      setIsPlaying(true);
      setAudioPlayerLoading(false);
      audio.play();
    });

    audio.addEventListener("error", () => {
      console.error("Failed to load audio");
      setIsPlaying(false);
      setAudioPlayerLoading(false);
    });

    audio.addEventListener("ended", () => {
      if(!isGoalComplete){
        setShowCongrats(true)
        completeUserGoal();
      }
      setIsPlaying(false);
      setAudioPlayerLoading(false);
    });
  };

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const isNightTime = hours >= 18 || hours < 6;
    setIsDark(isNightTime);
  }, []);

  const handleMouseEnter = () => {
    setFill("#CDA674");
    setColor("white");
  };

  const handleMouseLeave = () => {
    setFill("white");
    setColor("#CDA674");
  };

  return (
    <>
      {dailyWordLoading ? (
        <WordForTheDaySkeleton />
      ) : !dailyWord ? (
        <EmptyStateCard title="No Data" subtitle="No Data Available Yet"/>
      ) : (
        <>
          <div
            className="bg-white justify-between items-center shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
            style={{ fontFamily: "Lexend" }}
          >
            <div className="font-semibold text-[18px] sm:text-[20px] md:text-[23px] leading-[100%] text-[#162B6E]">
              Today's Word
            </div>
            <div className="font-bold text-[#000000CC] text-[28px] sm:text-[32px] md:text-[36px] leading-[100%] my-2 sm:my-4">
              {dailyWordData?.languageText}
            </div>
            <div className="flex flex-col gap-[12px] sm:gap-[16px] md:gap-[20px] w-full">
               <h3 className="font-[400] text-center text-[14px] sm:text-[20px] md:text-[30px] leading-[120%] text-[#666666]">
                ({dailyWordData?.pronunciationNote})
              </h3>
              <h3 className="font-[400] text-center text-[14px] sm:text-[20px] md:text-[30px] leading-[120%] text-[#666666]">
                {dailyWordData?.englishText}
              </h3>
              <div className="flex justify-center items-center">
                {audioPlayerLoading || isCompletingDailyGoal || goalLoading ? (
                  <CustomSpinner
                    spinnerColor="#162b6e"
                    isShowTitle={false}
                    spinnerHeight="32px"
                    spinnerWidth="32px"
                  />
                ) : isPlaying ? (
                  <div className="flex items-center gap-1">
                    <PlayerEllipse />
                  </div>
                ) : (
                  <button
                    className="rounded-full p-[8px] hover:cursor-pointer sm:p-[10px] border-[#CDA674] border"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ background: fill }}
                    onClick={handlePlayAudio}
                  >
                    <HiOutlineSpeakerWave size={32} color={color} />
                  </button>
                )}
              </div>
            </div>

            <CongratulationsModal
              isOpen={showCongrats}
              onClose={() => setShowCongrats(false)}
              title="Congratulations!"
              message="You've completed your daily goal! Keep up the great work!"
              imageUrl="/userDashboard/parrot-head.svg"
              imageAlt="Zabbot mascot celebrating"
              darkMode={isDark}
              buttonText="Awesome!"
              showConfetti={true}
            />
          </div>
        </>
      )}
    </>
  );
};

export { DailyGoals, WordForTheDay };