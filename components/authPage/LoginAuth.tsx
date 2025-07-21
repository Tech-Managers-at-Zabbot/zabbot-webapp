/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  useLoginUser,
  useGoogleAuth,
} from "@/services/generalApi/authentication/mutation";
import { GoogleIcon } from "@/constants/SvgPaths";
import { useSearchParams } from "next/navigation";
import { getGoogleAuthErrorMessage } from "@/utilities/utilities";
import { usePageLanguage } from "@/contexts/LanguageContext";

const LoginAuth: React.FC = () => {
  const { getPageText, isPageLoading: isLanguageLoading } =
    usePageLanguage("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const { addAlert } = useAlert();
  const router = useRouter();
  const { initiateGoogleSignIn, isLoading: isGoogleAuthLoading } =
    useGoogleAuth();
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isCreateAccountLoading, setIscreateAccountLoading] = useState(false);
  const { mutate: loginUser, isPending: isLoginLoading } = useLoginUser();
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const googleAuthError = searchParams.get("error");
    if (googleAuthError) {
      const errorMessage = getGoogleAuthErrorMessage(googleAuthError);
      addAlert("Error", errorMessage, "error");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");

      const newUrl = `${window.location.pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

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
        {
          email: email.toLowerCase().trim(),
          password: password.trim(),
          stayLoggedIn,
        },
        {
          onSuccess: (data: Record<string, any>) => {
            localStorage.setItem(
              "userProfile",
              JSON.stringify(data?.data?.user)
            );
            localStorage.setItem("token", data?.data?.token);
            setError({
              emailError: false,
              passwordError: false,
            });
            addAlert(
              "Success",
              "Login Successful, welcome to Zabbot",
              "success"
            );
            router.push("/user-dashboard");
          },
          onError: (error: any) => {
            setIsResetLoading(false);
            setIscreateAccountLoading(false);

            if (
              error?.response?.data?.specialCodeMessage &&
              error?.response?.data?.specialCodeMessage[0] ===
                "UNVERIFIED_ACCOUNT"
            ) {
              router.push(
                `/otp?email=${error?.response?.data?.specialCodeMessage[1]}`
              );
            }

            return addAlert(
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

    if (isLanguageLoading) {
      return(
        <div className="min-h-[100vh] absolute top-0 flex justify-center items-center">
          <CustomSpinner spinnerColor="#012657" />
        </div>
      )
  }

  return (
    <div
      className="w-full flex flex-col gap-[40px] mx-auto"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="w-full flex flex-col gap-[8px]">
        <h1
          className="text-[#000000] text-[27.65px] font-[500] leading-[31.8px]"
          style={{ fontFamily: "Lexend" }}
        >
          {/* Log in */}
          {getPageText("login")}
        </h1>
      </div>
      <form className="flex flex-col gap-[32px]">
        {/* onClick={handleLogin} */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#60646C]"
          >
            {/* Email Address */}
            {getPageText("email_address")}
          </label>
          <NormalInputField
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...error, emailError: false });
            }}
            placeholder={getPageText("type_email")}
            type="email"
            error={error.emailError}
            color="black"
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
            {/* Password */}
            {getPageText("password")}
          </label>
          <div className="relative">
            <NormalInputField
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, passwordError: false });
              }}
              placeholder={getPageText("type_password")}
              type={showPassword ? "text" : "password"}
              error={error.passwordError}
              color="black"
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

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
          <div
            className="flex gap-[10px] font-[500] text-[14px] leading-[145%] justify-center items-center order-1 lg:order-none"
            style={{
              fontFamily: "Lexend",
              color: "#0089C8",
            }}
          >
            <input
              type="checkbox"
              id="sendUpdates"
              name="sendUpdates"
              checked={stayLoggedIn}
              onChange={(e) => setStayLoggedIn(e.target.checked)}
              className="h-4 w-4 hover:cursor-pointer rounded border-[#D0D5DD] text-indigo-600 focus:ring-indigo-500"
            />
            <div className="block">
              <label
                htmlFor="sendUpdates"
                className="block hover:cursor-pointer"
              >
                {/* Remember me */}
                {getPageText("remember_me")}{" "}
              </label>
            </div>
          </div>

          <div
            className="text-[#645D5D] justify-center lg:justify-end items-center flex gap-[10px] font-[500] text-[14px] leading-[145%] order-2 lg:order-none"
            style={{ fontFamily: "Lexend" }}
          >
            <div className="text-[#0089C8]">
              {/* Forgot your password? */}
              {getPageText("forgot_password")}
              </div>{" "}
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
                className={`font-[500] ${
                  isLoginLoading || isResetLoading || isResetLoading
                    ? "cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
              >
                {/* Reset it here. */}
                {getPageText("reset_here")}
              </span>
            </Link>
          </div>
        </div>

        <div className="">
          <InAppButton
            disabled={
              isGoogleAuthLoading ||
              isLoginLoading ||
              isResetLoading ||
              isCreateAccountLoading ||
              buttonDisabled
            }
            disabledColor={appColors.disabledButtonBlue}
            background={appColors.darkRoyalBlueForBtn}
            width="100%"
            onClick={(e: any) => handleLogin(e)}
          >
            {isLoginLoading ? (
              <CustomSpinner spinnerColor="#8B8D98" />
            ) : (
              <div>
                {/* Login */}
                {getPageText("login")}
                </div>
            )}
          </InAppButton>
        </div>
        <div
          className="flex gap-[5px] justify-center items-center font-[500] text-[16px] leading-[145%]"
          style={{ color: appColors.gray300, fontFamily: "Lexend" }}
        >
          <span className="w-[73px] border-1"></span>{getPageText("or")}{" "}
          <span className="w-[73px] border-1"></span>
        </div>
        <div>
          <InAppButton
            disabled={
              isGoogleAuthLoading ||
              isLoginLoading ||
              isResetLoading ||
              isCreateAccountLoading
            }
            disabledColor={appColors.gray300}
            borderRadius="50px"
            height="58px"
            background={"transparent"}
            width="100%"
            color="#007AB2"
            border="1px solid #84D8FF"
            onClick={initiateGoogleSignIn}
            isShadowShow={false}
          >
            {isGoogleAuthLoading ? (
              <CustomSpinner />
            ) : (
              <div
                className="flex justify-center font-[700] text-[14px] leading-[160%] items-center gap-4"
                style={{ fontFamily: "Lexend" }}
              >
                <span>
                  <GoogleIcon />
                </span>
                <span>
                  {/* Continue with Google */}
                  {getPageText("continue_google")}
                  </span>
              </div>
            )}
          </InAppButton>
        </div>
      </form>

      <div
        className="text-[#645D5D] justify-center items-center flex gap-[20px] font-[400] text-[15px] leading-[100%]"
        style={{ fontFamily: "Lexend" }}
      >
        <div>
          {/* New to Zabbot? Join Now */}
          {getPageText("new_to_zabbot_join_now")}
          </div>{" "}
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
            className={`font-[400] ${
              isLoginLoading || isResetLoading || isResetLoading
                ? "cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            {/* Create Account */}
            {getPageText("create_account")}
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
