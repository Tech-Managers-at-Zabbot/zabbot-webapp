import axiosInstance from "../../axiosInstance";

export const getAllLeaderboard = async (
  period: "daily" | "weekly" | "allTime",
  limit: number = 15,
) => {
  const response = await axiosInstance.get(
    `/lessons/leaderboard/all-leaderboard?period=${period}&limit=${limit}`,
  );
  return response.data;
};

export const getUserLeaderboard = async () => {
  const response = await axiosInstance.get(
    `/lessons/leaderboard/user-leaderboard`,
  );
  return response.data;
};

export const updateUserLeaderboard = async (formData: {
  scoreToAdd: number;
  quizCompleted?: boolean;
  quizCorrect?: boolean;
  dailyWordsListened: number;
}) => {
  const response = await axiosInstance.post(
    "/lessons/leaderboard/update-user-leaderboard",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
