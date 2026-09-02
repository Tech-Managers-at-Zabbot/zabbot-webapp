/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";
import { useLessonContext } from "@/contexts/LessonContext";
import { Modal } from "@/components/general/Modal";
import ProverbsContentComponent from "./ProverbsContent";
import GrammarRuleComponent from "./GrammarRuleContent";

interface InPersonPackageProps {
  imageSrc: string;
  title: string;
  url?: string;
  show: boolean;
}

interface InLessonFunctionProps {
  btnDisable: boolean;
}

const InLessonPackages = ({ btnDisable }: InLessonFunctionProps) => {
  const router = useRouter();
  const { setLoading } = useLoading();
  const { contents } = useLessonContext();
  const [grammarRuleModal, setGrammarRuleModal] = useState(false);
  const [proverbsModal, setProverbsModal] = useState(false);

  // Memoize filtered content to avoid recalculating on every render
  const { grammarRule, proverbs } = useMemo(() => {
    const grammarRuleFilter = contents?.filter(
      (data: any) => data.contentType === "grammar_rule"
    );
    const proverbsFilter = contents?.filter(
      (data: any) => data.contentType === "proverb"
    );

    return {
      grammarRule: grammarRuleFilter?.[0] || null,
      proverbs: proverbsFilter?.[0] || null,
    };
  }, [contents]);

  // Memoize package data based on available content
  const inLessonPackagesData: InPersonPackageProps[] = useMemo(
    () => [
      {
        imageSrc: "/lessons/proverbs.png",
        title: "LESSON PROVERBS",
        show: !!proverbs,
      },
      {
        imageSrc: "/lessons/grammar.png",
        title: "GRAMMAR RULE",
        show: !!grammarRule,
      },
      {
        imageSrc: "/lessons/flashcards-icon.svg",
        title: "FLASHCARDS",
        url: "/flashcards",
        show: true,
      },
    ],
    [proverbs, grammarRule]
  );

  const handleCardClick = (url: string | undefined, title: string) => {
    if (url && title === "FLASHCARDS") {
      setLoading(true);
      router.push(url);
    } else if (title === "LESSON PROVERBS") {
      setProverbsModal(true);
    } else if (title === "GRAMMAR RULE") {
      setGrammarRuleModal(true);
    }
  };

  // Filter out cards that shouldn't be shown
  const visiblePackages = inLessonPackagesData.filter((pkg) => pkg.show);

  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {visiblePackages.map((data, index) => (
          <button
            key={`${data.title}-${index}`}
            disabled={btnDisable}
            onClick={() => handleCardClick(data?.url, data.title)}
            className="relative z-50 bg-[#F5BC5A] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-between"
          >
            {/* Left side: Image and Title */}
            <div className="flex flex-col items-start">
              {/* Image */}
              <div className="relative w-20 h-20">
                <Image
                  src={data.imageSrc}
                  alt={data.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-[#620000] text-sm leading-tight max-w-[120px]">
                {data.title}
              </h3>
            </div>

            {/* Right side: Arrow Button */}
            <div className="flex-shrink-0">
              <div className="bg-[#D49C3C] rounded-full p-2.5 hover:bg-[#C48050] transition-colors">
                <IoIosArrowForward className="text-white text-2xl" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Proverbs Modal */}
      <Modal
        size="lg"
        isOpen={proverbsModal}
        onClose={() => setProverbsModal(false)}
      >
        <div className="w-full h-full max-h-[90vh] overflow-y-auto flex items-start justify-center py-6">
          <ProverbsContentComponent content={proverbs} />
        </div>
      </Modal>

      {/* Grammar Rule Modal */}
      <Modal
        size="lg"
        isOpen={grammarRuleModal}
        onClose={() => setGrammarRuleModal(false)}
      >
        <div className="w-full h-full max-h-[90vh] overflow-y-auto flex items-start justify-center py-6">
          <GrammarRuleComponent content={grammarRule} />
        </div>
      </Modal>
    </div>
  );
};

export default InLessonPackages;
