import React from "react";
import Image from "next/image";
import Dropdown from "./landingDropDown";

const LandingPageNavbar = () => {
    return (
        <div className="bg-black hidden lg:flex items-center justify-center h-[126px] w-full">
            <main className="flex w-full justify-around items-center animate__animated animate__fadeIn animate__delay-1s">
                <section className="">
                    <div className="flex justify-center items-center text-center">
                        <div className="relative h-[48.85px] w-[172px]">
                            <Image
                                src="/general/zabbot-logo-white.png"
                                alt="Èdèdún Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </section>
                <section className="flex text-[#E4DBDB] font-[600] bg-[#292424] gap-[32px] py-[16px] px-[40px] rounded-[40px]"
                    style={{ fontFamily: 'Inter' }}
                >
                    <div className="">
                        <Dropdown options={[]} placeholder="Use Cases" />
                    </div>
                    <div className="">
                        <Dropdown options={[]} placeholder="Resources" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div>Pricing</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div>About Us</div>
                    </div>
                </section>
                <section className="flex justify-center items-center">
                    <div className="py-[16px] px-[24px] rounded-lg bg-[#E0E1E6] w-[167px] h-[55px] flex justify-center items-center text-[#000000] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:text-[#E0E1E6] hover:border-[#E0E1E6]">
                        <button className="w-full hover:cursor-pointer">Get Started</button>
                    </div>
                </section>
            </main>
        </div>
    );
}


export default LandingPageNavbar;