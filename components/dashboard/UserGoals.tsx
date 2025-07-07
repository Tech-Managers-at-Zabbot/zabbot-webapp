import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { HiOutlineSpeakerWave } from "react-icons/hi2";


const DailyGoals = () => {
    return (
    <div className='bg-white min-w-[250px] justify-between shadow-md flex rounded-lg border border-[#EAECF0] flex-col h-full p-[24px]' style={{fontFamily: "Lexend"}}>
        <section>
            <h1 className='font-semibold text-[24px] leading-[100%] text-[#162B6E]'>Daily Goal</h1>
            <span className='font-semibold text-[15px] leading-[100%] text-[#207EC5]'>Keep building your Yorùbá fluency - let’s complete today’s journey!</span>
        </section>
        <section className='flex h-full justify-center items-center'>
  <Box position="relative" display="inline-flex">
  <CircularProgress
    variant="determinate"
    value={100}
    size={144}
    thickness={5}
    sx={{
      color: '#F2F4F7', // Background track color
    }}
  />
  <CircularProgress
    variant="determinate"
    value={60}
    size={144}
    thickness={5}
    sx={{
      color: '#CDA674', // Progress bar color
      position: 'absolute',
      left: 0,
      '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
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
}

const WordForTheDay = () => {
    return (
    <div className='bg-white min-w-[250px] text-center justify-between items-center shadow-md flex rounded-lg border border-[#EAECF0] flex-col h-full p-[24px]' style={{fontFamily: "Lexend"}}>
        <div className='font-semibold text-[23px] leading-[100%] text-[#162B6E]'>
            Today’s Word
        </div>
        <div className='font-bold text-[#000000CC] text-[36px] leading-[100%]'>
            àlàáfíà
        </div>
        <div className='flex flex-col gap-[24px]'>
            <h3 className='font-[400] text-[16px] leading-[100%] text-[#666666]'>Mastering alphabet sounds builds your Yorùbá fluency and tone precision.</h3>
            <div className='flex hover:cursor-pointer justify-center items-center'>
                <div className='rounded-full p-[10px] border-[#CDA674] border'><HiOutlineSpeakerWave size={40} color='#CDA674'/></div>
            </div>
        </div>
    </div>
    );
}




export {
    DailyGoals,
    WordForTheDay
};