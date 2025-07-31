/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";
import { useAlert, Alerts } from "next-alert";
import Loader from "../general/Loader";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
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
    const token = Cookies.get("access_token");

    if (!token) {
      addAlert("Error", "Session expired. Please log in again.", "error");
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userProfile");
      setTimeout(() => {
        router.replace("/login");
      }, 200);
      return;
    }

    const decoded = parseJwt(token);
    const expired = !decoded?.exp || decoded.exp * 1000 < Date.now();

    if (expired) {
      Cookies.remove("access_token");
      Cookies.remove("userProfile");
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userProfile");
      addAlert("Error", "Please login again", "error");
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
  }, [isChecking, setLoading]);

  //   useEffect(() => {
  //   setLoading(isChecking);
  // }, [isChecking, setLoading]);

  if (isChecking) {
    return (
      <>
        <Loader isDark={isDark} />
        <Alerts
          position="top-left"
          direction="right"
          timer={10000}
          className="rounded-md relative z-100 !w-80"
        />
      </>
    );
  }

  return (
    <>
      {children}
      <Alerts
        position="top-left"
        direction="right"
        timer={10000}
        className="rounded-md relative z-100 !w-80"
      />
    </>
  );
}
