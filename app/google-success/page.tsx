/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/components/general/Navbar";
import SuccessComponent from "@/components/general/SuccessComponent";
import Head from "next/head";
import React, { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePageLanguage } from "@/contexts/LanguageContext";
import { CustomSpinner } from "@/components/CustomSpinner";
import Cookies from "js-cookie";

function AuthHandler() {
  const { getPageText, isPageLoading: isLanguageLoading } =
    usePageLanguage("googleSuccess");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");
    const authType = searchParams.get("authType");
    if (authType === "login") {
      setRedirectPath("user-dashboard");
    } else {
      setRedirectPath("login");
    }
    //redirectLink
    if (token && userData) {
      try {
        Cookies.set("userProfile", userData, {
          expires: 30,
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("access_token", token, {
          expires: 30,
          secure: true,
          sameSite: "strict",
        });
      } catch (error) {
        console.error("Error processing Google auth data:", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setTimeout(() => {
      router.push(`/${redirectPath}`);
    }, 5000);
  }, []);

  if (isLanguageLoading) {
    return (
      <div className="flex min-h-[90vh] justify-center items-center">
        <CustomSpinner spinnerColor="#012657" />
      </div>
    );
  }

  return (
    <div className="">
      <SuccessComponent
        message={`${getPageText("auth_success")} ${
          redirectPath === "user-dashboard"
            ? getPageText("dashboard")
            : getPageText("login")
        }`}
        title={getPageText("success")}
        buttonText={getPageText("continue")}
        redirectLink={redirectPath}
      />
    </div>
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
        <section className="w-full justify-center items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthHandler />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default GoogleAuthSuccessPage;
