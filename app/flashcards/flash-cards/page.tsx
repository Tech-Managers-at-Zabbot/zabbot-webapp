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
import IconAttribution from "@/components/flashCards/IconContribution";
import { Modal } from "@/components/general/Modal";
import { useLoading } from "@/contexts/LoadingProvider";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

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
const STORAGE_KEY = "zabbot_flashcards_state";

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
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentIndex(parsed.currentIndex);
      setStage(parsed.stage);
      setIsFlipped(parsed.isFlipped);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ currentIndex, stage, isFlipped })
    );
  }, [currentIndex, stage, isFlipped]);

  const flashcardsData = [
    {
      id: 1,
      ld: "0d6dd11a-ff8f-4585-bc3b-3d3a7668ab37",
      language: "YORUBA",
      yorubaWord: "Ọmọ",
      englishWord: "Child",
      transcription: "aw-MAW",
      tonal: "Re Re",
      image: "/flashcards/icons/icons-child.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743089183/Ededun/Audio/qjmhtp9cjmc37tk5c8om.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745612707/Ededun/Audio/nc6zgk4gszaakyz4brel.wav",
      ],
      iconAttribution: {
        name: "Child",
        url: "https://icons8.com/icon/80976/boy",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/80976/boy">Child</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 2,
      ld: "00034a8d-a8a8-4d81-bf42-1e347bce5bd0",
      language: "YORUBA",
      yorubaWord: "Òkè",
      englishWord: "Hill",
      transcription: "aw-KEH",
      tonal: "Do Do",
      image: "/flashcards/icons/icons-hill.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745688148/Ededun/Audio/rezmgo65mrfjqpmtqave.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743197002/Ededun/Audio/qmznkzqeem8ya9vriwhx.wav",
      ],
      iconAttribution: {
        name: "Hill",
        url: "https://icons8.com/icon/xwLYwbPX6M7t/hill",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/xwLYwbPX6M7t/hill">Hill</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 3,
      ld: "1c32ce07-d478-47e1-8da4-5577bc8249b7",
      language: "YORUBA",
      yorubaWord: "Onjẹ",
      englishWord: "Food",
      transcription: "awn-JEH",
      tonal: "Re Re",
      image: "/flashcards/icons/icons-porridge.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743196827/Ededun/Audio/orhxcvyo6l2bkbz3ntfq.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745688182/Ededun/Audio/p6musm5qwdgjfnlhy7zf.wav",
      ],
      iconAttribution: {
        name: "Porridge",
        url: "https://icons8.com/icon/UiNoE67SjHVm/porridge",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/UiNoE67SjHVm/porridge">Porridge</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 4,
      language: "YORUBA",
      ld: "a6f58c41-7c92-4c65-87a5-24af535d5117",
      yorubaWord: "Ọjọ́ Rú",
      englishWord: "Wednesday",
      transcription: "aw-jaw-roo",
      tonal: "Re Mi",
      image: "/flashcards/icons/icons-wednesday.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745687528/Ededun/Audio/t8hhawn2jzz1f5qjydcq.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743648477/Ededun/Audio/xkobyak9bubaojtlxv1z.wav",
      ],
      iconAttribution: {
        name: "Wednesday",
        url: "https://icons8.com/icon/KaaCeYojvgnN/wednesday",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/KaaCeYojvgnN/wednesday">Wednesday</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 5,
      ld: "2edc9070-a6f1-48fc-ad85-80d52493aaeb",
      language: "YORUBA",
      yorubaWord: "Nígbàwo",
      englishWord: "When",
      transcription: "nee-gbah-WOH",
      tonal: "Mi Do Re",
      image: "/flashcards/icons/icons-when.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745613955/Ededun/Audio/w32jvzoqtphfdfd49lcy.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743197128/Ededun/Audio/bgn1zj0azy5msmnlpjsw.wav",
      ],
      iconAttribution: {
        name: "When",
        url: "https://icons8.com/icon/zSECQVRrFw1D/when-quest",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/zSECQVRrFw1D/when-quest">when</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 6,
      language: "YORUBA",
      ld: "878c7de1-7fca-4508-a8a7-5f5ca7874efc",
      yorubaWord: "Níbo",
      englishWord: "Where",
      transcription: "nee-BAW",
      tonal: "Mi Re",
      image: "/flashcards/icons/icons-where.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745613920/Ededun/Audio/uqmbyook4w2jkrvw00kr.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743197095/Ededun/Audio/ps1a1igfvegbaddefdc2.wav",
      ],
      iconAttribution: {
        name: "Where",
        url: "https://icons8.com/icon/4IUbZeUIfknP/where",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/4IUbZeUIfknP/where">Where</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 7,
      language: "YORUBA",
      ld: "8fb952e6-29a1-4a67-9bca-0d22785bd5eb",
      yorubaWord: "Mọ́kọ̀ndínlógún",
      englishWord: "Nineteen",
      transcription: "maw-kawn-deen-LOH-goon",
      tonal: "Mi Do Mi Mi Mi",
      image: "/flashcards/icons/icons-calendar.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743197484/Ededun/Audio/t8qxygboh1riq7ejs3ob.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745687395/Ededun/Audio/qqbkxpnc6psf20aduddg.wav",
      ],
      iconAttribution: {
        name: "Calendar",
        url: "https://icons8.com/icon/QYt19Epz1EtY/calendar-19",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/QYt19Epz1EtY/calendar-19">Calendar 19</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 8,
      language: "YORUBA",
      ld: "90152605-af45-4104-a714-5a43bac90662",
      yorubaWord: "Inú",
      englishWord: "Inside",
      transcription: "ee-NOO",
      tonal: "Re Mi",
      image: "/flashcards/icons/icons-internal.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745175759/Ededun/Audio/k8ce22fgykqumrf6ppzn.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743197044/Ededun/Audio/tk1w9bdvd2cwhl57jhzs.wav",
      ],
      iconAttribution: {
        name: "Internal",
        url: "https://icons8.com/icon/d1s5gjaTF277/internal",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/d1s5gjaTF277/internal">Internal</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    {
      id: 9,
      language: "YORUBA",
      ld: "93ee4aa4-0a1e-49b7-b79c-708e53f6c3ae",
      yorubaWord: "Kìnìún",
      englishWord: "Lion",
      transcription: "kee-nee-OON",
      tonal: "Do Do Mi",
      image: "/flashcards/icons/icons-lion.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745612433/Ededun/Audio/asueiijaaualrdwowjfg.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1742853503/Ededun/Audio/imttxrcpqjzsgidtnf8m.wav",
      ],
      iconAttribution: {
        name: "Lion",
        url: "https://icons8.com/icon/ZvsAicOTFrB6/lion",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/ZvsAicOTFrB6/lion">Lion</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>w
    {
      id: 10,
      ld: "a43a009a-331f-4c87-afdf-2885d6c5d1cf",
      language: "YORUBA",
      yorubaWord: "Kí ni",
      englishWord: "What",
      transcription: "KEE-nee",
      tonal: "Mi Re",
      image: "/flashcards/icons/icons-what.png",
      audio: [
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1745175787/Ededun/Audio/zaxl989hiuxh11bmurc7.wav",
        "https://res.cloudinary.com/dgotesgcy/raw/upload/v1743197064/Ededun/Audio/wcjno5sqyrqltdphlrrz.wav",
      ],
      iconAttribution: {
        name: "What",
        url: "https://icons8.com/icon/MNGnnycc91zS/what",
      },
    }, //<a target="_blank" href="https://icons8.com/icon/MNGnnycc91zS/what">What</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
  ];

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
    }, 600);
  };

  const handleGoToDashboard = () => {
    setLoading(true);
    setIsFinishModalOpen(false);
    router.push("/user-dashboard");
  };

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
              className={`transition-all duration-500 ${
                stage === "preview"
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
              className={`transition-all duration-500 ${
                stage === "details"
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

        <IconAttribution
          iconName={card.iconAttribution.name}
          iconUrl={card.iconAttribution.url}
        />

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
