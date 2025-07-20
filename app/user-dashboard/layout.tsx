/* eslint-disable @next/next/no-img-element */
"use client";
import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
import UserDashboardNav from "@/components/dashboard/UserDashboardNav";
// import AuthGuard from "@/components/security/AuthGuard";
import React, { useEffect, useState } from "react";

const Layout = ({
  children,
  showLogo = false,
}: {
  children: React.ReactNode;
  showLogo?: boolean;
}) => {
  const [timeSunMoonLink, setTimeSunMoonLink] = useState(
    // "/userDashboard/morning-sun.png"
    ""
  );

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
    // <AuthGuard>
    <div className="flex flex-col min-h-screen">
      <div className={`flex-1 min-h-screen`}>
        <UserDashboardNav showLogo={showLogo} />
      <main style={{ flex: 1 }} className="relative">
  <div className="relative">
    <section
      className="
        absolute top-[110px] 
        left-6       // default: small screens
        sm:left-6    // small screens
        md:left-auto md:right-16  // medium screens
        lg:right-20               // large screens
        max-w-screen-2xl
      "
      style={{ zIndex: 1 }}
    >
      <img
        src={`${timeSunMoonLink}`}
        alt="image of the sun/moon"
        width={120}
      />
    </section>
    {children}
  </div>
</main>

        <UserDashboardFooter />
      </div>
    </div>
    // {/* </AuthGuard> */}
  );
};

export default Layout;
