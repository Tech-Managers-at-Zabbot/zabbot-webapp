/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { CustomSpinner } from "@/components/CustomSpinner";
import InAppButton from "@/components/InAppButton";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCornerTopLeft } from "react-icons/rx";
import { RxCornerTopRight } from "react-icons/rx";
import { RxCornerBottomLeft } from "react-icons/rx";
import { RxCornerBottomRight } from "react-icons/rx";
import { PiSpeakerSimpleHighBold } from "react-icons/pi";
// import IconAttribution from "@/components/flashCards/IconContribution";
import { Modal } from "@/components/general/Modal";
import { useLoading } from "@/contexts/LoadingProvider";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useGetAllFlashcards } from "@/services/generalApi/flashcards/mutation";
import { Flashcard } from "@/types/interfaces";
import { FLASHCARD_STORAGE_KEY } from "@/constants/localstorageKeys";


interface PreviewCardProps {
  yorubaWord: string;
  onClick: () => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ yorubaWord, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative w-full max-w-[440px] px-4"
      style={{ fontFamily: "Lexend" }}
    >
      <div
        className="w-full h-[590px] py-6 relative sm:h-[520px] md:h-[590px] flex flex-col items-center justify-center gap-4"
        style={{
          borderRadius: "20px",
          border: "4px solid #FEE685",
          background: "#FFF6E3",
          boxShadow: "0 25px 57.6px 8px rgba(0,0,0,0.25)",
        }}
      >
        <div className="absolute left-0 top-0">
          <RxCornerTopLeft size={50} color={"#FFB900"} />
        </div>
        <div className="absolute right-0 top-0">
          <RxCornerTopRight size={50} color={"#FFB900"} />
        </div>
        <div className="absolute left-0 bottom-0">
          <RxCornerBottomLeft size={50} color={"#FFB900"} />
        </div>
        <div className="absolute right-0 bottom-0">
          <RxCornerBottomRight size={50} color={"#FFB900"} />
        </div>
        <InAppButton
          background="#006045"
          disabled={true}
          disabledColor="#006045"
        >
          YORUBA
        </InAppButton>
        <div className="text-3xl sm:text-4xl font-bold px-4 text-center text-[#7B3306]">
          {yorubaWord}
        </div>
        <div className="opacity-70 font-[500] absolute bottom-10 text-[#79716B] flex items-end">
          Tap to reveal
        </div>
      </div>
    </div>
  );
};

