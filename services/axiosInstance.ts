// import axios from "axios";
// // import Cookies from "js-cookie";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // Allow sending cookies with requests
// });

// // ✅ Read token from cookies (if needed for other purposes)
// const getToken = async () => {
//   return Cookies.get("access_token");
// };

// axiosInstance.interceptors.request.use(
//   async (config) => {
//   await getToken();
//     // console.log({ config, token }); // If you want to log the token for debugging

//     // You don't need to add cookies manually to the headers if the browser handles them
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
