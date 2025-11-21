import React from "react";

const PaymentSuccess: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[300px] bg-white p-6 rounded-md shadow-md"
    style={{fontFamily: "Lexend"}}
    >
      <div className="animate-bounce mb-4">
        <svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="#228B22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58002L19 8L10 17Z" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-[#207ec6]">
        Payment Successful
      </h2>
      <p className="text-[#101828]">
        Thank you for your subscription! You now have access to all premium features.
      </p>
    </div>
  );
};

export default PaymentSuccess;
