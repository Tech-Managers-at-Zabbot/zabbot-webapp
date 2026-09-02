/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  useQueryClient,
  //   useQuery,
  //   useQueryClient
} from "@tanstack/react-query";
import { createTransaction, getUserPaymentHistory, userSubscriptionCancellation, getUserSubscriptionListing } from "./api";

export function useCreateTransactionSession() {
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => { },
    onError: (error: any) => {
      console.error("Error creating transaction session:", error);
    },
  });
}


export function useGetUserPaymentHistory() {
  return useQuery({
    queryKey: ["getUserPaymentHistory"],
    queryFn: () => getUserPaymentHistory(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetUserSubscriptionListing() {
  return useQuery({
    queryKey: ["getUserSubscriptionListing"],
    queryFn: () => getUserSubscriptionListing(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useUserSubscriptionCancellation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subscriptionId: string) => {
      return await userSubscriptionCancellation(subscriptionId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getUserSubscriptionListing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserPaymentHistory"],
      });
    },
    onError: (error: any) => {
      console.error("Error canceling subscription:", error);
    },
  });
}