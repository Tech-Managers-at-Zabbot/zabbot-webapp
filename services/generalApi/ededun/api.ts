import axiosInstance from "@/services/axiosInstance";

export async function getEdedunRecordings(page: number = 1, search?: string) {
  const response = await axiosInstance.get("/ededun/admin/all-recordings", {
    params: { page, search },
  });
  return response.data;
}
