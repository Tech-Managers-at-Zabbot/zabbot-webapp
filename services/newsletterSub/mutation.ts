import { useMutation } from "@tanstack/react-query";

import {
  subscribeUser
} from "./api";

export function useSubscribeUser() {

  return useMutation({
    mutationFn: subscribeUser,
    onSuccess: async () =>
    // data
    { },
    onError: (error: any) => {
      console.error("Error Subscribing User to newsletter:", error);

    },
  });
}
