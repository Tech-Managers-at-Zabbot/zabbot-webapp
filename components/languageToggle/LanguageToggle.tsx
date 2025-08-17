// components/languageToggle/EnhancedLanguageToggle.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsGlobe, BsChevronDown } from "react-icons/bs";
import { appColors } from "@/constants/colors";
import { useLanguage, SUPPORTED_LANGUAGES, LanguageKey } from "@/contexts/LanguageContext";

interface LanguageToggleProps {
  variant?: 'toggle' | 'dropdown';
  maxDisplayLanguages?: number;
  showFlags?: boolean;
  className?: string;
  backgroundColor?: string;
  borderColor?:string;
  color?:string;
  isActiveColor?:string;
  isActiveBackgroundColor?:string;
  dropDownBgColor?:string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'dropdown',
  // maxDisplayLanguages = 2,
  showFlags = false,
  dropDownBgColor,
  backgroundColor=appColors.languageToggleLightBlue,
  isActiveBackgroundColor=appColors.darkRoyalBlueForBtn,
borderColor=appColors.darkRoyalBlueForBtn,
color=appColors.darkRoyalBlueForBtn,
isActiveColor=appColors.white,
  className = ""
}) => {
  const { currentLanguage, setLanguage, availableLanguages, isLoading } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = async (language: LanguageKey) => {
    if (language !== currentLanguage && !isLoading) {
      await setLanguage(language);
      setIsDropdownOpen(false);
    }
  };

  // Toggle variant for 2 languages
  if (variant === 'toggle' && availableLanguages.length === 2) {
    return (
      <div
        className={`w-[160px] sm:w-[232px] h-[32px] sm:h-[40px] leading-[100%] font-[400] flex rounded-lg ${className}`}
        style={{ fontFamily: "Lexend" }}
      >
        {availableLanguages.map((language, index) => {
          const languageInfo = SUPPORTED_LANGUAGES[language];
          const isActive = currentLanguage === language;
          const isFirst = index === 0;
          
          return (
            <section
              key={language}
              className={`flex flex-1 ${
                isFirst ? 'rounded-tl-lg rounded-bl-lg' : 'rounded-tr-lg rounded-br-lg'
              } hover:cursor-pointer items-center justify-center gap-[6px] sm:gap-[8px] py-[8px] sm:py-[10px] px-[12px] sm:px-[16px] transition-all duration-300 ease-in-out ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                backgroundColor: isActive 
                  ? isActiveBackgroundColor
                  : backgroundColor,
                color: isActive 
                  ? isActiveColor
                  : color,
              }}
              onClick={() => !isLoading && handleLanguageChange(language)}
            >
              <div className="transition-transform duration-300 ease-in-out text-sm sm:text-base">
                {showFlags ? languageInfo.flag : <BsGlobe />}
              </div>
              <div className="transition-all duration-300 ease-in-out text-xs sm:text-sm font-medium">
                <span className="block sm:hidden">{languageInfo.shortName}</span>
                <span className="hidden sm:block">{languageInfo.name}</span>
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  // Dropdown variant for multiple languages
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={`flex hover:cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ease-in-out ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
        }`}
        style={{
          backgroundColor,
          color,
          borderColor,
          fontFamily: "Lexend"
        }}
        onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)}
        disabled={isLoading}
      >
        <div className="text-sm sm:text-base">
          {showFlags ? SUPPORTED_LANGUAGES[currentLanguage].flag : <BsGlobe />}
        </div>
        <span className="text-xs sm:text-sm font-medium">
          <span className="">{SUPPORTED_LANGUAGES[currentLanguage].shortName}</span>
          {/* <span className="hidden sm:block">{SUPPORTED_LANGUAGES[currentLanguage].name}</span> */}
        </span>
        <BsChevronDown 
          className={`text-xs transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
          color="#F6F6F6"
        />
      </button>

      {isDropdownOpen && (
        <div
          className="absolute top-[80%] left-0 mt-2 rounded-lg shadow-lg z-50 py-1"
          style={{
            borderColor: appColors.darkRoyalBlueForBtn,
            fontFamily: "Lexend",
            backgroundColor: dropDownBgColor,
          }}
        >
          {availableLanguages.map((language) => {
            const languageInfo = SUPPORTED_LANGUAGES[language];
            const isActive = currentLanguage === language;
            
            return (
              <button
                key={language}
                className={`w-full text-left px-4 py-2 text-sm hover:cursor-pointer transition-colors duration-200 flex items-center gap-3 ${
                  isActive ? 'font-semibold' : ''
                }`}
                style={{
                color: isActive 
                  ? isActiveColor
                  : color,
              }}
                onClick={() => handleLanguageChange(language)}
              >
                <span className="text-base">
                  {showFlags ? languageInfo.flag : <BsGlobe />}
                </span>
                <span>{languageInfo.shortName}</span>
                {isActive && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;