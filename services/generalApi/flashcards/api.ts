import { Flashcard } from "@/types/interfaces";
import axiosInstance from "../../axiosInstance";

// --- Flashcards Endpoints ---

export async function getFlashcards() {
  const response = await axiosInstance.get(`/flashcards/flashcards`);
  return response.data;
}

export async function getFlashcardById(id: string) {
  const response = await axiosInstance.get(`/flashcards/flashcards/${id}`);
  return response.data;
}

export async function createFlashcard(payload: Omit<Flashcard, "id">) {
  const response = await axiosInstance.post(`/flashcards/flashcards`, payload);
  return response.data;
}

export async function updateFlashcardById(
  id: string,
  updateData: Partial<Flashcard>
) {
  const response = await axiosInstance.put(
    `/flashcards/flashcards/${id}`,
    updateData
  );
  return response.data;
}

export async function deleteFlashcardById(id: string) {
  const response = await axiosInstance.delete(`/flashcards/flashcards/${id}`);
  return response.data;
}
