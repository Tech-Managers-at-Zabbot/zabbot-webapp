"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/general/Navbar";
import SuccessComponent from "@/components/general/SuccessComponent";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoogleAuthSuccessPage = () => {

    const router = useRouter();

    useEffect(()=> {
        setTimeout(()=> {
            router.push(`/founders-circle`);
        },2000)
    },[])

  return (
    <div>
      <Head>
        <title>Zabbot - Google Auth Success Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col bg-[#E3F5FF] min-h-screen relative">
        <Navbar />
        <section className="w-full">
          <SuccessComponent message={"Authentication Successful, Redirecting to Dashboard..."} title={"Success!"} />
        </section>
      </main>
    </div>
  );
};

export default GoogleAuthSuccessPage;
