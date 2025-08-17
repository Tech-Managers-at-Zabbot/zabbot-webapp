interface CustomScrollbarProps {
  totalItems: number;
  visibleItems: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  totalItems,
  visibleItems,
  currentIndex,
  onDotClick,
}) => {
  const totalPages = Math.ceil(totalItems / visibleItems);
  
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            Math.floor(currentIndex / visibleItems) === index
              ? 'bg-[#162B6E]'
              : 'bg-[#D0D5DD]'
          }`}
        />
      ))}
    </div>
  );
};