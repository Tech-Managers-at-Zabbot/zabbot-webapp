"use client";

import React, { useState } from "react";

interface FAQProps {
  placeholder: string;
  options: string[];
}

const FAQDropdown: React.FC<FAQProps> = ({ placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-full lg:max-w-[500px] xl:max-w-[589.51px] mb-4 rounded-[16px] overflow-hidden shadow-sm">
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-4 lg:py-5 xl:py-6 text-left text-[#272727] bg-[#F0F2F5] hover:bg-gray-100 border-none cursor-pointer font-[600] text-base lg:text-[17px] xl:text-[18px] leading-[145%] flex justify-between items-center transition-colors duration-200"
      >
        <span className="text-left">{placeholder}</span>
        <span
          className={`ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-[#F0F2F5] text-[#272727] text-sm lg:text-base">
          {options[0]}
        </div>
      )}
    </div>
  );
};

export default FAQDropdown;
