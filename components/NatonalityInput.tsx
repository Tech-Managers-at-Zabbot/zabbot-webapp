/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, X, XCircle } from "lucide-react";
import countriesData from "../data/countryDialCode.json";

interface CountryData {
  name: string;
  flag: string;
  code: string;
}

interface NationalityInputProps {
  value: string;
  onChange: (nationality: string) => void;
  placeholder?: string;
  initialCountryCode?: string;
  error?: boolean;
  errorMessage?: string;
  color?: string;
  backgroundColor?: string;
  border?: string;
  tabIndex?: number;
}

const NationalityInput: React.FC<NationalityInputProps> = ({
  value,
  onChange,
  placeholder = "Select nationality",
  initialCountryCode = "US",
  error,
  errorMessage,
  color= '#80838D',
  backgroundColor="#F0F0F3",
  border="1px solid #80838D",
  tabIndex = 0,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>({
    name: "United States",
    flag: "🇺🇸",
    code: "US",
  });
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  
  const countryListRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const defaultCountry = countriesData.find(
      (country) => country.code === initialCountryCode.toUpperCase()
    );
    if (defaultCountry && !selectedCountry) {
      setSelectedCountry(defaultCountry);
      if (!value) {
        onChange(defaultCountry.name);
      }
    }
  }, [initialCountryCode, selectedCountry, value, onChange]);

  useEffect(() => {
    if (value && !selectedCountry) {
      const country = countriesData.find((c) => c.name === value);
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [value, selectedCountry]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(countriesData);
    } else {
      const filtered = countriesData.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
    // Reset focused index when search changes
    setFocusedIndex(-1);
  }, [searchQuery]);

  // When modal opens, focus search input and reset focus index
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        searchInputRef.current?.focus();
        setFocusedIndex(-1);
      }, 50);
    }
  }, [modalVisible]);

  // Scroll focused country into view
  useEffect(() => {
    if (focusedIndex >= 0 && countryListRef.current) {
      const countryElements = countryListRef.current.querySelectorAll('[role="option"]');
      if (countryElements[focusedIndex]) {
        countryElements[focusedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [focusedIndex]);

  const openModal = () => {
    setModalVisible(true);
    setFilteredCountries(countriesData);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery("");
    setFocusedIndex(-1);
  };

  const selectCountry = (country: CountryData) => {
    setSelectedCountry(country);
    onChange(country.name);
    closeModal();
  };

  // Handle keyboard interactions for the combobox
  const handleComboboxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    } else if (e.key === 'Escape' && modalVisible) {
      e.preventDefault();
      closeModal();
    }
  };

  // Handle keyboard navigation within the modal
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    const countryCount = filteredCountries.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => {
          if (prev < countryCount - 1) return prev + 1;
          return 0; // Wrap to top
        });
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          if (prev > 0) return prev - 1;
          return countryCount - 1; // Wrap to bottom
        });
        break;
        
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < countryCount) {
          selectCountry(filteredCountries[focusedIndex]);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        closeModal();
        break;
        
      case 'Tab':
        // Keep focus trapped in modal
        const searchFocused = document.activeElement === searchInputRef.current;
        const closeButtonElement = document.getElementById('close-modal-button');
        const closeButtonFocused = document.activeElement === closeButtonElement;
        
        if (!e.shiftKey && closeButtonFocused) {
          e.preventDefault();
          searchInputRef.current?.focus();
        } else if (e.shiftKey && searchFocused) {
          e.preventDefault();
          closeButtonElement?.focus();
        }
        break;
        
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
        
      case 'End':
        e.preventDefault();
        setFocusedIndex(countryCount - 1);
        break;
    }
  };

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('country-modal');
      if (modalVisible && modal && !modal.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (modalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible]);

  return (
    <div className="w-full relative">
      <div
        className={`flex font-[400] text-[#999999] items-center border-1 px-3 h-[52px] py-2 bg-[#F0F0F3] rounded-md shadow-sm overflow-hidden nationality-input cursor-pointer`}
        style={{ fontFamily: "Inter", color, backgroundColor, border: error ? "1px solid #D42620" : border }}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={modalVisible}
        aria-controls="country-listbox"
        aria-label={placeholder}
        onClick={openModal}
        onKeyDown={handleComboboxKeyDown}
        tabIndex={tabIndex}
      >
        <div className="flex items-center px-3 py-3.5 w-full">
          {selectedCountry ? (
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-6 h-6 text-2xl mr-2 rounded-full">
                {selectedCountry.flag}
              </div>
              <span className="">
                {selectedCountry.name}
              </span>
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <ChevronDown size={16} className="text-gray-500 ml-auto" />
        </div>
      </div>

      {error && (
        <p className="text-[#D42620] mt-2 text-xs font-medium">
          {errorMessage}
        </p>
      )}

      {/* Country Selection Modal */}
      {modalVisible && (
        <div 
          id="country-listbox" 
          role="listbox" 
          className="fixed font-[400] inset-0 z-50 bg-black/60 flex items-center sm:items-center justify-center"
          onKeyDown={handleModalKeyDown}
        >
          <div id="country-modal" className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">
                Select Home Country
              </h3>
              <button
                id="close-modal-button"
                className="p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-800 hover:cursor-pointer" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mx-4 my-3 px-3 border bg-[#F0F0F3] rounded-lg">
              <Search size={20} className="text-gray-500 mr-2" />
              <input
                ref={searchInputRef}
                className="flex-1 py-2.5 text-[#80838D] bg-transparent focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                autoCapitalize="none"
                autoFocus
              />
              {searchQuery.length > 0 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                >
                  <XCircle size={20} className="text-gray-500" />
                </button>
              )}
            </div>

            {/* Country List */}
            <div 
              ref={countryListRef}
              className="overflow-y-auto flex-1"
            >
              {filteredCountries.map((country, index) => (
                <div
                  key={country.code}
                  className={`flex items-center py-3 px-4 border-b border-gray-100 cursor-pointer ${
                    index === focusedIndex ? 'bg-blue-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectCountry(country);
                  }}
                  role="option"
                  aria-selected={selectedCountry?.code === country.code}
                  id={`country-option-${index}`}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <div className="text-gray-800">{country.name}</div>
                </div>
              ))}
              {filteredCountries.length === 0 && (
                <div className="py-4 px-4 text-center text-gray-500">
                  No countries found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalityInput;