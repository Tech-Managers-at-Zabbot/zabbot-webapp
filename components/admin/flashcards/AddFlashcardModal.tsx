/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Save, Trash2, Upload } from "lucide-react";
import { Modal } from "@/components/general/Modal";
import InAppButton from "@/components/InAppButton";
import { useAlert } from "next-alert";
import { Flashcard } from "@/types/interfaces";
import { CLOUDINARY_CONFIG, FILE_LIMITS } from "@/types/interfaces";
import {
  useCreateFlashcard,
  useUpdateFlashcardById,
} from "@/services/generalApi/flashcards/mutation";

const MIN_AUDIO_FILES = 2;

interface AudioSlot {
  url: string;
  uploading: boolean;
}

interface FlashcardFormState {
  yorubaWord: string;
  englishWord: string;
  transcription: string;
  tonal: string;
  image: string;
  iconAttributionName: string;
  iconAttributionUrl: string;
}

const emptyForm: FlashcardFormState = {
  yorubaWord: "",
  englishWord: "",
  transcription: "",
  tonal: "",
  image: "",
  iconAttributionName: "",
  iconAttributionUrl: "",
};

interface AddFlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingFlashcard: Flashcard | null;
  onSaved: () => void;
}

const AddFlashcardModal: React.FC<AddFlashcardModalProps> = ({
  isOpen,
  onClose,
  editingFlashcard,
  onSaved,
}) => {
  const [formData, setFormData] = useState<FlashcardFormState>(emptyForm);
  const [audioSlots, setAudioSlots] = useState<AudioSlot[]>([
    { url: "", uploading: false },
    { url: "", uploading: false },
  ]);
  const [imageUploading, setImageUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { addAlert } = useAlert();
  const { mutate: createFlashcard, isPending: creating } = useCreateFlashcard();
  const { mutate: updateFlashcard, isPending: updating } =
    useUpdateFlashcardById();

  const isSaving = creating || updating;
  const isEditing = !!editingFlashcard;

  useEffect(() => {
    if (!isOpen) return;

    if (editingFlashcard) {
      setFormData({
        yorubaWord: editingFlashcard.yorubaWord || "",
        englishWord: editingFlashcard.englishWord || "",
        transcription: editingFlashcard.transcription || "",
        tonal: editingFlashcard.tonal || "",
        image: editingFlashcard.image || "",
        iconAttributionName: editingFlashcard.iconAttribution?.name || "",
        iconAttributionUrl: editingFlashcard.iconAttribution?.url || "",
      });
      const existingAudio = editingFlashcard.audio?.length
        ? editingFlashcard.audio
        : ["", ""];
      setAudioSlots(
        existingAudio.map((url) => ({ url, uploading: false }))
      );
    } else {
      setFormData(emptyForm);
      setAudioSlots([
        { url: "", uploading: false },
        { url: "", uploading: false },
      ]);
    }
    setErrors({});
  }, [isOpen, editingFlashcard]);

  const handleInputChange = (field: keyof FlashcardFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const uploadToCloudinary = async (
    file: File,
    resourceType: "image" | "video"
  ): Promise<string> => {
    const formPayload = new FormData();
    formPayload.append("file", file);
    formPayload.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`,
      { method: "POST", body: formPayload }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result = await response.json();
    return result.secure_url;
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    const maxSizeInBytes = FILE_LIMITS.IMAGE_MAX_SIZE * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      addAlert(
        "Error",
        `Image size must be less than ${FILE_LIMITS.IMAGE_MAX_SIZE}MB`,
        "error"
      );
      return;
    }

    setImageUploading(true);
    try {
      const secureUrl = await uploadToCloudinary(file, "image");
      setFormData((prev) => ({ ...prev, image: secureUrl }));
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    } catch {
      addAlert("Error", "Unable to upload image", "error");
    } finally {
      setImageUploading(false);
    }
  };

  const handleAudioUpload = async (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    const maxSizeInBytes = FILE_LIMITS.AUDIO_MAX_SIZE * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      addAlert(
        "Error",
        `Audio size must be less than ${FILE_LIMITS.AUDIO_MAX_SIZE}MB`,
        "error"
      );
      return;
    }

    setAudioSlots((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, uploading: true } : slot))
    );

    try {
      const secureUrl = await uploadToCloudinary(file, "video");
      setAudioSlots((prev) =>
        prev.map((slot, i) =>
          i === index ? { url: secureUrl, uploading: false } : slot
        )
      );
      if (errors.audio) setErrors((prev) => ({ ...prev, audio: "" }));
    } catch {
      addAlert("Error", "Unable to upload audio", "error");
      setAudioSlots((prev) =>
        prev.map((slot, i) => (i === index ? { ...slot, uploading: false } : slot))
      );
    }
  };

  const addAudioSlot = () => {
    setAudioSlots((prev) => [...prev, { url: "", uploading: false }]);
  };

  const removeAudioSlot = (index: number) => {
    setAudioSlots((prev) => {
      if (prev.length <= MIN_AUDIO_FILES) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.yorubaWord.trim()) newErrors.yorubaWord = "Yoruba word is required";
    if (!formData.englishWord.trim()) newErrors.englishWord = "English word is required";
    if (!formData.transcription.trim()) newErrors.transcription = "Transcription is required";
    if (!formData.tonal.trim()) newErrors.tonal = "Tonal is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.iconAttributionName.trim())
      newErrors.iconAttributionName = "Icon attribution name is required";
    if (!formData.iconAttributionUrl.trim())
      newErrors.iconAttributionUrl = "Icon attribution url is required";

    const filledAudio = audioSlots.filter((slot) => slot.url).length;
    if (filledAudio < MIN_AUDIO_FILES) {
      newErrors.audio = `Please upload at least ${MIN_AUDIO_FILES} audio files`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (imageUploading || audioSlots.some((slot) => slot.uploading)) {
      addAlert("Info", "Please wait for all files to finish uploading", "info");
      return;
    }

    const payload = {
      language: "YORUBA",
      yorubaWord: formData.yorubaWord.trim(),
      englishWord: formData.englishWord.trim(),
      transcription: formData.transcription.trim(),
      tonal: formData.tonal.trim(),
      image: formData.image,
      audio: audioSlots.map((slot) => slot.url).filter(Boolean),
      iconAttribution: {
        name: formData.iconAttributionName.trim(),
        url: formData.iconAttributionUrl.trim(),
      },
    };

    if (isEditing && editingFlashcard?.id) {
      updateFlashcard(
        { id: editingFlashcard.id, updateData: payload },
        {
          onSuccess: () => {
            addAlert("Success", "Flashcard updated successfully", "success");
            onSaved();
          },
          onError: (error: any) => {
            addAlert(
              "Error",
              `Unable to update flashcard: ${error?.message || ""}`,
              "error"
            );
          },
        }
      );
    } else {
      createFlashcard(payload, {
        onSuccess: () => {
          addAlert("Success", "Flashcard created successfully", "success");
          onSaved();
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            `Unable to create flashcard: ${error?.message || ""}`,
            "error"
          );
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Flash Card" : "Create Flash Card"}
      size="lg"
      containerClassName="w-full"
      zIndex={10000}
      disableClose={isSaving}
    >
      <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yoruba Word
              </label>
              <input
                type="text"
                value={formData.yorubaWord}
                onChange={(e) => handleInputChange("yorubaWord", e.target.value)}
                placeholder="e.g. Ọmọ"
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.yorubaWord && (
                <p className="text-red-500 text-sm mt-1">{errors.yorubaWord}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                English Word
              </label>
              <input
                type="text"
                value={formData.englishWord}
                onChange={(e) => handleInputChange("englishWord", e.target.value)}
                placeholder="e.g. Child"
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.englishWord && (
                <p className="text-red-500 text-sm mt-1">{errors.englishWord}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcription
              </label>
              <input
                type="text"
                value={formData.transcription}
                onChange={(e) => handleInputChange("transcription", e.target.value)}
                placeholder="e.g. aw-MAW"
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.transcription && (
                <p className="text-red-500 text-sm mt-1">{errors.transcription}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tonal
              </label>
              <input
                type="text"
                value={formData.tonal}
                onChange={(e) => handleInputChange("tonal", e.target.value)}
                placeholder="e.g. Re Re"
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.tonal && (
                <p className="text-red-500 text-sm mt-1">{errors.tonal}</p>
              )}
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
              />
              <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                <Upload size={16} className="mr-2" />
                {imageUploading ? "Uploading..." : "Upload Image"}
              </div>
            </label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-20 h-20 object-contain mt-3 rounded border border-gray-200"
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Audio uploads */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Audio (minimum {MIN_AUDIO_FILES})
              </label>
              <button
                type="button"
                onClick={addAudioSlot}
                className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
              >
                + Add another audio
              </button>
            </div>

            <div className="space-y-3">
              {audioSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 rounded-md"
                >
                  <label className="block flex-1">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleAudioUpload(index, e.target.files)}
                      className="hidden"
                    />
                    <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                      <Upload size={16} className="mr-2" />
                      {slot.uploading
                        ? "Uploading..."
                        : slot.url
                        ? `Audio ${index + 1} uploaded`
                        : `Upload Audio ${index + 1}`}
                    </div>
                  </label>
                  {slot.url && (
                    <audio controls style={{ height: "40px" }}>
                      <source src={slot.url} />
                      Your browser does not support audio playback.
                    </audio>
                  )}
                  {audioSlots.length > MIN_AUDIO_FILES && (
                    <button
                      type="button"
                      onClick={() => removeAudioSlot(index)}
                      className="text-red-600 hover:text-red-800 hover:cursor-pointer self-center shrink-0"
                      title="Remove audio slot"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.audio && (
              <p className="text-red-500 text-sm mt-1">{errors.audio}</p>
            )}
          </div>

          {/* Icon attribution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon Attribution
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.iconAttributionName}
                  onChange={(e) =>
                    handleInputChange("iconAttributionName", e.target.value)
                  }
                  placeholder="Icon name, e.g. Child"
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.iconAttributionName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.iconAttributionName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={formData.iconAttributionUrl}
                  onChange={(e) =>
                    handleInputChange("iconAttributionUrl", e.target.value)
                  }
                  placeholder="Icon source url"
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.iconAttributionUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.iconAttributionUrl}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <InAppButton onClick={onClose} background="#8a0c03" disabled={isSaving}>
            Cancel
          </InAppButton>
          <InAppButton onClick={handleSave} background="#012657" disabled={isSaving}>
            <div className="flex justify-center items-center">
              <Save size={16} className="mr-2" />
              {isSaving
                ? "Processing..."
                : isEditing
                ? "Save Changes"
                : "Create Flash Card"}
            </div>
          </InAppButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddFlashcardModal;
