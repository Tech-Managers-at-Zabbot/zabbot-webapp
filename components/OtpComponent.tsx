"use client"
import React, { useState, useEffect } from "react";
import InAppButton from "@/components/InAppButton";

const OtpComponent: React.FC = () => {
  const [email, setEmail] = useState("ta*********@gmail.com");
  const [code, setCode] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(12);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Handle moving to next input when a digit is entered
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Handle moving to previous input when a digit is deleted
    if (!value && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace on empty input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendCode = () => {
    setCountdown(30);
    setCanResend(false);
    setCode(["", "", "", ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      setError("Please enter the 4-digit verification code");
      return;
    }
  };

  return (
    <div className="w-full gap-[80px] justify-center flex flex-col py-[32px] px-[8px] max-w-[615px] h-[703.93px] mx-auto border-1 border-[#D0D0D0]">
      
      <div className="text-left mb-6 pl-30">
        <h2 className="text-[32px] leading-[32px] text-[Black] font-semibold mb-2">Verify Your Account</h2>
        <p className="text-gray-600 font-[600] text-[21px] leading-[32px]">
          A verification code has been sent to <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-[30px]">
        <div className="flex justify-center space-x-10">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-3xl text-[#60646C] text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendCode}
              className="text-[#8B8D98] hover:cursor-pointer hover:text-blue-800 font-medium"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-gray-500">
              Resend Code in {countdown} seconds
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-center items-center">
            <div className="w-[433px]">
          <InAppButton width="100%" disabled>
            <div>Verify</div>
          </InAppButton>
            </div>
        </div>
      </form>
    </div>
  );
};

export default OtpComponent;