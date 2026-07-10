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

export const getUserSubscriptionListing = async () => {
  const response = await axiosInstance.get(
    "/payments/payment-services/subscription-plans/user-subscription"
  );
  return response.data;
};

export const userSubscriptionCancellation = async (subscriptionId: string) => {
  const response = await axiosInstance.get(
    `/payments/payment-services/stripe/cancel-subscription/${subscriptionId}`
  );
  return response.data;
};


