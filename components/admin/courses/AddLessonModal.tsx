/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/general/Modal";
import { Save, Trash2, Upload } from "lucide-react";
import {
  useCreateLesson,
  useUpdateLessonById,
} from "@/services/generalApi/lessons/mutation";
import { useAlert } from "next-alert";
import InAppButton from "@/components/InAppButton";
import TextEditor from "@/components/general/TextEditor";
import EdedunModal from "@/components/general/EdedunContentModal";
import { ContentDataType, ContentSourceType } from "@/types/enums";
import {
  Content,
  ContentFile,
  EdedunPhrase,
  FILE_LIMITS,
  CLOUDINARY_CONFIG,
} from "@/types/interfaces";

interface LessonFormData {
  title: string;
  description: string;
  orderNumber: number;
  headLineTag: string;
  estimatedDuration?: number;
  objectives: string;
  outcomes: string;
}

interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLesson: () => void;
  courseId: string;
  languageId: string;
  nextOrderNumber: number;
}

const emptyLesson: LessonFormData = {
  title: "",
  description: "",
  orderNumber: 1,
  headLineTag: "",
  estimatedDuration: undefined,
  objectives: "",
  outcomes: "",
};

const AddLessonModal: React.FC<AddLessonModalProps> = ({
  isOpen,
  onClose,
  onSaveLesson,
  courseId,
  languageId,
  nextOrderNumber,
}) => {
  const [lessonData, setLessonData] = useState<LessonFormData>(emptyLesson);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contents, setContents] = useState<Content[]>([]);
  const [showEdeunModal, setShowEdeunModal] = useState(false);
  const [editingContentIndex, setEditingContentIndex] = useState<
    number | null
  >(null);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(
    new Set()
  );

  const { addAlert } = useAlert();
  const { mutate: addLesson, isPending: createLessonLoading } =
    useCreateLesson();
  const { mutate: attachLessonContents, isPending: attachingContents } =
    useUpdateLessonById();

  useEffect(() => {
    if (isOpen) {
      setLessonData({ ...emptyLesson, orderNumber: nextOrderNumber });
      setContents([]);
      setEditingContentIndex(null);
      setErrors({});
    }
  }, [isOpen, nextOrderNumber]);

  const handleInputChange = (field: keyof LessonFormData, value: any) => {
    setLessonData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addContent = (sourceType: ContentSourceType = ContentSourceType.NEW) => {
    const newContent: Content = {
      translation: "",
      contentFiles: [],
      sourceType,
      ededunPhrases: sourceType === ContentSourceType.EDEDUN ? [] : undefined,
      customText: sourceType === ContentSourceType.NEW ? "" : undefined,
      contentType: sourceType === ContentSourceType.NEW ? "normal" : undefined,
    };

    setContents((prev) => [...prev, newContent]);
    setEditingContentIndex(contents.length);

    if (sourceType === ContentSourceType.EDEDUN) {
      setShowEdeunModal(true);
    }
  };

  const updateContent = (index: number, updates: Partial<Content>) => {
    setContents((prev) =>
      prev.map((content, i) => (i === index ? { ...content, ...updates } : content))
    );
  };

  const handleContentTypeChange = (index: number, newType: string) => {
    const currentTranslation = contents[index]?.translation;
    if (newType === "grammar_rule") {
      updateContent(index, { contentType: newType, translation: "Grammar Rule" });
    } else if (currentTranslation === "Grammar Rule") {
      updateContent(index, { contentType: newType, translation: "" });
    } else {
      updateContent(index, { contentType: newType });
    }
  };

  const handleGrammarExampleChange = (
    contentIndex: number,
    exampleIndex: number,
    field: "yoruba" | "translation",
    value: string
  ) => {
    const examples = contents[contentIndex]?.grammarExamples || [];
    updateContent(contentIndex, {
      grammarExamples: examples.map((example, i) =>
        i === exampleIndex ? { ...example, [field]: value } : example
      ),
    });
  };

  const handleAddGrammarExample = (contentIndex: number) => {
    const examples = contents[contentIndex]?.grammarExamples || [];
    updateContent(contentIndex, {
      grammarExamples: [...examples, { yoruba: "", translation: "" }],
    });
  };

  const handleRemoveGrammarExample = (contentIndex: number, exampleIndex: number) => {
    const examples = contents[contentIndex]?.grammarExamples || [];
    updateContent(contentIndex, {
      grammarExamples: examples.filter((_, i) => i !== exampleIndex),
    });
  };

  const removeContent = (index: number) => {
    setContents((prev) => prev.filter((_, i) => i !== index));
    setEditingContentIndex(null);
  };

  const handleEdedunSelection = (phrases: EdedunPhrase[]) => {
    if (editingContentIndex !== null) {
      updateContent(editingContentIndex, {
        ededunPhrases: phrases,
        translation: phrases
          .map((p) => `${p.yorubaText} - ${p.englishTranslation}`)
          .join("\n"),
      });
    }
  };

  const validateFileSize = (
    file: File,
    contentType: ContentDataType
  ): string | null => {
    let maxSize: number;
    switch (contentType) {
      case ContentDataType.IMAGE:
        maxSize = FILE_LIMITS.IMAGE_MAX_SIZE;
        break;
      case ContentDataType.VIDEO:
        maxSize = FILE_LIMITS.VIDEO_MAX_SIZE;
        break;
      case ContentDataType.AUDIO:
        maxSize = FILE_LIMITS.AUDIO_MAX_SIZE;
        break;
      default:
        return null;
    }

    const maxSizeInBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleFileUpload = (
    contentIndex: number,
    files: FileList | null,
    contentType: ContentDataType
  ) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    const sizeError = validateFileSize(file, contentType);
    if (sizeError) {
      addAlert("Error", sizeError, "error");
      return;
    }

    const newContentFile: ContentFile = {
      contentType,
      filePath: URL.createObjectURL(file),
      file,
      description: "",
    };

    const currentContent = contents[contentIndex];
    updateContent(contentIndex, {
      contentFiles: [...currentContent.contentFiles, newContentFile],
    });
  };

  const removeContentFile = (contentIndex: number, fileIndex: number) => {
    const currentContent = contents[contentIndex];
    updateContent(contentIndex, {
      contentFiles: currentContent.contentFiles.filter(
        (_, i) => i !== fileIndex
      ),
    });
  };

  const updateMediaDescription = (
    contentIndex: number,
    fileIndex: number,
    description: string
  ) => {
    const currentContent = contents[contentIndex];
    updateContent(contentIndex, {
      contentFiles: currentContent.contentFiles.map((file, i) =>
        i === fileIndex ? { ...file, description } : file
      ),
    });
  };

  const handleCloudinaryUpload = async (
    file: File,
    contentIndex: number,
    fileIndex: number,
    contentType: ContentDataType
  ): Promise<string> => {
    const fileId = `${contentIndex}-${fileIndex}`;

    try {
      setUploadingFiles((prev) => new Set([...prev, fileId]));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

      let resourceType = "auto";
      if (contentType === ContentDataType.IMAGE) {
        resourceType = "image";
      } else if (
        contentType === ContentDataType.VIDEO ||
        contentType === ContentDataType.AUDIO
      ) {
        resourceType = "video";
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();
      const secureUrl = result.secure_url;

      setContents((prev) =>
        prev.map((content, cIdx) =>
          cIdx === contentIndex
            ? {
                ...content,
                contentFiles: content.contentFiles.map((f, fIdx) =>
                  fIdx === fileIndex
                    ? { ...f, filePath: secureUrl, file: undefined }
                    : f
                ),
              }
            : content
        )
      );

      return secureUrl;
    } finally {
      setUploadingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!lessonData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!lessonData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!lessonData.orderNumber || lessonData.orderNumber < 1) {
      newErrors.orderNumber = "A valid order number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    if (uploadingFiles.size > 0) {
      addAlert("Info", "Please wait for all files to finish uploading", "info");
      return;
    }

    const uploadedUrls = new Map<string, string>();

    try {
      const uploadPromises: Promise<void>[] = [];

      contents.forEach((content, contentIndex) => {
        content.contentFiles.forEach((file, fileIndex) => {
          if (file.file) {
            uploadPromises.push(
              handleCloudinaryUpload(
                file.file,
                contentIndex,
                fileIndex,
                file.contentType
              ).then((secureUrl) => {
                uploadedUrls.set(`${contentIndex}-${fileIndex}`, secureUrl);
              })
            );
          }
        });
      });

      await Promise.all(uploadPromises);
    } catch {
      addAlert("Error", "Unable to upload one or more content files", "error");
      return;
    }

    const finalContents = contents.map((content, contentIndex) => ({
      translation: content.translation,
      sourceType: content.sourceType,
      customText: content.customText,
      ededunPhrases: content.ededunPhrases,
      contentType: content.contentType,
      proverb: content.proverb,
      grammarTitle: content.grammarTitle,
      grammarSubtitle: content.grammarSubtitle,
      grammarDescription: content.grammarDescription,
      grammarExamples: content.grammarExamples,
      contentFiles: content.contentFiles.map((file, fileIndex) => ({
        contentType: file.contentType,
        filePath:
          uploadedUrls.get(`${contentIndex}-${fileIndex}`) || file.filePath,
        description: file.description,
      })),
    }));

    addLesson(
      {
        lessonData: {
          ...lessonData,
          courseId,
          languageId,
          contents: finalContents,
        },
      },
      {
        onSuccess: (response: any) => {
          console.log("createLesson response:", response);
          const newLessonId = response?.data?.id || response?.id;

          if (finalContents.length > 0 && !newLessonId) {
            addAlert(
              "Error",
              "Lesson created, but could not find its id to save content. Check the console for the raw response.",
              "error"
            );
            onClose();
            onSaveLesson();
            return;
          }

          if (finalContents.length > 0 && newLessonId) {
            attachLessonContents(
              {
                lessonId: newLessonId,
                updateData: { contents: finalContents },
              },
              {
                onSuccess: () => {
                  addAlert(
                    "Success",
                    "Lesson created successfully",
                    "success"
                  );
                  onClose();
                  onSaveLesson();
                },
                onError: (error: any) => {
                  addAlert(
                    "Error",
                    `Lesson created, but content could not be saved: ${error.message}`,
                    "error"
                  );
                  onClose();
                  onSaveLesson();
                },
              }
            );
          } else {
            addAlert("Success", "Lesson created successfully", "success");
            onClose();
            onSaveLesson();
          }
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            `Unable to create lesson: ${error.message}`,
            "error"
          );
        },
      }
    );
  };

  return (
    <>
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Lesson"
      size="lg"
      containerClassName="w-full"
      disableClose={createLessonLoading || attachingContents}
    >
      <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title
              </label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter lesson title"
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Number
              </label>
              <input
                type="number"
                value={lessonData.orderNumber}
                onChange={(e) =>
                  handleInputChange(
                    "orderNumber",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.orderNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.orderNumber}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={lessonData.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
              rows={3}
              placeholder="Enter lesson description"
              className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headline Tag
              </label>
              <input
                type="text"
                value={lessonData.headLineTag}
                onChange={(e) =>
                  handleInputChange("headLineTag", e.target.value)
                }
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Time (minutes)
              </label>
              <input
                type="number"
                value={lessonData.estimatedDuration || ""}
                onChange={(e) =>
                  handleInputChange(
                    "estimatedDuration",
                    parseInt(e.target.value) || undefined
                  )
                }
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objectives
            </label>
            <textarea
              value={lessonData.objectives}
              onChange={(e) =>
                handleInputChange("objectives", e.target.value)
              }
              rows={2}
              className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outcomes
            </label>
            <textarea
              value={lessonData.outcomes}
              onChange={(e) => handleInputChange("outcomes", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Lesson Content */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-700">
                Lesson Content
              </h4>
              <select
                onChange={(e) => {
                  const sourceType = e.target.value as ContentSourceType;
                  addContent(sourceType);
                  e.target.value = "";
                }}
                className="px-4 py-2 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>
                  Add Content
                </option>
                <option value={ContentSourceType.EDEDUN}>
                  Add from Ededun
                </option>
                <option value={ContentSourceType.NEW}>Add New Content</option>
              </select>
            </div>

            {contents.map((content, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <h5 className="text-[#012657] font-medium">
                      Content {index + 1}
                    </h5>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        content.sourceType === ContentSourceType.EDEDUN
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {content.sourceType === ContentSourceType.EDEDUN
                        ? "From Ededun"
                        : "New Content"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContent(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {content.sourceType === ContentSourceType.EDEDUN ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Ededun Phrases
                      </label>
                      {content.ededunPhrases &&
                      content.ededunPhrases.length > 0 ? (
                        <div className="space-y-2">
                          {content.ededunPhrases.map((phrase) => (
                            <div
                              key={phrase.id}
                              className="p-3 bg-green-50 rounded-md text-[#012657] border border-green-200"
                            >
                              <div className="font-medium">
                                {phrase.yorubaText}
                              </div>
                              <div className="text-sm text-gray-600">
                                {phrase.englishTranslation}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {phrase.category}
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingContentIndex(index);
                              setShowEdeunModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit Selection
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingContentIndex(index);
                            setShowEdeunModal(true);
                          }}
                          className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-600"
                        >
                          Select Phrases from Ededun
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content Type
                        </label>
                        <select
                          value={content.contentType || "normal"}
                          onChange={(e) =>
                            handleContentTypeChange(index, e.target.value)
                          }
                          className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="normal">Normal</option>
                          <option value="proverb">Proverb</option>
                          <option value="grammar_rule">Grammar Rule</option>
                        </select>
                      </div>

                      {content.contentType !== "grammar_rule" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content Text
                          </label>
                          <TextEditor
                            value={content.customText || ""}
                            onChange={(value) =>
                              updateContent(index, { customText: value })
                            }
                            placeholder="Type your content here..."
                            height="150px"
                          />
                        </div>
                      )}

                      {content.contentType === "proverb" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Proverb
                          </label>
                          <textarea
                            value={content.proverb || ""}
                            onChange={(e) =>
                              updateContent(index, { proverb: e.target.value })
                            }
                            rows={2}
                            className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {content.contentType === "grammar_rule" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Grammar Title
                            </label>
                            <input
                              type="text"
                              value={content.grammarTitle || ""}
                              onChange={(e) =>
                                updateContent(index, {
                                  grammarTitle: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Grammar Subtitle
                            </label>
                            <input
                              type="text"
                              value={content.grammarSubtitle || ""}
                              onChange={(e) =>
                                updateContent(index, {
                                  grammarSubtitle: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Grammar Description
                            </label>
                            <textarea
                              value={
                                Array.isArray(content.grammarDescription)
                                  ? content.grammarDescription.join("\n")
                                  : content.grammarDescription || ""
                              }
                              onChange={(e) =>
                                updateContent(index, {
                                  grammarDescription: e.target.value.split("\n"),
                                })
                              }
                              placeholder="One bullet point per line"
                              rows={4}
                              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Grammar Examples
                            </label>
                            <div className="space-y-3">
                              {(content.grammarExamples || []).map(
                                (example, exampleIndex) => (
                                  <div
                                    key={exampleIndex}
                                    className="p-3 bg-gray-50 rounded-md flex flex-col sm:flex-row gap-2"
                                  >
                                    <input
                                      type="text"
                                      value={example.yoruba}
                                      onChange={(e) =>
                                        handleGrammarExampleChange(
                                          index,
                                          exampleIndex,
                                          "yoruba",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Yoruba"
                                      className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                      type="text"
                                      value={example.translation}
                                      onChange={(e) =>
                                        handleGrammarExampleChange(
                                          index,
                                          exampleIndex,
                                          "translation",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Translation"
                                      className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveGrammarExample(
                                          index,
                                          exampleIndex
                                        )
                                      }
                                      className="text-red-600 hover:text-red-800 hover:cursor-pointer self-center shrink-0"
                                      title="Remove example"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                )
                              )}
                              <button
                                type="button"
                                onClick={() => handleAddGrammarExample(index)}
                                className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-700 hover:border-blue-500 hover:cursor-pointer"
                              >
                                + Add Example
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Translation/Summary
                    </label>
                    <textarea
                      value={content.translation}
                      onChange={(e) =>
                        updateContent(index, { translation: e.target.value })
                      }
                      disabled={content.contentType === "grammar_rule"}
                      placeholder="Enter translation or summary text"
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md text-[#012657] font-[500] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#F8F9FA" }}
                    />
                  </div>

                  {/* Media Files */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media Files
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <label className="block">
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) =>
                            handleFileUpload(
                              index,
                              e.target.files,
                              ContentDataType.AUDIO
                            )
                          }
                          className="hidden"
                        />
                        <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                          <Upload size={16} className="mr-2" />
                          Upload Audio
                        </div>
                      </label>

                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(
                              index,
                              e.target.files,
                              ContentDataType.IMAGE
                            )
                          }
                          className="hidden"
                        />
                        <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                          <Upload size={16} className="mr-2" />
                          Upload Image
                        </div>
                      </label>

                      <label className="block">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            handleFileUpload(
                              index,
                              e.target.files,
                              ContentDataType.VIDEO
                            )
                          }
                          className="hidden"
                        />
                        <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                          <Upload size={16} className="mr-2" />
                          Upload Video
                        </div>
                      </label>
                    </div>

                    {content.contentFiles.length > 0 && (
                      <div className="space-y-3">
                        <h6 className="text-sm font-medium text-gray-700">
                          Uploaded Files:
                        </h6>
                        {content.contentFiles.map((file, fileIndex) => {
                          const fileId = `${index}-${fileIndex}`;
                          const isUploading = uploadingFiles.has(fileId);

                          return (
                            <div
                              key={fileIndex}
                              className="p-3 bg-gray-50 rounded-md"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <span className="text-sm text-[#012657] font-medium capitalize mr-2">
                                    {file.contentType}:
                                  </span>

                                  {file.contentType ===
                                    ContentDataType.IMAGE && (
                                    <img
                                      src={file.filePath}
                                      alt="Preview"
                                      className="w-16 h-16 object-cover rounded mr-2"
                                    />
                                  )}

                                  {file.contentType ===
                                    ContentDataType.AUDIO && (
                                    <audio
                                      controls
                                      className="mr-2"
                                      style={{ height: "40px" }}
                                    >
                                      <source src={file.filePath} />
                                      Your browser does not support audio
                                      playback.
                                    </audio>
                                  )}

                                  {file.contentType ===
                                    ContentDataType.VIDEO && (
                                    <video
                                      controls
                                      className="w-24 h-16 object-cover rounded mr-2"
                                      style={{ maxHeight: "64px" }}
                                    >
                                      <source src={file.filePath} />
                                      Your browser does not support video
                                      playback.
                                    </video>
                                  )}
                                  <span className="text-sm text-gray-600">
                                    {isUploading
                                      ? "Uploading..."
                                      : file.file?.name || "File"}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeContentFile(index, fileIndex)
                                  }
                                  className="text-red-600 hover:text-red-800"
                                  title="Remove file"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>

                              <div className="mt-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Description (optional):
                                </label>
                                <textarea
                                  value={file.description || ""}
                                  onChange={(e) =>
                                    updateMediaDescription(
                                      index,
                                      fileIndex,
                                      e.target.value
                                    )
                                  }
                                  rows={2}
                                  className="w-full px-2 py-1 text-sm border text-[#012657] font-[400] border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {contents.length === 0 && (
              <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                No content added yet. Click &quot;Add Content&quot; to create
                your first content item.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <InAppButton
            onClick={onClose}
            background="#8a0c03"
            disabled={createLessonLoading || attachingContents}
          >
            Cancel
          </InAppButton>
          <InAppButton
            onClick={handleSave}
            background="#012657"
            disabled={createLessonLoading || attachingContents}
          >
            <div className="flex justify-center items-center">
              <Save size={16} className="mr-2" />
              {createLessonLoading || attachingContents
                ? "Processing..."
                : "Create Lesson"}
            </div>
          </InAppButton>
        </div>
      </div>
    </Modal>

    <EdedunModal
      isOpen={showEdeunModal}
      onClose={() => setShowEdeunModal(false)}
      onSelect={handleEdedunSelection}
    />
    </>
  );
};

export default AddLessonModal;
