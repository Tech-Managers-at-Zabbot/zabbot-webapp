/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";
import { useAlert } from "next-alert";
import Loader from "../general/Loader";

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
  const [hasRedirected, setHasRedirected] = useState(false);

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
    const pathname = window.location.pathname;
    if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
    setIsChecking(false);
    return;
  }
    const token = Cookies.get("access_token");
 if (hasRedirected) return;
    if (!token) {
      setHasRedirected(true);
      addAlert("Error", "Session expired. Please log in again.", "error");
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userProfile");
      setTimeout(() => {
        router.replace("/login");
      }, 200);
      return;
    }

    const rememberMe = Cookies.get("remember_me") === "true";
    const decoded = parseJwt(token);
    const expired = !decoded?.exp || decoded.exp * 1000 < Date.now();

    if (expired && !rememberMe) {
      Cookies.remove("access_token");
      Cookies.remove("userProfile");
      Cookies.remove("remember_me");
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userProfile");
      addAlert("Error", "Session expired. Please log in again.", "error");
      setTimeout(() => {
        router.replace("/login");
      }, 200);
      return;
    }

    if (isAdmin) {
      const userDetails = Cookies.get("userProfile");

      if (!userDetails) {
        Cookies.remove("access_token");
        Cookies.remove("userProfile");
        Cookies.remove("remember_me");
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("userProfile");
        addAlert("Error", "Please login again", "error");
        setTimeout(() => {
          router.replace("/login");
        }, 200);
        return;
      }

      const user = JSON.parse(userDetails);
      if (user?.role !== "admin") {
        addAlert(
          "Error",
          "You are not authorized to access this page",
          "error"
        );
        return setIsChecking(false);
      }
    }

    setIsChecking(false);
  }, [router]);

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
