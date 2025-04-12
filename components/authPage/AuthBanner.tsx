import React from 'react';
import Image from 'next/image';
import Link from "next/link";



const AuthBanner = () => {
    return (
        <div className="mx-auto bg-[#333333] px-16 max-w-full h-full flex flex-col">
          <section className="mb-[78px] animate__animated animate__fadeIn animate__delay-1s">
            <Link href="/">
              <div className="flex items-center">
                <div className="relative h-12 w-32 lg:h-[77px] lg:w-[273px]">
                  <Image
                    src={"/general/zabbot-logo-white.svg"}
                    alt="Èdèdún Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>
          </section>
    
          <section className="w-[562px]">
            <h1
              className={
                "text-[50px] leading-[57px] lg:text-[50px] font-semibold mb-4 lg:mb-[50px] animate__animated animate__fadeInUp"
              }
            >
                {/* m */}
              <span className="block ">Zabbot AI Powered </span>
              <span className="block mb-4 lg:mb-[24px]">Language Platform</span>
            </h1>
            <p
              className="text-[20px] font-[400] leading-[28x] lg:text-lg animate__animated animate__fadeInUp animate__delay-1s"
            >
              <br />
              Create an account to contribute to the Zabbot AI Powered Yorùbá Platform (APYP)
            </p>
          </section>
    
          <section className="relative flex mt-6 animate__animated animate__fadeInUp animate__delay-1s">
              <div className="relative flex justify-center h-[400px] w-[600px] max-w-[800px] lg:max-w-[800px]">
                <Image
                  src="/general/auth-banner-image.svg"
                  alt="Authentication Page Image"
                  // fill
                  width={250}
                  height={50}
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
          </section>
        </div>
      );
}


export default AuthBanner;