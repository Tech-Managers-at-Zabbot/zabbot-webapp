import React from "react";

interface NoSubscriptionProps {
  className?: string;
}

const NoSubscription: React.FC<NoSubscriptionProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-[#F5F5F5] relative rounded-2xl shadow-lg p-6 sm:p-8 border border-[#C4C4C4] mx-auto ${className}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
        {/* Left Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl leading-snug font-semibold text-[#3D3D3D]">
            No Subscription Yet
          </h2>

          {/* <p className="text-[#6A7282] text-base sm:text-xl font-normal leading-snug sm:leading-[150%]">
            Basic features. No payment required.
          </p> */}

          <div className="mt-2 sm:mt-4 leading-snug sm:leading-[135%] text-[#3D3D3D] flex items-baseline">
            <span className="text-3xl sm:text-4xl font-bold">US$0.00</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-2 sm:mt-0 flex-shrink-0">
          <div className="bg-[#6A7282] text-center leading-snug sm:leading-[143%] text-white text-sm sm:text-[22px] font-normal px-3 sm:px-4 py-1 rounded-xl inline-block">
            Free
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoSubscription;
