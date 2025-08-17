import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
// import { useMatchMediaQuery } from "@/hooks/useMatchMediaQuery";
// import device from "@/constants/breakpoints";
// import { useMatchMediaQuery } from "@/hooks/viewPorts";

const FoundersListBottomInformation = () => {
  // const isTablet = useMatchMediaQuery(device.tablet);
  // const isLaptop = useMatchMediaQuery(device.laptop);

  return (
    <motion.div className="w-full">
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
        {/* Cards Section */}
        <section className="flex relative flex-col lg:flex-row px-4 sm:px-6 md:px-10 lg:px-20 xl:px-22 w-full justify-between items-center lg:items-start gap-6 md:gap-8 lg:gap-6">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex justify-center w-full lg:w-1/3"
          >
            <div className="relative w-full max-w-[550px]">
              <Image
                src={"/founders-list/what-is-zabbot.svg"}
                alt="What is Zabbot"
                width={410}
                height={200}
                priority
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex justify-center w-full lg:w-1/3"
          >
            <div className="relative w-full max-w-[550px]">
              <Image
                src={"/founders-list/para-and-oye.svg"}
                alt="Para and Oye"
                width={410}
                height={200}
                priority
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex justify-center w-full lg:w-1/3"
          >
            <div className="relative w-full max-w-[550px]">
              <Image
                src={"/founders-list/say-it-loud.svg"}
                alt="Say it Loud"
                width={410}
                height={200}
                priority
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </section>
        
        {/* Footer */}
        <footer 
          style={{fontFamily: 'Lexend'}} 
          className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-22 flex justify-center items-center mt-10"
        >
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-[#162B6E] h-auto py-4 sm:py-5 md:h-[80px] lg:h-[111px] rounded-3xl flex justify-center w-full items-center px-3 sm:px-4"
          >
            <div className="font-[600] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[32px] gap-2 items-center leading-[24px] sm:leading-[30px] lg:leading-[49px] flex flex-wrap justify-center text-white">
              <span>Click here</span>
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
              <span>to follow and cheer us on!</span>
            </div>
          </motion.div>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default FoundersListBottomInformation;