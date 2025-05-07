"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import NormalInputField from "../NormalInputField";
import InAppButton from "../InAppButton";
import NationalityInput from "../NatonalityInput";
import { Alerts, useAlert } from "next-alert";
import { CustomSpinner } from "../CustomSpinner";
import { useRouter } from "next/navigation";
import { useJoinWaitingList } from '../../services/waitingList/mutation';

const WaitingListAuthComponent: React.FC = () => {
  const [email, setEmail] = useState("");

  const router = useRouter()

  const { addAlert } = useAlert();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("US");
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
  });

  const [checkboxError, setCheckboxError] = useState(false);

  const { mutate:waitingListData, isPending } = useJoinWaitingList()

  const validateForm = () => {
    if (!name) {
      setError({ ...error, nameError: true });
      return false;
    }
    if (!email) {
      setError({ ...error, emailError: true });
      return false;
    }
    if ((!country && !useOtherCountry) || (useOtherCountry && !otherCountry)) {
      setError({ ...error, countryError: true });
      return false;
    }
    if (
      !checkboxes.sendUpdates &&
      !checkboxes.betaTest &&
      !checkboxes.contributeRecordings
    ) {
      setCheckboxError(true);
      return false;
    }
    return true;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      waitingListData({
        name,
        email,
        country: useOtherCountry ? otherCountry : country,
        sendUpdates: checkboxes.sendUpdates,
        betaTest: checkboxes.betaTest,
        contributeRecordings: checkboxes.contributeRecordings,
      },
      {
        onSuccess: () => {
          addAlert(
            "Success",
            "You have successfully joined the waiting list",
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
          return router.push('/success-page')
        },
        onError: (error) => {
          console.error("Error joining waiting list", error);
          addAlert(
            "Error",
            `Error joining waiting list: ${error?.response?.data?.message}`,
            "error"
          );
          return;
        },
      }
    );
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
    <div className="w-full max-w-lg mx-auto py-4 relative">
      <div className="text-[black] text-center mb-10 w-full flex flex-col gap-[8px]">
        <h1 className="text-[26px] text-[#101928] font-inter font-[600] leading-[120%]">
        Let’s achieve 2,000 early supporters!
        </h1>
        <div className="font-[400] text-[16px] text-[#667185] leading-[145%]">
        Sign up, then share with others too.
        </div>
      </div>
      <form className="space-y-4 flex flex-col gap-[16px]">
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[black]"
          >
            NAME
          </label>
          <NormalInputField
          color='#162B6E'
            id="lastName"
            value={name}
            onChange={(e: any) => {
              setName(e.target.value);
              setError({ ...error, nameError: false });
            }}
            placeholder="Type your name here"
            type="text"
            error={error.nameError}
            errorMessage="Name is required"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[black]"
          >
            EMAIL
          </label>
          <NormalInputField
          color='#162B6E'
            id="email"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
              setError({ ...error, emailError: false });
            }}
            placeholder="Type your email here"
            type="email"
            error={error.emailError}
            errorMessage="Email is required"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-[black]"
          >
            YOUR HOME COUNTRY
          </label>
          {!useOtherCountry ? (
            <NationalityInput
              value={country}
              onChange={(countryName: string) => setCountry(countryName)}
              placeholder="Select your Country"
              initialCountryCode="US"
              error={error.countryError}
              errorMessage="Country is required"
            />
          ) : (
            <NormalInputField
            color='#162B6E'
              id="otherCountry"
              value={otherCountry}
              onChange={(e: any) => {
                setOtherCountry(e.target.value);
                setError({ ...error, countryError: false });
              }}
              placeholder="Type your home country"
              type="text"
              error={error.countryError}
              errorMessage="Country is required"
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
                setError({ ...error, countryError: false });
              }}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="useOtherCountry"
              className="ml-2 block text-sm text-[red] italic"
            >
              Country not part of the list?
            </label>
          </div>
        </div>


        {/* Checkboxes section */}
        <div className="space-y-3 mt-4">
        <div className="text-[#162B6E] font-[600] text-[16px] leading-[145%]">Pick one. Pick more</div>
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
              Be a beta tester - shape the experience.
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
              Record Yorùbá - lend your voice to build a TTS engine.
            </label>
          </div>
          {checkboxError && (
            <p className="mt-1 text-sm text-red-600">
              Please select at least one option
            </p>
          )}
        </div>

        <div className="mt-6">
          <InAppButton borderRadius="8.15px" backgroundColor="#162B6E" width="100%" disabled={isPending} onClick={(e: any) => handleSubmit(e)}>
          {isPending ? <CustomSpinner /> : <div className="text-[white]">Sign up</div>}
          </InAppButton>
        </div>
      </form>
      <Alerts
        position="top-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default WaitingListAuthComponent;