import axios from "axios";
// import Cookies from "js-cookie";

const BASE_URL = "https://zabbot-backend-development-no68m.ondigitalocean.app/api/v1"

//LOCAL ==> 'http://localhost:3010/api/v1'
//MAIN BRANCH/WAITING LIST BRANCH ==> 'https://zabbot-backend-hzbq7.ondigitalocean.app/api/v1';
//DEMO BRANCH ==> 'https://zabbot-backend-development-no68m.ondigitalocean.app/api/v1'

// process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //   withCredentials: true,
});

const getToken = async () => {
  return localStorage.getItem("access_token")
  //   Cookies.get("access_token");
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
