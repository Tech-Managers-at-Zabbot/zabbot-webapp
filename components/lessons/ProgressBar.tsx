interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="justify-between bg-green-900 shadow-sm">
      <div className="h-2 bg-gray-200">
        <div
          className="h-full bg-[#F15B29] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* <div className="px-4 py-2 text-sm text-gray-600 text-center">
        {progress}% Complete
      </div> */}
    </div>
  );
};

export default ProgressBar;
