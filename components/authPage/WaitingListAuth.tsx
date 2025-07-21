/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import NormalInputField from "../NormalInputField";
import InAppButton from "../InAppButton";
import NationalityInput from "../NatonalityInput";
import { Alerts, useAlert } from "next-alert";
import { CustomSpinner } from "../CustomSpinner";
import { useRouter } from "next/navigation";
import { useJoinFoundersList } from '../../services/waitingList/mutation';
import { MessageIcon } from "@/constants/SvgPaths";
import { useSearchParams } from 'next/navigation';
import { getGoogleAuthErrorMessage } from "@/utilities/utilities";



const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COUNTRY_LENGTH = 57;

const WaitingListAuthComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter()
  const { addAlert } = useAlert();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("United States");
  const [checkboxes, setCheckboxes] = useState({
    sendUpdates: false,
    betaTest: false,
    contributeRecordings: false,
  });
  const [useOtherCountry, setUseOtherCountry] = useState(false);
  const [otherCountry, setOtherCountry] = useState("");

  const [error, setError] = useState({
    nameError: false,
    countryError: false,
    emailError: false,
    nameLengthError: false,
    emailLengthError: false,
    countryLengthError: false,
  });

  const [checkboxError, setCheckboxError] = useState(false);
  const { mutate:waitingListData, isPending } = useJoinFoundersList()

      const searchParams = useSearchParams();

    useEffect(() => {
      const googleAuthSuccess = searchParams.get("success");
      console.log('success:', googleAuthSuccess)
      if (googleAuthSuccess) {
        const successMessage = getGoogleAuthErrorMessage(googleAuthSuccess);
        addAlert("Success", successMessage, "success");
        
        const params = new URLSearchParams(searchParams.toString());
        params.delete("success");
        
        const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        router.replace(newUrl);
      }
    }, [searchParams, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_NAME_LENGTH);
    setName(value);
    setError({ 
      ...error, 
      nameError: false,
      nameLengthError: value.length >= MAX_NAME_LENGTH
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_EMAIL_LENGTH);
    setEmail(value);
    setError({ 
      ...error, 
      emailError: false,
      emailLengthError: value.length >= MAX_EMAIL_LENGTH
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_COUNTRY_LENGTH);
    setOtherCountry(value);
    setError({ 
      ...error, 
      countryError: false,
      countryLengthError: value.length >= MAX_COUNTRY_LENGTH
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...error };

    if (!name) {
      newErrors.nameError = true;
      isValid = false;
    }
    if (name.length > MAX_NAME_LENGTH) {
      newErrors.nameLengthError = true;
      isValid = false;
    }
    if (!email) {
      newErrors.emailError = true;
      isValid = false;
    }
    if (email.length > MAX_EMAIL_LENGTH) {
      newErrors.emailLengthError = true;
      isValid = false;
    }
    if ((!country && !useOtherCountry) || (useOtherCountry && !otherCountry)) {
      newErrors.countryError = true;
      isValid = false;
    }
    if (useOtherCountry && otherCountry.length > MAX_COUNTRY_LENGTH) {
      newErrors.countryLengthError = true;
      isValid = false;
    }
    if (
      !checkboxes.sendUpdates &&
      !checkboxes.betaTest &&
      !checkboxes.contributeRecordings
    ) {
      setCheckboxError(true);
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
    if (
      checkboxError &&
      (checked || Object.values(checkboxes).some((v) => v))
    ) {
      setCheckboxError(false);
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      waitingListData({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        country: useOtherCountry ? otherCountry.trim() : country,
        sendUpdates: checkboxes.sendUpdates,
        betaTest: checkboxes.betaTest,
        contributeSkills: checkboxes.contributeRecordings,
      },
      {
        onSuccess: () => {
          addAlert(
            "Success",
            "You have successfully joined the founders circle",
            "success"
          );
          setEmail("");
          setName("");
          setCountry("US");
          setOtherCountry("");
          setUseOtherCountry(false);
          setCheckboxes({
            sendUpdates: false,
            betaTest: false,
            contributeRecordings: false,
          })
          return router.push('/founders-circle/founders-success')
        },
        onError: (error) => {
          console.error("Error joining founders list", error);
          addAlert(
            "Error",
            `Error joining founders circle: ${error?.response?.data?.message || error}`,
            "error"
          );
          return;
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        addAlert(
          "error",
          "An unknown error occurred, please try again",
          "error"
        );
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 relative" style={{fontFamily: 'Inter'}}>
      <div className="text-[black] text-center mb-10 w-full flex flex-col gap-[8px]">
        <h1 className="text-[24px] text-[#101928] font-[600] leading-[120%]">
        Let's achieve 2,000 early supporters!
        </h1>
        <div className="font-[400] text-[16px] text-[#667185] leading-[145%]">
        Sign up, then share with others too.
        </div>
      </div>
      <form className="space-y-4 flex flex-col gap-[16px]" onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[#101928]"
          >
            NAME
          </label>
          <NormalInputField
            border="1px solid #D0D5DD"
            backgroundColor="#ffffff"
            color='#101928'
            id="lastName"
            value={name}
            onChange={handleNameChange}
            placeholder="Type your name here"
            type="text"
            error={error.nameError || error.nameLengthError}
            errorMessage={
              error.nameError 
                ? "Name is required" 
                : error.nameLengthError 
                  ? `Maximum ${MAX_NAME_LENGTH} characters reached` 
                  : ""
            }
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#101928]"
          >
            EMAIL
          </label>
          <NormalInputField
            border="1px solid #D0D5DD"
            backgroundColor="#ffffff"
            color='#101928'
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Type your email here"
            type="email"
            error={error.emailError || error.emailLengthError}
            errorMessage={
              error.emailError 
                ? "Email is required" 
                : error.emailLengthError 
                  ? `Maximum ${MAX_EMAIL_LENGTH} characters reached` 
                  : ""
            }
            icon={<MessageIcon />}
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm mb-1 font-medium text-[#101928]"
          >
            YOUR HOME COUNTRY
          </label>
          {!useOtherCountry ? (
              <NationalityInput
                border="1px solid #D0D5DD"
                backgroundColor="#ffffff"
                color='#101928'
                value={country}
                onChange={(countryName: string) => setCountry(countryName)}
                placeholder="Select your Country"
                initialCountryCode="US"
                error={error.countryError}
                errorMessage="Country is required"
              />
          ) : (
            <NormalInputField
              border="1px solid #D0D5DD"
              backgroundColor="#ffffff"
              color='#101928'
              id="otherCountry"
              value={otherCountry}
              onChange={handleCountryChange}
              placeholder="Type your home country"
              type="text"
              error={error.countryError || error.countryLengthError}
              errorMessage={
                error.countryError 
                  ? "Country is required" 
                  : error.countryLengthError 
                    ? `Maximum ${MAX_COUNTRY_LENGTH} characters reached` 
                    : ""
              }
            />
          )}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="useOtherCountry"
              name="useOtherCountry"
              checked={useOtherCountry}
              onChange={(e) => {
                setUseOtherCountry(e.target.checked);
                setError({ ...error, countryError: false, countryLengthError: false });
              }}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="useOtherCountry"
              className="ml-2 block text-sm text-[red] italic"
            >
              Home Country not on list?
            </label>
          </div>
        </div>

        {/* Checkboxes section */}
        <div className="space-y-3 mt-4">
        <div className="text-[#162B6E] font-[600] text-[16px] leading-[145%]">Pick one. Pick more</div>

                  <div className="flex items-center">
            <input
              type="checkbox"
              id="betaTest"
              name="betaTest"
              checked={checkboxes.betaTest}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="betaTest"
              className="ml-2 block text-sm text-[black]"
            >
              Get FREE access as a beta tester
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="contributeRecordings"
              name="contributeRecordings"
              checked={checkboxes.contributeRecordings}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="contributeRecordings"
              className="ml-2 block text-sm text-[black]"
            >
              Record in Yorùbá - be part of the experience
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sendUpdates"
              name="sendUpdates"
              checked={checkboxes.sendUpdates}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="sendUpdates"
              className="ml-2 block text-sm text-[black]"
            >
              Get Updates - cheer us on!
            </label>
          </div>

          {checkboxError && (
            <p className="mt-1 text-sm text-red-600">
              Please select at least one option
            </p>
          )}
        </div>

        <div className="mt-6">
          <InAppButton type={'submit'} borderRadius="8.15px" background="#162B6E" width="100%" disabled={isPending} onClick={(e: any) => handleSubmit(e)}>
          {isPending ? <CustomSpinner /> : <div className="text-[white]">Sign up</div>}
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

export default WaitingListAuthComponent;