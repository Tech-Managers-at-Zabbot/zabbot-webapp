"use client";
import React, { useState } from "react";
import { appColors } from "@/constants/colors";

interface DropdownProps {
  options: string[];
  icon?: React.ReactNode;
  placeholder?: string;
  selectedOption?: string;
  mobile?: boolean; // New prop for mobile styling
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  icon,
  placeholder = "Select an option",
  mobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative leading-[145%] font-[600] text-[${appColors.officeBrown100}] ${
        mobile ? "w-full" : "w-auto"
      }`}
      style={{ fontFamily: "Lexend" }}
    >

      <button
        onClick={toggleDropdown}
        className={`${
          mobile ? "w-full px-4 py-3" : "p-3"
        } hover:cursor-pointer text-[#E4DBDB] rounded-lg flex items-center justify-between focus:outline-none transition-colors ${
          mobile ? "bg-[#3a3a3a]" : ""
        }`}
        // style={{ fontFamily: "Inter" }}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 pr-2 py-1">{icon}</span>}
          <span className={mobile ? "text-sm" : ""}>
            {selectedOption || placeholder}
          </span>
        </div>
        <svg
          className={`ml-2 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          } ${mobile ? "w-4 h-4" : ""}`}
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.429199"
            y="0.708984"
            width="20.3333"
            height="20.3333"
            rx="10.1667"
            fill=""
          />
          <path
            d="M15.3613 8.49268L10.5957 13.2583L5.83008 8.49268"
            stroke="white"
            strokeWidth="0.953125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className={`absolute z-10 ${
            mobile ? "w-full" : "w-full min-w-[180px]"
          } mt-1 bg-[#207EC5] border border-[#046fc1] rounded-lg shadow-lg`}
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`p-3 hover:bg-[#3a3a3a] cursor-pointer ${
                  mobile ? "text-sm" : ""
                }`}
              >
                {option}
              </div>
            ))
          ) : (
            <div className={`p-3 text-[${appColors.officeBrown100}] ${mobile ? "text-sm" : ""}`}>
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;