import React from "react";

interface SubscriptionLifetimeProps {
  className?: string;
}

const SubscriptionLifetime: React.FC<SubscriptionLifetimeProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[#DCFFE7] relative rounded-2xl shadow-lg p-6 sm:p-8 border border-[#0F973D] mx-auto ${className}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mt-4">
        {/* Left Section */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 sm:gap-2">
            <h2 className="text-2xl sm:text-3xl leading-snug sm:leading-[84%] font-semibold text-[#3D3D3D]">
              Lifetime Access
            </h2>
            <p className="text-[#3D3D3D] font-[400] leading-[1.2rem] sm:leading-[29px] text-sm sm:text-lg">
              (one-time payment)
            </p>
          </div>

          <div className="mb-2 sm:mb-4 leading-snug sm:leading-[135%] text-[#0F973D] flex items-baseline">
            <span className="text-3xl sm:text-4xl font-bold">US$159.99</span>
          </div>

          <p className="text-[#6A7282] text-base sm:text-xl font-normal leading-snug sm:leading-[150%]">
            One payment. Endless learning.
          </p>
        </div>

        {/* Right Section */}
        {/* <div>
          <div className="bg-[#0F973D] text-center leading-snug sm:leading-[143%] text-white text-sm sm:text-[22px] font-normal px-3 sm:px-4 py-1 rounded-xl inline-block mt-2 sm:mt-0">
            Save 35%
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SubscriptionLifetime;
