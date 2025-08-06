import React from "react";

const LessonCompleteComponent = () => {
  return (
    <div
      className="bg-[url('/lessons/questionFrame.svg')] bg-cover bg-center bg-no-repeat justify-center items-center h-[400px] flex flex-col min-h-[200px] max-w-[500px] w-full p-8 mb-6"
    >
      <div>
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="p-4 flex flex-col gap-5">
              <p className="text-[48px] font-[600] leading-[100%] text-[#EBEBEB]">
                O parí
              </p>
              <p className="text-[26px] font-[600] leading-[100%] text-[#EBEBEB]">
                Re Re Mi
              </p>
              <p className="text-[26px] font-[400] leading-[100%] text-[#EBEBEB]">
                The End
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCompleteComponent;