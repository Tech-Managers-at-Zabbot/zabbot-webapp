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
    const code = searchParams.get("code");
    const authType = searchParams.get("authType");
    // Remove OAuth code from browser history immediately.
    window.history.replaceState({}, "", "/google-success");
    if (!code) {
      router.replace("/login?error=login_failed");
      return;
    }
    let cancelled = false;
    const finishGoogleLogin = async () => {
      try {
        const response = await fetch("/api/auth/session/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ code }),
        });
        if (!response.ok) throw new Error("Google session exchange failed");
        const session = await response.json();
        if (cancelled || !session?.token || !session?.user) return;
        Cookies.set("userProfile", JSON.stringify(session.user), {
          expires: 1, secure: true, sameSite: "strict",
        });
        Cookies.set("access_token", session.token, {
          expires: 1, secure: true, sameSite: "strict",
        });
        Cookies.set("remember_me", "false", {
          expires: 1, secure: true, sameSite: "strict",
        });
        const destination = authType === "login" ? "user-dashboard" : "login";
        setRedirectPath(destination);
        router.replace(`/${destination}`);
      } catch {
        if (!cancelled) router.replace("/login?error=login_failed");
      }
    };
    void finishGoogleLogin();
    return () => { cancelled = true; };
  }, [router, searchParams]);

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
          <Suspense fallback={<div><CustomSpinner spinnerColor="#012657" /></div>}>
            <AuthHandler />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default GoogleAuthSuccessPage;
