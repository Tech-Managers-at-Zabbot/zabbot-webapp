import React from "react";

interface SubscriptionAnnualProps {
  className?: string;
}

const SubscriptionAnnual: React.FC<SubscriptionAnnualProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[#FEF4E4] relative rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-[#F3A218] mx-auto ${className}`}
      style={{ fontFamily: "Lexend" }}
    >
      {/* Badge */}
      <div className="absolute -top-3 left-2 sm:left-6 md:left-10 px-2 sm:px-3 md:px-4 py-1 bg-[#F56630] rounded-lg text-center min-w-[180px] sm:min-w-[250px] md:min-w-[300px]">
        <h1 className="text-white leading-[145%] font-medium text-xs sm:text-sm md:text-lg">
          Most Popular
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6 mt-6 sm:mt-4">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl leading-snug sm:leading-[90%] md:leading-[84%] font-semibold text-[#3D3D3D] mb-2 sm:mb-4">
            Annual Subscription
          </h2>

          <div className="mb-2 sm:mb-4 flex items-baseline text-[#EE9705]">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold">US$69.99/</span>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold ml-1 sm:ml-2">
              year
            </span>
          </div>

          <p className="text-[#6A7282] text-sm sm:text-base md:text-lg font-normal leading-snug sm:leading-[140%] md:leading-[150%]">
            Renews once a year.
          </p>
        </div>

        {/* Right Section */}
        {/* <div className="mt-2 sm:mt-0 flex-shrink-0">
          <div className="bg-[#F3A218] text-center leading-snug sm:leading-[143%] text-white text-xs sm:text-sm md:text-[22px] font-normal px-2 sm:px-3 md:px-4 py-1 rounded-xl inline-block">
            Save 35%
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SubscriptionAnnual;
