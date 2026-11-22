import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


const getAccessToken = () => Cookies.get("access_token");
const setAccessToken = (token: string) => {
  const rememberMe = Cookies.get("remember_me") === "true";
  Cookies.set("access_token", token, {
    expires: rememberMe ? 30 : 1,
    secure: true,
    sameSite: 'strict'
  });
};
// One refresh at a time avoids concurrent requests racing token rotation.
let sessionRefresh: Promise<string | null> | null = null;
export const refreshSessionAccessToken = (): Promise<string | null> => {
  if (sessionRefresh) return sessionRefresh;
  sessionRefresh = fetch("/api/auth/session/refresh", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  }).then(async (response) => {
    if (!response.ok) return null;
    const data = await response.json();
    if (typeof data?.token !== "string") return null;
    setAccessToken(data.token);
    return data.token as string;
  }).catch(() => null).finally(() => {
    sessionRefresh = null;
  });
  return sessionRefresh;
};

const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("userProfile");
  Cookies.remove("remember_me");
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers['x-access-token'];
    
    if (newAccessToken) {
      setAccessToken(newAccessToken);
    }
    
    return response;
  },
  async (error) => {
    const original = error.config as (typeof error.config & { _refreshRetried?: boolean }) | undefined;
    if (error.response?.status === 401 &&
        error.response?.data?.message === "Access token expired" &&
        original && !original._refreshRetried) {
      original._refreshRetried = true;
      const token = await refreshSessionAccessToken();
      if (token) {
        original.headers.set("Authorization", `Bearer ${token}`);
        return axiosInstance(original);
      }
      clearTokens();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    if (error.response?.status === 403) {
      const errorMessage = error.response?.data?.message?.toLowerCase() || '';
      
    const loginRequiredMessages = [
        'Please login again',
        'Login required',
        'refresh token not found',
        'Refresh Token Expired. Please login again.',
        'user not found',
        'account blocked',
        'login again',
        'Invalid token',
        'Invalid token format',
        'User not found, please login again or contact admin',
        'Account blocked, please contact admin',
        'Login Again, Invalid Token:'
      ];
      
      const requiresLogin = loginRequiredMessages.some(msg => 
        errorMessage.includes(msg.toLowerCase())
      );
      
      if (requiresLogin) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
