"use client";
import LoginAuth from "@/components/authPage/LoginAuth";
import Head from "next/head";
import LoginAuthBanner from "@/components/authPage/LoginAuthBanner";
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "@/components/languageToggle/LanguageToggle";

const Login = () => {

  return (
    <div>
      <Head>
        <title>Zabbot - Login Page</title>
        <meta
          name="description"
          content="Login to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col min-h-screen md:flex-row relative">
        <div className="absolute max-w-screen-2xl top-4 right-6 sm:right-8 md:right-10 sm:top-6 flex items-center gap-3 z-50 w-full sm:w-auto justify-between sm:justify-end">
        <div className="block ml-3 sm:ml-5 md:ml-7 hover:cursor-pointer md:hidden">
          <Link href="/">
            <div className="relative h-8 w-24 sm:h-10 sm:w-28">
              <Image
                src="/general/zabbot-single-logo-blue.png"
                alt="Zabbot Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <div
          className="hover:cursor-pointer relative transition-all duration-200"
        >
          <LanguageToggle variant={"toggle"} />
        </div>
      </div>
        <section className="hidden max-w-screen-2xl md:block md:w-1/2 lg:w-1/2">
          <LoginAuthBanner />
        </section>
        <section className="bg-white w-full md:w-1/2 lg:w-1/2 flex flex-col min-h-screen">
          <div className="w-full max-w-screen-2xl mt-40 px-4 sm:px-6 md:px-8 py-10 flex justify-center items-center">
            <Suspense fallback={<div>Loading...</div>}>
            <LoginAuth />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
