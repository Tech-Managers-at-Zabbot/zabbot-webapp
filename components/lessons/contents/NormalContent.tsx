"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MediaComponents from "../MediaRendererComponent";
import Image from "next/image";
import ToneModal from "./TonalModal";
import InAppButton from "@/components/InAppButton";
import { FaArrowRight } from "react-icons/fa6";
import InLessonRecordWithPara from "./InLessonRecordWithPara";
import InLessonChatWithOreModal from "./InLessonChatWIthOre";

const NormalComponentComponent = ({
  content,
  lessonImg,
}: {
  content: Record<string, any>;
  lessonImg: string;
}) => {
  const cleanContent = content.customText?.replace(/<[^>]*>/g, "") || "";
  const [ contentData, setContentData ] = useState([])
  const [showPronunciationModal, setShowPronunciationModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(()=> {
    if(cleanContent?.length){
      setContentData(cleanContent.split("–"))
    }
  },[cleanContent])

  const [selectedTone, setSelectedTone] = useState<string | null>(null);

  function splitTones(text: string): string[] {
    return text.trim().split(/\s+/);
  }

  const TONE_INFO: Record<
    string,
    { title: string; description: string; audioFile: string }
  > = {
    Re: {
      title: "RE",
      description: "Represents a high pitch in Yoruba pronunciation.",
      audioFile: "",
    },
    Mi: {
      title: "MI",
      description: "Represents a mid-level pitch in Yoruba pronunciation.",
      audioFile: "",
    },
    Do: {
      title: "DO",
      description: "Represents a low pitch in Yoruba pronunciation.",
      audioFile: "",
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mb-2 px-4"
    style={{fontFamily: "Lexend"}}
    >
      <div className="w-full max-w-[90%] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[600px] flex flex-col justify-center items-center">
        {/* Image Container */}
        {lessonImg && (
          <div className="w-full mb-6 sm:mb-8">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[10/4] mx-auto">
              <Image
                src={lessonImg}
                alt="Lesson Image"
                fill
                priority
                className="object-fill rounded-[20px] sm:rounded-[30px]"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 500px, (max-width: 1024px) 400px, 400px"
              />

              {/* Media Components - Positioned at bottom center of image */}
              {content?.files?.length > 0 && (
                <div className="absolute bottom-[-20] left-1/2 -translate-x-1/2 z-10">
                  <MediaComponents files={content.files} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Media Components - Show below if no image */}
        {!lessonImg && content?.files?.length > 0 && (
          <div className="w-full flex justify-center mb-6">
            <MediaComponents files={content.files} />
          </div>
        )}

        {/* Main Content */}
        <div className="w-full flex flex-col text-center text-base sm:text-xl md:text-2xl font-medium">
          <div className="text-[#975945] text-[18px] font-normal uppercase">
          {contentData[0]}
          </div>

          <div className="text-[#F15B29] text-[60px] font-[700]">
          {contentData[1]}
          </div>
        </div>

        {/* Translation */}
        {content?.translation && (
          <div className="w-full flex flex-col justify-center text-center items-center">
            <div className="inline-flex flex-wrap gap-2 rounded-lg px-4">
              {splitTones(content.translation).map((tone, index) => (
                <button
                  key={`${tone}-${index}`}
                  className="text-[#E3A261] text-sm sm:text-base font-medium 
                     px-2 py-1 rounded-md
                     hover:cursor-pointer transition hover:text-[#F15B29]"
                  onClick={() => setSelectedTone(tone)}
                >
                  {tone}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-2 mt-6 w-full items-center justify-center">
              <div>
              <InAppButton
              background="#EB5017"
              onClick={() => setShowChatModal(true)}
              >
                <div className="flex items-center justify-center gap-2">
                  <div><FaArrowRight /></div>
                  <div>Chat with Òrẹ́</div>
                </div>
              </InAppButton>
              </div>
              <div>
              <InAppButton
              background="#EB5017"
              onClick={() => setShowPronunciationModal(true)}
              >
                <div className="flex items-center justify-center gap-2">
                  <div><FaArrowRight /></div>
                  <div>
                  Record with Pàrà
                  </div>
                </div>
              </InAppButton>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedTone && (
        <ToneModal
          tone={""}
          title={TONE_INFO[selectedTone]?.title || selectedTone}
          description={
            TONE_INFO[selectedTone]?.description || "No description available."
          }
          onClose={() => setSelectedTone(null)}
        />
      )}
{showPronunciationModal && (
  <InLessonRecordWithPara
    isOpen={showPronunciationModal}
    onClose={() => setShowPronunciationModal(false)}
    word={contentData[1]}
    files={content.files}
    // pronunciationId={"12345"} 
    />
)}

{showChatModal && (
  <InLessonChatWithOreModal
    isOpen={showChatModal}
    onClose={() => setShowChatModal(false)}
    word={contentData[1]}
    // files={content.files}
    // pronunciationId={"12345"} 
    />
)}
    </div>
  );
};

export default NormalComponentComponent;
