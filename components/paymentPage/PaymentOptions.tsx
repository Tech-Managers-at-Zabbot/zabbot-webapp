/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  // Wallet,
  ArrowLeft,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useCreateCheckoutSession } from "@/services/payment/stripe/tanstack";
import PaypalButtonsComponent from "../PaypalButtonsComponent";

interface PaymentPageProps {
  subscriptionType: string;
  amount?: number;
  onBack?: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  subscriptionType,
  amount,
  onBack,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "paypal" | null
  >(null);

  const subscriptionAMount = {
    lifetime: 159.99,
    annual: 69.99,
    monthly: 9.99,
  };

  amount =
    subscriptionAMount[subscriptionType as keyof typeof subscriptionAMount] ||
    9.99;

  // Get subscription details based on type
  const getSubscriptionDetails = () => {
    const details = {
      lifetime: { title: "Lifetime Access", period: "One-time payment" },
      annual: { title: "Annual Subscription", period: "Billed yearly" },
      monthly: { title: "Monthly Subscription", period: "Billed monthly" },
    };
    return details[subscriptionType as keyof typeof details] || details.monthly;
  };

  const details = getSubscriptionDetails();

  const handlePaymentMethodSelect = (method: "card" | "paypal") => {
    setSelectedMethod(method);
  };

  const { mutate, isPending } = useCreateCheckoutSession();

  const handleProceedToPayment = () => {
    if (!selectedMethod) return;

    // Simulate API call - Replace with actual payment processor integration
    setTimeout(() => {
      if (selectedMethod === "card") {
        // Redirect to Stripe Checkout or your card payment page
        mutate(
          {
            subscriptionType,
          },
          {
            onSuccess: (data) => {
              if (data && data.data.sessionUrl) {
                window.location.href = data.data.sessionUrl;
              } else {
                console.error("Checkout failed, please try again.");
              }
            },
            onError: (error) => {
              console.error("Error creating checkout session:", error);
            },
          }
        );
        // window.location.href = `/payment/card?amount=${amount}&type=${subscriptionType}`;
      } else if (selectedMethod === "paypal") {
        // Redirect to PayPal
        window.location.href = `/payment/paypal?amount=${amount}&type=${subscriptionType}`;
      }
    }, 1000);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0089C8] hover:text-[#006B9E] mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to plans</span>
          </button>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0089C8] to-[#00B4D8] px-6 sm:px-8 py-8 sm:py-10 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Choose your preferred payment method
            </p>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{details.title}</span>
                  <span className="font-semibold text-gray-900">
                    US${amount}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{details.period}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#0089C8]">
                      US${amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Trial Notice */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2
                  className="text-[#0089C8] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    7-Day Free Trial Included
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    You won't be charged until your trial ends
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card Payment */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePaymentMethodSelect("card")}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedMethod === "card"
                      ? "border-[#0089C8] bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {selectedMethod === "card" && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="text-[#0089C8]" size={24} />
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        selectedMethod === "card"
                          ? "bg-[#0089C8]"
                          : "bg-gray-100"
                      }`}
                    >
                      <CreditCard
                        className={
                          selectedMethod === "card"
                            ? "text-white"
                            : "text-gray-600"
                        }
                        size={32}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        Credit/Debit Card
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Visa, Mastercard, Amex
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* PayPal Button */}
                <motion.div
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedMethod === "paypal"
                      ? "border-[#0089C8] bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {selectedMethod === "paypal" && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="text-[#0089C8]" size={24} />
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    <div className="text-center mb-3">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        PayPal
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Fast & secure
                      </p>
                    </div>

                    {selectedMethod === "paypal" && (
                      <PaypalButtonsComponent
                        subscriptionType={subscriptionType}
                        amount={amount}
                        onSuccess={() => {
                          console.log("Payment successful!");
                        }}
                        onError={(error) => {
                          console.error("Payment error:", error);
                        }}
                      />
                    )}

                    {selectedMethod !== "paypal" && (
                      <button
                        onClick={() => handlePaymentMethodSelect("paypal")}
                        className="w-full py-2 px-4 bg-[#0089C8] text-white rounded-lg hover:bg-[#006B9E] transition-colors"
                      >
                        Select PayPal
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Continue Button */}
            <motion.button
              whileHover={{ scale: selectedMethod ? 1.02 : 1 }}
              whileTap={{ scale: selectedMethod ? 0.98 : 1 }}
              onClick={handleProceedToPayment}
              disabled={!selectedMethod || isPending}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedMethod && !isPending
                  ? "bg-[#0089C8] text-white hover:bg-[#006B9E] shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue to Payment</span>
                  <Lock size={18} />
                </>
              )}
            </motion.button>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock size={16} />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Your payment information is safe and secure
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">Trusted payment methods</p>
          <div className="flex items-center justify-center gap-6 opacity-60">
            <span className="text-2xl font-bold text-gray-400">VISA</span>
            <span className="text-2xl font-bold text-gray-400">mastercard</span>
            <span className="text-2xl font-bold text-gray-400">PayPal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
