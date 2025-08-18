 
import axiosInstance from "../../axiosInstance";

// --- Pronunciation Endpoints ---
export async function getPronunciationList() {
  const response = await axiosInstance.get(`/pronunciation/pronunciations`);
  return response.data;
}

export async function getPronunciationById(id: string) {
  const response = await axiosInstance.get(`/pronunciation/pronunciations/${id}`);
  return response.data;
}

export async function addPronunciation(payload: Record<string, any>) {
  const response = await axiosInstance.post(`/pronunciation/pronunciations`, payload);
  return response.data;
}

export async function pronunciationFeedback(id: string, blob: Blob) {
  const formData = new FormData();
  const file = new File([blob], "recording.webm", { type: "audio/webm" });
  formData.append("file", file);

  const response = await axiosInstance.post(
    `/pronunciation/pronunciations/${id}/feedback`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
}