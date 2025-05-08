'use client';
import React, { useState } from "react";
import Link from "next/link";
import InAppButton from "./InAppButton";
import { CustomSpinner } from "./CustomSpinner";
import Image from "next/image";

const SuccessComponent = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen bg-[#E3F5FF] p-4" style={{fontFamily: 'Lexend'}}>
       <div className="relative flex mb-4 justify-center items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px]">
                      <Image
                        src={"/general/zabbot-logo-blue.svg"}
                        alt="Language Learning Logo"
                        width={350}
                        height={118}
                        priority
                        className="w-full h-auto"
                      />
                    </div>
      <div className="bg-[white] flex flex-col gap-[22px] min-h-[318.51px] rounded-lg shadow-md p-8 max-w-[586px] w-full text-center">
        {/* Success Icon */}
        {/* Title */}
        <p className="text-lg text-[#09111D] font-[500] text-[26.48px] leading-[35.3px] mb-4">Hooray! 🎉</p>
        
        <div className="mb-10 text-[#8B9298] font-[400] text-[20px] leading-[30px]">You have joined our founders circle! <br />
        Please share with others.  Check your inbox for more information.
        </div>

        {/* Home Button */}
        <Link href="/" passHref>
        <InAppButton borderRadius="8.15px" backgroundColor="#162B6E" disabled={loading} color="#FFFFFF" width="100%" onClick={() => setLoading(true)}>
          {loading ? <CustomSpinner /> : "Thank You"}
          </InAppButton>

        </Link>
      </div>
      <div className="text-[#8B9298] font-[400] text-[20px] leading-[49px]">
      Click here to follow and cheer us on! <span className="text-[#0D5EBA]"><Link href="https://www.linkedin.com/company/zabbot/" target="blank" className="">LinkedIn</Link></span> 
      </div>
    </div>
  );
};

export default SuccessComponent;