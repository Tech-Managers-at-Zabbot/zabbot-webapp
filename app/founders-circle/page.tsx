"use client";
import Head from "next/head";
import Image from "next/image";
import WaitingListAuth from "@/components/authPage/WaitingListAuth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FoundersListBottomInformation from "@/components/waiting-list/BottomInfo";
import FoundersMascotComponent from "@/components/waiting-list/MascotComponent";

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

      {/* Full width blue top section */}
      <div className="w-full bg-[#A6DFFF]">
        {/* Content container with original padding and max-width */}
        <div className="w-full h-full relative m-0 p-0 max-w-screen-2xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isMounted ? "show" : "hidden"}
            className="flex flex-col items-center"
          >
            {/* TOP PART CONTENT - EXACTLY AS ORIGINAL */}
            <div className="flex flex-col lg:flex-row w-full px-4 md:px-6 lg:px-10 pt-10 md:pt-16 lg:pt-20">
              {/* Logo */}
              <div className="lg:w-[50%] xl:w-[40%] flex xl:justify-start lg:justify-start justify-center lg:absolute lg:left-20 lg:top-20">
                <div className="relative xl:w-[340px] lg:w-[250px] md:w-[220px] w-[200px] h-[118px]">
                  <Image
                    src="/general/zabbot-logo-blue.svg"
                    alt="Language Learning Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content area - UNCHANGED */}
              <div className="flex flex-col lg:flex-row w-full items-center justify-between">
                {/* Form container - Only added z-50 here */}
                <section className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
                  <div className="shadow-2xl xl:max-w-[500px] 2xl:max-w-[550px] max-w-[550px] rounded-[24px] px-6 lg:px-10 py-10 lg:py-[10px] 2xl:py-[10px] bg-white w-full lg:mt-30 lg:ml-10 xl:absolute 2xl:left-10 2xl:top-20 xl:top-20 relative z-50">
                    <WaitingListAuth />
                  </div>
                </section>

                {/* Mascot component - UNCHANGED */}
                <div className="w-full lg:w-[50%] xl:mt-2 flex items-center justify-center order-1 lg:order-2 pb-8 lg:pb-0">
                  <FoundersMascotComponent />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full width light blue bottom section */}
      <div className="w-full bg-[#E3F5FF]">
        {/* Content container with original padding and max-width */}
        <div className="w-full h-full relative m-0 p-0 max-w-screen-2xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isMounted ? "show" : "hidden"}
            className="flex flex-col items-center"
          >
            {/* BOTTOM PART CONTENT - EXACTLY AS ORIGINAL */}
            <div className="w-full pt-16 md:pt-20 lg:pt-30 xl:pt-60 pb-12 md:pb-16 lg:pb-20">
              <FoundersListBottomInformation />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}