import React from "react";
import { CustomSpinner } from "@/components/CustomSpinner";

type PaymentStatus = "pending" | "success" | "failed";

const PaymentSuccess: React.FC<{ status?: PaymentStatus }> = ({ status = "success" }) => {
  if (status === "pending") {
    return (
      <div
        className="flex flex-col gap-4 items-center justify-center min-h-[300px] bg-white p-6 rounded-md shadow-md"
        style={{ fontFamily: "Lexend" }}
      >
        <CustomSpinner spinnerColor="black" />
        <h2 className="text-2xl font-semibold text-[#207ec6]">
          Confirming your payment
        </h2>
        <p className="text-[#101828] text-center">
          We&apos;re confirming your payment with our payment provider. This usually
          only takes a few seconds — please don&apos;t close this page.
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div
        className="flex flex-col gap-4 items-center justify-center min-h-[300px] bg-white p-6 rounded-md shadow-md"
        style={{ fontFamily: "Lexend" }}
      >
        <h2 className="text-2xl font-semibold text-red-600">
          We couldn&apos;t confirm your payment
        </h2>
        <p className="text-[#101828] text-center">
          Your payment is taking longer than expected to confirm. If you were charged,
          your subscription will activate automatically shortly. Otherwise, please
          try again or contact support.
        </p>
      </div>
    );
  }

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
