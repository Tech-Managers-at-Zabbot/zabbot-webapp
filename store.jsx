import { HiMenuAlt3 } from "react-icons/hi";

const Dashboard = () => {
  return (
    <div>
      <div
        className="min-h-screen bg-[#dff9fb] pt-10"
        style={{ fontFamily: "Lexend" }}
      >
        <header className="flex items-center justify-between px-[100px] py-4 relative">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-[156px] h-[46.91px]">
              <svg 
                width="156" 
                height="47" 
                viewBox="0 0 156 47" 
                fill="none" 
                className="w-full h-full"
              >
                <text x="10" y="30" fill="#4A90E2" fontSize="24" fontWeight="bold">
                  Zabbot
                </text>
              </svg>
            </div>
          </div>

          {/* Center - Parrot (Absolutely positioned) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-[113px] h-[110px]">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border-4 border-yellow-400">
                <div className="text-white text-2xl font-bold">🦜</div>
              </div>
            </div>
          </div>

          {/* Right - Text and Menu */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex flex-col gap-[8px] text-right">
              <span className="font-bold text-[35.53px] leading-[100%] text-[#202124]">
                Káàrọ̀ Iniobong
              </span>
              <span className="text-[#333333] font-[400] text-[13px] leading-[145%]">
                Learn Yorùbá. Speak Proudly. Belong Deeply.
              </span>
            </div>
            <div className="flex items-center">
              <HiMenuAlt3 color="#737477" size={24} />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Dashboard;