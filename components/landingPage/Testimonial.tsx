import React from "react";
import Image from "next/image";

const Testimonial = () => {
  return (
    <div className="w-full py-12 md:py-[82px] bg-[#F0F7FF] flex flex-col gap-2 md:gap-[10px] justify-center items-center">
      <section>
        <p className="text-sm md:text-lg text-[#333333] mb-4 md:mb-8 bg-[#FBCCBD] px-3 py-1 md:p-[10px] text-center md:text-left text-[14px] md:text-[16px] font-[400] rounded-full md:rounded-[16px]">
          Testimonials
        </p>
      </section>

      <section className="px-4 text-center">
        <h2 className="text-3xl md:text-[48px] text-black font-[400] leading-tight md:leading-[100%] mb-4">
          Hear From Our <span className="text-[#F15B29]">Happy Learners</span>
        </h2>
      </section>

      <section className="w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 px-4 sm:px-8 md:px-16 lg:px-[112px]">
          <div className="w-full md:w-1/3 px-0 md:px-2">
            <Image
              src="/landingPage/testimonial1.svg"
              alt="Testimonial"
              width={700}
              height={100}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
          <div className="w-full md:w-1/3 px-0 md:px-2">
            <Image
              src="/landingPage/testimonial1.svg"
              alt="Testimonial"
              width={700}
              height={100}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
          <div className="w-full md:w-1/3 px-0 md:px-2">
            <Image
              src="/landingPage/testimonial1.svg"
              alt="Testimonial"
              width={700}
              height={100}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
