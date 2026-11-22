import { getUserTimezone } from "@/utilities/utilities";
import axiosInstance from "../../axiosInstance";
import axios from "axios";

export const registerUser = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  timeZone: string;
}) => {
  const response = await axiosInstance.post("/users/auth/signup", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const verifyUserOtp = async (formData: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post(
    "/users/auth/verify-user",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const resendUserOtp = async (formData: { email: string }) => {
  const response = await axiosInstance.post(
    "/users/auth/resend-verification-otp",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const loginUser = async (formData: {
  email: string;
  password: string;
  stayLoggedIn: boolean;
  timeZone: string;
}) => {
  const response = await axios.post("/api/auth/session/login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const requestPasswordResetLink = async (formData: { email: string }) => {
  const response = await axiosInstance.post(
    "/users/auth/reset-password-request",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const resetPassword = async (formData: {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await axiosInstance.post(
    "/users/auth/reset-password",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Keep Google OAuth on the exact same backend as Zabbot's other STAGING APIs.
// Separate build-time Google URLs can accidentally point at a different deployment.
const beginGoogleOAuth = (action: "login" | "register") => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("Zabbot API URL is not configured");
  }
  const url = new URL(`${baseUrl.replace(/\\/$/, "")}/users/auth/google/${action}`);
  url.searchParams.set("timezone", getUserTimezone());
  window.location.assign(url.toString());
};

export const initiateGoogleRegister = () => beginGoogleOAuth("register");

export const initiateGoogleLogin = () => beginGoogleOAuth("login");

export const handleGoogleAuthCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");

  if (user) {
    try {
      return JSON.parse(decodeURIComponent(user));
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  return null;
};
