/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  //   useQuery,
  //   useQueryClient
} from "@tanstack/react-query";
import { createTransaction, getUserPaymentHistory } from "./api";

export function useCreateTransactionSession() {
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {},
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