import React from 'react';

interface CustomSpinnerProps {
    spinnerColor?: string;
}

export const CustomSpinner: React.FC<CustomSpinnerProps> = ({spinnerColor= 'white'}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`w-4 h-4 border-2 rounded-full animate-spin`}
      style={{borderColor: spinnerColor, borderTopColor: 'transparent'}}
      ></div>
      <span className='font-medium'
      style={{color: spinnerColor}}
      >Processing...</span>
    </div>
  );
};
