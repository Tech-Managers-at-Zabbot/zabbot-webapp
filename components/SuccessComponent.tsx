'use client';
import React, { useState } from "react";
import Link from "next/link";
import InAppButton from "./InAppButton";
import { CustomSpinner } from "./CustomSpinner";

const SuccessComponent = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#A6DFFF] p-4">
      <div className="bg-[#24A5EE] rounded-lg shadow-md p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <p className="text-lg text-green-900 font-semibold mb-4">Success!</p>
        
        {/* Success Message */}
        <h2 className="text-2xl font-bold text-[white] mb-2">Congratulations</h2>
        
        <p className="text-[white] mb-8">Thank you for joining our waiting list, please check your email for further information.</p>

        {/* Home Button */}
        <Link href="/" passHref>
        <InAppButton color="black" width="100%" onClick={() => setLoading(true)}>
          {loading ? <CustomSpinner /> : "Home"}
          </InAppButton>
        </Link>
      </div>
    </div>
  );
};

export default SuccessComponent;