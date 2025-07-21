/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const DailyGoals = () => {
  return (
    <div
      className="bg-white justify-between shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
      style={{ fontFamily: "Lexend" }}
    >
      <section>
        <h1 className="font-semibold text-[18px] sm:text-[20px] md:text-[24px] leading-[100%] text-[#162B6E]">
          Daily Goal
        </h1>
        <span className="font-semibold text-[12px] sm:text-[14px] md:text-[15px] leading-[120%] text-[#207EC5] mt-1 block">
          Keep building your Yorùbá fluency - let's complete today's journey!
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
              color: "#F2F4F7", // Background track color
            }}
          />
          <CircularProgress
            variant="determinate"
            value={60}
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
              {`${Math.round(60)}%`}
            </Typography>
          </Box>
        </Box>
      </section>
    </div>
  );
};

const WordForTheDay = () => {
  const [fill, setFill] = useState("white");
  const [color, setColor] = useState("#CDA674");

  const handleMouseEnter = () => {
    setFill("#CDA674");
    setColor("white");
  };

  const handleMouseLeave = () => {
    setFill("white");
    setColor("#CDA674");
  };
  return (
    <div
      className="bg-white justify-between items-center shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="font-semibold text-[18px] sm:text-[20px] md:text-[23px] leading-[100%] text-[#162B6E]">
        Today's Word
      </div>
      <div className="font-bold text-[#000000CC] text-[28px] sm:text-[32px] md:text-[36px] leading-[100%] my-2 sm:my-4">
        àlàáfíà
      </div>
      <div className="flex flex-col gap-[12px] sm:gap-[16px] md:gap-[20px] w-full">
        <h3 className="font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[120%] text-[#666666]">
          Mastering alphabet sounds builds your Yorùbá fluency and tone
          precision.
        </h3>
        <div className="flex hover:cursor-pointer justify-center items-center">
          <div
            className="rounded-full p-[8px] sm:p-[10px] border-[#CDA674] border"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ background: fill }}
          >
            <HiOutlineSpeakerWave size={32} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DailyGoals, WordForTheDay };
