/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { appColors } from "@/constants/colors";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";
import Image from "next/image";

interface optionsData {
    name: string;
    icon?: string;
    path?: string;
}

interface MainDropdownProps {
  options: optionsData[];
  icon?: React.ReactNode;
  placeholder?: string;
  selectedOption?: string;
  mobile?: boolean;
  color?: string;
}

const MainDropdown: React.FC<MainDropdownProps> = ({
  options,
  icon,
  placeholder = "Select an option",
  mobile = false,
  color="white"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [
    selectedOption, 
    setSelectedOption
  ] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative leading-[145%] font-[700] text-[${color}] hover:text-[#FFE933] ${
        mobile ? "w-full" : "w-auto"
      }`}
      style={{ fontFamily: "Lexend" }}
    >

      <button
        onClick={toggleDropdown}
        className={`${
          mobile ? "w-full px-4 py-3" : ""
        } hover:cursor-pointer rounded-lg flex items-center justify-between focus:outline-none transition-colors ${
          mobile ? "bg-[#3a3a3a]" : ""
        }`}
        // style={{ fontFamily: "Inter" }}
      >
        <div className="flex items-center">
          {icon && <span className="">{icon}</span>}
          <span className={mobile ? "text-sm" : ""}>
            {placeholder}
          </span>
        </div>
        {isOpen ? <FaAngleUp className="ml-2" /> : <FaAngleDown className="ml-2" />}
      </button>
      {isOpen && (
        <div
          className={`absolute z-50 ${
            mobile ? "w-full" : "w-full min-w-[220px]"
          } mt-1 bg-[#012657] text-white rounded-b-lg`}
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option.name)}
                className={`p-3 flex items-center gap-4 font-medium leading-[145%] text-[#F6F7F9] hover:text-[#012657] hover:bg-[#FFE933] cursor-pointer ${
                  mobile ? "text-sm" : "text-[12px]"
                }`}
              >
                {option.icon && <span className="">{
                            <Image
                                src={option.icon}
                                height={45}
                                width={45}
                                alt="Icon image"
                              />
                }</span>}
                {option.name}
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

export default MainDropdown;