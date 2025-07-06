"use client";
import UserDashboardNav from "@/components/dashboard/UserDashboardNav";
// import AuthGuard from "@/components/security/AuthGuard";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    // <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <div
          className={`flex-1`}
        >
          <UserDashboardNav />
          <main className="" style={{ flex: 1 }}>{children}</main>
        </div>
      </div>
    // {/* </AuthGuard> */}
  );
};

export default Layout;
