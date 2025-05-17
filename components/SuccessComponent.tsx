
"use client";
import React, { useState } from "react";
import Link from "next/link";
import InAppButton from "./InAppButton";
import { CustomSpinner } from "./CustomSpinner";
import Image from "next/image";

const SuccessComponent = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#E3F5FF] px-4 py-8"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="w-full max-w-md mx-auto mb-6">
        <Image
          src="/general/zabbot-logo-blue.svg"
          alt="Language Learning Logo"
          width={350}
          height={118}
          priority
          className="w-full h-auto"
        />
      </div>
      
      <div className="bg-white flex flex-col gap-4 rounded-lg shadow-md p-6 md:p-8 max-w-lg w-full text-center mx-auto">
        {/* Title */}
        <p className="text-xl md:text-2xl lg:text-3xl text-[#09111D] font-medium">
          Hooray! 🎉
        </p>

        <div className="mb-4 md:mb-8 text-[#8B9298] text-sm md:text-base lg:text-lg">
          You have joined our founders circle! <br />
          Please share with others. Check your inbox for more information.<br/>
          If you do not see our email in your inbox, please check the promotions folder of your mail.
        </div>

        {/* Home Button */}
        <Link href="/" passHref className="w-full mt-2">
          <InAppButton
            borderRadius="8px"
            backgroundColor="#162B6E"
            disabled={loading}
            color="#FFFFFF"
            width="100%"
            onClick={() => setLoading(true)}
          >
            {loading ? <CustomSpinner /> : "Thank You"}
          </InAppButton>
        </Link>
      </div>
      
      <div className="text-[#8B9298] text-xs md:text-sm lg:text-base mt-6 text-center">
        Click here to follow and cheer us on!{" "}
        <span className="text-[#0D5EBA]">
          <Link
            href="https://www.linkedin.com/company/zabbot/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SuccessComponent;