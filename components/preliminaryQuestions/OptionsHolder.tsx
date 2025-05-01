/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface OptionsProps {
  language: string;
  isSelected: boolean;
  onClick: (language:string) => void;
}
const LanguageOption:React.FC<OptionsProps> = ({ language, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(language)}
      className={`
        w-full h-16 rounded-3xl flex items-center px-6 mb-4
        transition-colors duration-200 text-left text-white hover:cursor-pointer text-xl font-medium
        ${
          isSelected
            ? "bg-orange-500 border-2 border-orange-600"
            : "bg-gray-800 border-2 border-gray-500 hover:bg-gray-700"
        }
      `}
    >
      {language}
    </button>
  );
};

interface OptionsHolderProps {
    options: string[];
    columns: number;
    initialSelected: any | null;
  }

const OptionsHolder:React.FC<OptionsHolderProps> = ({ options, columns = 2, initialSelected = null }) => {
  const [selectedOption, setSelectedOption] = useState(initialSelected);

  const handleSelect = (option:string) => {
    setSelectedOption(option);
  };

  const columnSize = Math.ceil(options.length / columns);
  const columnizedOptions = [];

  for (let i = 0; i < columns; i++) {
    columnizedOptions.push(options.slice(i * columnSize, (i + 1) * columnSize));
  }

  return (
    <div className="p-4 w-full max-w-4xl">
      <div className="flex gap-4">
        {columnizedOptions.map((columnOptions, columnIndex) => (
          <div key={columnIndex} className="flex-1">
            {columnOptions.map((option) => (
              <LanguageOption
                key={option}
                language={option}
                isSelected={selectedOption === option}
                onClick={handleSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsHolder;