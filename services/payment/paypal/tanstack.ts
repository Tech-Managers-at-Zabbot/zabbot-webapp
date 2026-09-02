// import { useMutation } from "@tanstack/react-query";
// import axiosInstance from "../../axiosInstance";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

// export const useCreatePayPalOrder = () => {
//   return useMutation({
//     mutationFn: async ({ subscriptionType }: { subscriptionType: string }) => {
//       const response = await axiosInstance.post(
//         `${API_URL}/api/v1/payments/payment-services/paypal/create-order`,
//         { subscriptionType },
//       );
//       return response.data;
//     },
//   });
// };

// export const useCapturePayPalOrder = () => {
//   return useMutation({
//     mutationFn: async ({ orderId }: { orderId: string }) => {
//       const response = await axiosInstance.post(
//         `${API_URL}/api/v1/payments/payment-services/paypal/capture-order`,
//         { orderId }
//       );
//       return response.data;
//     },
//   });
// };