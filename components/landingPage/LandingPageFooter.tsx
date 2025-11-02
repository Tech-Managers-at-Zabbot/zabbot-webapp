import React from "react";
import Image from "next/image";

const LandingPageFooter = () => {
  return (
    <footer
      className="bg-[#012657] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px] py-12 sm:py-16 lg:py-20 text-white"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Top Section */}
      <section className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 mb-12 sm:mb-16">
        {/* Logo + About */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-sm">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[48px] lg:w-[172px]">
            <Image
              src="/general/zabbot-logo-white.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-[#D1D5DC] text-[14px] sm:text-[15px] leading-[22px] font-[400]">
            Empowering people to reconnect with their heritage through immersive
            language learning.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 className="font-[500] text-[16px] sm:text-[18px] leading-[24px]">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2 text-[#D1D5DC] text-[14px] sm:text-[15px] font-[400]">
            <li className="hover:text-[#A6DFFF] transition-colors cursor-pointer">About</li>
            <li className="hover:text-[#A6DFFF] transition-colors cursor-pointer">Contact</li>
            <li className="hover:text-[#A6DFFF] transition-colors cursor-pointer">Privacy</li>
            <li className="hover:text-[#A6DFFF] transition-colors cursor-pointer">Terms</li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className="flex flex-col gap-4 sm:gap-5 max-w-sm">
          <h3 className="font-[500] text-[16px] sm:text-[18px] leading-[24px]">
            Connect With Us
          </h3>

          {/* Social Icons */}
          <ul className="flex items-center gap-4">
            <li className="p-3 rounded-full bg-[#A6DFFF33] hover:bg-[#A6DFFF55] transition-colors cursor-pointer">
              <Image
                src="/landingPage/icons/white-linkedin-icon.svg"
                alt="LinkedIn"
                width={22}
                height={22}
              />
            </li>
            <li className="p-3 rounded-full bg-[#A6DFFF33] hover:bg-[#A6DFFF55] transition-colors cursor-pointer">
              <Image
                src="/landingPage/icons/white-instagram-icon.svg"
                alt="Instagram"
                width={22}
                height={22}
              />
            </li>
          </ul>

          <p className="text-[#D1D5DC] text-[14px] sm:text-[15px] leading-[22px] font-[400]">
            Stay updated with our newsletter for cultural content and learning
            tips.
          </p>
        </div>
      </section>

      {/* Divider */}
      <section>
        <div className="border-t border-[rgba(166,223,255,0.2)]"></div>
      </section>

      {/* Bottom Section */}
      <section className="mt-6 text-center md:text-left">
        <p className="text-[#99A1AF] text-[13px] sm:text-[14px] leading-[20px] font-[400]">
          © 2025 Zabbot LLC. All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default LandingPageFooter;
