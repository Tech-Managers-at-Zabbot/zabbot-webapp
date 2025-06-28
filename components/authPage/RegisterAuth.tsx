/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { z } from "zod";
import NormalInputField from "../NormalInputField";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "../InAppButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appColors } from "@/constants/colors";
import { Alerts, useAlert } from "next-alert";
import { CustomSpinner } from "../CustomSpinner";
import { GoogleIcon } from "@/constants/SvgPaths";
import { useRegisterUser, useGoogleAuth } from "@/services/generalApi/authentication/mutation";
// import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { getGoogleAuthErrorMessage } from "@/utilities/utilities";


// Validation schemas
const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

const nameSchema = z
  .string()
  .min(1, "This field is required")
  .min(2, "Must be at least 2 characters");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

  const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

const RegisterAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { addAlert } = useAlert();
 const { initiateGoogleRegistration, isLoading: isGoogleLoading } = useGoogleAuth();
  // const [loading, setLoading] = useState(false);

  const handleGoogleRegistration = async (e:any) => {
    e.preventDefault()
    if(!agreeToTerms){
      return  addAlert(
          "Error",
          "Please agree to the Terms of Service and Privacy Policy",
          "error"
        );
    }

    return initiateGoogleRegistration()
  }
  const router = useRouter();
  const { mutateAsync: registerUser, isPending: registerUserLoading } =
    useRegisterUser();

  // Tracking states for user interactions
  const [hasStartedTypingConfirm, setHasStartedTypingConfirm] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoginRedirect, setIsLoginRedirect] = useState(false);

  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Password validation states
  // const [passwordValidations, setPasswordValidations] = useState({
  //   isLengthValid: false,
  // });
  const searchParams = useSearchParams();
