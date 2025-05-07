// "use client"
// import Head from "next/head";
import Image from "next/image";
// import WaitingListAuth from "@/components/authPage/WaitingListAuth";
import { motion } from "framer-motion";
import Link from "next/link";
// import { useEffect, useState } from "react";

const FoundersListBottomInformation = () => {
    return (
      <motion.div className="min-h-screen w-full">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="flex w-full flex-col justify-center items-center"
        >
          <section className="flex flex-col lg:flex-row px-4 lg:px-52 w-full justify-between items-center lg:items-start">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex mt-10 mb-6 lg:mb-10 justify-start max-w-7xl w-full lg:w-auto"
            >
              <div className="relative w-full max-w-[410px] mx-auto">
                <Image
                  src={"/founders-list/what-is-zabbot.svg"}
                  alt="Language Learning Logo"
                  width={410}
                  height={200}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex mt-6 lg:mt-10 mb-6 lg:mb-10 justify-start max-w-7xl w-full lg:w-auto"
            >
              <div className="relative w-full max-w-[410px] mx-auto">
                <Image
                  src={"/founders-list/para-and-oye.svg"}
                  alt="Language Learning Logo"
                  width={410}
                  height={200}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex mt-6 lg:mt-10 mb-10 justify-start max-w-7xl w-full lg:w-auto"
            >
              <div className="relative w-full max-w-[410px] mx-auto">
                <Image
                  src={"/founders-list/say-it-loud.svg"}
                  alt="Language Learning Logo"
                  width={410}
                  height={200}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </section>
          <footer className="w-full px-4 lg:px-52 flex justify-center items-center mt-10 lg:mt-0">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-[#162B6E] h-[80px] lg:h-[111px] rounded-3xl justify-center w-full font-[500] text-[20px] lg:text-[32px] gap-2 items-center leading-[30px] lg:leading-[49px] flex px-4"
            >
              <span>Click here</span>
              {""}
              <Link href="https://www.linkedin.com/company/zabbot/" target="blank">
                <div className="relative hover:cursor-pointer">
                  <Image
                    src={"/founders-list/linkedin-logo.svg"}
                    alt="LinkedIn Logo"
                    width={32}
                    height={32}
                    priority
                    className="w-6 h-6 lg:w-[42px] lg:h-[42px]"
                  />
                </div>{" "}
              </Link>
              <span>to follow and cheer us on!</span>
            </motion.div>
          </footer>
        </motion.div>
      </motion.div>
    );
  };

export default FoundersListBottomInformation;
