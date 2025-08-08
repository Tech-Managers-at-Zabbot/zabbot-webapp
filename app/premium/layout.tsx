"use client";
// import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
import UserDashboardNav from "@/components/dashboard/UserDashboardNav";
import AuthGuard from "@/components/security/AuthGuard";
import React, { useEffect, useState } from "react";
import GetInTouch from "@/components/dashboard/GetInTouch";
import { Alerts } from "next-alert";
import { Providers } from "@/components/Providers";
import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timeSunMoonLink, setTimeSunMoonLink] = useState("/userDashboard/morning-sun.png");

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 6 && hours < 12) {
      // Morning: 6 AM to 12 PM
      setTimeSunMoonLink("/userDashboard/morning-sun.svg");
    } else if (hours >= 12 && hours < 18) {
      // Afternoon: 12 PM to 6 PM
      setTimeSunMoonLink("/userDashboard/afternoon-sun.svg");
    } else {
      // Night: 6 PM to 6 AM
      setTimeSunMoonLink("/userDashboard/moon.svg");
    }
  }, []);

  return (
    <AuthGuard isAdmin={false}>
      <Providers>
        <div className="flex flex-col">
          <div className={`flex-1`}>
            <UserDashboardNav />
            <main style={{ flex: 1 }} className="relative">
              <div className="relative">
                <section
                  className="
        absolute top-[80px] 
        md:top-[100px]
        left-6       // default: small screens
        sm:left-6    // small screens
        md:left-auto md:right-16 
        lg:right-20           
        max-w-screen-2xl
      " style={{ zIndex: 1 }}>
                  <img src={`${timeSunMoonLink}`} alt="image of the sun/moon" width={10} />
                </section>
                {children}
              </div>
            </main>
            <div>
              <GetInTouch />
              <UserDashboardFooter />
            </div>
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
