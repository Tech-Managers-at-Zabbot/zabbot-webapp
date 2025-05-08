/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Head from "next/head";
import Image from "next/image";
import WaitingListAuth from "@/components/authPage/WaitingListAuth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FoundersListBottomInformation from "@/components/waiting-list/BottomInfo";
import FoundersMascotComponent from "@/components/waiting-list/MascotComponent";
// import useWindowDimensions, { useMatchMediaQuery } from "@/hooks/viewPorts";
// import device from "@/constants/breakpoints";

export default function WaitingListPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="p-0 m-0 overflow-x-hidden">
      <Head>
        <title>Practice Learning a Language with Ease</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="w-full h-full relative z-10 m-0 p-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* TOP PART */}
          <div className="flex flex-col lg:flex-row w-full bg-[#A6DFFF] px-4 md:px-6 lg:px-10 pt-10 md:pt-16 lg:pt-20">
            {/* Logo - always on top */}
            <div className="lg:w-[50%] xl:w-[40%] md:pl-10 flex xl:justify-center mb-6 lg:mb-10 lg:absolute lg:left-20 lg:top-20">
              <div className="relative flex justify-start w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px]">
                <Image
                  src={"/general/zabbot-logo-blue.svg"}
                  alt="Language Learning Logo"
                  width={350}
                  height={118}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Content area - form and mascot */}
            <div className="flex flex-col lg:flex-row w-full items-center justify-between">
              {/* Form container */}
              <section
                className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1 mt-8 lg:mt-0"
              >
                <div className="shadow-2xl xl:max-w-[600px] max-w-[550px] rounded-[24px] px-6 lg:px-10 py-10 lg:py-[40px] bg-white w-full lg:mt-30 lg:ml-10 xl:absolute 2xl:left-25 2xl:top-20 xl:top-20 relative z-20">
                  <WaitingListAuth />
                </div>
              </section>

              {/* Mascot component */}
              <div className="w-full lg:w-[50%] xl:mt-10 flex justify-center order-1 lg:order-2 pb-8 lg:pb-0">
                <FoundersMascotComponent />
              </div>
            </div>
          </div>

          {/* BOTTOM PART */}
          <div className="w-full pt-16 md:pt-20 lg:pt-30 xl:pt-60 pb-12 md:pb-16 lg:pb-20 bg-[#E3F5FF] relative z-10">
            <FoundersListBottomInformation />
          </div>
        </motion.div>
      </div>
    </div>
  );
}