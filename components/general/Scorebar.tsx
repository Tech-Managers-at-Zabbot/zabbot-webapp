const ScoreBar = ({ finalScore }: { finalScore: number }) => {
    const percentage = Math.round(finalScore * 100); // 0–100

    let barColor = "bg-green-500";
    
    if (percentage <= 29) {
        barColor = "bg-red-500";
    } else if (percentage <= 59) {
        barColor = "bg-orange-500";
    } else {
        barColor = "bg-green-500";
    }

    return (
        <div className="w-full">
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className={`${barColor} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className="flex justify-between mb-1 pt-[3px]">
                <span className="text-sm font-medium text-gray-200 pr-[6px]">Pronunciation Accuracy: </span>
                <span className="text-sm font-medium text-gray-300">{percentage}%</span>
            </div>            
        </div>
    );
};
export default ScoreBar;