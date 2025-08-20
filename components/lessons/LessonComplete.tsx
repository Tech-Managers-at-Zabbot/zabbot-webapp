import React from "react";
// import MediaComponents from "./MediaRendererComponent";

const LessonCompleteComponent = () => {
  return (
    <div className="bg-[url('/lessons/questionFrame.svg')] min-h-[300px] sm:min-h-[400px] w-full max-w-[300px] sm:max-w-[400px] flex flex-col justify-center items-center bg-center bg-contain bg-no-repeat p-4 sm:p-8 mb-4 sm:mb-6">
      <section>
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="p-4 flex flex-col gap-5">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#EBEBEB]">
                O parí
              </p>
              <p className="flex rounded-lg bg-black/30 p-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-[400] leading-tight items-center justify-center text-center text-[#EBEBEB]">
                Re Re Mi
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal leading-tight text-[#EBEBEB]">
                The End
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <MediaComponents files={content.files} />
      </section> */}
    </div>
  );
};

export default LessonCompleteComponent;
