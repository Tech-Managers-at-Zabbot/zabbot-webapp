/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../apiSetup";


export const registerUser = async (formData: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}) => {
     const response = await axiosInstance.post("/users/auth/signup", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


export const verifyUserOtp = async (formData: {
    email: string,
    otp: string,
}) => {
     const response = await axiosInstance.post("/users/auth/verify-user", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


export const resendUserOtp = async (formData: {
    email: string,
}) => {
     const response = await axiosInstance.post("/users/auth/resend-verification-otp", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


export const loginUser = async (formData: {
    email: string,
    password: string,
    stayLoggedIn: boolean
}) => {
     const response = await axiosInstance.post("/users/auth/login", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


export const requestPasswordResetLink = async (formData: {
    email: string
}) => {
     const response = await axiosInstance.post("/users/auth/reset-password-request", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


export const resetPassword = async (formData: {
    token: string,
    newPassword: string,
    confirmNewPassword: string
}) => {
     const response = await axiosInstance.post("/users/auth/reset-password", formData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}