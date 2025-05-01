
const ProgressBar = ({ value = 1, max = 12, showFraction = true }) => {
  // Calculate percentage
  const percentage = (value / max) * 100;
  
  return (
    <div className="flex items-center w-full gap-10">
      <div className="relative flex-grow h-[16px] bg-[#E8E8E8] rounded-[20px] overflow-hidden">
        <div 
          className="h-full bg-[#F56630] rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showFraction && (
        <div className="text-lg font-semibold text-white">
          {value}/{max}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;