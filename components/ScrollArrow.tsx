import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ScrollArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

export const ScrollArrow: React.FC<ScrollArrowProps> = ({
  direction,
  onClick,
  className = "",
}) => {
  const Icon = direction === "left" ? FaChevronLeft : FaChevronRight;
  const positionClass =
    direction === "left" ? "left-2" : "right-2";

  return (
    <button
      className={`transform hover:cursor-pointer hover:bg-[#162B6E] -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md ${positionClass} ${className}`}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};
