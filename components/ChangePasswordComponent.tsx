"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "./InAppButton";
import NormalInputField from "./NormalInputField";

const ChangePasswordComponent: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true)


  const [passwordValidations, setPasswordValidations] = useState({
    hasAlphabet: false,
    hasCapitalLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLengthValid: false,
  });

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setError("");

    setPasswordValidations({
      hasAlphabet: /[a-zA-Z]/.test(value),
      hasCapitalLetter: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecialChar: /[@%$!]/.test(value),
      isLengthValid: value.length >= 8,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!Object.values(passwordValidations).every(Boolean)) {
      setError("Please meet all password requirements");
      return;
    }

  };

  const renderValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <span className="text-[#30A46C]">✓</span>
    ) : (
      <span className="text-[#D42620] font-[500] text-[13.33px] leading-[21.33px]">
        ✗
      </span>
    );
  };

  return (
    <div className="w-full max-w-[615px] border-2 rounded-xl py-[60px] flex flex-col gap-[24px] mx-auto px-[60px]">
      <h1 className="text-2xl text-[#1C2024] font-bold">Change Password</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="newPassword"
            className="block text-[15px] leading-[20px] font-medium text-[#60646C] mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <NormalInputField
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Input your password"
              type={showNewPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Password validation checklist */}
          <div className="mt-2 text-xs text-gray-600 space-y-1">
            <div
              className={`flex items-center font-[500] text-[13.33px] leading-[21.33px] gap-2 ${
                passwordValidations.hasAlphabet
                  ? "text-[#30A46C]"
                  : "text-[#D42620]"
              }`}
            >
              {renderValidationIcon(passwordValidations.hasAlphabet)} Password
              should have at least one alphabet
            </div>
            <div
              className={`flex items-center font-[500] text-[13.33px] leading-[21.33px] gap-2 ${
                passwordValidations.hasCapitalLetter
                  ? "text-[#30A46C]"
                  : "text-[#D42620]"
              }`}
            >
              {renderValidationIcon(passwordValidations.hasCapitalLetter)}{" "}
              Password should have at least one capital letter
            </div>
            <div
              className={`flex items-center font-[500] text-[13.33px] leading-[21.33px] gap-2 ${
                passwordValidations.hasNumber
                  ? "text-[#30A46C]"
                  : "text-[#D42620]"
              }`}
            >
              {renderValidationIcon(passwordValidations.hasNumber)} Password
              should have at least one number
            </div>
            <div
              className={`flex items-center font-[500] text-[13.33px] leading-[21.33px] gap-2 ${
                passwordValidations.hasSpecialChar
                  ? "text-[#30A46C]"
                  : "text-[#D42620]"
              }`}
            >
              {renderValidationIcon(passwordValidations.hasSpecialChar)}{" "}
              Password should have at least one @%$! character
            </div>
            <div
              className={`flex items-center font-[500] text-[13.33px] leading-[21.33px] gap-2 ${
                passwordValidations.isLengthValid
                  ? "text-[#30A46C]"
                  : "text-[#D42620]"
              }`}
            >
              {renderValidationIcon(passwordValidations.isLengthValid)} Password
              should be at least eight characters long
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-[15px] font-medium text-[#60646C] mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <NormalInputField
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mt-6">
          <InAppButton width="100%" disabled={buttonDisabled}>
            <div>Save Password</div>
          </InAppButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordComponent;
