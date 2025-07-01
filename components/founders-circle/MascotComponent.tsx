import React, { useState } from 'react';
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
import InAppButton from "../InAppButton";
import { appColors } from "@/constants/colors";
import { useRouter } from "next/navigation";
import { CustomSpinner } from "@/components/CustomSpinner";

const FoundersMascotComponent = () => {
    const [isSignupRedirectLoading, setIsSignupRedirectLoading] = useState(false);
    const router = useRouter();

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
                <section className="flex flex-col gap-[12px] xl:text-left lg:text-left text-center" style={{fontFamily: 'Lexend'}}>
                <div className="font-[700] text-[30px] md:text-[57.86px] xl:text-[57.86px] lg:text-[40px] leading-[100%] text-[#162B6E]">Practice & Learn <br /> Yorùbá with Ease!</div>
                <div className="text-[#000000] font-[400] md:text-[29px] lg:text-[22px] xl:text-[29px] text-[20px] leading-[100%]">We want you in our founders circle. </div>
                  </section>
                     <div className="lg:hidden mt-10 mb-10 w-full flex justify-center order-1">
                <div className="w-full max-w-[200px] flex items-center justify-center">
                  <InAppButton
                    disabled={false}
                    disabledColor={appColors.disabledButtonBlue}
                    backgroundColor={appColors.darkRoyalBlueForBtn}
                    width="100%"
                    onClick={() => {
                      setIsSignupRedirectLoading(true);
                      router.push("/signup");
                    }}
                  >
                    {isSignupRedirectLoading ? (
                      <CustomSpinner />
                    ) : (
                      <div>Beta Test</div>
                    )}
                  </InAppButton>
                </div>
              </div>
                 <motion.div 
                animate={floatAnimation}
                className="relative mt-6"
              >
                <Image
                  src="/general/image.svg"
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


export default FoundersMascotComponent;