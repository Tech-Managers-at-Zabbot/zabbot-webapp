"use client";
import React from 'react';
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
// import InAppButton from "../InAppButton";
// import { appColors } from "@/constants/colors";
// import { useRouter } from "next/navigation";
// import { CustomSpinner } from "@/components/CustomSpinner";

const MascotComponent = () => {
    // const [isSignupRedirectLoading, setIsSignupRedirectLoading] = useState(false);
    // const router = useRouter();

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      };
    
      const floatAnimation = {
        y: [0, -15, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: easeInOut
        }
      };

    return(
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
                    repeat: Infinity
                  }
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
              <div
                className="relative w-full"
              >
                 <motion.div 
                animate={floatAnimation}
                className="relative mt-6"
              >
                <Image
                  src="/landingPage/landing-mascot-group.svg"
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
    )
}


export default MascotComponent;