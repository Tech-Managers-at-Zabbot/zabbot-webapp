
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