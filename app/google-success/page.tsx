"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/general/Navbar";
import SuccessComponent from "@/components/general/SuccessComponent";
import Head from "next/head";
import React, { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

const GoogleAuthSuccessPage = () => {
  const searchParams = useSearchParams();

    useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');
    // const authType = searchParams.get('authType');

    if (token && userData) {
      try {
        localStorage.setItem('token', decodeURIComponent(token));
        localStorage.setItem('userProfile', decodeURIComponent(userData));
      } catch (error) {
        console.error('Error processing Google auth data:', error);
        // router.push('/login?error=auth_processing_failed');
      }
    } else {
      // router.push('/login?error=missing_auth_data');
    }
  }, [searchParams]);

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
          <Suspense fallback={<div>Loading...</div>}>
          <SuccessComponent message={"Authentication Successful, Redirecting to Dashboard..."} title={"Success!"} />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default GoogleAuthSuccessPage;
