"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import InAppButton from "../InAppButton";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { SiFramework } from "react-icons/si";
import { GiPriceTag } from "react-icons/gi";
// import { LiaComments } from "react-icons/lia";
import { RiTeamLine } from "react-icons/ri";
import { CustomSpinner } from "../CustomSpinner";

interface LandingPageNavbarProps {
  heroLoginRedirect?:boolean;
  heroWatchDemoRedirect?:boolean;
}

const LandingPageNavbar: React.FC<LandingPageNavbarProps> = ({
  heroLoginRedirect,
  heroWatchDemoRedirect,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginRedirectLoading, setLoginRedirectLoading] = useState(false);
  const [subscribeRedirectLoading, setSubscribeRedirectLoading] =
    useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    {
      name: "Features",
      href: "#features",
      icon: <MdOutlineFeaturedPlayList />,
    },
    { name: "How It Works", href: "#how-it-works", icon: <SiFramework /> },
    { name: "Pricing", href: "#pricing", icon: <GiPriceTag /> },
    // { name: "Testimonials", href: "#testimonials", icon: <LiaComments /> },
    { name: "Team", href: "#team", icon: <RiTeamLine /> },
  ];

  return (
    <nav className="bg-[#122258] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px] h-16 md:h-20 lg:h-[120px] w-full relative z-50">
      {/* Main Navbar Content */}
      <div className="flex items-center justify-between h-full w-full">
        {/* Logo Section */}
        <div className="flex items-center z-50">
          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[48.85px] lg:w-[172px]">
            <Image
              src="/general/zabbot-logo-white.svg"
              alt="Zabbot Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <div
          className="hidden xl:flex text-[#E4DBDB] font-[600] bg-[#207EC5] gap-8 py-4 px-10 rounded-[40px]"
          style={{ fontFamily: "Lexend" }}
        >
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:cursor-pointer hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA Section */}
        <div className="hidden lg:flex justify-between min-w-[246px] items-center ml-4">
          <Link
            href={
              heroWatchDemoRedirect ||
              heroLoginRedirect ||
              loginRedirectLoading ||
              subscribeRedirectLoading
                ? "#"
                : "/login"
            }
            style={{
              textDecoration: "none",
              color: loginRedirectLoading ? "#999" : "#eb512f",
              pointerEvents:
                heroWatchDemoRedirect ||
                heroLoginRedirect ||
                loginRedirectLoading ||
                subscribeRedirectLoading
                  ? "none"
                  : "auto",
            }}
            onClick={() => {
              if (!loginRedirectLoading) setLoginRedirectLoading(true);
            }}
          >
            <div
              className={`flex ${
                loginRedirectLoading || subscribeRedirectLoading
                  ? "text-[#999]"
                  : "text-[#FFFFFF]"
              } font-[400] hover:cursor-pointer hover:text-[#F9C10F] transition-colors items-center justify-center`}
              style={{ fontFamily: "Lexend" }}
            >
              <div>
                {loginRedirectLoading ? (
                  <CustomSpinner
                    title=""
                    spinnerHeight="30px"
                    spinnerWidth="30px"
                    spinnerColor="#F9C10F"
                  />
                ) : (
                  "Login"
                )}
              </div>
            </div>
          </Link>

          <Link
            href={
              heroWatchDemoRedirect ||
              heroLoginRedirect ||
              loginRedirectLoading ||
              subscribeRedirectLoading
                ? "#"
                : "/signup"
            }
            style={{
              textDecoration: "none",
              color: loginRedirectLoading ? "#999" : "#eb512f",
              pointerEvents:
                heroWatchDemoRedirect ||
                heroLoginRedirect ||
                loginRedirectLoading ||
                subscribeRedirectLoading
                  ? "none"
                  : "auto",
            }}
            onClick={() => {
              if (!subscribeRedirectLoading) setSubscribeRedirectLoading(true);
            }}
          >
            <InAppButton
              color="#122258"
              background="#F9C10F"
              borderRadius="9px"
              width="167px"
              disabled={
                heroWatchDemoRedirect ||
                heroLoginRedirect ||
                subscribeRedirectLoading ||
                loginRedirectLoading
              }
            >
              <div>
                {subscribeRedirectLoading ? (
                  <CustomSpinner
                    title=""
                    spinnerHeight="30px"
                    spinnerWidth="30px"
                    spinnerColor="#122258"
                  />
                ) : (
                  "Subscribe"
                )}
              </div>
            </InAppButton>
          </Link>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <section className="lg:hidden flex items-center z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-white hover:text-[#F9C10F] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full min-w-[250px] max-w-[300px] right-4 mt-2 bg-[#122258] rounded-lg shadow-lg border border-[#207EC5] z-50 max-h-[80vh] overflow-y-auto">
              <div className="py-2">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-left text-lg lg:text-xl gap-4 w-full px-4 py-3 text-left text-[#E4DBDB] font-[600] hover:bg-[#207EC5] hover:text-white transition-colors"
                    style={{ fontFamily: "Lexend" }}
                  >
                    <div>{item.icon}</div>
                    <div>{item.name}</div>
                  </a>
                ))}

                {/* Login & Subscribe in Mobile Menu */}
                <div className="flex flex-col gap-4 border-t border-[#207EC5] mt-2 pt-2 px-4 pb-4 mb-2 space-y-3">
                  <Link
                    href={
                      heroWatchDemoRedirect ||
                      heroLoginRedirect ||
                      loginRedirectLoading ||
                      subscribeRedirectLoading
                        ? "#"
                        : "/login"
                    }
                    style={{ textDecoration: "none", marginBottom: "8px" }}
                    onClick={() => setLoginRedirectLoading(true)}
                  >
                    <InAppButton
                      color="#FFFFFF"
                      background="transparent"
                      borderRadius="9px"
                      width="100%"
                      border="2px solid #FFFFFF"
                      // onClick={() => setIsMobileMenuOpen(false)}
                      disabled={
                        heroWatchDemoRedirect ||
                        heroLoginRedirect ||
                        subscribeRedirectLoading ||
                        loginRedirectLoading
                      }
                    >
                      {loginRedirectLoading ? (
                        <CustomSpinner
                          title=""
                          spinnerHeight="30px"
                          spinnerWidth="30px"
                          spinnerColor="#F9C10F"
                        />
                      ) : (
                        "Login"
                      )}
                    </InAppButton>
                  </Link>
                  <Link
                    href={
                      heroWatchDemoRedirect ||
                      heroLoginRedirect ||
                      loginRedirectLoading ||
                      subscribeRedirectLoading
                        ? "#"
                        : "/signup"
                    }
                    style={{ textDecoration: "none" }}
                    onClick={() => setSubscribeRedirectLoading(true)}
                  >
                    <InAppButton
                      color="#122258"
                      background="#F9C10F"
                      borderRadius="9px"
                      width="100%"
                      disabled={
                        heroWatchDemoRedirect ||
                        heroLoginRedirect ||
                        subscribeRedirectLoading ||
                        loginRedirectLoading
                      }
                    >
                      {subscribeRedirectLoading ? (
                        <CustomSpinner
                          title=""
                          spinnerHeight="30px"
                          spinnerWidth="30px"
                          spinnerColor="#122258"
                        />
                      ) : (
                        "Subscribe"
                      )}
                    </InAppButton>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default LandingPageNavbar;
