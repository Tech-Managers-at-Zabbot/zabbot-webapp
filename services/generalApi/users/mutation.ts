/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  changeUserProfileImage,
  getAllUserCount,
  getSingleUser,
  updateUserNames,
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
