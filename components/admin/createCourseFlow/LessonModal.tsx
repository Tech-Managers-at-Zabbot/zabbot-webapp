/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Lesson, Content } from "../../../types/interfaces";
import { ContentDataType, ContentSourceType } from '../../../types/enums';
import NormalInputField from "@/components/NormalInputField";
import TextEditor from "@/components/general/TextEditor";
import { Trash2, Upload } from "lucide-react";
import InAppButton from "@/components/InAppButton";
import { appColors } from "@/constants/colors";

interface LessonModalProps {
  showLessonModal: boolean;
  currentLesson: Lesson;
  currentLessonIndex: number | null;
  lessonErrors: any;
  editingContentIndex: number | null;
  showEdeunModal: boolean;
  setShowLessonModal: (show: boolean) => void;
  setCurrentLessonIndex: (index: number | null) => void;
  handleLessonChange: (field: keyof Lesson, value: any) => void;
  updateContent: (index: number, updates: Partial<Content>) => void;
  removeContent: (index: number) => void;
  handleFileUpload: (
    contentIndex: number,
    files: FileList | null,
    contentType: ContentDataType
  ) => void;
  removeContentFile: (contentIndex: number, fileIndex: number) => void;
  updateMediaDescription: (
    contentIndex: number,
    fileIndex: number,
    description: string
  ) => void;
  saveLesson: () => void;
  resetLessonForm: () => void;
  setEditingContentIndex: (index: number | null) => void;
  setShowEdeunModal: (show: boolean) => void;
  setCurrentContentSourceType: (type: ContentSourceType) => void;
  addContent: (sourceType: ContentSourceType) => void;
}

