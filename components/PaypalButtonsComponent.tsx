// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { useCreatePayPalOrder } from "@/services/payment/paypal/tanstack";

// interface PaypalButtonsComponentProps {
//   subscriptionType: string;
//   amount: number;
//   onSuccess?: () => void;
//   onError?: (error: any) => void;
// }

// const PaypalButtonsComponent: React.FC<PaypalButtonsComponentProps> = ({
//   subscriptionType,
// //   amount,
//   onSuccess,
//   onError,
// }) => {
//   const { mutate: createOrder, isPending } = useCreatePayPalOrder();

//   const initialOptions = {
//     clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
//     currency: "USD",
//     intent: subscriptionType === "lifetime" ? "capture" : "subscription",
//   };

//   return (
//     <PayPalScriptProvider options={initialOptions}>
//       <PayPalButtons
//         style={{
//           layout: "vertical",
//           color: "gold",
//           shape: "rect",
//           label: "paypal",
//         }}
//         disabled={isPending}
//         createOrder={async () => {
//           return new Promise((resolve, reject) => {
//             createOrder(
//               { subscriptionType },
//               {
//                 onSuccess: (response:any) => {
//                   if (response?.data?.orderId) {
//                     resolve(response.data.orderId);
//                   } else {
//                     reject(new Error("Failed to create order"));
//                   }
//                 },
//                 onError: (error:any) => {
//                   reject(error);
//                   onError?.(error);
//                 },
//               }
//             );
//           });
//         }}
//         onApprove={async (data) => {
//           try {
//             // Redirect to success page
//             window.location.href = `/payment-success?type=${subscriptionType}&orderId=${data.orderID}`;
//             onSuccess?.();
//           } catch (error) {
//             console.error("Payment approval error:", error);
//             onError?.(error);
//           }
//         }}
//         onError={(err) => {
//           console.error("PayPal error:", err);
//           onError?.(err);
//         }}
//         onCancel={() => {
//           console.log("Payment cancelled");
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PaypalButtonsComponent;