import React from "react";
import Head from "next/head";
import PaymentPage from "@/components/paymentPage/PaymentOptions";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Payment Options Page</title>
        <meta name="description" content="Choose your payment Option" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PaymentPage subscriptionType="monthly" amount={9.99} />
    </div>
  );
}
