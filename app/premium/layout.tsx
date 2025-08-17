"use client";

import UserDashboardNav from "@/components/dashboard/UserDashboardNav";
import AuthGuard from "@/components/security/AuthGuard";
import React from "react";
import GetInTouch from "@/components/dashboard/GetInTouch";
import { Alerts } from "next-alert";
import { Providers } from "@/components/Providers";
import UserDashboardFooter from "@/components/dashboard/UserDashboardFooter";
import Image from 'next/image';
import { useTheme } from "@/contexts/ThemeProvider";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";


const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
 
  const { theme } = useTheme();
  const logoUrl = "/general/zabbot-logo-white.svg";
  
  return (
    <AuthGuard isAdmin={false}>
      <Providers>
        <div className="flex flex-col">
          <div className={`flex-1`}>
            <UserDashboardNav />

          <section className="relative bg-[#002557] flex justify-between items-center p2 text-xs lg:text-xs xl:text-sm leading-[100%] px-[5%] py-[16px]">
            <div className="flex-shrink-0 order-1">
              <div className="relative w-[100px] h-[30px] sm:w-[120px] sm:h-[36px] md:w-[156px] md:h-[46.91px]">
                <Image
                  src={logoUrl}
                  alt="Zabbot Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex gap-2  bg-[#002557] sm:gap-4 md:gap-6 lg:gap-8 flex-shrink-0 items-start order-3">
              
              {/* Menu */}
              <div className="lg:flex mt-1">
                <SettingsBreadcrumb isDark={theme === "dark"} />
              </div>
            </div>
          </section>


            <main style={{ flex: 1 }} className="relative">
              <div className="relative">                
                {children}
              </div>
            </main>
            <div>
              <GetInTouch isDark={true} />
              <UserDashboardFooter isDark={true} />
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
