"use client";
import React, { useState } from "react";
import NormalInputField from "../NormalInputField";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "../InAppButton";
import Link from "next/link";
import { appColors } from "@/constants/colors";

const LoginAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  return (
    <div className="w-full flex flex-col gap-[60px] max-w-md mx-auto">
      <div className="w-full flex flex-col gap-[8px]">
        <h1
          className="text-[#000000] text-[27.65px] font-[500] leading-[31.8px]"
          style={{ fontFamily: "Lexend" }}
        >
          Log in
        </h1>
      </div>
      <form className="flex flex-col gap-[32px]">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#60646C]"
          >
            Email Address
          </label>
          <NormalInputField
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...error, emailError: false });
            }}
            placeholder="Type your email address"
            type="email"
            error={error.emailError}
            color="#80838D"
            backgroundColor="#E3EFFC"
            border={"0"}
            errorMessage="Email is required"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#60646C]"
          >
            Password
          </label>
          <div className="relative">
            <NormalInputField
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, passwordError: false });
              }}
              placeholder="Type your password"
              type={showPassword ? "text" : "password"}
              error={error.passwordError}
              color="#80838D"
              backgroundColor="#E3EFFC"
              border={"0"}
              errorMessage="Password is required"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 hover:cursor-pointer right-0 pr-3 flex items-center text-sm leading-5 pointer-events-auto"
              style={{ top: "1px", height: "56px" }}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-6">
          <InAppButton disabled disabledColor="#93CAEC" width="100%">
            <div>Continue</div>
          </InAppButton>
        </div>
      </form>
      <div className="text-[#645D5D] justify-center items-center flex gap-[20px] font-[400] text-[14px] leading-[145%]">
        <div>Forgot your password?</div>{" "}
        <Link
          href="/forgot-password"
          style={{ textDecoration: "none", color: appColors.redPrimary500 }}
        >
          <span className="font-[600] hover:cursor-pointer">Reset it here.</span>
        </Link>
      </div>

      <div className="text-[#645D5D] justify-center items-center flex gap-[20px] font-[400] text-[14px] leading-[145%]">
        <div>New to Zabbot? Join Now</div>{" "}
        <Link
          href="/signup"
          style={{ textDecoration: "none", color: appColors.normalBlue }}
        >
          <span className={`font-[600] hover:cursor-pointer`}>Create Account</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginAuth;
