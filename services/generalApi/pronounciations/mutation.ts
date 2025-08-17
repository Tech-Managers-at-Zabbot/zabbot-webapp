 import { useQuery } from "@tanstack/react-query";
import { getPronunciationList, getPronunciationById, addPronunciation } from "./api";

export function useGetAllPronunciation() {
  return useQuery({
    queryKey: ['getAllPronunciation'],
    queryFn: () => getPronunciationList(),
    refetchOnMount: true,
    enabled: true,
    refetchOnWindowFocus: false,
  });
}
export function useGetPronunciationById(id: string) {
  return useQuery({
    queryKey: ['getPronunciationById', id],
    queryFn: () => getPronunciationById(id),
    refetchOnMount: true,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useAddPronunciation() {
  return useQuery({
    queryKey: ['addPronunciation'],
    queryFn: (payload: Record<string, any>) => addPronunciation(payload),
    refetchOnMount: true,
    enabled: true,
    refetchOnWindowFocus: false,
  });
}