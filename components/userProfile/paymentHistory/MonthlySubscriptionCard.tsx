import React from "react";

interface SubscriptionMonthlyProps {
  className?: string;
}

const SubscriptionMonthly: React.FC<SubscriptionMonthlyProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[#E4F4FC] relative rounded-2xl shadow-lg p-6 sm:p-8 border border-[#1671D9] mx-auto ${className}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
        {/* Left section */}
        <div>
          <h2 className="text-2xl sm:text-3xl leading-snug sm:leading-[84%] font-semibold text-[#3D3D3D] mb-4">
            Monthly
          </h2>

          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="mb-2 sm:mb-4 leading-snug sm:leading-[135%] text-[#1671D9] flex items-baseline">
              <span className="text-3xl sm:text-4xl font-bold">US$9.99/</span>
              <span className="text-xl sm:text-2xl font-semibold ml-1 sm:ml-2">
                month
              </span>
            </div>
            <p className="text-[#6A7282] text-base sm:text-xl font-normal leading-snug sm:leading-[150%]">
              Pause, Stop or Change plan anytime.
            </p>
          </div>
        </div>

        {/* Right section */}
        <div>
          <div className="bg-[#0F973D] text-center leading-snug sm:leading-[143%] text-white text-sm sm:text-[22px] font-normal px-3 sm:px-4 py-1 rounded-xl inline-block mt-2 sm:mt-0">
            Save 35%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionMonthly;
