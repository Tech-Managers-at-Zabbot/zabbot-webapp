/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Search, Play, Pause, Check } from "lucide-react";
import { useGetAllRecordings } from "@/services/generalApi/ededun/tanstack";

interface EdedunPhrase {
  id: string;
  yorubaText: string;
  englishTranslation: string;
  audioUrl: string;
  category: string;
}

interface EdedunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (phrases: EdedunPhrase[]) => void;
}

const EdedunModal: React.FC<EdedunModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPhrases, setSelectedPhrases] = useState<EdedunPhrase[]>([]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [allPhrases, setAllPhrases] = useState<any>([]);
  const [page, setPage] = useState(1);

  const { data: ededunRecordings, isPending: ededunRecordingsLoading } =
    useGetAllRecordings(page, searchTerm);

  useEffect(() => {
    setAllPhrases(ededunRecordings?.data?.data || []);
  }, [ededunRecordingsLoading, ededunRecordings?.data?.data]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  if (!isOpen) return null;

  const categories = [
    "All",
    ...Array.from(new Set(allPhrases?.map((phrase: any) => phrase.category))),
  ];

  const togglePhraseSelection = (phrase: EdedunPhrase) => {
    setSelectedPhrases((prev) => {
      const isSelected = prev.some((p) => p.id === phrase.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== phrase.id);
      } else {
        return [...prev, phrase];
      }
    });
  };

  const playAudio = (audioUrl: string, phraseId: string) => {
    // Stop any currently playing audio
    if (playingAudio) {
      const currentAudio = document.getElementById(
        `audio-${playingAudio}`
      ) as HTMLAudioElement;
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    setPlayingAudio(phraseId);

    // Create or get audio element
    let audio = document.getElementById(
      `audio-${phraseId}`
    ) as HTMLAudioElement;

    if (!audio) {
      audio = new Audio(audioUrl);
      audio.id = `audio-${phraseId}`;
    }

    // Play the audio
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      setPlayingAudio(null);
    });

    // Reset playing state when audio ends
    audio.onended = () => {
      setPlayingAudio(null);
    };

    // Also handle errors
    audio.onerror = () => {
      console.error("Error loading audio file");
      setPlayingAudio(null);
    };
  };

  const handleSelect = () => {
    onSelect(selectedPhrases);
    onClose();
    setSelectedPhrases([]);
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#012657]">
              Select from Ededun Database
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#012657]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search phrases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-[#012657] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border text-[#012657] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category: any) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {selectedPhrases.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                {selectedPhrases.length} phrase
                {selectedPhrases.length !== 1 ? "s" : ""} selected
              </p>
            </div>
          )}
        </div>

        {/* Phrases List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid gap-3">
            {allPhrases.map((phrase: any) => {
              const isSelected = selectedPhrases.some(
                (p) => p.id === phrase.id
              );
              const isPlaying = playingAudio === phrase.id;

              return (
                <div
                  key={phrase.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => togglePhraseSelection(phrase)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg text-gray-900">
                            {phrase.yorubaText}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {phrase.englishTranslation}
                          </p>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-1">
                            {phrase.category}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(phrase.audioUrl, phrase.id);
                          }}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full"
                          title="Play pronunciation"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>

                        {isSelected && (
                          <div className="p-1 bg-blue-600 text-white rounded-full">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {allPhrases.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No phrases found matching your search criteria.
            </div>
          )}
        </div>
        <div className="p-6 flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-3 ${
              page !== 1
                ? "hover:cursor-pointer hover:bg-white hover:text-[#012657] hover:border-[#012657]"
                : ""
            } bg-[#012657] py-1 border rounded disabled:opacity-50`}
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {ededunRecordings?.data?.pagination?.currentPage} of{" "}
            {ededunRecordings?.data?.pagination?.totalPages}
          </span>

          <button
            disabled={page === ededunRecordings?.data?.pagination?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-3 ${
              page !== ededunRecordings?.data?.pagination?.totalPages
                ? "hover:cursor-pointer hover:bg-white hover:text-[#012657] hover:border-[#012657]"
                : ""
            } bg-[#012657] py-1 border rounded disabled:opacity-50`}
          >
            Next
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={selectedPhrases.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Selected ({selectedPhrases.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdedunModal;
