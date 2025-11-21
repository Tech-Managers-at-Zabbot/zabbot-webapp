"use client";
import React, 
{ 
  // useState 
} from "react";
import Head from "next/head";
import PaymentSuccess from "@/components/paymentPage/PaymentSuccessComponent";
import PaymentPage from "@/components/paymentPage/PaymentOptions";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/general/Modal";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const params = useSearchParams();
      const planType = params.get("type");
    const router = useRouter();
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
          onClose={() => router.push('/user-dashboard')}
          // title={modalTitle}
          size="md"
          containerClassName="w-full"
          // disableClose={saveQuizLoading || createQuizLoading}
        >
          <div className="flex p-6 w-full items-center justify-center" style={{ fontFamily: "Lexend" }}>
            <PaymentSuccess />
          </div>
        </Modal>
      </section>
    </div>
  );
}
