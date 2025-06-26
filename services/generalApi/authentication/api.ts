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


// Replace the existing googleAuthentication function with this:
export const initiateGoogleAuth = () => {
  // Redirect to your backend's Google OAuth endpoint
  window.location.href = "https://zabbot-backend-development-no68m.ondigitalocean.app/api/v1/users/auth/google"
//   `http://localhost:3010/api/v1/users/auth/google`;
};

// Add this function to handle the callback and extract user data
export const handleGoogleAuthCallback = () => {
  // This will be called after Google redirects back to your app
  // The user data should be available in the URL or you can make a request to get user info
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