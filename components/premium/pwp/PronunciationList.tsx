import React from "react"; // useState
import Image from 'next/image';

import { useGetAllPronunciation } from "@/services/generalApi/pronounciations/mutation";
import {PronunciationProps, PronunciationListProps} from '../types';

const PronunciationList = ({ setSelectedItem, selectedItem }: PronunciationListProps) => {
  const { data: pronunciations } = useGetAllPronunciation();

  if (!pronunciations && pronunciations?.status !== "success" && pronunciations?.data.length < 1) return (
    <div className='text-sm font-normal pl-1 italic text-gray-400'>...empty data</div>
  );

  return (
      pronunciations && pronunciations?.data?.map((item: PronunciationProps) => (
          <div
              key={item.id}
              onClick={() => setSelectedItem(item.id)}
              className={`p-[8px] flex flex-col rounded-sm cursor-pointer text-shadow-white ${selectedItem === item.id ? '' : 'hover:text-gray-600'
                  }`} style={{ justifyContent: 'space-between', backgroundColor: selectedItem === item.id ? '#0098DE' : '#123F77', border: '2px solid #0098DE', borderRadius: '4px', color: '#FFFFFF' }}
          >
            <div className="flex text-2xl">
              <Image
                src="/general/play-icon.svg"
                alt="pwp-play-icon"
                width={20}
                height={20}
              />
              <div className="text-[14px] text-[#F9F8FB] ml-[10px]">{item.yorubaWord}</div>
            </div>
            <div className="text-[11px] text-[#98A2B3] pt-[4px]">{item.englishWord}</div>
          </div>
      )));
    };

export default PronunciationList;
