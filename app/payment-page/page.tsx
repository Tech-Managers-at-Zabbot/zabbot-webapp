"use client";
import React, 
{ 
  // useState 
} from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import PaymentPage from "@/components/paymentPage/PaymentOptions";
// import { Modal } from "@/components/general/Modal";
// import PaymentSuccess from "@/components/paymentPage/PaymentSuccessComponent";
// import PaymentFailure from "@/components/paymentPage/PaymentFailureComponent";

export default function Page() {
  // const [subscriptionModalOpen, setSubScriptionModalOpen] = useState(false);
  const params = useSearchParams();
  const planType = params.get("type");

  return (
    <div>
      <Head>
        <title>Payment Options Page</title>
        <meta name="description" content="Choose your payment Option" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <section>
      <PaymentPage subscriptionType={`${planType}`} />
      </section>

        {/* <section className="w-full">
        <Modal
          isOpen={subscriptionModalOpen}
          onClose={() => setSubScriptionModalOpen(false)}
          // title={modalTitle}
          size="md"
          containerClassName="w-full"
          // disableClose={saveQuizLoading || createQuizLoading}
        >
          <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
            <PaymentSuccess />
          </div>
        </Modal>
      </section> */}
    </div>
  );
}