interface DetailsCardProps {
  englishWord: string;
  transcription: string;
  yorubaWord: string;
  tonal: string;
  image: string;
  isFlipped: boolean;
  onClick: () => void;
  onPlayAudio: (audioArray: string[]) => void;
  audio: string[];
  isAudioPlaying: boolean;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  englishWord,
  transcription,
  yorubaWord,
  tonal,
  image,
  isFlipped,
  onClick,
  onPlayAudio,
  audio,
  isAudioPlaying,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full max-w-[440px] px-4"
      style={{ fontFamily: "Lexend" }}
    >
      <div
        className="w-full h-[590px] sm:h-[520px] md:h-[590px] flex items-center justify-center"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute shadow-lg inset-0 flex flex-col items-center justify-center gap-4 text-white px-4"
            style={{
              backfaceVisibility: "hidden",
              background: "#1B3718",
              border: "6px solid #E2FA5E",
              filter: "drop-shadow(0 25px 53.3px rgba(0,0,0,0.43))",
              borderRadius: "16px",
            }}
          >
            <div className="absolute left-0 top-0">
              <RxCornerTopLeft size={50} color={"#FFB900"} />
            </div>
            <div className="absolute right-0 top-0">
              <RxCornerTopRight size={50} color={"#FFB900"} />
            </div>
            <div className="absolute left-0 bottom-0">
              <RxCornerBottomLeft size={50} color={"#FFB900"} />
            </div>
            <div className="absolute right-0 bottom-0">
              <RxCornerBottomRight size={50} color={"#FFB900"} />
            </div>
            <InAppButton
              background="#FFC511"
              disabled={true}
              disabledColor="#FFC511"
            >
              <div className="text-[#1B2700] font-[600] text-[20px]">
                ENGLISH
              </div>
            </InAppButton>
            <div className="text-2xl sm:text-3xl font-bold text-center">
              {englishWord}
            </div>
            <div className="flex w-full bg-[#3B6D35] rounded-xl py-4 flex-col text-center">
              <div className="text-[#FEE685] font-[400] leading-[20px]">
                Pronunciation (yoruba)
              </div>
              <div className="text-sm italic font-[500] leading-[28px] text-[20px]">
                /{transcription}/
              </div>
            </div>
            <InAppButton
              background="#FFC511"
              onClick={(e: any) => {
                e.stopPropagation();
                onPlayAudio(audio);
              }}
              disabled={isAudioPlaying}
            >
              {isAudioPlaying ? (
                <div>
                  <CustomSpinner title="Playing..." />
                </div>
              ) : (
                <div className="flex text-[#004F3B] items-center gap-2 justify-center">
                  <div>play pronunciation</div>
                  <div>
                    <PiSpeakerSimpleHighBold size={20} />
                  </div>
                </div>
              )}
            </InAppButton>
            <div className="absolute bottom-10 opacity-70 text-[#FEE685B2] font-[500] text-[16px]">
              Tap to flip back
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute shadow-lg inset-0 flex flex-col items-center justify-center gap-4 px-4"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              borderRadius: "16px",
              border: "6px solid #ffe585",
              background: "#fff6e3",
            }}
          >
            <div className="absolute left-0 top-0">
              <RxCornerTopLeft size={50} color={"#FFB900"} />
            </div>
            <div className="absolute right-0 top-0">
              <RxCornerTopRight size={50} color={"#FFB900"} />
            </div>
            <div className="absolute left-0 bottom-0">
              <RxCornerBottomLeft size={50} color={"#FFB900"} />
            </div>
            <div className="absolute right-0 bottom-0">
              <RxCornerBottomRight size={50} color={"#FFB900"} />
            </div>
            <img
              src={image}
              alt={yorubaWord}
              className="w-24 h-24 sm:w-60 sm:h-32 object-contain"
            />
            <InAppButton
              background="#006045"
              disabled={true}
              disabledColor="#006045"
            >
              <div className="text-[#FFFBEB]">YORUBA</div>
            </InAppButton>
            <div className="text-[50px] text-[#7B3306] font-bold text-center">
              {yorubaWord}
            </div>
            <div className="text-[20px] font-[600] leading-[47px] text-[#E3A261] text-center">
              {tonal}
            </div>
            <div className="flex w-full bg-[#FFFFFF99] shadow-lg border-[#FEE68580] border-4 rounded-xl py-4 flex-col text-center">
              <div className="text-[#57534D] font-[400] leading-[20px]">
                Pronunciation
              </div>
              <div className="text-sm text-[#973C00] italic font-[500] leading-[28px] text-[20px]">
                /{transcription}/
              </div>
            </div>
            <InAppButton
              background="#FF6900"
              isShadowShow
              onClick={(e: any) => {
                e.stopPropagation();
                onPlayAudio(audio);
              }}
              disabled={isAudioPlaying}
            >
              {isAudioPlaying ? (
                <div>
                  <CustomSpinner title="Playing..." />
                </div>
              ) : (
                <div className="flex text-[#FFFFFF] items-center gap-2 justify-center">
                  <div className="rounded-full bg-[#FFFFFF33] p-3">
                    <PiSpeakerSimpleHighBold size={20} />
                  </div>
                  <div>Listen</div>
                </div>
              )}
            </InAppButton>
            <div className="text-sm text-[#E85A00] font-[500] opacity-70">
              Tap to see translation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Flashcards = () => {
  const [nextCardLoading, setNextCardLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<"preview" | "details">("preview");
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const { setLoading } = useLoading();
  const [showConfetti, setShowConfetti] = useState(false);

  const { width = 0, height = 0 } = useWindowSize();

  const router = useRouter();

  const { data: flashcardsResponse, isLoading: flashcardsLoading } =
    useGetAllFlashcards();

  const flashcardsData: Flashcard[] = Array.isArray(flashcardsResponse?.data)
    ? flashcardsResponse.data
    : [];

  const playAudio = (audioArray: string[]) => {
    if (!audioArray || audioArray.length === 0) return;

    setIsPlaying(true);

    let newIndex;
    if (audioArray.length === 1) {
      newIndex = 0;
    } else {
      do {
        newIndex = Math.floor(Math.random() * audioArray.length);
      } while (newIndex === currentAudioIndex && audioArray.length > 1);
    }

    setCurrentAudioIndex(newIndex);

    const audio = new Audio(audioArray[newIndex]);

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.onerror = () => {
      setIsPlaying(false);
    };

    audio.play().catch((err) => {
      console.error("Audio playback failed:", err);
      setIsPlaying(false);
    });
  };

  useEffect(() => {
    setCurrentAudioIndex(0);
  }, [currentIndex]);

  useEffect(() => {
    const saved = localStorage.getItem(FLASHCARD_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentIndex(parsed.currentIndex);
      setStage(parsed.stage);
      setIsFlipped(parsed.isFlipped);
    }
  }, []);

  useEffect(() => {
    if (
      !flashcardsLoading &&
      flashcardsData.length > 0 &&
      currentIndex >= flashcardsData.length
    ) {
      setCurrentIndex(0);
      setStage("preview");
      setIsFlipped(false);
    }
  }, [flashcardsLoading, flashcardsData.length, currentIndex]);

  useEffect(() => {
    localStorage.setItem(
      FLASHCARD_STORAGE_KEY,
      JSON.stringify({ currentIndex, stage, isFlipped })
    );
  }, [currentIndex, stage, isFlipped]);


  const card = flashcardsData[currentIndex];

  const handleCardTap = () => {
    if (stage === "preview") {
      setStage("details");
    } else {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleNextCard = () => {
    if (currentIndex + 1 === flashcardsData.length) {
      setShowConfetti(true);
      return setIsFinishModalOpen(true);
    }
    setNextCardLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev + 1 < flashcardsData.length ? prev + 1 : prev
      );
      setStage("preview");
      setIsFlipped(false);
      setNextCardLoading(false);
    }, 600);
  };

  const handleRestart = () => {
    setNextCardLoading(true);
    setTimeout(() => {
      setCurrentIndex(0);
      setStage("preview");
      setIsFlipped(false);
      setNextCardLoading(false);
      setIsFinishModalOpen(false);
      setShowConfetti(false)
    }, 600);
  };

  const handleGoToDashboard = () => {
    setLoading(true);
    setIsFinishModalOpen(false);
    setShowConfetti(false)
    router.push("/user-dashboard");
  };

  if (flashcardsLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <CustomSpinner title="loading flashcards..." spinnerColor="#223F1F" />
      </main>
    );
  }

  if (!card) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div style={{ fontFamily: "Lexend" }}>No flashcards available yet.</div>
      </main>
    );
  }

  return (
    <div>
      <Head>
        <title>Zabbot - Flashcards Page</title>
        <meta name="description" content="Flash Cards on Zabbot" />
      </Head>

      <main
        className="flex flex-col items-center justify-center gap-10 sm:gap-10 min-h-screen px-4"
        style={{ fontFamily: "Lexend" }}
      >
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
            gravity={0.4}
            tweenDuration={10000}
            run={showConfetti}
            style={{
              zIndex: 9999,
            }}
          />
        )}
        <section className="flex justify-center w-full z-[111]">
          <div className="relative w-full max-w-[440px]">
            {/* Preview Card with fade/scale transition */}
            <div
              className={`transition-all duration-500 ${stage === "preview"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none absolute inset-0"
                }`}
            >
              <PreviewCard
                yorubaWord={card.yorubaWord}
                onClick={handleCardTap}
              />
            </div>

            {/* Details Card with fade/scale transition */}
            <div
              className={`transition-all duration-500 ${stage === "details"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none absolute inset-0"
                }`}
            >
              <DetailsCard
                englishWord={card.englishWord}
                transcription={card.transcription}
                yorubaWord={card.yorubaWord}
                tonal={card.tonal}
                image={card.image}
                isFlipped={isFlipped}
                onClick={handleCardTap}
                audio={card.audio}
                onPlayAudio={playAudio}
                isAudioPlaying={isPlaying}
              />
            </div>
          </div>
        </section>

        {/* <IconAttribution
          iconName={card.iconAttribution.name}
          iconUrl={card.iconAttribution.url}
        /> */}

        {/* NEXT BUTTON */}
        <section className="mb-10">
          <InAppButton background="#223F1F" onClick={handleNextCard} disabled={nextCardLoading}>
            {nextCardLoading ? (
              <CustomSpinner title="loading..." />
            ) : currentIndex + 1 < flashcardsData.length ? (
              <div className="flex justify-center gap-3 items-center">
                <span>Next Card</span>
                <FaArrowRightLong size={20} />
              </div>
            ) : (
              <div>Finish</div>
            )}
          </InAppButton>
        </section>
      </main>
      <div className="z-[9999]">
        <Modal
          isOpen={isFinishModalOpen}
          onClose={() => setIsFinishModalOpen(false)}
          showCloseButton={false}
        >
          <div className="flex flex-col items-center text-center gap-6 px-6 py-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3718]">
              🎉 Congratulations!
            </h2>

            <p className="text-[#57534D] text-[16px] leading-relaxed">
              You’ve completed all the flashcards in this set — amazing work!
              You’re building real confidence in Yoruba, one word at a time.
            </p>

            <p className="text-[#7B3306] font-[500]">
              What would you like to do next?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <InAppButton background="#006045" onClick={handleRestart}>
                Restart Flashcards
              </InAppButton>

              <InAppButton background="#FF6900" onClick={handleGoToDashboard}>
                Go to Dashboard
              </InAppButton>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Flashcards;
