/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Navbar from "@/components/general/Navbar";
import SuccessComponent from "@/components/general/SuccessComponent";
import Head from "next/head";
import React, { useEffect, Suspense, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePageLanguage } from "@/contexts/LanguageContext";
import { CustomSpinner } from "@/components/CustomSpinner";
import Cookies from "js-cookie";

function AuthHandler() {
  const { getPageText, isPageLoading: isLanguageLoading } =
    usePageLanguage("googleSuccess");
  const exchangeStarted = useRef(false);
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState("");

  useEffect(() => {
    // A one-time OAuth code must be redeemed only once. Changing the URL
    // before exchange previously caused Next.js searchParams to update,
    // re-ran this effect, and canceled the first (valid) exchange.
    if (exchangeStarted.current) return;
    exchangeStarted.current = true;

    const callbackParams = new URLSearchParams(window.location.search);
    const code = callbackParams.get("code");
    const authType = callbackParams.get("authType");
    if (!code) {
      // Report only a parameter category; never expose raw tokens or code values.
      const failure = callbackParams.has("token")
        ? "google_legacy_token_callback"
        : callbackParams.has("error")
        ? "google_oauth_callback_error"
        : callbackParams.has("user")
        ? "google_legacy_user_callback"
        : "google_missing_parameters";
      router.replace(`/login?error=${failure}`);
      return;
    }

    const finishGoogleLogin = async () => {
      try {
        const response = await fetch("/api/auth/session/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          cache: "no-store",
          body: JSON.stringify({ code }),
        });
        if (!response.ok) {
          const reason = response.status === 401 ? "google_code_rejected"
            : response.status === 404 ? "google_exchange_not_found"
            : response.status >= 500 ? "google_exchange_server_error"
            : "google_exchange_failed";
          router.replace(`/login?error=${reason}`);
          return;
        }
        const session = await response.json();
        if (!session?.token || !session?.user) {
          router.replace("/login?error=google_exchange_missing_session");
          return;
        }

        Cookies.set("userProfile", JSON.stringify(session.user), {
          expires: 1, secure: true, sameSite: "strict",
        });
        Cookies.set("access_token", session.token, {
          expires: 1, secure: true, sameSite: "strict",
        });
        Cookies.set("remember_me", "false", {
          expires: 1, secure: true, sameSite: "strict",
        });

        // Remove the code from browser history once redeemed.
        window.history.replaceState(window.history.state, "", "/google-success");
        const destination = authType === "login" ? "user-dashboard" : "login";
        setRedirectPath(destination);
        router.replace(`/${destination}`);
      } catch {
        // Do not reveal any OAuth code, token, or user profile in the error.
        router.replace("/login?error=google_exchange_network_error");
      }
    };

    void finishGoogleLogin();
  }, [router]);

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
