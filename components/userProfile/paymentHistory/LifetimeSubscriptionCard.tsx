// components/SubscriptionLifetime.tsx
import React from "react";

interface SubscriptionLifetimeProps {
  className?: string;
}

const SubscriptionLifetime: React.FC<SubscriptionLifetimeProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[#DCFFE7] relative rounded-2xl shadow-lg p-8 border border-[#0F973D] mx-auto ${className}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex mt-4 items-start justify-between">
        <div className="flex flex-col gap-2">

          <div className="flex flex-col gap-2">
          <h2 className="text-3xl leading-[84%] font-semibold text-[#3D3D3D]">
            Lifetime Access
          </h2>
          <p className="text-[#3D3D3D] font-[400] leading-[29px] text-lg">(one-time payment)</p>
          </div>


          <div>
            <div className="mb-4 leading-[135%] text-[#0F973D] flex items-baseline">
              <span className="text-4xl font-bold">
                US$159.99
              </span>
            </div>
          </div>

          <div>
            <p className="text-[#6A7282] text-xl font-normal leading-[150%]">
              One payment. Endless learning.
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

export default SubscriptionLifetime;
