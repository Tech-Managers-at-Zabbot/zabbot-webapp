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
  backgroundColor?: string;
  width?: string;
  padding?: string;
  boxShadow?: string;
  color?: string;
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
  padding,
  color="white",
  boxShadow = "0 4px 0 0 rgba(0, 0, 0, 0.2)",
  backgroundColor='#333333',
  width = "230px",

  onClick,
}) => {
  return (
    <button
      className={`hover:cursor-pointer
  hover:shadow-[0_2px_0_0_rgba(0,0,0,0.2)]
  hover:translate-y-0.5
  active:shadow-none
  active:translate-y-1
  transition-all font-[700]`}
      onClick={onClick}
      style={{
        borderRadius,
        height,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        width,
        color,
        padding,
        backgroundColor,
        boxShadow
      }}
    >
      {children || title}
    </button>
  );
};

export default ColouredButton;
