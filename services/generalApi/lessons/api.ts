import axiosInstance from "../../axiosInstance";


export const getUserDailyGoal = async (
    userId: string,
    languageId: string,
) => {
     const response = await axiosInstance.get(`/lessons/goals/daily-goal/${userId}/${languageId}`)
    return response.data;
}


export const completeUserDailyGoal = async (
    userId: string,
    goalId: string,
) => {
     const response = await axiosInstance.post(`/lessons/goals/complete-daily-goal/${userId}/${goalId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


export const getDailyWord = async (
    languageId: string,
) => {
     const response = await axiosInstance.get(`/lessons/daily-words/${languageId}`)
    return response.data;
}

export const getUserCompletedDailyGoalCount = async (
    userId: string,
) => {
     const response = await axiosInstance.get(`/lessons/goals/goals-count/${userId}`)
    return response.data;
}


// export const loginUser = async (formData: {
//     email: string,
//     password: string,
//     stayLoggedIn: boolean
// }) => {
//      const response = await axiosInstance.post("/users/auth/login", formData, {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     return response.data;
// }