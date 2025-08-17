import axiosInstance from "../../axiosInstance";


export const getAllUserCount = async (
) => {
     const response = await axiosInstance.get(`/users/users/all-user-count`)
    return response.data;
}


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
