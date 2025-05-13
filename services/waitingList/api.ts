import axios from 'axios';
import { waitingListSchema } from "@/schemas/waitinglist.schema";

const API_BASE_URL = "https://zabbot-backend-hzbq7.ondigitalocean.app/api/v1";

// 'http://localhost:3010/api/v1'
// 'https://zabbot-backend-hzbq7.ondigitalocean.app/api';
// "http://localhost:3010/api"

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
            throw new Error("Please select all fields");
          }
    const response = await axios.post(`${API_BASE_URL}/waiting-list/join`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
};