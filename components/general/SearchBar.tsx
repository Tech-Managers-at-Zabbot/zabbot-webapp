import React from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  background?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onSubmit,
  icon,
  className = "",
  disabled = false,
  background
}) => {
  const [searchValue, setSearchValue] = React.useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) onSubmit?.(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) {
      e.preventDefault();
      onSubmit?.(searchValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full z-20 ${className}`}>
      <div
        className={`
          flex z-20 items-center bg-white border border-gray-300 rounded-full 
          px-4 py-2 shadow-sm
          focus-within:ring-2 focus-within:ring-blue-500 
          transition-all duration-200
          ${disabled ? "opacity-70 cursor-not-allowed bg-gray-100" : ""}
        `}
        style={{
          background,
          fontFamily: "Lexend"
        }}
      >
        {icon && (
          <div className="text-gray-500 mr-2 flex-shrink-0">{icon}</div>
        )}

        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-grow bg-transparent outline-none text-gray-700
            placeholder-gray-400 z-20
          `}
        />
      </div>
    </form>
  );
};

export default SearchBar;
