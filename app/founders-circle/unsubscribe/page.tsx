/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useUnsubscribeFromSendgridFoundersList } from "@/services/waitingList/query";

export default function UnsubscribePage() {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const token: any = searchParams.get('token');

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useUnsubscribeFromSendgridFoundersList(token);

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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Determine status based on react-query state
  const getUnsubscribeStatus = () => {
    if (isLoading) return "processing";
    if (isError) return "error";
    if (data) return "success";
    return "processing";
  };

  const getErrorMessage = () => {
    if (isError) {
      return (error as any)?.message || "An unexpected error occurred. Please try again later.";
    }
    return "";
  };

  return (
    <div className="p-0 m-0 overflow-x-hidden">
      <Head>
        <title>Unsubscribe - Zabbot</title>
        <meta
          name="description"
          content="Unsubscribe from Zabbot emails"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="w-full h-full relative z-10 m-0 p-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-center bg-[#A6DFFF] min-h-screen"
        >
          {/* TOP PART */}
          <div className="flex flex-col lg:flex-row w-full bg-[#A6DFFF] px-4 md:px-6 lg:px-10 pt-10 md:pt-16 lg:pt-20">
            {/* Logo - always on top */}
            <div className="lg:w-[50%] xl:w-[40%] flex xl:justify-start lg:justify-start justify-center lg:absolute lg:left-20 lg:top-20">
              <div className="relative xl:w-[340px] lg:w-[250px] md:w-[220px] w-[200px] h-[118px]">
                <Image
                  src="/general/zabbot-logo-blue.svg"
                  alt="Zabbot Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content area */}
            <div className="flex flex-col lg:flex-row w-full items-center justify-between">
              {/* Unsubscribe container */}
              <section className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
                <motion.div
                  variants={item}
                  className="shadow-2xl xl:max-w-[500px] 2xl:max-w-[550px] max-w-[550px] rounded-[24px] px-6 lg:px-10 py-10 lg:py-[40px] 2xl:py-[50px] bg-white w-full lg:mt-30 lg:ml-10 xl:absolute 2xl:left-10 2xl:top-20 xl:top-20 relative z-20"
                >
                  <div className="flex flex-col items-center text-center gap-6">
                    <h1 className="text-[#162B6E] font-bold text-3xl md:text-4xl">
                      We're Sad to See You Go
                    </h1>
                    
                    {getUnsubscribeStatus() === "processing" && (
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-600">Processing your request...</p>
                        <div className="w-8 h-8 border-4 border-[#83BECC] border-t-[#162B6E] rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {getUnsubscribeStatus() === "success" && (
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-[#162B6E] text-5xl">✓</div>
                        <p className="text-lg text-gray-700">
                          You have been successfully unsubscribed from our mailing list.
                        </p>
                        <p className="text-gray-600 mb-4">
                          We hope to see you again soon!
                        </p>
                        <Link href="/" passHref>
                          <button className="bg-[#162B6E] hover:bg-[#0f1f4d] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                            Resubscribe
                          </button>
                        </Link>
                      </div>
                    )}
                    
                    {getUnsubscribeStatus() === "error" && (
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-red-500 text-5xl">✗</div>
                        <p className="text-red-500">
                          {getErrorMessage()}
                        </p>
                        <Link href="/" passHref>
                          <button className="bg-[#162B6E] hover:bg-[#0f1f4d] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                            Return Home
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              </section>

              {/* Mascot component */}
              <div className="w-full lg:w-[50%] xl:mt-2 flex items-center justify-center order-1 lg:order-2 pb-8 lg:pb-0">
                <motion.div 
                  variants={item}
                  className="relative flex flex-col gap-[10px] items-center xl:items-start"
                >
                  {/* Text */}
                  <section className="flex flex-col gap-[12px] xl:text-left lg:text-left text-center" style={{fontFamily: 'Lexend'}}>
                    <div className="font-[700] text-[30px] md:text-[45px] xl:text-[50px] lg:text-[40px] leading-[110%] text-[#162B6E]">
                      We'll Miss You!
                    </div>
                    <div className="text-[#000000] font-[400] md:text-[25px] lg:text-[22px] xl:text-[25px] text-[20px] leading-[120%]">
                      You can rejoin our community anytime.
                    </div>
                  </section>
                  
                  {/* Mascot image - sad version */}
                  <motion.div 
                    animate={floatAnimation}
                    className="relative mt-6"
                  >
                    <Image
                      src="/general/image.svg"
                      alt="Sad Mascot"
                      width={750}
                      height={1000}
                      className=""
                      priority
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BOTTOM PART */}
          <div className="w-full bg-[#A6DFFF] pb-10 relative z-10">
            <footer 
              style={{fontFamily: 'Lexend'}} 
              className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-22 flex justify-center items-center mt-10"
            >
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-[#162B6E] h-auto py-4 sm:py-5 md:h-[80px] lg:h-[111px] rounded-3xl flex justify-center w-full items-center px-3 sm:px-4"
              >
                <div className="font-[600] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[32px] gap-2 items-center leading-[24px] sm:leading-[30px] lg:leading-[49px] flex flex-wrap justify-center text-white">
                  <span>Stay connected with us on</span>
                  <Link href="https://www.linkedin.com/company/zabbot/" target="blank" className="mx-1 flex items-center">
                    <div className="relative hover:cursor-pointer">
                      <Image
                        src={"/founders-list/linkedin-logo.svg"}
                        alt="LinkedIn Logo"
                        width={42}
                        height={42}
                        priority
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[42px] lg:h-[42px]"
                      />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}