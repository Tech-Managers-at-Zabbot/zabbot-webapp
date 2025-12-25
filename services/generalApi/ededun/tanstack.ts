import { useQuery } from "@tanstack/react-query";
import { getEdedunRecordings } from "./api";




export function useGetAllRecordings(page: number, search: string) {
  return useQuery({
    queryKey: ["getAllEdedunRecordings", page, search],
    queryFn: () => getEdedunRecordings(page, search),
    // keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
