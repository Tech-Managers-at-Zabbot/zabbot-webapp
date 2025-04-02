import React from "react";

export interface ButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  hoverEffect?: boolean;
  width?: string;
  onClick?: () => void;
}

const ColouredButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = '73px',
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  width = "230px",
  onClick,
}) => {
  return (
    <button
      className={`hover:cursor-pointer bg-[#333333] shadow-[0_4px_0_0_rgba(0,0,0,0.2)]
  hover:shadow-[0_2px_0_0_rgba(0,0,0,0.2)]
  hover:translate-y-0.5
  active:shadow-none
  active:translate-y-1
  transition-all font-[700] text-white`}
      onClick={onClick}
      style={{
        borderRadius,
        height,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        width
      }}
    >
      {children || title}
    </button>
  );
};

export default ColouredButton;
