import React from 'react';
import Image from 'next/image';


const Testimonial = () => {

    return (
        <div className="w-full py-[82px] bg-[#F0F7FF] flex flex-col gap-[10px] justify-center items-center">
            <section>
            <p className="text-lg text-[#333333]  mb-8 bg-[#FBCCBD] p-[10px] text-[16px] font-[400] rounded-[16px]">Testimonials</p>
            </section>

            <section>
            <h2 className="text-[48px] text-black font-[400] leading-[100%] mb-4">Hear From Our <span className='text-[#F15B29]'>Happy Learners</span></h2>
            </section>

            <section>
            <div className="flex px-6 sm:px-8 md:px-16 lg:px-[112px]">
                       <div className="">
                         <Image
                           src="/landingPage/testimonial1.svg"
                           alt="Zabbot Logo"
                           width={700}
                           height={100}
                           style={{ objectFit: "cover" }}
                           className="object-contain"
                           priority
                         />
                       </div>
                       <div className="">
                         <Image
                           src="/landingPage/testimonial1.svg"
                           alt="Zabbot Logo"
                           width={700}
                           height={100}
                           style={{ objectFit: "cover" }}
                           className="object-contain"
                           priority
                         />
                       </div>
                       <div className="">
                         <Image
                           src="/landingPage/testimonial1.svg"
                           alt="Zabbot Logo"
                           width={700}
                           height={100}
                           style={{ objectFit: "cover" }}
                           className="object-contain"
                           priority
                         />
                       </div>
            </div>
            </section>
        </div>
    )
}

export default Testimonial