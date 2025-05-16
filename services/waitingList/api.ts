import axios from 'axios';
import { waitingListSchema } from "@/schemas/waitinglist.schema";

const API_BASE_URL = "https://zabbot-backend-hzbq7.ondigitalocean.app/api/v1";

// 'http://localhost:3010/api/v1'
// 'https://zabbot-backend-hzbq7.ondigitalocean.app/api/v1';

export const joinWaitingList = async (formData: {
  name: string;
  email: string;
  country: string;
  sendUpdates: boolean;
  betaTest: boolean;
  contributeSkills: boolean;
}) => {
  const parsed = waitingListSchema.safeParse(formData);
  
  if (!parsed.success) {
    // Extract the first error message
    const errorMessages = parsed.error.errors.map(err => err.message);
    throw new Error(errorMessages[0] || "Please check your input and try again");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/waiting-list/join`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Network error occurred");
    }
    throw new Error("An unexpected error occurred");
  }
};