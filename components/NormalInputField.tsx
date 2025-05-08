/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface NormalInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  required?: boolean;
  placeholder: string;
  type: string;
  error?: boolean;
  errorMessage?: string;
  color?: string;
  backgroundColor?: string;
  border?: string;
  icon?: React.ReactNode; // Add icon prop
}

const NormalInputField: React.FC<NormalInputProps> = ({
  id,
  value,
  onChange,
  required,
  placeholder,
  type,
  error,
  errorMessage,
  color = '#80838D',
  backgroundColor = "#F0F0F3",
  border = "1px solid #80838D",
  icon
}) => {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`mt-1 font-[400] block w-full px-3 h-[56px] py-2 rounded-md shadow-sm placeholder:text-[#98A2B3] ${
            icon ? 'pr-10' : ''
          }`}
          style={{ 
            fontFamily: "Inter", 
            color, 
            backgroundColor, 
            border: error ? "1px solid #D42620" : border 
          }}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[#D42620] mt-2 text-xs font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default NormalInputField;