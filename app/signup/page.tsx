"use client";
import AuthBanner from "@/components/authPage/RegisterBanner";
import RegisterAuth from "@/components/authPage/RegisterAuth";
import Head from "next/head";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "@/components/languageToggle/LanguageToggle";

const SignupPage = () => {

  return (
    <div className="min-h-screen">
      <Head>
        <title>Zabbot - Signup Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="max-w-screen-2xl absolute top-4 right-6 sm:right-8 md:right-10 sm:top-6 flex items-center gap-3 z-50 w-full sm:w-auto justify-between sm:justify-end">
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
        <div className="hover:cursor-pointer relative transition-all duration-200">
          <LanguageToggle variant={"toggle"} />
        </div>
      </div>

      <main className="flex gap-0 min-h-screen md:flex-row relative">
        <section className="hidden max-w-screen-2xl border-0 md:block md:w-1/2 lg:w-1/2">
          <AuthBanner />
        </section>
        <section className="bg-white max-w-screen-2xl border-0 flex w-full md:w-1/2 lg:w-1/2 flex-col">
          <div className="pt-16 sm:pt-20 md:pt-8"></div>
          <div className="w-full px-6 sm:px-8 md:px-10 py-4 sm:py-6 md:py-10 flex justify-center items-center flex-1">
            <Suspense fallback={<div>Loading...</div>}>
              <RegisterAuth />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
