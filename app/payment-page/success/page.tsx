/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import PaymentSuccess from "@/components/paymentPage/PaymentSuccessComponent";
import PaymentPage from "@/components/paymentPage/PaymentOptions";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/general/Modal";
import { useSearchParams } from "next/navigation";
import { useGetUserPaymentHistory } from "@/services/payment/transactions/tanstack";

// How long to keep polling for the webhook-confirmed transaction before giving up.
const MAX_POLL_ATTEMPTS = 10;
const POLL_INTERVAL_MS = 3000;

export default function Page() {
  const params = useSearchParams();
  const planType = params.get("type");
  const router = useRouter();

  const [pollAttempts, setPollAttempts] = useState(0);
  const isPolling = pollAttempts < MAX_POLL_ATTEMPTS;

  const { data: userPaymentHistory } = useGetUserPaymentHistory(
    isPolling ? POLL_INTERVAL_MS : false
  );

  const allTransactions = userPaymentHistory?.data?.allUserTransactions || [];
  const latestTransaction = [...allTransactions].sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
  const transactionStatus = (latestTransaction?.status || "").toUpperCase();

  useEffect(() => {
    if (!isPolling) return;
    if (transactionStatus && transactionStatus !== "PENDING") return;
    const timeout = setTimeout(() => setPollAttempts((count) => count + 1), POLL_INTERVAL_MS);
    return () => clearTimeout(timeout);
  }, [isPolling, transactionStatus]);

  const paymentStatus =
    transactionStatus === "FAILED"
      ? "failed"
      : transactionStatus && transactionStatus !== "PENDING"
      ? "success"
      : isPolling
      ? "pending"
      : "failed";

  const handleRedirect = () => {
    return router.push("/user-settings?tab=payment");
  };
  return (
    <div>
      <Head>
        <title>Payment Success Page</title>
        <meta name="description" content="Payment Successful" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <section>
        <PaymentPage subscriptionType={`${planType}`} />
      </section>
      <section className="w-full min-h-screen flex items-center justify-center bg-white/80">
        <Modal
          isOpen={true}
          onClose={handleRedirect}
          size="md"
          containerClassName="w-full"
          disableClose={paymentStatus === "pending"}
        >
          <div
            className="flex p-6 w-full items-center justify-center"
            style={{ fontFamily: "Lexend" }}
          >
            <PaymentSuccess status={paymentStatus} />
          </div>
        </Modal>
      </section>
    </div>
  );
}
