"use client";
import React from "react";
import Image from "next/image";
// import Dropdown from "../landingPage/landingDropDown";
// import device from "@/constants/breakpoints";
// import { useMatchMediaQuery } from "@/hooks/viewPorts";
// import Link from "next/link";
import { appColors } from "@/constants/colors";
// import ColouredButton from "../ColouredButton";

const Navbar = () => {
  //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //   const isTabletOrBelow = useMatchMediaQuery(device.tablet);
  // const isLaptopOrBelow = useMatchMediaQuery(device.laptopWide);

  // Show mobile menu on tablet and below, or when explicitly toggled
  //   const showMobileMenu = isTabletOrBelow || mobileMenuOpen;

  return (
    <nav className="px-[112px] h-16 md:h-20 lg:h-[120px] w-full"
    style={{backgroundColor: appColors.darkRoyalBlueForBtn}}
    >
      {/* Main Navbar Content */}
      <div className="flex items-center justify-center h-full w-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[48.85px] lg:w-[200px]">
            <Image
              src="/general/zabbot-logo-white.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* <div
          className={`flex text-[${appColors.officeBrown100}] font-[600] bg-[#207EC5] gap-8 py-4 px-10 rounded-[40px]`}
          style={{fontFamily: "Lexend"}}
        >
          <div className="hover:cursor-pointer">
            <Dropdown options={[]} placeholder="Use Cases" />
          </div>
          <div className="flex items-center justify-center">
            <div>Help</div>
          </div>
          <div className="flex items-center justify-center">
            <div>Pricing</div>
          </div>
          <div className="flex items-center justify-center">
            <div>About Us</div>
          </div>
        </div> */}

        {/* <div className="flex justify-center items-center ml-4">
            <Link
            href="/waiting-list-auth"
            style={{ textDecoration: "none", color: "#eb512f" }}
          >
              <button className="py-4 px-6 rounded-lg font-[600] hover:cursor-pointer bg-[#E0E1E6] w-full h-[55px] flex justify-center items-center text-black hover:bg-transparent hover:border hover:text-[#E0E1E6] hover:border-[#E0E1E6] transition-colors duration-200">
                Stay Updated...
              </button>
              </Link>
            </div> */}

        {/* <div className="flex justify-center items-center ml-4">
          <Link
            href="/signup"
            style={{ textDecoration: "none", color: "#eb512f" }}
          >
            <ColouredButton
              boxShadow="0"
              color="#000000"
              backgroundColor="#F9C10F"
              borderRadius="48px"
              padding="16px 24px"
              height=""
              width="167px"
            >
              Get Started
            </ColouredButton>
          </Link>
        </div> */}

        {/* Mobile Menu Button (shown on laptop and below) */}
        {/* {isLaptopOrBelow && (
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        )} */}
      </div>

      {/* Mobile Menu (shown on laptop and below when toggled) */}
      {/* {isLaptopOrBelow && showMobileMenu && (
        <div className="bg-[#292424] py-4 px-6 rounded-lg mt-2">
          <div className="flex flex-col space-y-4 text-[#E4DBDB] font-[600]">
            <div>
              <Dropdown options={[]} placeholder="Use Cases" mobile />
            </div>
            <div>
              <Dropdown options={[]} placeholder="Resources" mobile />
            </div>
            <div className="py-2 px-4">Pricing</div>
            <div className="py-2 px-4">About Us</div>
            <button className="py-3 px-4 rounded-lg hover:cursor-pointer bg-[#E0E1E6] text-black hover:bg-opacity-90 transition-colors duration-200">
              Get Started
            </button>
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
