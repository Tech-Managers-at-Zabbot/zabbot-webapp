"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import NormalInputField from "../NormalInputField";
// import PhoneInputCustom from "../PhoneNumberInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "../InAppButton";
import Link from "next/link";
import { appColors } from "@/constants/colors";

const RegisterAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    phoneError: false,
    emailError: false,
    passwordError: false,
    genderError: false,
    ageGroupError: false,
    confirmPasswordError: false,
  });

  // Password validation states
  const [passwordValidations, setPasswordValidations] = useState({
    // hasAlphabet: false,
    // hasCapitalLetter: false,
    // hasNumber: false,
    // hasSpecialChar: false,
    isLengthValid: false,
  });

  // const [confirmPasswordValidations, setConfirmPasswordValidations] = useState({
  //   // hasAlphabet: false,
  //   // hasCapitalLetter: false,
  //   // hasNumber: false,
  //   // hasSpecialChar: false,
  //   isLengthValid: false,
  // });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError({ ...error, passwordError: false });

    // Validate password
    setPasswordValidations({
      // hasAlphabet: /[a-zA-Z]/.test(value),
      // hasCapitalLetter: /[A-Z]/.test(value),
      // hasNumber: /[0-9]/.test(value),
      // hasSpecialChar: /[@%$!]/.test(value),
      isLengthValid: value.length >= 8,
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstNameError: !firstName.trim(),
      lastNameError: !lastName.trim(),
      phoneError: false, // Since phone is commented out
      emailError: !email.trim(),
      passwordError: !password.trim() || password.length < 8,
      genderError: false,
      ageGroupError: false,
      confirmPasswordError:
        !confirmPassword.trim() || password !== confirmPassword,
    };

    setError(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setError({ ...error, confirmPasswordError: false });

    // Validate confirm password length
    // setConfirmPasswordValidations({
    //   isLengthValid: value.length >= 8,
    // });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid, proceed with registration");
    }
  };

  // Helper function to render validation icon
  const renderValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <span style={{ color: appColors.primaryGreen }}>✓</span>
    ) : (
      <span style={{ color: appColors.error400 }}>X</span>
    );
  };

  return (
    <div
      className="w-full border-0 max-w-[35rem] mx-auto"
      style={{ fontFamily: "Inter" }}
    >
      <div className="mb-10 w-full flex flex-col gap-[8px]">
        <h1
          className="text-[27.65px] font-[600] leading-[31.8px]"
          style={{ fontFamily: "Inter", color: appColors.black }}
        >
          Create your account
        </h1>
      </div>
      <form className="space-y-4 flex flex-col">
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
            onChange={(e: any) => {
              setFirstName(e.target.value);
              setError({ ...error, firstNameError: false });
            }}
            placeholder="Type your first name"
            type="text"
            color="#80838D"
            error={error.firstNameError}
            backgroundColor="#E3EFFC"
            border={"0"}
            errorMessage="First name is required"
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
            onChange={(e: any) => {
              setLastName(e.target.value);
              setError({ ...error, lastNameError: false });
            }}
            placeholder="Type your last name"
            type="text"
            color="#80838D"
            error={error.lastNameError}
            backgroundColor="#E3EFFC"
            border={"0"}
            errorMessage="Last name is required"
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
            onChange={(e: any) => {
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
        {/* <div>
          <label
            htmlFor="phoneNumber"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C]"
          >
            Phone Number
          </label>
          <PhoneInputCustom
            value={phone}
            onChangePhoneNumber={(fullPhoneNumber: string) => {
              setPhone(fullPhoneNumber);
              setError({ ...error, phoneError: false });
            }}
            placeholder="Input your phone number"
            initialCountryCode="US"
            error={error.phoneError}
            errorMessage="Phone Number is required"
          />
        </div> */}
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
              color="#80838D"
              backgroundColor="#E3EFFC"
              border={"0"}
              errorMessage="Password is required"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 pointer-events-auto"
              style={{ top: "1px", height: "56px" }} // Fixed height and top position
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {/* Password validation checklist */}
          <div className="mt-2 text-xs text-gray-600 font-[500] space-y-1">
            {/* <div
              className={`flex leading-[21.33px] items-center ${
                passwordValidations.hasAlphabet
                  ? "text-green-500"
                  : "text-gray-500"
              } gap-2`}
            >
              {renderValidationIcon(passwordValidations.hasAlphabet)} Password
              should have at least one alphabet
            </div>
            <div
              className={`flex leading-[21.33px] items-center ${
                passwordValidations.hasCapitalLetter
                  ? "text-green-500"
                  : "text-gray-500"
              } gap-2`}
            >
              {renderValidationIcon(passwordValidations.hasCapitalLetter)}{" "}
              Password should have at least one capital letter
            </div>
            <div
              className={`flex leading-[21.33px] items-center ${
                passwordValidations.hasNumber
                  ? "text-green-500"
                  : "text-gray-500"
              } gap-2`}
            >
              {renderValidationIcon(passwordValidations.hasNumber)} Password
              should have at least one number
            </div>
            <div
              className={`flex leading-[21.33px] items-center ${
                passwordValidations.hasSpecialChar
                  ? "text-green-500"
                  : "text-gray-500"
              } gap-2`}
            >
              {renderValidationIcon(passwordValidations.hasSpecialChar)}{" "}
              Password should have at least one @%$! character
            </div> */}
            <div
              className={`flex font-[500] leading-[21.33px] items-center ${
                passwordValidations.isLengthValid
                  ? `text-[${appColors.primaryGreen}]`
                  : `text-[${appColors.error400}]`
              } gap-2`}
            >
              {renderValidationIcon(passwordValidations.isLengthValid)} Password
              Password should be a minimum of eight (8) characters
            </div>
          </div>
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
              color="#80838D"
              backgroundColor="#E3EFFC"
              border={"0"}
              errorMessage={
                confirmPassword && password !== confirmPassword
                  ? "Passwords do not match"
                  : "Confirm password is required"
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 pointer-events-auto"
              style={{ top: "1px", height: "56px" }} // Fixed height and top position
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
          className="flex mb-8 gap-[20px] font-[500] text-[12px] leading-[145%] justify-center mt-4 items-center"
          style={{ fontFamily: "Lexend", color: appColors.darkRoyalBlueForBtn }}
        >
          <input
            type="checkbox"
            id="sendUpdates"
            name="sendUpdates"
            // checked={checkboxes.sendUpdates}
            // onChange={handleCheckboxChange}
            className="h-4 w-4 hover:cursor-pointer rounded border-[#D0D5DD] text-indigo-600 focus:ring-indigo-500"
          />
          {/* terms-of-service */}
          <div className="block">
          <label htmlFor="" className="block">
            I agree to the{" "}
            <Link
            href="/terms-of-service"
            style={{ textDecoration: "none"  }}
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
          disabled
          disabledColor={appColors.disabledButtonBlue}
          backgroundColor={appColors.darkRoyalBlueForBtn}
          width="100%"
          onClick={handleSubmit}
        >
          <div>Continue</div>
        </InAppButton>

        <div
          className="text-[#645D5D] gap-[6px] flex justify-center items-center mt-6 font-[500] text-[16px] leading-[145%]"
          style={{ fontFamily: "Lexend", color: appColors.darkRoyalBlueForBtn }}
        >
          <div>Already have an account?</div>
          <Link
            href="/login"
            style={{ textDecoration: "none", color: appColors.normalBlue }}
          >
            <span className="hover:cursor-pointer">Login</span>
          </Link>
        </div>
      </form>
      {/* <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      /> */}
    </div>
  );
};

export default RegisterAuth;
