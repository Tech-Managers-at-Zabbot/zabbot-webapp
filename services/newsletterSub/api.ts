import axiosInstance from "../axiosInstance";

export const subscribeUser = async (formData: {
  email: string;
}) => {
  const response = await axiosInstance.post("/users/newsletter-subscriptions", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
