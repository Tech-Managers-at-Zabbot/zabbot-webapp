import { useQuery } from "@tanstack/react-query";
import { getDailyWord } from "./api";

export function useGetDailyWord(languageId:string) {

  return useQuery({
    queryKey: ['getDailyWord', languageId],
    queryFn: () => getDailyWord(languageId),
    enabled: !!languageId,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}