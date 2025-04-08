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
    <div className="w-[589.51px] mb-4 rounded-[16px] overflow-hidden shadow-sm">
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-6 text-left text-[#272727] bg-[#F0F2F5] hover:bg-gray-100 border-none cursor-pointer font-[600] text-[18px] leading-[145%] flex justify-between items-center transition-colors duration-200"
      >
        {placeholder}
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-[#F0F2F5] text-[#272727]">{options[0]}</div>
      )}
    </div>
  );
};

export default FAQDropdown;
