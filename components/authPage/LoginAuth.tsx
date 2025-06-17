/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import NormalInputField from "../NormalInputField";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "../InAppButton";
import Link from "next/link";
import { appColors } from "@/constants/colors";
import { CustomSpinner } from "@/components/CustomSpinner";
import { z } from "zod";
import { Alerts, useAlert } from "next-alert";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/services/generalApi/authentication/mutation";

const LoginAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { addAlert } = useAlert();
  const router = useRouter();
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isCreateAccountLoading, setIscreateAccountLoading] = useState(false);
  const { mutate: loginUser, isPending: isLoginLoading } = useLoginUser();
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  useEffect(() => {
    const emailSchema = z.string().email();
    const isEmailValid = emailSchema.safeParse(email).success;
    const isPasswordValid = password.length >= 8;
    setButtonDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError({
        emailError: !email,
        passwordError: !password,
      });
      return;
    }
    setIsResetLoading(true);
    setIscreateAccountLoading(true);
    try {
      loginUser(
        { email, password },
        {
          onSuccess: () => {
            setError({
              emailError: false,
              passwordError: false,
            });
            addAlert(
              "Success",
              "Login Successful, welcome to Zabbot",
              "success"
            );
            router.push("/");
          },
          onError: (error: any) => {
            setIsResetLoading(false);
            setIscreateAccountLoading(false);
            addAlert(
              "Error",
              error?.response?.data?.message || "Unable to Login",
              "error"
            );
          },
        }
      );
    } catch (error: any) {
      console.log("Login error:", error);
      addAlert("error", "Login failed. Please try again.", "error");
    } finally {
      setIsResetLoading(false);
      setIscreateAccountLoading(false);
    }
  };

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
        {/* onClick={handleLogin} */}
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
          <InAppButton
            disabled={
              isLoginLoading ||
              isResetLoading ||
              isCreateAccountLoading ||
              buttonDisabled
            }
            disabledColor={appColors.disabledButtonBlue}
            backgroundColor={appColors.darkRoyalBlueForBtn}
            width="100%"
            onClick={(e: any) => handleLogin(e)}
          >
            {isLoginLoading ? (
              <CustomSpinner spinnerColor="#8B8D98" />
            ) : (
              <div>Continue</div>
            )}
          </InAppButton>
        </div>
      </form>
      <div className="text-[#645D5D] justify-center items-center flex gap-[20px] font-[400] text-[14px] leading-[145%]">
        <div>Forgot your password?</div>{" "}
        <Link
          href={
            isCreateAccountLoading || isResetLoading || isLoginLoading
              ? "#"
              : "/forgot-password"
          }
          onClick={() => {
            setIsResetLoading(true);
            setIscreateAccountLoading(true);
          }}
          // style={{ textDecoration: "none", color: appColors.redPrimary500 }}
          style={{
            textDecoration: "none",
            color:
              isLoginLoading || isResetLoading || isResetLoading
                ? "#9CA3AF"
                : appColors.redPrimary500,
            pointerEvents:
              isLoginLoading || isResetLoading || isResetLoading
                ? "none"
                : "auto",
          }}
        >
          <span
            className={`font-[600] ${
              isLoginLoading || isResetLoading || isResetLoading
                ? "cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            Reset it here.
          </span>
        </Link>
      </div>

      <div className="text-[#645D5D] justify-center items-center flex gap-[20px] font-[400] text-[14px] leading-[145%]">
        <div>New to Zabbot? Join Now</div>{" "}
        <Link
          href={
            isLoginLoading || isResetLoading || isResetLoading ? "#" : "/signup"
          }
          onClick={() => {
            setIsResetLoading(true);
            setIscreateAccountLoading(true);
          }}
          style={{
            textDecoration: "none",
            color:
              isLoginLoading || isResetLoading || isResetLoading
                ? "#9CA3AF"
                : appColors.normalBlue,
            pointerEvents:
              isLoginLoading || isResetLoading || isResetLoading
                ? "none"
                : "auto",
          }}
        >
          <span
            className={`font-[600] ${
              isLoginLoading || isResetLoading || isResetLoading
                ? "cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            Create Account
          </span>
        </Link>
      </div>
      <Alerts
        position="top-left"
        direction="right"
        timer={5000}
        className="rounded-md relative z-1000 !w-80"
      />
    </div>
  );
};

export default LoginAuth;
