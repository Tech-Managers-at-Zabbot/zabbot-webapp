/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axiosInstance";

export const getAllUserCount = async () => {
  const response = await axiosInstance.get(`/users/users/all-user-count`);
  return response.data;
};

export const changePassword = async (formData: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await axiosInstance.post(
    "/users/auth/change-password",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateUserNames = async (formData: {
  firstName?: string;
  lastName?: string;
}) => {
  const response = await axiosInstance.patch(
    "/users/auth/update-user-names",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getSingleUser = async () => {
  const response = await axiosInstance.get("/users/auth/single-user");
  return response.data;
};

export const changeUserProfileImage = async (formData: FormData) => {
  return axiosInstance.post("/users/users/change-profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserNotificationSettings = async () => {
  const response = await axiosInstance.get(
    "/users/user-notifications/get-user-notification"
  );
  return response.data;
};

export const updateUserNotificationSettings = async (
  frequency: Record<string, any>
) => {
  const response = await axiosInstance.put(
    "/users/user-notifications/change-user-notification",
    frequency,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// export const completeUserDailyGoal = async (
//     userId: string,
//     goalId: string,
// ) => {
//      const response = await axiosInstance.post(`/lessons/goals/complete-daily-goal/${userId}/${goalId}`, {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     return response.data;
// }
