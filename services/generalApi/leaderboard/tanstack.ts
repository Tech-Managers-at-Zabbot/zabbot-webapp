/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllLeaderboard,
  getUserLeaderboard,
  updateUserLeaderboard,
} from "./api";

export const useGetAllLeaderboard = (period: 'daily' | 'weekly' | 'allTime', limit: number = 15) => {
  return useQuery({
    queryKey: ['leaderboard', period, limit],
    queryFn: () => getAllLeaderboard(period, limit),
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Refresh every minute
  });
};

export function useGetUserLeaderBoard() {
  return useQuery({
    queryKey: ["getUserLeaderboard"],
    queryFn: () => getUserLeaderboard(),
    // onSuccess: async () => {
    //   queryClient.invalidateQueries({ queryKey: ["getUserLeaderBoard"] });
    // },
    // onError: (error: any) => {
    //   console.error("Error resetting password:", error);
    // },
  });
}

export function useUpdateUserLeaderboard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      return await updateUserLeaderboard(formData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserLeaderboard"],
      });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}
