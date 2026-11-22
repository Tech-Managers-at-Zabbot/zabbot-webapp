/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";
import { useAlert } from "next-alert";
import Loader from "../general/Loader";
import { refreshSessionAccessToken } from "@/services/axiosInstance";

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e: any) {
    console.log("parsing error", e.message);
    return null;
  }
}

export default function AuthGuard({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { setLoading, loading } = useLoading();
  const { addAlert } = useAlert();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTimeAndAutoSwitch = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 18 || hour < 6;
      if (shouldBeDark) {
        setIsDark(true);
      }
    };
    checkTimeAndAutoSwitch();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const redirectToLogin = (message: string) => {
      if (cancelled) return;
      Cookies.remove("access_token");
      Cookies.remove("userProfile");
      Cookies.remove("remember_me");
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userProfile");
      addAlert("Error", message, "error");
      router.replace("/login");
    };
    const checkSession = async () => {
      const pathname = window.location.pathname;
      if (pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password") {
        if (!cancelled) setIsChecking(false);
        return;
      }
      let token = Cookies.get("access_token");
      if (!token) {
        // A valid HttpOnly refresh session may survive a browser restart.
        token = (await refreshSessionAccessToken()) || undefined;
      }
      const decoded = token ? parseJwt(token) : null;
      if (!decoded?.exp || decoded.exp * 1000 <= Date.now()) {
        token = (await refreshSessionAccessToken()) || undefined;
      }
      const verifiedClaims = token ? parseJwt(token) : null;
      if (!verifiedClaims?.exp || verifiedClaims.exp * 1000 <= Date.now()) {
        redirectToLogin("Session expired. Please log in again.");
        return;
      }
      if (isAdmin) {
        const serialized = Cookies.get("userProfile");
        let profile: { role?: string } | null = null;
        try { profile = serialized ? JSON.parse(serialized) : null; } catch { profile = null; }
        // This controls UI visibility only; the backend enforces current roles.
        if (!profile || profile.role !== "admin") {
          if (!cancelled) {
            addAlert("Error", "You are not authorized to access this page", "error");
            router.replace("/user-dashboard");
          }
          return;
        }
      }
      if (!cancelled) setIsChecking(false);
    };
    void checkSession();
    return () => { cancelled = true; };
  }, [router, isAdmin]);

  useEffect(() => {
    if (isChecking && !loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isChecking]);

  //   useEffect(() => {
  //   setLoading(isChecking);
  // }, [isChecking, setLoading]);

  if (isChecking) {
    if (!loading) {
      return (
        <>
          <Loader isDark={isDark} />
          {/* <Alerts
          position="top-right"
          direction="right"
          timer={10000}
          className="rounded-md relative z-100 !w-80"
        /> */}
        </>
      );
    }
  }

  return (
    <>
      {children}
      {/* <Alerts
        position="top-right"
        direction="right"
        timer={10000}
        className="rounded-md relative z-100 !w-80"
      /> */}
    </>
  );
}
