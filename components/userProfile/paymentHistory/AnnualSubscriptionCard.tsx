// components/SubscriptionAnnual.tsx
import React from "react";

interface SubscriptionAnnualProps {
  className?: string;
}

const SubscriptionAnnual: React.FC<SubscriptionAnnualProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[#FEF4E4] relative rounded-2xl shadow-lg p-8 border border-[#F3A218] mx-auto ${className}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="absolute top-[-12] min-w-[300px] text-center left-10 px-[16px] py-2 bg-[#F56630] rounded-lg">
        <h1 className="text-white leading-[145%] font-medium text-lg">
          Most Popular
        </h1>
      </div>

      <div className="flex mt-4 items-start justify-between">
        <div className="">
          <h2 className="text-3xl leading-[84%] font-semibold text-[#3D3D3D] mb-4">
            Annual Subscription
          </h2>

          <div className="mb-4 leading-[135%] text-[#EE9705] flex items-baseline">
            <span className="text-4xl font-bold">US$69.99/</span>
            <span className="text-2xl font-semibold">year</span>
          </div>

          <p className="text-[#6A7282] text-xl font-normal leading-[150%]">
            Renews once a year.
          </p>
        </div>

        <div>
          <div className="bg-[#F3A218] text-center leading-[143%] text-[#FFF] text-[22px] font-normal px-4 py-1 rounded-xl inline-block mb-4">
            Save 35%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAnnual;
