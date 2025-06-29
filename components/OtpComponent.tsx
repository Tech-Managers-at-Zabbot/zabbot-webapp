/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import InAppButton from "@/components/InAppButton";
// import NormalInputField from "./NormalInputField";
import { useSearchParams } from "next/navigation";
import { maskEmail } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { usePageLanguage } from "@/contexts/LanguageContext";
import {
  useVerifyUserEmail,
  useResendVerificationOtp,
} from "@/services/generalApi/authentication/mutation";
import { appColors } from "@/constants/colors";
import { CustomSpinner } from "@/components/CustomSpinner";
import { Alerts, useAlert } from "next-alert";

const OtpComponent: React.FC = () => {
   const { getPageText, isPageLoading: isLanguageLoading } =
      usePageLanguage("otp");
  const [code, setCode] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(12);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [disabler, setDisabler] = useState(true);
  const searchParams = useSearchParams();
  const email = searchParams ? searchParams.get("email") : null;
  const userEmail = maskEmail(email || "");
  const { addAlert } = useAlert();
  const router = useRouter();
  const { mutate: verifyUserEmail, isPending: isVerifyLoading } =
    useVerifyUserEmail();
  const { mutate: resendVerificationOtp, isPending: isResendingVerification } =
    useResendVerificationOtp();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const fullCode = code.join("");
    setDisabler(fullCode.length !== 4);
  }, [code]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (!value && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendCode = () => {
    setCountdown(30);
    setCanResend(false);
    setCode(["", "", "", ""]);
    setError("");

    if(!email){
      addAlert(
        "Error",
        "Unable to verify account, please try again soon",
        "error"
      );
    }

    resendVerificationOtp(
      { email: email || "" },
      {
        onSuccess: () => {
          setError("");
          addAlert(
            "Success",
            "Verification code has been resent to your email",
            "success"
          );
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message ||
              "Unable to resend code, please try again soon",
            "error"
          );
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      setError("Please enter the 4-digit verification code");
      return;
    }

    if(!email){
      addAlert(
        "Error",
        "Unable to verify account, please try again soon",
        "error"
      );
    }

    verifyUserEmail(
      { email: email || "", otp: fullCode },
      {
        onSuccess: () => {
          setError("");
          router.push(`/login`);
          addAlert(
            "Success",
            "Your account has been successfully verified, redirecting to login",
            "success"
          );
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message ||
              "Unable to verify account, please try again soon",
            "error"
          );
        }
      }
    );
    setCode(["", "", "", ""]);
  };

    if (isLanguageLoading) {
    return <CustomSpinner spinnerColor="#012657" />
  }

  return (
    <div className="w-full bg-white rounded-[16px] gap-[20px] md:gap-[40px] justify-center flex flex-col py-[24px] md:py-[32px] px-[16px] md:px-[8px] max-w-[615px] mx-auto border-1 border-[#D0D0D0]">
      <div className="text-left mb-4 md:mb-6 flex flex-col items-center justify-center">
        <h2 className="text-[24px] md:text-[32px] leading-[28px] md:leading-[32px] text-[Black] font-semibold mb-2">
          {/* Verify Your Account */}
          {getPageText("verify_account")}
        </h2>
        <div className="text-gray-600 flex flex-col font-[600] text-[16px] md:text-[21px] leading-[24px] md:leading-[32px]">
          {/* A verification code has been sent to */}
          {getPageText("verification_has_been_sent")}{" "}
          <span className="font-medium">{userEmail}</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 flex flex-col gap-[20px] md:gap-[30px]"
      >
        <div className="flex justify-center space-x-4 md:space-x-10">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 md:w-16 md:h-16 text-2xl md:text-3xl text-[#60646C] text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="text-center">
          {isResendingVerification || isVerifyLoading ? (
            <CustomSpinner spinnerColor="#8B8D98" />
          ) : canResend ? (
            <button
              type="button"
              onClick={handleResendCode}
              className="text-[#8B8D98] hover:cursor-pointer hover:text-blue-800 font-medium"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-gray-500">
              {/* Resend Code in  */} 
              {getPageText("resend_code_in")}{" "}
              {countdown}{" "} 
              {getPageText("seconds")}
            </p>
          )}
        </div>

        <div className="mt-4 md:mt-6 flex justify-center items-center">
          <div className="w-full md:w-[433px]">
            <InAppButton
              width="100%"
              disabled={isVerifyLoading || disabler || isResendingVerification}
              disabledColor={appColors.disabledButtonBlue}
              backgroundColor={appColors.darkRoyalBlueForBtn}
            >
              {isVerifyLoading ? (
                <CustomSpinner spinnerColor="#8B8D98" />
              ) : (
                <div>Submit</div>
              )}
            </InAppButton>
          </div>
        </div>
      </form>
      <Alerts
        position="top-left"
        direction="right"
        timer={5000}
        className="rounded-md relative z-1000 !w-80"
      />
    </div>
  );
};

export default OtpComponent;