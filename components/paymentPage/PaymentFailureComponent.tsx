import React from "react";
import InAppButton from "../InAppButton";

interface PaymentFailureProps {
  onTryAgain?: () => void;
  onCancel?: () => void;
}

const PaymentFailure: React.FC<PaymentFailureProps> = ({
  onTryAgain,
  onCancel,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[300px] bg-white p-6 rounded-md shadow-md"
      style={{ fontFamily: "Lexend" }}
    >
      <svg
        width="70"
        height="70"
        viewBox="0 0 24 24"
        fill="#e63946"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm5 15.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
      </svg>

      <h2 className="text-2xl font-semibold text-[#207ec6] mb-4">
        Payment Failed
      </h2>

      <div className="flex gap-4">
        <InAppButton
          onClick={onTryAgain}
          background="#207ec6"
          width="80%"
          //   className="px-4 py-2 bg-[#207ec6] text-white rounded-md hover:bg-[#1a6aa6]"
        >
          <div>Try Again</div>
        </InAppButton>

        <InAppButton
          onClick={onCancel}
          background="#207ec6"
          //   width="80%"
          //   className="px-4 py-2 border border-[#207ec6] text-[#207ec6] rounded-md hover:bg-[#207ec6] hover:text-white"
        >
          <div>Cancel</div>
        </InAppButton>
      </div>
    </div>
  );
};

export default PaymentFailure;
