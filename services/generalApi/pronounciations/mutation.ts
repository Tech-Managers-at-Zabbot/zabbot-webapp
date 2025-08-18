 import { useMutation, useQuery } from "@tanstack/react-query";
import { getPronunciationList, getPronunciationById, addPronunciation, pronunciationFeedback } from "./api";

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

// getPronunciationFeedback
export function usePronunciationFeedback() {
  return useMutation({
   mutationFn: ({ id, file }: { id: string; file: Blob }) =>
      pronunciationFeedback(id, file),
    onSuccess: async (data) => {
      // Handle success (e.g., show a success message)
      return data;
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Error submitting feedback:", error);
    },
  });
}