/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Flashcard } from "@/types/interfaces";
import {
  getFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcardById,
  deleteFlashcardById,
} from "./api";

export function useGetAllFlashcards() {
  return useQuery({
    queryKey: ["getAllFlashcards"],
    queryFn: () => getFlashcards(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useGetFlashcardById(id: string) {
  return useQuery({
    queryKey: ["getFlashcardById", id],
    queryFn: () => getFlashcardById(id),
    refetchOnMount: true,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useCreateFlashcard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Flashcard, "id">) => {
      return await createFlashcard(payload);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getAllFlashcards"] });
    },
    onError: (error: any) => {
      console.error("Error creating flashcard:", error);
    },
  });
}

export function useUpdateFlashcardById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updateData,
    }: {
      id: string;
      updateData: Partial<Flashcard>;
    }) => {
      return await updateFlashcardById(id, updateData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getAllFlashcards"] });
    },
    onError: (error: any) => {
      console.error("Error updating flashcard:", error);
    },
  });
}

export function useDeleteFlashcardById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteFlashcardById(id);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getAllFlashcards"] });
    },
    onError: (error: any) => {
      console.error("Error deleting flashcard:", error);
    },
  });
}
