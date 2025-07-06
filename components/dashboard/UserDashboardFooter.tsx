import React from "react";
import Image from "next/image";

const UserDashboardFooter = () => {
  return (
    <footer className="bg-[url('/userDashboard/footer.svg')] bg-cover bg-center min-h-[152px]">
      <div className="flex-shrink-0 flex justify-center items-center rounded-full">
        <div className="relative w-[174px] h-[187px]">
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
