"use client";
// import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
// import UserDashboardNav from "@/components/dashboard/UserDashboardNav";
import AuthGuard from "@/components/security/AuthGuard";
import React, {
  // useEffect, 
  // useState 
} from "react";
// import GetInTouch from "@/components/dashboard/GetInTouch";
import { Alerts } from "next-alert";
import { Providers } from "@/components/Providers";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <AuthGuard isAdmin={false}>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <div className={`flex-1 min-h-screen`}>
            {/* <UserDashboardNav /> */}
            <main style={{ flex: 1 }} className="relative">
              <div className="relative">
                {/* <section
                  className="
        absolute top-[80px] 
        md:top-[100px]
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
                </section> */}
                {children}
              </div>
            </main>

            {/* <GetInTouch />
            <UserDashboardFooter /> */}
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
