import { useQuery } from "@tanstack/react-query";
import { getAllUserCount } from "./api";

export function useGetUserCount() {

  return useQuery({
    queryKey: ['getAllUserCount'],
    queryFn: () => getAllUserCount(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}