useEffect(() => {
  const googleAuthError = searchParams.get("error");
  if (googleAuthError) {
    const errorMessage = getGoogleAuthErrorMessage(googleAuthError);
    addAlert("Error", errorMessage, "error");
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl);
  }
}, [searchParams, router]);

  // Real-time validation and button state management
  useEffect(() => {
    // Validate all fields
    const isFirstNameValid = firstName.trim().length >= 2;
    const isLastNameValid = lastName.trim().length >= 2;
    const isEmailValid = emailSchema.safeParse(email).success;
    const isPasswordValid = passwordSchema.safeParse(password).success;
    const doPasswordsMatch =
      password === confirmPassword && confirmPassword.length > 0;

    // Update button state
    const allFieldsValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      doPasswordsMatch &&
      agreeToTerms;
    setButtonDisabled(!allFieldsValid);

    // Handle confirm password error display
    if (hasStartedTypingConfirm && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setErrorMessages((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
        setError((prev) => ({ ...prev, confirmPasswordError: true }));
      } else {
        setErrorMessages((prev) => ({ ...prev, confirmPassword: "" }));
        setError((prev) => ({ ...prev, confirmPasswordError: false }));
      }
    }
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    agreeToTerms,
    hasStartedTypingConfirm,
  ]);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_NAME_LENGTH);
    setFirstName(value);

    const validation = nameSchema.safeParse(value);
    if (!validation.success && value.trim()) {
      setErrorMessages((prev) => ({
        ...prev,
        firstName: validation.error.errors[0].message,
      }));
      setError((prev) => ({ ...prev, firstNameError: true }));
    } else {
      setErrorMessages((prev) => ({ ...prev, firstName: "" }));
      setError((prev) => ({ ...prev, firstNameError: false }));
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_NAME_LENGTH);
    setLastName(value);

    const validation = nameSchema.safeParse(value);
    if (!validation.success && value.trim()) {
      setErrorMessages((prev) => ({
        ...prev,
        lastName: validation.error.errors[0].message,
      }));
      setError((prev) => ({ ...prev, lastNameError: true }));
    } else {
      setErrorMessages((prev) => ({ ...prev, lastName: "" }));
      setError((prev) => ({ ...prev, lastNameError: false }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_EMAIL_LENGTH);
    setEmail(value);

    const validation = emailSchema.safeParse(value);
    if (!validation.success && value.trim()) {
      setErrorMessages((prev) => ({
        ...prev,
        email: validation.error.errors[0].message,
      }));
      setError((prev) => ({ ...prev, emailError: true }));
    } else {
      setErrorMessages((prev) => ({ ...prev, email: "" }));
      setError((prev) => ({ ...prev, emailError: false }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_NAME_LENGTH);;
    setPassword(value);

    // Validate password
    // setPasswordValidations({
    //   isLengthValid: value.length >= 8,
    // });

    const validation = passwordSchema.safeParse(value);
    if (!validation.success && value.trim()) {
      setErrorMessages((prev) => ({
        ...prev,
        password: validation.error.errors[0].message,
      }));
      setError((prev) => ({ ...prev, passwordError: true }));
    } else {
      setErrorMessages((prev) => ({ ...prev, password: "" }));
      setError((prev) => ({ ...prev, passwordError: false }));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Mark that user has started typing in confirm password field
    if (!hasStartedTypingConfirm) {
      setHasStartedTypingConfirm(true);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // setLoading(true)

    // Final validation before submission
    try {
      nameSchema.parse(firstName);
      nameSchema.parse(lastName);
      emailSchema.parse(email);
      passwordSchema.parse(password);

      if (password !== confirmPassword) {
        // setLoading(false)
        addAlert("Error", "Passwords do not match", "error");
      }

      if (!agreeToTerms) {
        addAlert(
          "Error",
          "Please agree to the Terms of Service and Privacy Policy",
          "error"
        );
      }

      // console.log("Form is valid, proceed with registration", {
      //   firstName,
      //   lastName,
      //   email,
      //   password,
      // });

      // Call the registerUser mutation
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      };

      await registerUser(userData, {
        onSuccess: (data) => {
          console.log("Registration successful:", data);
          addAlert(
            "Success!",
            "Signup successful! An email has been sent to you for account verification",
            "success"
          );
          router.push(`/otp?email=${encodeURIComponent(email)}`);
        },
        onError: (error: any) => {
          console.error("Registration error:", error);
          // setLoading(false); // Make sure to stop loading on error
          addAlert(
            "Error",
            error?.response?.data?.message ||
              "An error occurred during registration",
            "error"
          );
        },
      });
    } catch (error: any) {
      console.error("Validation error:", error);
      // setLoading(false);
      // addAlert("Error", error.message, "error");
    }
  };

  return (
    <div className="w-full border-0 mx-auto" style={{ fontFamily: "Lexend" }}>
      <div className="mb-10 w-full flex flex-col gap-[8px]">
        <h1
          className="text-[28px] font-[600] leading-[31.8px]"
          style={{ color: appColors.black }}
        >
          Create your account
        </h1>
      </div>
      <form className="mb-10 gap-3 flex flex-col">
        <div>
          <label
            htmlFor="firstName"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C]"
          >
            First Name
          </label>
          <NormalInputField
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="Type your first name"
            type="text"
            color="black"
            error={error.firstNameError}
            backgroundColor="#E3EFFC"
            border={"0"}
            errorMessage={errorMessages.firstName || "First name is required"}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C]"
          >
            Last Name
          </label>
          <NormalInputField
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Type your last name"
            type="text"
            color="black"
            error={error.lastNameError}
            backgroundColor="#E3EFFC"
            border={"0"}
            errorMessage={errorMessages.lastName || "Last name is required"}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C]"
          >
            Email Address
          </label>
          <NormalInputField
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Type your email address"
            type="email"
            error={error.emailError}
            color="black"
            backgroundColor="#E3EFFC"
            border={"0"}
            errorMessage={errorMessages.email || "Email is required"}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C]"
          >
            Password
          </label>
          <div className="relative">
            <NormalInputField
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create your password"
              type={showPassword ? "text" : "password"}
              error={error.passwordError}
              color="black"
              backgroundColor="#E3EFFC"
              border={"0"}
              errorMessage={errorMessages.password || "Password is required"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex hover:cursor-pointer items-center text-sm leading-5 pointer-events-auto"
              style={{ top: "1px", height: "56px" }}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Password validation checklist */}
          {/* <div className="mt-2 text-xs text-gray-600 font-[500] space-y-1">
            <div
              className={`flex font-[500] leading-[21.33px] items-center ${
                passwordValidations.isLengthValid
                  ? `text-[${appColors.primaryGreen}]`
                  : `text-[${appColors.error400}]`
              } gap-2`}
            >
              {renderValidationIcon(passwordValidations.isLengthValid)} 
              Password should be a minimum of eight (8) characters
            </div>
          </div> */}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C]"
          >
            Confirm Password
          </label>
          <div className="relative">
            <NormalInputField
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              error={error.confirmPasswordError}
              color="black"
              backgroundColor="#E3EFFC"
              border={"0"}
              errorMessage={
                errorMessages.confirmPassword || "Confirm password is required"
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm hover:cursor-pointer leading-5 pointer-events-auto"
              style={{ top: "1px", height: "56px" }}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div
          className="flex mb-8 gap-[20px] font-[500] text-[12px] leading-[145%] mt-4 items-center"
          style={{ fontFamily: "Lexend", color: appColors.darkRoyalBlueForBtn }}
        >
          <input
            type="checkbox"
            id="sendUpdates"
            name="sendUpdates"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="h-4 w-4 hover:cursor-pointer rounded border-[#D0D5DD] text-indigo-600 focus:ring-indigo-500"
          />
          <div className="block">
            <label htmlFor="sendUpdates" className="block hover:cursor-pointer">
              I agree to the{" "}
              <Link
                href="/terms-of-service"
                target="blank"
                style={{ textDecoration: "none" }}
              >
                <span
                  className={`underline hover:cursor-pointer hover:text-[#0098DE]`}
                >
                  Terms of Service and Privacy Policy
                </span>
              </Link>
            </label>
          </div>
        </div>

        <InAppButton
          disabled={
            buttonDisabled ||
            isGoogleLoading ||
            registerUserLoading ||
            isLoginRedirect
          }
          disabledColor={appColors.disabledButtonBlue}
          backgroundColor={appColors.darkRoyalBlueForBtn}
          width="100%"
          onClick={handleSubmit}
        >
          {registerUserLoading ? <CustomSpinner /> : <div>Agree & Join</div>}
        </InAppButton>

        <div
          className="flex gap-[5px] justify-center items-center font-[500] text-[16px] leading-[145%]"
          style={{ color: appColors.gray300, fontFamily: "Lexend" }}
        >
          <span className="w-[73px] border-1"></span> or{" "}
          <span className="w-[73px] border-1"></span>
        </div>

        <InAppButton
          disabled={isGoogleLoading || registerUserLoading || isLoginRedirect}
          disabledColor={appColors.gray300}
          borderRadius="50px"
          height="58px"
          backgroundColor={"transparent"}
          width="100%"
          color="#007AB2"
          border="1px solid #84D8FF"
          onClick={handleGoogleRegistration}
          isShadowShow={false}
        >
          {isGoogleLoading ? (
            <CustomSpinner />
          ) : (
            <div
              className="flex justify-center font-[700] text-[14px] leading-[160%] items-center gap-4"
              style={{ fontFamily: "Lexend" }}
            >
              <span>
                <GoogleIcon />
              </span>
              <span>Continue with Google</span>
            </div>
          )}
        </InAppButton>

        <div
          className="text-[#645D5D] gap-[6px] flex justify-center items-center mt-6 font-[500] text-[16px] leading-[145%]"
          style={{ fontFamily: "Lexend", color: "#162B6E" }}
        >
          <div>Already have an account?</div>
          <Link
            // href="/login"
            href={isLoginRedirect || registerUserLoading ? "#" : "/login"}
            onClick={() => {
              setIsLoginRedirect(true);
            }}
            // style={{ textDecoration: "none", color: appColors.normalBlue }}
            style={{
              textDecoration: "none",
              color:
                registerUserLoading || isLoginRedirect
                  ? "#9CA3AF"
                  : appColors.normalBlue,
              pointerEvents:
                registerUserLoading || isLoginRedirect ? "none" : "auto",
            }}
          >
            <span
              className={`font-[600] ${
                registerUserLoading || isLoginRedirect
                  ? "cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
            >
              Sign In
            </span>
          </Link>
        </div>
      </form>
      <Alerts
        position="top-left"
        direction="right"
        timer={10000}
        className="rounded-md relative z-1000 !w-80"
      />
    </div>
  );
};

export default RegisterAuth;
