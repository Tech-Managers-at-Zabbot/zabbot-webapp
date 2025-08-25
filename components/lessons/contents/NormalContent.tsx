/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import MediaComponents from '../MediaRendererComponent';



const NormalComponentComponent = (
    {
  content,
}: {
  content: Record<string, any>;
}
) => {

      const cleanContent = content.customText?.replace(/<[^>]*>/g, "") || "";

    return (
         <div className="bg-[url('/lessons/questionFrame.svg')] min-h-[300px] sm:min-h-[400px] w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] flex flex-col justify-center items-center bg-center bg-contain bg-no-repeat p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="w-[80%] px-2 sm:px-4 flex flex-col justify-center items-center text-center">
            {/* Main Content */}
            <div className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed">
              {cleanContent.split("–").map((part: string, index: number) => (
                <div
                  key={index}
                  className={index > 0 ? "block mt-2" : "inline"}
                >
                  {part.trim()}
                </div>
              ))}
            </div>

            {/* Translation */}
            {content?.translation && (
              <div className="text-[#EBEBEB] flex justify-center items-center text-sm sm:text-base p-3">
                <div className="flex rounded-lg bg-black/30 p-2">
                  {content.translation}
                </div>
              </div>
            )}

            {/* Media Components */}
            <div className="flex items-center justify-center">
              {content?.files?.length > 0 && (
                <MediaComponents files={content.files} />
              )}
            </div>
          </div>
        </div>
    )
}

export default NormalComponentComponent;