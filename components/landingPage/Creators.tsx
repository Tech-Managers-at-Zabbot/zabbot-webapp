import React from "react";
import Image from "next/image";

const Creators = () => {
  const creatorsDataArray = [
    {
      name: "Bola Agbonile",
      imageSrc: "/creators/mrs-bola.svg",
      designation: "Founder & Product Lead",
    },
    {
      name: "Erete Charles",
      imageSrc: "/creators/mr-erete.png",
      designation: "Dev Manager",
    },
    {
      name: "Iniobong Ekpenyong",
      imageSrc: "/creators/mr-iniobong.svg",
      designation: "UI/UX Lead",
    },
    {
      name: "Akemini Ndaobong",
      imageSrc: "/creators/akem-main2.jpeg",
      designation: "Lead Software Engineer",
    },
  ];

  return (
    <div
      className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px] py-12 sm:py-16 lg:py-20 bg-white"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Section Header */}
      <section>
        <div className="flex flex-col gap-4 text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-[#101828] font-semibold leading-tight text-[28px] sm:text-[32px] md:text-[36px]">
            Meet the Minds Behind Zabbot
          </h1>
          <p className="text-[#4A5565] font-normal leading-[28px] text-[16px] sm:text-[18px] md:text-[20px]">
            A passionate team dedicated to preserving heritage languages.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {creatorsDataArray.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         25vw"
                  className="object-cover"
                />
              </div>

              {/* Name + Role */}
              <div className="mt-4">
                <h2 className="text-[#101828] text-[18px] sm:text-[20px] font-semibold leading-[28px]">
                  {item.name}
                </h2>
                <p className="text-[#4A5565] font-normal leading-[24px] text-[15px] sm:text-[16px]">
                  {item.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Creators;
