import React from 'react';
import Image from 'next/image';


const WhyZabbotComponent = () => {

    return(
        <div className='bg-[#FFFFFF] p-0 relative'>
            <main className='text-[#000000] flex justify-around px-6 sm:px-8 md:px-16 lg:px-[112px]'>
            <section className='text-[#000000] flex flex-col gap-[31px] lg:w-[55%] pt-12 md:pt-16 lg:pt-[100px]'>
                <div className='text-4xl sm:text-5xl md:text-[56px] text-[#000000] font-[500] leading-[100%]'>
                Why Zabbot Stands Out <br /> 
                from the rest
                </div>
                <div className='gap-[16px] flex flex-col'>
                    <div className='font-[500] text-[28px] leading-[112%]'>Tailored Learning Experience</div>
                    <div className='font-[400] leading-[145%]'><span className='font-[700] text-[#333333]'>ZABBOT</span> customizes lessons to match your goals and <br />
                    pace, ensuring you stay engaged and make steady <br />
                    progress
                    </div>
                </div>
                <div className='gap-[16px] flex flex-col'>
                <div className='font-[500] text-[28px] leading-[112%]'>Immerse Yourself in Culture</div>
                    <div className='font-[400] leading-[145%]'>Learn the language in the context of its rich culture, <br />
                    traditions, and real-world applications for a deeper  <br />
                    connection
                    </div>
                </div>
                <div className='gap-[16px] flex flex-col'>
                <div className='font-[500] text-[28px] leading-[112%]'>Interactive & Immersive Practice</div>
                    <div className='font-[400] leading-[145%]'>From real-world scenarios to conversational practice, we<br />
                    immerse you in the language for quicker, more effective <br />
                    learning
                    </div>
                </div>
            </section>
            <div className="flex top-0 p-0 items-center lg:w-[45%] ">
                          <div className="">
                            <Image
                              src="/landingPage/why-zabbot-orange.svg"
                              alt="Zabbot Logo"
                            //   fill
                              width={600}
                              height={90}
                            //   style={{ objectFit: "cover" }}
                              className="object-contain"
                              priority
                            />
                          </div>
                        </div>
            </main>

            <section className='flex items-center'>
                 <div className="absolute top-0 left-[950px] mt-26">
                          <div className="relative h-8 w-28 sm:h-10 sm:w-36 lg:h-[517px] lg:w-[433.51px]">
                            <Image
                              src="/landingPage/standout-image.svg"
                              alt="Zabbot Logo"
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                        </div>
            </section>
        </div>
    )
}


export default WhyZabbotComponent;