/* eslint-disable @next/next/no-img-element */
"use client";
import AuthGuard from "@/components/security/AuthGuard";
import React from "react";
import { Alerts } from "next-alert";
import { Providers } from "@/components/Providers";
import { useLoading } from "@/contexts/LoadingProvider";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setLoading, loading } = useLoading();

  const handleRedirectHome = () => {
    setLoading(true);
    router.push("/user-dashboard");
  };

  return (
    <AuthGuard isAdmin={false}>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <div className={`flex-1 min-h-screen`}>
            <main style={{ flex: 1 }} className="relative">
              <header className="z-50 bg-[url('/flashcards/flashcards-header.svg')] absolute top-0 w-full bg-cover bg-bottom bg-no-repeat min-h-[250px]"></header>
              <div className="relative bg-[url('/flashcards/flashcards-background.png')] bg-cover bg-top bg-no-repeat min-h-[250px]">
              <div className="relative px-10">
              <button
                className="relative z-[999] cursor-pointer p-2 sm:p-3 rounded-full hover:bg-white/10 transition"
                onClick={handleRedirectHome}
                disabled={loading}
              >
                <img
                  src="/lessons/lessons-home.svg"
                  alt="home"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-[55px] md:h-[55px]"
                />
              </button>
              </div>
                {children}
              </div>
            </main>
          </div>
        </div>
        <div className="custom-alerts">
          <Alerts position="top-left" direction="left" timer={6000} />
        </div>
      </Providers>
    </AuthGuard>
  );
};

export default Layout;
