import { getUserTimezone } from "@/utilities/utilities";
import axiosInstance from "../../axiosInstance";


export const registerUser = async (formData: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    timeZone:string
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
    stayLoggedIn: boolean,
    timeZone: string
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

export const initiateGoogleRegister = () => {
const urlLink = process.env.NEXT_PUBLIC_GOOGLE_REGISTER_URL as string;
  const timezone = getUserTimezone();
  const url = new URL(urlLink);
  url.searchParams.append('timezone', timezone);
  window.location.href = url.toString();

};

export const initiateGoogleLogin = () => {
const urlLink = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL as string;
  const timezone = getUserTimezone();
  const url = new URL(urlLink);
  url.searchParams.append('timezone', timezone);
  window.location.href = url.toString();

};

export const handleGoogleAuthCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get('user');
  
  if (user) {
    try {
      return JSON.parse(decodeURIComponent(user));
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  
  return null;
};