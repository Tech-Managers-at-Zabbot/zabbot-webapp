"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCompleteUserDailyGoal,
  useGetUserDailyGoals,
  useGetUserDailyGoalsCount,
} from "@/services/generalApi/lessons/mutation";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserGoalsContext = createContext<unknown | undefined | any>(undefined);

export const useUserGoals = () => {
  const context = useContext(UserGoalsContext);
  if (!context) {
    throw new Error("useUserGoals must be used within a UserGoalsProvider");
  }
  return context;
};

export const UserGoalsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    languageId: "",
  });
  const [goalId, setGoalId] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("userProfile");
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
  } = useGetUserDailyGoals(userDetails?.id, userDetails?.languageId);

  const { mutate: completeUserDailyGoal, isPending: isCompletingDailyGoal } =
    useCompleteUserDailyGoal();

const { data:userGoalsCount, isLoading:userGoalsLoading } = useGetUserDailyGoalsCount(userDetails?.id)

const goalsCount = userGoalsCount?.data || 0;

  const completeGoal = () => {
    if (userDetails?.id && goalId) {
      completeUserDailyGoal(
        { userId: userDetails.id, goalId },
        {
          onSuccess: () => {
            refetchGoals();
          },
          onError: () => {},
        }
      );
    }
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
    userGoal: userGoal?.data,
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

  return (
    <UserGoalsContext.Provider value={value}>
      {children}
    </UserGoalsContext.Provider>
  );
};
