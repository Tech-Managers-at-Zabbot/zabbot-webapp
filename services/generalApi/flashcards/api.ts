import { Flashcard } from "@/types/interfaces";
import axiosInstance from "../../axiosInstance";

// --- Flashcards Endpoints ---

export async function getFlashcards() {
  const response = await axiosInstance.get(`/lessons/flashcards`);
  return response.data;
}

export async function getFlashcardById(id: string) {
  const response = await axiosInstance.get(`/lessons/flashcards/${id}`);
  return response.data;
}

export async function createFlashcard(payload: Omit<Flashcard, "id">) {
  const response = await axiosInstance.post(`/lessons/flashcards`, payload);
  return response.data;
}

export async function updateFlashcardById(
  id: string,
  updateData: Partial<Flashcard>
) {
  const response = await axiosInstance.put(
    `/lessons/flashcards/${id}`,
    updateData
  );
  return response.data;
}

export async function deleteFlashcardById(id: string) {
  const response = await axiosInstance.delete(`/lessons/flashcards/${id}`);
  return response.data;
}
