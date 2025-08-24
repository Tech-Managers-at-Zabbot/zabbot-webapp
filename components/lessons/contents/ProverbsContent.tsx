/* eslint-disable @typescript-eslint/no-explicit-any */
import MediaComponents from "../MediaRendererComponent";
import React from "react";

const ProverbsContentComponent = ({
  content,
}: {
  content: Record<string, any>;
}) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        {/* The main paper section of the scroll */}
        <div
          className={`relative w-11/12 h-auto max-h-[80vh] py-16 px-4 md:px-20 scale-y-100 max-w-2xl bg-[#F5F5DC] border-2 border-[#5A2E10] shadow-lg rounded-lg overflow-hidden transition-all duration-1000 ease-in-out transform origin-top z-10`}
        >
          {/* Top border of the scroll */}
          <div
            className={`absolute top-0 left-0 w-full h-8 bg-[#5A2E10] rounded-t-lg z-20 flex items-center justify-center`}
          >
            <div className="w-10 h-3 bg-white rounded-full opacity-50"></div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-[#F15B29] mb-8">
            Language Proverb
          </h1>

          <h1 className="text-gray-800 text-lg md:text-xl font-normal mb-8">
            <span className="text-[#F15B29] font-bold">Proverb:</span>{" "}
            {content?.proverb}
          </h1>

          <h2 className="text-gray-800 text-lg font-normal md:text-xl mb-8">
            <span className="font-bold text-[#F15B29]">Translation:</span> A
            younger person does not give an older person a lecture. (Respect
            elders.)
          </h2>
          {/* Dynamic content area */}
          <div
            className={`text-center leading-relaxed text-lg mb-8`}
            dangerouslySetInnerHTML={{ __html: content?.customText }}
          ></div>

          {/* Media Components */}
          <div className="flex items-center justify-center">
            {content?.files?.length > 0 && (
              <MediaComponents files={content.files} />
            )}
          </div>

          {/* Bottom border of the scroll */}
          <div
            className={`absolute bottom-0 left-0 w-full h-8 bg-[#5A2E10] rounded-b-lg z-20 flex items-center justify-center`}
          >
            <div className="w-10 h-3 bg-white rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProverbsContentComponent;
