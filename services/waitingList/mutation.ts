/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import {  joinWaitingList } from "./api";
// import Cookies from "js-cookie";

export function useJoinWaitingList() {
    // const queryClient = useQueryClient();
    return useMutation({
      mutationFn: joinWaitingList,
      onSuccess: async () => {
        // toast.success(data?.message || "Service Request Created Successfully");
      },
      onError: (error:any) => {
        console.error('Error creating Service Request:', error);
        // toast.error(error?.response?.data?.message || "Error creating space");
      },
    });
  }
