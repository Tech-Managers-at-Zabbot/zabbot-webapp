import axiosInstance from "../../axiosInstance";

export const createCheckoutSession = async (subscriptionType: string) => {
  const response = await axiosInstance.post(
    `/payments/payment-services/stripe/create-checkout-session`,
    { subscriptionType }
  );
  return response.data;
};
