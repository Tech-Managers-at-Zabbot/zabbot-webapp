/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useUnsubscribeFromSendgridFoundersList } from "@/services/waitingList/query";

// Create a separate component that uses useSearchParams
function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token: any = searchParams.get('token');

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useUnsubscribeFromSendgridFoundersList(token);

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
    <>
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
              Home
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
    </>
  );
}

// Loading fallback component
function UnsubscribeLoading() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600">Loading...</p>
      <div className="w-8 h-8 border-4 border-[#83BECC] border-t-[#162B6E] rounded-full animate-spin"></div>
    </div>
  );
}

export default function UnsubscribePage() {
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

      <div className="w-full min-h-screen bg-[#A6DFFF]">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-center w-full"
        >
          {/* Logo - centered at top */}
          <motion.div 
            variants={item}
            className="w-full flex justify-center mt-10 mb-8"
          >
            <div className="relative w-[200px] md:w-[250px] h-[80px] md:h-[100px]">
              <Image
                src="/general/zabbot-logo-blue.svg"
                alt="Zabbot Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Content card - centered */}
          <motion.div
            variants={item}
            className="w-full px-4 flex justify-center"
          >
            <div className="shadow-2xl max-w-[550px] rounded-[24px] px-6 md:px-10 py-10 bg-white w-full">
              <div className="flex flex-col items-center text-center gap-6">
                <h1 className="text-[#162B6E] font-bold text-3xl md:text-4xl">
                  We're Sad to See You Go <br /> <br /> We'll Miss You! <br />  😢 <br/> We Hope to See You Again Soon!
                </h1>
                
                <Suspense fallback={<UnsubscribeLoading />}>
                  <UnsubscribeContent />
                </Suspense>
              </div>
            </div>
          </motion.div>
          
          {/* Footer */}
          <footer 
            style={{fontFamily: 'Lexend'}} 
            className="w-full px-4 sm:px-6 md:px-10 mt-12 mb-10"
          >
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-[#162B6E] py-4 sm:py-5 rounded-3xl flex justify-center w-full items-center px-3 sm:px-4"
            >
              <div className="font-[600] text-[16px] sm:text-[18px] md:text-[20px] gap-2 items-center leading-[24px] sm:leading-[30px] flex flex-wrap justify-center text-white">
                <span>Stay connected with us on</span>
                <Link href="https://www.linkedin.com/company/zabbot/" target="blank" className="mx-1 flex items-center">
                  <div className="relative hover:cursor-pointer">
                    <Image
                      src={"/founders-list/linkedin-logo.svg"}
                      alt="LinkedIn Logo"
                      width={42}
                      height={42}
                      priority
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                </Link>
              </div>
            </motion.div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}