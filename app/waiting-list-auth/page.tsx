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

      <div className="w-full h-full relative z-10 m-0 p-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* TOP PART - Reordered for mobile */}
          <div className="flex pt-20 md:pt-40 bg-[#A6DFFF] flex-col w-full lg:flex-row justify-between items-center">
            {/* Show mascot first on mobile */}
            <div className="lg:hidden w-full">
              <FoundersMascotComponent />
            </div>

            {/* Form and Logo - positioned differently for mobile */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="w-full relative lg:absolute lg:left-50 lg:top-30 flex flex-col justify-center items-center max-h-[1000px] max-w-[550px] px-4 lg:px-0 mt-10 lg:mt-0"
            >
              <div className="flex mb-6 lg:mb-10 justify-start max-w-7xl w-full">
                <div className="relative w-full max-w-[350px] mx-auto lg:mx-0">
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
              <div className="shadow-2xl rounded-[24px] px-6 lg:px-10 py-10 lg:py-[70px] bg-[white] w-full">
                <WaitingListAuth />
              </div>
            </motion.div>

            {/* Show mascot on desktop (right side) */}
            <div className="hidden lg:block w-full">
              <FoundersMascotComponent />
            </div>
          </div>

          {/* BOTTOM PART */}
          <div className="w-full pt-20 pb-20 lg:pt-60 bg-[#E3F5FF]">
            <FoundersListBottomInformation />
          </div>
        </motion.div>
      </div>
    </div>
  );
}