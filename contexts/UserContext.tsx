"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCompleteUserDailyGoal,
  useGetUserDailyGoals,
  useGetUserDailyGoalsCount,
} from "@/services/generalApi/userGoals/mutation";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { useGetSingleUserData } from "@/services/generalApi/users/mutation";

const UserContext = createContext<unknown | undefined | any>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserGoalsProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    languageId: "",
  });
  const [goalId, setGoalId] = useState("");

  useEffect(() => {
    const user = Cookies.get("userProfile");
    if (!user) {
      return;
    }
    const newUser = JSON.parse(user);
    setUserDetails(newUser);
  }, []);

  const {
    data: userGoal,
    isLoading: goalLoading,
    refetch: refetchGoals,
  } = useGetUserDailyGoals(userDetails?.languageId);

  const { mutate: completeUserDailyGoal, isPending: isCompletingDailyGoal } =
    useCompleteUserDailyGoal();

  const { data: userGoalsCount, isLoading: userGoalsLoading } =
    useGetUserDailyGoalsCount(userDetails?.id);

  const goalsCount = userGoalsCount?.data || 0;

  // The Word of the Day UI opens its congratulations modal only after
  // the backend confirms that this learner's daily goal was completed.
  const completeGoal = (
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => {
    if (!userDetails?.id || !goalId) {
      onError?.(new Error("Daily goal is not ready to complete"));
      return;
    }

    completeUserDailyGoal(
      { userId: userDetails.id, goalId },
      {
        onSuccess: () => {
          onSuccess?.();
          void refetchGoals();
        },
        onError: (error: unknown) => {
          onError?.(error);
        },
      },
    );
  };

  useEffect(() => {
    if (userGoal?.data !== undefined) {
      try {
        const newGoalId = String(userGoal.data.id);
        localStorage.setItem("goalId", newGoalId);
        setGoalId(newGoalId);
      } catch (error) {
        console.error("Failed to set goalId in localStorage:", error);
      }
    }
  }, [userGoal]);

  const value = {
    userDetails,
    setUserDetails,
    userGoal: userGoal?.data,
    // userProfile,
    // userDataLoading,
    goalLoading,
    goalId,
    goalsCount,
    userGoalsLoading,
    userDailyGoal: userGoal?.data?.percentageCompletion || 0,
    isGoalCompleted: userGoal?.data?.isCompleted || false,
    completeGoal,
    isCompletingDailyGoal,
    refetchGoals,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
