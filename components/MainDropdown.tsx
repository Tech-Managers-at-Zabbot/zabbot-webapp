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
  padding?: string;
  backgroundColor?: string;
  textHoverColor?: string;
  fontWeight?: string;
  dropDownBackgroundColor?: string;
  isSetDropdown?: boolean;
  dropdownMaxWidth?: string;
  dropdownMinWidth?: string;
}

const MainDropdown: React.FC<MainDropdownProps> = ({
  options,
  icon,
  placeholder = "Select an option",
  mobile = false,
  color = "white",
  padding = "",
  backgroundColor = "",
  textHoverColor = "#FFE933",
  fontWeight = "700",
  dropDownBackgroundColor = "#012657",
  isSetDropdown = false,
  dropdownMaxWidth="",
  dropdownMinWidth = "220px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    if (isSetDropdown) {
      setSelectedOption(option);
    }
    setIsOpen(false);
  };

  const displayText = isSetDropdown && selectedOption ? selectedOption : placeholder;

  return (
    <div
      className={`relative leading-[145%] hover:text-[${textHoverColor}] ${
        mobile ? "w-full" : "w-auto"
      }`}
      style={{ fontFamily: "Lexend", color, fontWeight }}
    >
      <button
        onClick={toggleDropdown}
        className={`${
          mobile ? "w-full px-4 py-3" : ""
        } hover:cursor-pointer rounded-lg flex items-center justify-between focus:outline-none transition-colors`}
        // style={{ fontFamily: "Inter" }}
        style={{
          padding: padding,
          backgroundColor: mobile ? "#3a3a3a " : backgroundColor,
        }}
      >
        <div className="flex items-center">
          {icon && <span className="">{icon}</span>}
          <span className={mobile ? "text-sm" : ""}>{displayText}</span>
        </div>

        <div className="px-2 flex justify-center items-center">
        {isOpen ? (
          <FaAngleUp className="" />
        ) : (
          <FaAngleDown className="" />
        )}
        </div>
      </button>
      {isOpen && (
        <div
          className={`absolute z-50 ${
            mobile ? "w-full" : "w-full"
          } mt-1 text-white rounded-b-lg`}
          style={{backgroundColor: dropDownBackgroundColor, maxWidth: dropdownMaxWidth, minWidth: dropdownMinWidth}}
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option.name)}
                className={`p-3 flex items-center gap-4 font-medium leading-[145%] text-[#F6F7F9] hover:text-[#012657] hover:bg-[#FFE933] cursor-pointer ${
                  mobile ? "text-sm" : "text-[12px]"
                } ${
                  isSetDropdown && selectedOption === option.name ? "bg-[#FFE933] text-[#012657]" : ""
                }`}
              >
                {option.icon && (
                  <span className="">
                    {
                      <Image
                        src={option.icon}
                        height={45}
                        width={45}
                        alt="Icon image"
                      />
                    }
                  </span>
                )}
                {option.name}
              </div>
            ))
          ) : (
            <div
              className={`p-3 text-[${appColors.officeBrown100}] ${
                mobile ? "text-sm" : ""
              }`}
            >
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainDropdown;