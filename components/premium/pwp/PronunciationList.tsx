import React from "react"; // useState
import Image from 'next/image';

import { PronunciationProps, PronunciationListProps } from '../types';

const PronunciationList = ({ setSelectedItem, selectedItem, data, isLoading }: PronunciationListProps) => {
  if (isLoading) return <div>Loading...</div>;

  if (!data || data.length < 1) return (
    <div className='text-sm font-normal pl-1 italic text-gray-400'>...empty data</div>
  );

  return (
    data && data?.map((item: PronunciationProps) => (
      <div
        key={item.id}
        onClick={() => setSelectedItem(item.id)}
        className={`p-[8px] min-w-[150px] w-auto flex flex-col rounded-sm cursor-pointer text-shadow-white break-words whitespace-normal ${selectedItem === item.id ? '' : 'hover:text-gray-600'
          }`}
        style={{
          justifyContent: 'space-between',
          backgroundColor: selectedItem === item.id ? '#0098DE' : '#123F77',
          border: '2px solid #0098DE',
          borderRadius: '4px',
          color: '#FFFFFF',
          margin: '8px 0'
        }}
      >
        <div className="flex flex-col lg:flex-row text-2xl lg:justify-between">
          <div className='flex'>
            <Image
              src="/general/play-icon.svg"
              alt="pwp-play-icon"
              width={20}
              height={20}
            />
            <div className="text-[14px] text-[#F9F8FB] ml-[10px]">{item.yorubaWord.toLocaleUpperCase()}
              <div className="text-[11px] text-[#98A2B3] block lg:hidden">{item?.tone}</div>
            </div>
          </div>
          <div className="text-[12px] hidden lg:block">{item?.tone}</div>
        </div>
        <div className="text-[11px] text-[#98A2B3] pt-[4px] pl-[30px]">{item.englishWord}</div>
      </div>
    )));
};

export default PronunciationList;
