import React from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeProvider";

const UserDashboardFooter = ({isDark}: {isDark?: boolean}) => {
  const { theme } = useTheme();

  return (
    <footer
      className={`bg-[url('/userDashboard/footer.svg')] m-0 ${
        theme === "dark" || isDark ? "bg-[#012657]" : "bg-[#dff9fb]"
      } bg-cover bg-stretch min-h-[152px]`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex-shrink-0 flex flex-col justify-center items-center rounded-full">
        
        {/* <p className="flex text-center text-sm sm:text-base md:text-lg lg:text-xl text-white">
          © 2025 Zabbot. All rights reserved.
        </p> */}
        <div className="relative w-[174px] p-0 h-[150px]">
          <Image
            src="/userDashboard/footer-grandma-owl.png"
            alt="Badge"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default UserDashboardFooter;
