"use client";
import React from "react";
import Head from "next/head";
import PaymentFailure from "@/components/paymentPage/PaymentFailureComponent";
import PaymentPage from "@/components/paymentPage/PaymentOptions";
import { Modal } from "@/components/general/Modal";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const planType = params.get("type");
  const [failureModalOpen, setFailureModalOpen] = React.useState(true);
  const router = useRouter();

  const handleCancel = () => {
    router.push("/user-settings");
    setFailureModalOpen(false);
  };

  return (
    <div>
      <Head>
        <title>Payment Failure Page</title>
        <meta name="description" content="Payment Failed" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <section>
        <PaymentPage subscriptionType={`${planType}`} />
      </section>
      <section className="w-full min-h-screen flex items-center justify-center bg-white/80">
        <Modal
          isOpen={failureModalOpen}
          onClose={() => setFailureModalOpen(false)}
          // title={modalTitle}
          size="md"
          containerClassName="w-full"
          // disableClose={saveQuizLoading || createQuizLoading}
        >
          <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
            <PaymentFailure
              onCancel={handleCancel}
              onTryAgain={() => setFailureModalOpen(false)}
            />
          </div>
        </Modal>
      </section>
    </div>
  );
}
