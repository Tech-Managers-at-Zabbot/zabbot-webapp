"use client";

import UserDashboardNav from "@/components/dashboard/UserDashboardNav";
import AuthGuard from "@/components/security/AuthGuard";
import React from "react";
import GetInTouch from "@/components/dashboard/GetInTouch";
import { Alerts } from "next-alert";
import { Providers } from "@/components/Providers";
import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";


const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
 

  return (
    <AuthGuard isAdmin={false}>
      <Providers>
        <div className="flex flex-col">
          <div className={`flex-1`}>
            <UserDashboardNav />
            <main style={{ flex: 1 }} className="relative">
              <div className="relative">
                
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
