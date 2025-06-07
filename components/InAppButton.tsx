/* eslint-disable @typescript-eslint/no-explicit-any */
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
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  type?: any;
  disabledColor?:string;
  onClick?: (e:unknown) => void;
}

const InAppButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "50px",
  children,
  height = '58px',
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  width = "230px",
  disabled,
  type,
  color='white',
  backgroundColor="#F9C10F",
  disabledColor="#E0E1E6",
  onClick,
}) => {
  return (
    <button
      className={`${!disabled ? 'hover:cursor-pointer' : ''} shadow-[0_4px_0_0_rgba(0,0,0,0.2)]
      ${!disabled ? 'hover:shadow-[0_2px_0_0_rgba(0,0,0,0.2)]' : ''}
  ${!disabled ? 'hover:translate-y-0.5' : ''}
  ${!disabled ? 'active:shadow-none' : ''}
  ${!disabled ? 'active:translate-y-1' : ''}
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
        backgroundColor: !disabled ? backgroundColor : disabledColor
      }}
      disabled={disabled}
      type={type}
    >
      {children || title}
    </button>
  );
};

export default InAppButton;
