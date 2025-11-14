// components/SubscriptionMonthly.tsx
import React from "react";

interface SubscriptionMonthlyProps {
  className?: string;
}

const SubscriptionMonthly: React.FC<SubscriptionMonthlyProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[#E4F4FC] relative rounded-2xl shadow-lg p-8 border border-[#1671D9] mx-auto ${className}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex mt-4 items-start justify-between">
        <div>
          <h2 className="text-3xl leading-[84%] font-semibold text-[#3D3D3D] mb-4">
            Monthly
          </h2>

          <div className="flex flex-col gap-4">
            <div className="mb-4 leading-[135%] text-[#1671D9] flex items-baseline">
              <span className="text-4xl font-bold">US$9.99/</span>
              <span className="text-2xl font-semibold">month</span>
            </div>
            <p className="text-[#6A7282] text-xl font-normal leading-[150%]">
              Pause, Stop or Change plan anytime.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-[#0F973D] text-center leading-[143%] text-[#FFF] text-[22px] font-normal px-4 py-1 rounded-xl inline-block mb-4">
            Save 35%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionMonthly;