/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../axiosInstance";

export const createTransaction = async (
  transactionData: Record<string, any>
) => {
  const response = await axiosInstance.post(
    `/payments/payment-services/transactions/create-transaction`,
    transactionData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getUserPaymentHistory = async () => {
  const response = await axiosInstance.get(
    "/payments/payment-services/transactions/get-user-payment-history"
  );
  return response.data;
};
