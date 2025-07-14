import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ScrollArrowProps {
  direction: "left" | "right";
  onClick?: () => void;
  className?: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
}

export const ScrollArrow: React.FC<ScrollArrowProps> = ({
  direction,
  onClick,
  className = "",
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
}) => {
  const Icon = direction === "left" ? FaChevronLeft : FaChevronRight;
  const positionClass = direction === "left" ? "left-2" : "right-2";

  return (
    <button
      className={`transform hover:cursor-pointer hover:bg-[#162B6E] -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md ${positionClass} ${className}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ fontFamily: "Lexend" }}
    >
      <Icon />
    </button>
  );
};
