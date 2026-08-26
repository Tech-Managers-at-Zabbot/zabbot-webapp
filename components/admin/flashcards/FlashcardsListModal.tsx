/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Modal } from "@/components/general/Modal";
import InAppButton from "@/components/InAppButton";
import { useAlert } from "next-alert";
import { Flashcard } from "@/types/interfaces";
import {
  useGetAllFlashcards,
  useDeleteFlashcardById,
} from "@/services/generalApi/flashcards/mutation";
import AddFlashcardModal from "./AddFlashcardModal";

interface FlashcardsListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlashcardsListModal: React.FC<FlashcardsListModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: flashcardsResponse, isLoading } = useGetAllFlashcards();
  const { mutate: deleteFlashcard } = useDeleteFlashcardById();
  const { addAlert } = useAlert();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(
    null
  );
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const flashcards: Flashcard[] = Array.isArray(flashcardsResponse?.data)
    ? flashcardsResponse.data
    : [];

  const handleOpenCreate = () => {
    setEditingFlashcard(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (flashcard: Flashcard) => {
    setEditingFlashcard(flashcard);
    setShowAddModal(true);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (deleteConfirmId === id) {
      deleteFlashcard(id, {
        onSuccess: () => {
          addAlert("Success", "Flashcard deleted successfully", "success");
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            `Unable to delete flashcard: ${error?.message || ""}`,
            "error"
          );
        },
      });
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  const handleSaved = () => {
    setShowAddModal(false);
    setEditingFlashcard(null);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Flash Cards"
        size="lg"
        containerClassName="w-full"
      >
        <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
          <div className="flex justify-end mb-4">
            <InAppButton
              onClick={handleOpenCreate}
              background="#012657"
              width="auto"
              height="44px"
              padding="0 20px"
            >
              <div className="flex items-center gap-2">
                <Plus size={18} />
                Create Flash Card
              </div>
            </InAppButton>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : flashcards.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
              No flash cards yet. Click &quot;Create Flash Card&quot; to add
              your first one.
            </div>
          ) : (
            <div className="space-y-3">
              {flashcards.map((flashcard) => (
                <div
                  key={flashcard.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {flashcard.image && (
                      <img
                        src={flashcard.image}
                        alt={flashcard.yorubaWord}
                        className="w-12 h-12 object-contain rounded bg-gray-50 shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-[#012657] truncate">
                        {flashcard.yorubaWord}{" "}
                        <span className="font-normal text-gray-500">
                          ({flashcard.englishWord})
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        /{flashcard.transcription}/ &middot; {flashcard.tonal}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(flashcard)}
                      className="flex items-center hover:cursor-pointer px-3 py-2 text-sm font-medium text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(flashcard.id)}
                      className={`flex items-center hover:cursor-pointer px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        deleteConfirmId === flashcard.id
                          ? "text-white bg-red-600 hover:bg-red-700"
                          : "text-red-600 hover:text-red-800 hover:bg-red-50"
                      }`}
                    >
                      <Trash2 size={16} className="mr-1" />
                      {deleteConfirmId === flashcard.id ? "Confirm" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      <AddFlashcardModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingFlashcard(null);
        }}
        editingFlashcard={editingFlashcard}
        onSaved={handleSaved}
      />
    </>
  );
};

export default FlashcardsListModal;
