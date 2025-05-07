
import Image from "next/image";
import { motion } from "framer-motion";

const FoundersMascotComponent = () => {

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

    return(
        <div className="flex flex-col w-full lg:flex-row justify-end items-center">
            {/* Right Side - Image and Flags */}
            <motion.div 
              variants={item}
              className="relative flex flex-col gap-[10px]"
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
                    width={333}
                    height={60}
                  />
                </div>
              </motion.div>

              {/* Mascot */}
              <div
                className="relative"
              >
                <section className="flex flex-col gap-[12px]">
                <div className="font-[700] text-[57.86px] leading-[100%] text-[#162B6E] font-lexend">Practice & Learn <br /> Yorùbá with Ease!</div>
                <div className="text-[#000000] font-[400] text-[29px] leading-[159%]">We want you in our founding circle. </div>
                  </section>
                 <motion.div 
                animate={floatAnimation}
                className="relative mt-6"
              >
                <Image
                  src="/general/image.png"
                  alt="Language Learning Mascot"
                  width={1000}
                  height={1000}
                  className="w-full"
                  priority
                />
              </motion.div>
              </div>
            </motion.div>
            </div>
    )
}


export default FoundersMascotComponent;