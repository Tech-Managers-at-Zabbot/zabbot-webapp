import React from 'react';
import Image from 'next/image';


const WhyZabbotComponent = () => {

    return(
        <div className=' p-0 relative'>
            <main className='text-[#000000] w-full flex justify-between px-4 sm:px-8 md:px-16 lg:px-[100px]'>
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
                          <div className="">
                            <Image
                              src="/landingPage/global.svg"
                              alt="Zabbot Logo"
                              width={700}
                              height={100}
                              style={{ objectFit: "cover" }}
                              className="object-contain"
                              priority
                            />
                          </div>
            </main>
        </div>
    )
}


export default WhyZabbotComponent;