"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import NormalInputField from "../NormalInputField";
// import PhoneInputCustom from "../PhoneNumberInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "../InAppButton";
import Link from "next/link";


const RegisterAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    phoneError: false,
    emailError: false,
    passwordError: false,
    genderError: false,
    ageGroupError: false,
  });

  // Password validation states
  const [passwordValidations, setPasswordValidations] = useState({
    hasAlphabet: false,
    hasCapitalLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLengthValid: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError({ ...error, passwordError: false });

    // Validate password
    setPasswordValidations({
      hasAlphabet: /[a-zA-Z]/.test(value),
      hasCapitalLetter: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecialChar: /[@%$!]/.test(value),
      isLengthValid: value.length >= 8,
    });
  };

  // Helper function to render validation icon
  const renderValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <span className="text-green-500">✓</span>
    ) : (
      <span className="text-red-500">✗</span>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
          <div className="text-[#000000] mb-10 w-full flex flex-col gap-[8px]">
          <h1 className="text-[27.65px] font-[700] leading-[31.8px]">Create your account</h1>
          <p className="text-[#645D5D] font-[400] text-[14px] leading-[145%]">Already have an account?  <Link href="/login" style={{ textDecoration: "none", color: "#eb512f" }}><span className="text-[#EB5017] hover:cursor-pointer">Login</span></Link></p>
        </div>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-[#60646C]"
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
            placeholder="Input your first name"
            type="text"
            error={error.firstNameError}
            errorMessage="First name is required"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[#60646C]"
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
            placeholder="Input your last name"
            type="text"
            error={error.lastNameError}
            errorMessage="Last name is required"
          />
        </div>
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
            onChange={(e: any) => {
              setEmail(e.target.value);
              setError({ ...error, emailError: false });
            }}
            placeholder="Input your email address"
            type="email"
            error={error.emailError}
            errorMessage="Email is required"
          />
        </div>
        {/* <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-[#60646C]"
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
            className="block text-sm font-medium text-[#60646C]"
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
          {/* Password validation checklist */}
          <div className="mt-2 text-xs text-gray-600 font-[500] space-y-1">
            <div
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
            </div>
            <div
              className={`flex leading-[21.33px] items-center ${
                passwordValidations.isLengthValid
                  ? "text-green-500"
                  : "text-gray-500"
              } gap-2`}
            >
              {renderValidationIcon(passwordValidations.isLengthValid)} Password
              should be at least eight characters long
            </div>
          </div>
        </div>
        <div className="mt-6">
          <InAppButton width="100%">
            <div>Signup</div>
          </InAppButton>
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
