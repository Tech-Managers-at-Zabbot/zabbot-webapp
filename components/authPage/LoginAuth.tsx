"use client";
import React, { useState } from "react";
import NormalInputField from "../NormalInputField";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "../InAppButton";
import Link from "next/link";

const LoginAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <div className="text-[#000000] mb-10 w-full flex flex-col gap-[8px]">
        <h1 className="text-[27.65px] font-[700] leading-[31.8px]">
          Login to your account
        </h1>
        <p className="text-[#645D5D] font-[400] text-[14px] leading-[145%]">
          Don&apos;t have an account{" "}
          <Link
            href="/signup"
            style={{ textDecoration: "none", color: "#eb512f" }}
          >
            <span className="text-[#EB5017] hover:cursor-pointer">
              Register
            </span>
          </Link>
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#60646C]"
          >
            Email
          </label>
          <NormalInputField
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...error, emailError: false });
            }}
            placeholder="Input your email address"
            type="email"
            error={error.emailError}
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
              placeholder="Input your password"
              type={showPassword ? "text" : "password"}
              error={error.passwordError}
              errorMessage="Password is required"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
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
          <InAppButton width="100%">
            <div>Login</div>
          </InAppButton>
        </div>
      </form>
    </div>
  );
};

export default LoginAuth;
