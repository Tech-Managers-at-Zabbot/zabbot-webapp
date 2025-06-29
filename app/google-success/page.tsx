/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/components/general/Navbar";
import SuccessComponent from "@/components/general/SuccessComponent";
import Head from "next/head";
import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');

    if (token && userData) {
      try {
        localStorage.setItem('token', decodeURIComponent(token));
        localStorage.setItem('userProfile', decodeURIComponent(userData));
      } catch (error) {
        console.error('Error processing Google auth data:', error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setTimeout(() => {
      router.push(`/founders-circle`);
    }, 2000);
  }, []);

  return (
    <SuccessComponent
      message={"Authentication Successful, Redirecting to Dashboard..."}
      title={"Success!"}
    />
  );
}

const GoogleAuthSuccessPage = () => {
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
            <AuthHandler />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default GoogleAuthSuccessPage;
