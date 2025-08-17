import React from "react";
import InAppButton from "../InAppButton";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { usePageLanguage } from "@/contexts/LanguageContext";

const PremiumFeaturesOre = ({ handleClick }: { handleClick: () => void }) => {

const { getPageText } =
      usePageLanguage("userDashboard");

  return (
    <div
      className="relative w-full border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      style={{ fontFamily: "Lexend", backgroundColor: '#6BBBEB' }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end h-full min-h-[200px] sm:min-h-[160px]">
        {/* Content Section */}
        <section className="flex-1 py-4 sm:py-6 px-4 sm:px-[5%] z-10 w-full sm:pr-[160px] md:pr-[200px] lg:pr-[181px]">
          {/* Title Section */}
          <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3 mb-4 sm:mb-6 lg:mb-8">
              <h3 
                className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-bold break-words"
                style={{color: '#162B6E'}}
              >
                {getPageText('chat_ore')}
              </h3>
              <p 
                className="text-sm sm:text-sm md:text-base font-normal leading-relaxed break-words max-w-[280px]"
                style={{color: '#2E2A2A'}}
              >
                {getPageText('ai_powered')}
              </p>
          </div>

          {/* Button Section */}
          <div className="z-10">
          <InAppButton
          background="#162B6E"
          paddingTop="16px"
          paddingBottom="16px"
          paddingLeft="24px"
          paddingRight="24px"
          borderRadius="35.13px"
          width=""
          onClick={handleClick}
        >
          <div className="text-white font-[700] text-[12px] sm:text-[14px] leading-[100%]">
            {getPageText('get_started')}
          </div>
        </InAppButton>
          </div>
        </section>

        {/* Image Section */}
       {/* Image Section */}
<section className="relative flex-shrink-0 w-[50%] sm:w-auto mt-4 sm:mt-0">
  <div className="relative sm:absolute sm:bottom-0 sm:right-[-10px] flex justify-center sm:block w-full sm:w-[140px] md:w-[180px] lg:w-[230px] h-auto">
    <Image
      src={'/userDashboard/ore-image.svg'}
      alt="Feature illustration"
      className="object-contain"
      width={250}
      height={55}
    />
  </div>
</section>

      </div>
    </div>
  );
};

const PremiumFeaturesPara = ({ handleClick }: { handleClick: () => void }) => {
  const { getPageText } =
      usePageLanguage("userDashboard");

  return (
    <div
      className="relative w-full border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      style={{ fontFamily: "Lexend", backgroundColor: '#FFF351' }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end h-full min-h-[200px] sm:min-h-[160px]">
        {/* Content Section */}
        <section className="flex-1 py-4 sm:py-6 px-4 sm:px-[5%] z-10 w-full sm:pr-[160px] md:pr-[200px] lg:pr-[220px]">
          {/* Title Section */}
          <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3 mb-4 sm:mb-6 lg:mb-8">
              <h3 
                className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-bold break-words"
                style={{color: '#101828'}}
              >
                {getPageText('pronounce_with_para')}
              </h3>
          </div>

          {/* Button Section */}
          <div className="z-10">
          <InAppButton
          background="#1671D9"
          paddingTop="8px"
          paddingBottom="8px"
          paddingLeft="16px"
          paddingRight="16px"
          borderRadius="35.13px"
          width=""
          onClick={handleClick}
        >
          <div className="text-white font-[700] text-[12px] sm:text-[14px] leading-[100%]">
            {getPageText('get_started')}
          </div>
        </InAppButton>
          </div>
        </section>

        {/* Image Section */}
        <section className="relative flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="relative sm:absolute sm:bottom-0 sm:right-[8px] flex justify-center sm:block w-full sm:w-[140px] md:w-[180px] lg:w-[200px] h-auto">
            <Image
              src={'/userDashboard/para-image.svg'}
              alt="Feature illustration"
              className="object-contain"
              width={250}
              height={55}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const PremiumFeaturesOwe = ({ handleClick }: { handleClick: () => void }) => {
  const { getPageText } =
      usePageLanguage("userDashboard");

  return (
    <div
      className="relative w-full border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      style={{ fontFamily: "Lexend", backgroundColor: '#E66D58' }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end h-full min-h-[200px] sm:min-h-[160px]">
        {/* Content Section */}
        <section className="flex-1 py-4 sm:py-6 px-4 sm:px-[5%] z-10 w-full sm:pr-[160px] md:pr-[180px] lg:pr-[230px]">
          {/* Title Section */}
          <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3 mb-4 sm:mb-6 lg:mb-8">
              <h3 
                className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-bold break-words"
                style={{color: '#101828'}}
              >
                {getPageText('listen_with_owe')}
              </h3>
          </div>

          {/* Button Section */}
          <div className="z-10">
          <InAppButton
          background="#162B6E"
          paddingTop="8px"
          paddingBottom="8px"
          paddingLeft="16px"
          paddingRight="16px"
          borderRadius="35.13px"
          width=""
          onClick={handleClick}
        >
          <div className="text-white font-[700] text-[12px] sm:text-[14px] leading-[100%]">
            {getPageText('get_started')}
          </div>
        </InAppButton>
          </div>
        </section>

        {/* Image Section */}
        <section className="relative flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="relative sm:absolute sm:bottom-[-20] sm:right-[20px] flex justify-center sm:block w-full sm:w-[140px] md:w-[160px] lg:w-[210px] h-auto">
            <Image
              src={'/userDashboard/owe-image.png'}
              alt="Feature illustration"
              className="object-contain"
              width={200}
              height={55}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const PremiumFeaturesComponents = () => {
   const router = useRouter();

  const handlePronounceClick = (path: string) => {
    if (!path) return;
    
    router.push(path);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 sm:gap-6 transition-all duration-300 ease-in-out">
      <PremiumFeaturesOre handleClick={() => handlePronounceClick('/premium/chat-with-ore')} />
      <PremiumFeaturesPara handleClick={() => handlePronounceClick('/premium/pronounce-with-para')} />
      <PremiumFeaturesOwe handleClick={() => handlePronounceClick('/premium/listen-with-owe')}/>
    </div>
  );
};

export default PremiumFeaturesComponents;