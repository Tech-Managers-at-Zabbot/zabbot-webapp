import axios from 'axios';
import { waitingListSchema } from "@/schemas/waitinglist.schema";

const API_BASE_URL = "https://zabbot-backend-hzbq7.ondigitalocean.app/api/v1";

//LOCAL ==> 'http://localhost:3010/api/v1'
//MAIN BRANCH ==> 'https://zabbot-backend-hzbq7.ondigitalocean.app/api/v1';

export const joinFoundersList = async (formData: {
  name: string;
  email: string;
  country: string;
  sendUpdates: boolean;
  betaTest: boolean;
  contributeSkills: boolean;
}) => {
  const parsed = waitingListSchema.safeParse(formData);
  
  if (!parsed.success) {
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


export const unSubscribeFromFoundersList = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/waiting-list/unsubscribe?token=${token}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Network error occurred");
    }
    throw new Error("An unexpected error occurred");
  }
}