"use client";
import React, { useState } from "react";
import Link from "next/link";
import InAppButton from "../InAppButton";
import { CustomSpinner } from "../CustomSpinner";
import Image from "next/image";

interface SuccessProps {
  message: string;
  title: string;
  buttonText?:string;
}

const SuccessComponent:React.FC<SuccessProps> = ({
  title = "Success!",
  message = "Password has been updated.",
  buttonText = "Continue"
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#E3EFFC] px-4"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="bg-white flex flex-col gap-4 rounded-[35.78px] shadow-md p-6 md:p-8 max-w-lg w-full text-center mx-auto">
              <div className="w-full max-w-md mx-auto mb-6">
        <Image
          src="/general/success-key.svg"
          alt="Language Learning Logo"
          width={350}
          height={118}
          priority
          className="w-full h-auto"
        />
      </div>
        {/* Title */}
        <p className="text-xl md:text-2xl lg:text-3xl leading-[145%] text-[#202124] font-[700]">
          {title}
        </p>

        <div className="mb-4 md:mb-8 text-[#202124] text-sm md:text-base lg:text-[21.47px]">
           {message} 
        </div>

        {/* Home Button */}
        <Link href="/login" passHref className="w-full mt-2">
          <InAppButton
            borderRadius="1192.64px"
            background="#012657"
            disabled={loading}
            disabledColor="#80BBFF"
            color="#FFFFFF"
            width="100%"
            onClick={() => setLoading(true)}
          >
            {loading ? <CustomSpinner /> : buttonText}
          </InAppButton>
        </Link>
      </div>

      {/* <div className="text-[#8B9298] text-xs md:text-sm lg:text-base mt-6 text-center">
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
      </div> */}
    </div>
  );
};

export default SuccessComponent;
