/* eslint-disable @next/next/no-img-element */
import React from "react";
import InAppButton from "../InAppButton";

interface PremiumFeature {
  title1?: string;
  title2?: string;
  title3?: string;
  backgroundColor?: string;
  imgSrc?: string;
  path?: string;
}

interface PremiumFeaturesData {
  data?: PremiumFeature;
}

const PremiumFeaturesCard: React.FC<PremiumFeaturesData> = ({ data }) => {
  return (
    <>
      <div
        className="relative w-full border border-gray-200 flex flex-col justify-between text-center rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        style={{ fontFamily: "Lexend", backgroundColor: data?.backgroundColor }}
      >
        <section className="flex mt-1 md:mt-1 lg:mt-10 flex-col gap-10 justify-between">
          {/* Title Section */}
          <div className="flex-1 flex flex-col justify-center space-y-1 sm:space-y-1">
            {data?.title1 && (
              <div className="flex justify-center text-center items-center">
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#162B6E] break-words">
                  {data.title1}
                </h3>
              </div>
            )}

            {data?.title2 && (
              <div className="flex justify-center text-center items-center">
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#162B6E] break-words">
                  {data.title2}
                </h3>
              </div>
            )}

            {data?.title3 && (
              <div className="flex justify-center text-center items-center">
                <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#162B6E] break-words">
                  {data.title3}
                </h3>
              </div>
            )}
          </div>

          {/* Button Section */}
          <div className="flex justify-center mb-4 sm:mb-6 z-10">
            <InAppButton
              background="#24A5EE"
              width="80px"
              height="40px"
              borderRadius="8px"
            >
              Start
            </InAppButton>
          </div>
        </section>

        {/* Image Section */}
        <div
          className={`absolute right-1 sm:right-2 bottom-0 flex items-end h-full pointer-events-none transition-all duration-300 transform`}
        >
          <img
            src={data?.imgSrc}
            alt="Feature illustration"
            className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 xl:w-32 object-contain"
          />
        </div>
      </div>
    </>
  );
};

const PremiumFeaturesComponents = () => {
  const premiumFeaturesDetails = [
    {
      backgroundColor: "#E3F5FF",
      title1: "Write",
      title2: "With",
      title3: "Ọ̀rẹ́",
      imgSrc: "/premium/zabbot-ore-robot.svg",
      path: "",
    },
    {
      backgroundColor: "#A6DFFF",
      title1: "Pronounce",
      title2: "with",
      title3: "Pàrà",
      imgSrc: "/premium/zabbot-para.svg",
      path: "",
    },
    {
      backgroundColor: "#E3F5FF",
      title1: "Listen",
      title2: "with",
      title3: "Òwe",
      imgSrc: "/premium/zabbot-owe.png",
      path: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 sm:gap-6 transition-all duration-300 ease-in-out">
      {premiumFeaturesDetails.map((item, index) => (
        <PremiumFeaturesCard key={index} data={item} />
      ))}
    </div>
  );
};

export default PremiumFeaturesComponents;
