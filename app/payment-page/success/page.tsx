/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react"; // useState
import Head from "next/head";
import PaymentSuccess from "@/components/paymentPage/PaymentSuccessComponent";
import PaymentPage from "@/components/paymentPage/PaymentOptions";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/general/Modal";
import { useSearchParams } from "next/navigation";
import { useCreateTransactionSession } from "@/services/payment/transactions/tanstack";
import { useAlert } from "next-alert";
import { CustomSpinner } from "@/components/CustomSpinner";

export default function Page() {
  const params = useSearchParams();
  const planType = params.get("type");
  const router = useRouter();
  const { addAlert } = useAlert();

  const { mutate: createTransaction, isPending: transactionPending } =
    useCreateTransactionSession();

  const handleCreateTransaction = () => {
    let plan = 9.99;
    if (planType === "annual") {
      plan = 69.99;
    } else if (planType === "lifetime") {
      plan = 159.99;
    } else {
      plan = 9.99;
    }
    const dataToSend: any = {
      amount: plan,
      planType,
      status: "success",
    };

    createTransaction(dataToSend, {
      onSuccess: () => {
        addAlert("Success", "Transaction Successful", "success");
        router.push("/user-settings?tab=payment");
      },
      onError: (error: any) => {
        addAlert(
          "Error",
          error?.response?.data?.message ||
            "An error occurred, please try again",
          "error"
        );
        router.push("/user-settings?tab=payment");
      },
    });

    // changeNames(dataToSend, {
    //     onSuccess: () => {
    //       setIsEditing(false);
    //       addAlert("Success", "Change Successful", "success");
    //       formData.firstName = "";
    //       formData.lastName = "";
    //     },
    //     onError: (error: any) => {
    //       addAlert(
    //         "Error",
    //         error?.response?.data?.message ||
    //           "An error occurred, please try again",
    //         "error"
    //       );
    //     },
    //   });
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
          onClose={handleCreateTransaction}
          // title={modalTitle}
          size="md"
          containerClassName="w-full"
          // disableClose={saveQuizLoading || createQuizLoading}
        >
          {transactionPending ? (
            <div>
              <CustomSpinner spinnerColor="black" />
            </div>
          ) : (
            <div
              className="flex p-6 w-full items-center justify-center"
              style={{ fontFamily: "Lexend" }}
            >
              <PaymentSuccess />
            </div>
          )}
        </Modal>
      </section>
    </div>
  );
}
