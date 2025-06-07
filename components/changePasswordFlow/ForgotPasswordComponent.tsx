"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import InAppButton from "../InAppButton";
import NormalInputField from "../NormalInputField";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { Alerts, useAlert } from "next-alert";
import { appColors } from "@/constants/colors";
import { useRouter } from "next/navigation";
import { CustomSpinner } from "../CustomSpinner";


const emailSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
});

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { addAlert } = useAlert();
  const router = useRouter()


  useEffect(() => {
    const validateEmail = () => {
      try {
        emailSchema.parse({ email });
        setEmailError("");
        setButtonDisabled(false);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setEmailError(error.errors[0].message);
        }
        setButtonDisabled(true);
      }
    };

    if (email.trim()) {
      validateEmail();
    } else {
      setEmailError("");
      setButtonDisabled(true);
    }
  }, [email]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse({ email });

      setLoading(true)
      
      // console.log("Email is valid, proceeding with password reset:", email);
      
      addAlert(
        "Success",
        "A password reset link has been sent to your email",
        "success"
      );

      return router.push('/change-password')
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        addAlert(
          "Error",
          error.errors[0].message,
          "error"
        );
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="w-full max-w-[615px] border-1 border-[#D0D0D0] bg-white rounded-2xl py-[60px] flex flex-col gap-[24px] mx-auto px-[60px]">
      <div className="flex items-center justify-between">
        <div className="hover:cursor-pointer">
          <IoChevronBackSharp size={28} color="#1C2024" />
        </div>
        <h1 className="text-2xl text-[#1C2024] font-bold">Forgot Password</h1>
        <div className="hover:cursor-pointer">
          <IoCloseOutline size={28} color="#1C2024" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 mt-10">
        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor="email"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C] mb-2"
          >
            Email address
          </label>
          <div className="relative">
            <NormalInputField
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Type your email address"
              type="email"
              border="0"
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div className="mt-6">
          <InAppButton
            disabledColor="#80BBFF"
            width="100%"
            disabled={buttonDisabled || loading}
            backgroundColor={appColors.darkRoyalBlueForBtn}
          >
            { loading ? <CustomSpinner /> : <div>Continue</div> }
          </InAppButton>
        </div>
      </form>
      <Alerts
        position="top-left"
        direction="right"
        timer={3000}
        className="rounded-md relative z-1000 !w-80"
      />
    </div>
  );
};

export default ForgotPassword;