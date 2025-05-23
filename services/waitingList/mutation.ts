/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import {  joinFoundersList } from "./api";
// import Cookies from "js-cookie";

export function useJoinFoundersList() {
    // const queryClient = useQueryClient();
    return useMutation({
      mutationFn: joinFoundersList,
      onSuccess: async () => {
        // toast.success(data?.message || "Service Request Created Successfully");
      },
      onError: (error:any) => {
        console.error('Error creating Service Request:', error.response.data.message);
        // toast.error(error?.response?.data?.message || "Error creating space");
      },
    });
  }
