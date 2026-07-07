/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  changeUserProfileImage,
  getAllUserCount,
  getSingleUser,
  getUserNotificationSettings,
  updateUserNames,
  updateUserNotificationSettings,
  logUserStreak
} from "./api";

export function useGetUserCount() {
  return useQuery({
    queryKey: ["getAllUserCount"],
    queryFn: () => getAllUserCount(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getSingleUserData"] });
    },
    onError: (error: any) => {
      console.error("Error resetting password:", error);
    },
  });
}

export function useChangeUserNames() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserNames,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getSingleUserData"] });
    },
    onError: (error: any) => {
      console.error("Error resetting password:", error);
    },
  });
}

export function useGetSingleUserData() {
  return useQuery({
    queryKey: ["getSingleUserData"],
    queryFn: getSingleUser,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useChangeUserProfileImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeUserProfileImage,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getSingleUserData"] });
    },
    onError: (error: any) => {
      console.error("Error uploading profile picture:", error);
    },
  });
}

export function useGetUserNotificationSettings() {
  return useQuery({
    queryKey: ["getUserNotifcationSettings"],
    queryFn: getUserNotificationSettings,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useUpdateUserNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserNotificationSettings,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getUserNotifcationSettings"] });
    },
    onError: (error: any) => {
      console.error("Error changing notification settings:", error);
    },
  });
}

// logUserStreak
export function useLogUserStreak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => logUserStreak(),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["logUserStreak"] });
    },
    onError: (error: any) => {
      console.error("Error logging user streak:", error);
    },
  });
} 