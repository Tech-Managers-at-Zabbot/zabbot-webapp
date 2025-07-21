/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InAppButton from "../InAppButton";
import NormalInputField from "../NormalInputField";
import { PiWarningCircle } from "react-icons/pi";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { appColors } from "@/constants/colors";
import { Alerts, useAlert } from "next-alert";
import { useRouter } from "next/navigation";
import { CustomSpinner } from "../CustomSpinner";
import { useSearchParams } from "next/navigation";
import { useResetPassword } from "@/services/generalApi/authentication/mutation";
import { usePageLanguage } from "@/contexts/LanguageContext";

const ChangePasswordComponent: React.FC = () => {
    const { getPageText, isPageLoading: isLanguageLoading } =
      usePageLanguage("passwordReset");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasStartedTypingConfirm, setHasStartedTypingConfirm] = useState(false);
  const { addAlert } = useAlert();
  const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams ? searchParams.get("token") : null;
  const { mutate: resetPassword, isPending:isResetPasswordPending } = useResetPassword();

  const [passwordValidations, setPasswordValidations] = useState({
    isLengthValid: false,
  });

  // Check if passwords match and update validation state
  useEffect(() => {
    // Only show password mismatch error if user has started typing confirm password
    if (hasStartedTypingConfirm && confirmPassword.length > 0) {
      if (newPassword !== confirmPassword) {
        setConfirmPasswordError(getPageText("password_mismatch"));
      } else {
        setConfirmPasswordError("");
      }
    } else {
      setConfirmPasswordError("");
    }

    // Enable button only if all validations pass
    const allPasswordValidationsPass =
      Object.values(passwordValidations).every(Boolean);
    const passwordsMatch =
      newPassword === confirmPassword && confirmPassword.length > 0;
    const shouldEnableButton = allPasswordValidationsPass && passwordsMatch;

    setButtonDisabled(!shouldEnableButton);
  }, [
    newPassword,
    confirmPassword,
    passwordValidations,
    hasStartedTypingConfirm,
  ]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    setPasswordValidations({
      isLengthValid: value.length >= 8,
    });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(getPageText("password_mismatch"));
      setLoading(false)
      return;
    }

    if (!Object.values(passwordValidations).every(Boolean)) {
      setLoading(false)
      return;
    }

    setLoading(false)

    resetPassword(
      { newPassword:newPassword.trim(), token: token || "", confirmNewPassword: confirmPassword.trim() },
      {
        onSuccess: () => {
            addAlert(
            "Success",
            getPageText("success_change"),
            "success"
          );
        return router.push('/success-page')
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message || "An error occurred, please try again",
            "error"
          );
        },
      }
    );
    // console.log("Password changed successfully");
  };

  const renderValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <span className="text-[#30A46C]">✓</span>
    ) : (
      <span className="text-[#D42620] font-[500] text-[13.33px] leading-[21.33px]">
        <PiWarningCircle size={16} />
      </span>
    );
  };

      if (isLanguageLoading) {
      return <CustomSpinner spinnerColor="#012657" />
    }

return (
  <div className="w-full max-w-[615px] border border-[#D0D0D0] bg-white rounded-2xl py-6 md:py-[60px] flex flex-col gap-6 md:gap-[60px] mx-auto px-4 sm:px-6 md:px-[60px]">
    <div className="flex items-center justify-between">
      <div className="hover:cursor-pointer" onClick={() => router.back()}>
        <IoChevronBackSharp className="w-6 h-6 md:w-7 md:h-7" color="#1C2024" />
      </div>
      <h1 className="text-xl sm:text-2xl text-[#1C2024] font-bold">
        {/* Change Password */}
        {getPageText("change_password")}
        </h1>
      <div className="hover:cursor-pointer" onClick={() => router.push('/login')}>
        <IoCloseOutline className="w-6 h-6 md:w-7 md:h-7" color="#1C2024" />
      </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm sm:text-[15px] leading-[20px] font-medium text-[#60646C] mb-1 sm:mb-2"
        >
          {/* New Password */}
          {getPageText("new_password")}
        </label>
        <div className="relative">
          <NormalInputField
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder={getPageText("type_your_password")}
            type={showNewPassword ? "text" : "password"}
            border="0"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute hover:cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
          >
            {showNewPassword ? (
              <AiOutlineEyeInvisible className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Password validation checklist */}
        <div className="mt-1 sm:mt-2 text-xs text-gray-600 space-y-1">
          <div
            className={`flex items-center font-[500] text-xs sm:text-[13.33px] leading-[21.33px] gap-2 ${
              passwordValidations.isLengthValid
                ? "text-[#30A46C]"
                : "text-[#D42620]"
            }`}
          >
            {renderValidationIcon(passwordValidations.isLengthValid)} 
            {/* Password should be at least eight characters long */}
            {getPageText("password_specs")}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm sm:text-[15px] font-medium text-[#60646C] mb-1 sm:mb-2"
        >
          {/* Confirm Password */}
          {getPageText("confirm_password")}
        </label>
        <div className="relative">
          <NormalInputField
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder={getPageText("confirm_password")}
            border="0"
            type={showConfirmPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 hover:cursor-pointer right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            )}
          </button>
        </div>
        {confirmPasswordError && (
          <p className="text-[#D7263D] text-xs sm:text-sm mt-1">
            {confirmPasswordError}
          </p>
        )}
      </div>

      <div className="mt-4 sm:mt-6">
        <InAppButton
          background={appColors.darkRoyalBlueForBtn}
          width="100%"
          disabledColor="#80BBFF"
          disabled={buttonDisabled || isResetPasswordPending || loading}
        >
          { isResetPasswordPending ? <CustomSpinner /> : <div>
            {/* Save Password */}
            {getPageText("save_password")}
            </div> 
            }
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

export default ChangePasswordComponent;
