import React, { useEffect, useState } from "react";
import InAppButton from "../InAppButton";
import { useRouter } from "next/navigation"
import { useLoading } from "@/contexts/LoadingProvider";
import { flashcardsData } from "@/constants/flashcards";
import { FLASHCARD_STORAGE_KEY } from "@/constants/localstorageKeys";
import { usePageLanguage } from "@/contexts/LanguageContext";

const FlashCard = () => {
  const router = useRouter()
  const { setLoading } = useLoading();
  const [flashCardIndex, setCurrentFlashCardIndex] = useState(0);

  const { getPageText } = usePageLanguage("userDashboard");
  const handleRedirect = () => {
    setLoading(true)
    return router.push("/flashcards")
  }

  useEffect(() => {
    const saved = localStorage.getItem(FLASHCARD_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentFlashCardIndex(parsed.currentIndex);
    }
  }, []);

  const card = flashcardsData[flashCardIndex];

  return (
    <div
      className="bg-[#FFEF7E] rounded-lg shadow-lg flex flex-col gap-6 p-6 text-center"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="text-[#162B6E] text-[23px] font-[600]">{getPageText("flash_cards")}</div>
      <div className="text-[#000000CC] font-[700] text-[36px]">{card.yorubaWord}</div>
      <div className="text-[#666666] font-[400]">
        {getPageText("mastering_alphabet_sounds")}
      </div>
      <div>
        <InAppButton background="#266950"
          onClick={handleRedirect}
        >
          <div className="text-white text-[15.612px] fonnt-[700] leading-[100%]">
            {getPageText("go_to_flashcard")}
          </div>
        </InAppButton>
      </div>
    </div>
  );
};
export default FlashCard;
