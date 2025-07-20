import React from "react";
import Image from "next/image";
import { RxInstagramLogo } from "react-icons/rx";
import { BsLinkedin } from "react-icons/bs";
import { FaSlack } from "react-icons/fa";

const UserDashboardFooter = () => {
  return (
    <footer
      className="bg-[url('/userDashboard/footer.svg')] bg-cover bg-stretch min-h-[152px]"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex-shrink-0 pb-12 flex flex-col justify-center items-center rounded-full">
        <div className="relative w-[174px] h-[187px]">
          <Image
            src="/userDashboard/footer-grandma-owl.png"
            alt="Badge"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <a
              href="https://www.linkedin.com/company/zabbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
            >
              <BsLinkedin color="#E3F5FF" size={42} />
            </a>
            <a
              href="https://www.instagram.com/zabbotapp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
            >
              <RxInstagramLogo size={42} color="#FFFFFF" />
            </a>
            <div className="font-medium text-[32px] leading-[49px] whitespace-nowrap flex-shrink-0">
              Get in touch
            </div>

            <a
              href="https://zabbot.slack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
            >
              <FaSlack size={42} color="#FFFFFF" />
            </a>
          </div>
          <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-white mt-4">
            © 2025 Zabbot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UserDashboardFooter;
