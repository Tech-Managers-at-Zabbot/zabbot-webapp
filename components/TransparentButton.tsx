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
  textColor?: string;
  width?: string;
  onClick?: () => void;
}

const TransparentButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = "73px",
  textColor = "#333333",
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  width = "266px",
}) => {
  return (
    <button
      className={`bg-transparent border-1
         shadow-[0_2px_0_0_#333333]
  hover:shadow-[0_1px_0_0_#333333]
  hover:translate-y-0.5
  active:shadow-none
  active:translate-y-1
  transition-all duration-100 hover:cursor-pointer text-${textColor} border-[#333333] font-[700] text-[#000929]`}
      style={{
        borderRadius,
        height,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        width,
      }}
    >
      {children || title}
    </button>
  );
};


export default TransparentButton;
