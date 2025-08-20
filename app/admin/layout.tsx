"use client";
/* eslint-disable @next/next/no-img-element */
import AdminNavBar from "@/components/dashboard/AdminDashboardNav";
import GetInTouch from "@/components/dashboard/GetInTouch";
import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
import { Providers } from "@/components/Providers";
import AuthGuard from "@/components/security/AuthGuard";
import { Alerts } from "next-alert";
import React, { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [timeSunMoonLink, setTimeSunMoonLink] = useState("#");

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 1 && hours < 12) {
      setTimeSunMoonLink("/userDashboard/morning-sun.svg");
    } else if (hours >= 12 && hours < 18) {
      setTimeSunMoonLink("/userDashboard/afternoon-sun.svg");
    } else {
      setTimeSunMoonLink("/userDashboard/moon.svg");
    }
  }, []);

  return (
    <AuthGuard isAdmin={true}>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 min-h-screen">
            <AdminNavBar showLogo={true} />
            <main style={{ flex: 1 }} className="relative">
              <div className="relative">
                <section
                  className="
                  absolute top-[80px] 
                  md:top-[100px]
                  left-6
                  sm:left-6
                  md:left-auto md:right-16
                  lg:right-20
                  max-w-screen-2xl
                "
                  style={{ zIndex: 1 }}
                >
                  <img
                    src={timeSunMoonLink}
                    alt="image of the sun/moon"
                    width={120}
                  />
                </section>
                {children}
              </div>
            </main>
            <GetInTouch />
            <UserDashboardFooter />
          </div>
        </div>
       <div className="custom-alerts">
          <Alerts position="top-left" direction="left" timer={6000} />
        </div>
      </Providers>
    </AuthGuard>
  );
}
