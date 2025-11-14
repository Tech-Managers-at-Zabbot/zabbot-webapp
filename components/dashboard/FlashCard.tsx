import React from "react";
import InAppButton from "../InAppButton";

const FlashCard = () => {
  return (
    <div
      className="bg-[#FFEF7E] rounded-lg shadow-lg flex flex-col gap-6 p-6 text-center"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="text-[#162B6E] text-[23px] font-[600]">Flash Cards</div>
      <div className="text-[#000000CC] font-[700] text-[36px]">àlàáfíà</div>
      <div className="text-[#666666] font-[400]">
        Mastering alphabet sounds builds your Yorùbá fluency and tone precision.
      </div>
      <div>
        <InAppButton background="#266950">
          <div className="text-white text-[15.612px] fonnt-[700] leading-[100%]">
            Go to flashcard
          </div>
        </InAppButton>
      </div>
    </div>
  );
};
export default FlashCard;
