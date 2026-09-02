"use client";
import React from "react";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";

const MascotComponent = () => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  return (
    <div className="flex flex-col w-full lg:flex-row justify-center items-center">
      {/* Right Side - Image and Flags */}
      <motion.div
        variants={item}
        className="relative flex flex-col gap-[10px] items-center xl:items-start"
      >
        {/* Flags */}
        <motion.div
          animate={{
            x: [0, 5, -5, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
            },
          }}
          className="flex"
        >
          <div className="rounded-lg">
            <Image
              src="/general/flags.svg"
              alt="Language Flags"
              width={500}
              height={80}
            />
          </div>
        </motion.div>

        {/* Mascot */}
        <div className="relative w-full">
          <motion.div animate={floatAnimation} className="relative mt-6">
            <div>
              <ZabbotMascotInformation />
            </div>
            <Image
              src="/landingPage/landing-mascot.svg"
              alt="Language Learning Mascot"
              width={750}
              height={1000}
              className=""
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};


const ZabbotMascotInformation = () => {
  return (
    <div className="flex flex-col justify-center mb-4 w-full"
    style={{fontFamily: "Lexend"}}
    >
      <div className="bg-white rounded-lg md:px-4 py-3 max-w-[360px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[440px]">
        <div className="text-[#364153] text-sm md:text-base">
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .list-blue-tick {
                  list-style: none;
                  padding-left: 0;
                }

                .list-blue-tick li {
                  position: relative;
                  display: flex;
                  align-items: center;
                  gap: 0.75em;
                  // background-color: #f0f6ff; /* ✅ Background color behind tick */
                  border-radius: 8px;
                  padding: 0.6em 1em 0.6em 2.4em;
                  line-height: 1.4;
                }

                .list-blue-tick li::before {
                  content: "";
                  position: absolute;
                  left: 0.8em;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 1.2em;
                  height: 1.2em;
                  background-image: url('/landingPage/blue-tick.svg');
                  background-size: contain;
                  background-repeat: no-repeat;
                }

                @media (max-width: 640px) {
                  .list-blue-tick li {
                    font-size: 0.9rem;
                    padding-left: 2em;
                  }
                }
              `,
            }}
          />
          <ul className="list-blue-tick space-y-2 sm:space-y-2">
            <li>Join other users from all over the world</li>
            <li>Immerse yourself in language & culture</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default MascotComponent;
