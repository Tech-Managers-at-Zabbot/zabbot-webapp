/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
//   useQuery,
//   useQueryClient 
} from "@tanstack/react-query";
import { createCheckoutSession } from "./api";


export function useCreateCheckoutSession() {
//   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ( {subscriptionType } : { subscriptionType:string }) => {
      return await createCheckoutSession(subscriptionType);
    },
    onSuccess: async (
        // _, variables
    ) => {
       
    },
    onError: (error: any) => {
      console.error('Error creating checkout session:', error);
    },
  });
}