const LessonModal: React.FC<LessonModalProps> = ({
  showLessonModal,
  currentLesson,
  currentLessonIndex,
  lessonErrors,
  // editingContentIndex,
  // showEdeunModal,
  setShowLessonModal,
  setCurrentLessonIndex,
  handleLessonChange,
  updateContent,
  removeContent,
  handleFileUpload,
  removeContentFile,
  updateMediaDescription,
  saveLesson,
  // resetLessonForm,
  setEditingContentIndex,
  setShowEdeunModal,
  // setCurrentContentSourceType,
  addContent,
}) => {
  if (!showLessonModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-[#012657] font-semibold">
              {currentLessonIndex !== null ? "Edit Lesson" : "Create New Lesson"}
            </h2>
            <button
              onClick={() => {
                setShowLessonModal(false);
                setCurrentLessonIndex(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Lesson Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Title *
                </label>
                <NormalInputField
                  id="lessonTitle"
                  value={currentLesson.title}
                  onChange={(e) => handleLessonChange("title", e.target.value)}
                  placeholder="Enter lesson title"
                  type="text"
                  error={!!lessonErrors.title}
                  errorMessage={lessonErrors.title}
                  backgroundColor="#E3EFFC"
                  border="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number *
                </label>
                <NormalInputField
                  id="lessonOrder"
                  value={currentLesson.orderNumber.toString()}
                  onChange={(e) =>
                    handleLessonChange("orderNumber", parseInt(e.target.value))
                  }
                  placeholder="Lesson order"
                  type="number"
                  error={!!lessonErrors.orderNumber}
                  errorMessage={lessonErrors.orderNumber}
                  backgroundColor="#E3EFFC"
                  border="0"
                />
              </div>
            </div>

            {/* Lesson Headline Tag */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headline Tag
              </label>
              <NormalInputField
                id="lessonHeadlineTag"
                value={currentLesson.headlineTag || ""}
                onChange={(e) =>
                  handleLessonChange("headlineTag", e.target.value)
                }
                placeholder="Enter a short headline tag for this lesson"
                type="text"
                backgroundColor="#E3EFFC"
                border="0"
              />
            </div>

            {/* Lesson Estimated Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Time (minutes)
              </label>
              <NormalInputField
                id="lessonEstimatedTime"
                value={currentLesson.estimatedTime?.toString() || ""}
                onChange={(e) =>
                  handleLessonChange(
                    "estimatedTime",
                    parseInt(e.target.value) || undefined
                  )
                }
                placeholder="Enter estimated time to complete this lesson"
                type="number"
                backgroundColor="#E3EFFC"
                border="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={currentLesson.description}
                onChange={(e) =>
                  handleLessonChange("description", e.target.value)
                }
                placeholder="Enter lesson description"
                rows={3}
                className="w-full text-[#80838D] font-[500] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: "#E3EFFC",
                  border: lessonErrors.description ? "1px solid #D42620" : "0",
                  fontFamily: "Lexend",
                }}
              />
              {lessonErrors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {lessonErrors.description}
                </p>
              )}
            </div>

            {/* Lesson Outcomes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Outcomes
              </label>
              <textarea
                value={currentLesson.outcomes || ""}
                onChange={(e) => handleLessonChange("outcomes", e.target.value)}
                placeholder="What will students learn from this lesson? (One per line)"
                rows={3}
                className="w-full px-3 text-[#80838D] border-0 font-[500] py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: "#E3EFFC",
                  fontFamily: "Lexend",
                }}
              />
            </div>

            {/* Lesson Objectives */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Objectives
              </label>
              <textarea
                value={currentLesson.objectives || ""}
                onChange={(e) =>
                  handleLessonChange("objectives", e.target.value)
                }
                placeholder="What are the measurable objectives for this lesson? (One per line)"
                rows={3}
                className="w-full px-3 text-[#80838D] font-[500] py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: "#E3EFFC",
                  fontFamily: "Lexend",
                }}
              />
            </div>

            {/* Contents Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Lesson Contents
                </h3>
                <div className="relative">
                  <select
                    onChange={(e) => {
                      const sourceType = e.target.value as ContentSourceType;
                      addContent(sourceType);
                      e.target.value = ""; // Reset select
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
                    <option value={ContentSourceType.NEW}>
                      Add New Content
                    </option>
                  </select>
                </div>
              </div>

              {currentLesson.contents.map((content, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[#012657] font-medium">
                        Content {index + 1}
                      </h4>
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
                      onClick={() => removeContent(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {content.sourceType === ContentSourceType.EDEDUN ? (
                      <div>
                        <label className="block text-sm font-medium text-[#012657] mb-2">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Translation/Summary *
                      </label>
                      <textarea
                        value={content.translation}
                        onChange={(e) =>
                          updateContent(index, {
                            translation: e.target.value,
                          })
                        }
                        placeholder="Enter translation or summary text"
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md text-[#012657] font-[500] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ backgroundColor: "#F8F9FA" }}
                      />
                    </div>

                    {/* Media Files Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Media Files
                      </label>

                      {/* File Upload Buttons */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
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
                        </div>

                        <div>
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
                        </div>

                        <div>
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
                      </div>

                      {/* Display uploaded files with description option */}
                      {content.contentFiles.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium text-gray-700">
                            Uploaded Files:
                          </h5>
                          {content.contentFiles.map((file, fileIndex) => {
                            // const fileId = `${index}-${fileIndex}`;
                            const description = file.description || "";

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

                                    {/* Preview based on file type */}
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
                                      {file.file?.name || "File"}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() =>
                                      removeContentFile(index, fileIndex)
                                    }
                                    className="text-red-600 hover:text-red-800"
                                    title="Remove file"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>

                                {/* Yoruba description for media */}
                                <div className="mt-2">
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Yoruba Description (optional):
                                  </label>
                                  <textarea
                                    value={description}
                                    onChange={(e) =>
                                      updateMediaDescription(
                                        index,
                                        fileIndex,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Kọ àlàyé nípa fáìlì yìí ní èdè Yorùbá..."
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

              {currentLesson.contents.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  No content added yet. Click "Add Content" to create your first
                  content item.
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <button
              onClick={() => {
                setShowLessonModal(false);
                setCurrentLessonIndex(null);
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <InAppButton
              onClick={saveLesson}
              background={appColors.darkRoyalBlueForBtn}
              width="120px"
              height="40px"
            >
              Save Lesson
            </InAppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;