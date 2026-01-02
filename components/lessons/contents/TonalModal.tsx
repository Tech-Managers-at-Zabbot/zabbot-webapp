/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

interface ToneModalProps {
  tone: string;
  title: string;
  description: string;
  onClose: () => void;
}

const ToneModal = ({ tone, title, description, onClose }: ToneModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Modal container */}
      <div
        className="
          relative w-full
          max-w-md sm:max-w-lg md:max-w-xl
          rounded-2xl overflow-hidden
        "
      >
        {/* Background image */}
        <Image
          src="/lessons/green-background.png"
          alt="Tone background"
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 600px"
          className="object-fill"
          priority
        />

        <div className="relative px-9 flex justify-end">
          <button
            onClick={onClose}
            className="mt-6 cursor-pointer inline-block text-sm font-medium hover:text-[#FFDAB6] text-white/90 underline"
          >
            <RiCloseLargeLine size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center gap-6 justify-center z-10 p-8 sm:p-10 text-white">
          <h3 className="text-3xl text-center sm:text-5xl font-bold mb-2 text-[#FFDAB6]">
            {title}
          </h3>

          <p className="text-sm text-center text-[#FFFFFF] font-semibold sm:text-[20px] leading-relaxed">
            {description}
          </p>

          <div className="cursor-pointer hover:text-[#FFDAB6] text-center">
            <HiOutlineSpeakerWave size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToneModal;
