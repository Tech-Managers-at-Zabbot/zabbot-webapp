import { useQuery } from "@tanstack/react-query";
import { unSubscribeFromFoundersList } from "./api";


export function useUnsubscribeFromSendgridFoundersList(token: string) {

  return useQuery({
    queryKey: ['unsubscribeFromFoundersList', token],
    queryFn: () => unSubscribeFromFoundersList(token),
    enabled: !!token,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}