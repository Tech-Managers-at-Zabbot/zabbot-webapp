"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Save, Trash2, Upload } from "lucide-react";
import { MdOutlineCancel } from "react-icons/md";
import { useAlert } from "next-alert";
import TextEditor from "@/components/general/TextEditor";
import { ContentDataType } from "@/types/enums";
import { CLOUDINARY_CONFIG } from "@/types/interfaces";
import {
  useGetLessonWithContents,
  useAddContentFile,
  useDeleteContentFile,
  useAddSingleContentFile
} from "@/services/generalApi/lessons/mutation";

const getCloudinaryResourceType = (mediaType: ContentDataType) => {
  if (mediaType === ContentDataType.IMAGE) return "image";
  if (mediaType === ContentDataType.VIDEO) return "video";
  // Cloudinary stores audio under the "video" resource type.
  return "video";
};

const uploadToCloudinary = async (
  file: File,
  mediaType: ContentDataType
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  const resourceType = getCloudinaryResourceType(mediaType);
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
  return result.secure_url;
};

interface EditContentFormProps {
  content: Record<string, any>;
  lessonId: string;
  onContentChange: (field: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const getFileId = (content: any, contentType: string) => {
  const item = content.find((f: any) => f.contentType === contentType);
  return item?.id;
};

export const EditContentForm: React.FC<EditContentFormProps> = ({
  content,
  lessonId,
  onContentChange,
  onSave,
  onCancel,
  isSaving,
}) => {
  const { addAlert } = useAlert();
  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Re-fetch the lesson's contents so the file list reflects uploads/removals
  // immediately, since those persist to the backend as soon as they happen
  // (unlike customText/translation, which only save on "Save Changes").
  const { data: lessonWithContents } = useGetLessonWithContents(lessonId);
  const liveContent = lessonWithContents?.data?.contents?.find(
    (c: Record<string, any>) => c.id === content.id
  );
  const contentFiles: Record<string, any>[] =
    liveContent?.contentFiles || content.contentFiles || [];

  const [isUploadingToCloudinary, setIsUploadingToCloudinary] = useState(false);
  const { mutate: addFile, isPending: isSavingFile } = useAddContentFile();
  const { mutate: addSingleFile } = useAddSingleContentFile();
  const { mutate: removeFile, isPending: isRemoving } = useDeleteContentFile();
  const isUploading = isUploadingToCloudinary || isSavingFile;

  const handleFileSelect = async (
    file: File | undefined,
    mediaType: ContentDataType
  ) => {
    if (!file || !content.id) return;

    try {
      setIsUploadingToCloudinary(true);
      const filePath = await uploadToCloudinary(file, mediaType);
      setIsUploadingToCloudinary(false);

      const fileId = getFileId(content?.files, mediaType);

      if (fileId) {
        addFile(
          {
            contentId: fileId || content.id,
            lessonId,
            data: { filePath, contentType: mediaType },
          },
          {
            onSuccess: () => {
              addAlert("Success", "File uploaded successfully", "success");
            },
            onError: (error: any) => {
              addAlert(
                "Error",
                error?.response?.data?.message ||
                "An error occurred while uploading the file",
                "error"
              );
            },
          }
        );
      }


      if (!fileId && content.id) {
        addSingleFile(
          {
            data: { filePath, contentType: mediaType, contentId: content.id },
          },
          {
            onSuccess: (data) => {
              addAlert("Success", "File uploaded successfully", "success");
              const newFileId = data?.data?.id;
              console.log("File uploaded successfully:", data);
              console.log("File newFileId:", newFileId);

              addFile(
                {
                  contentId: newFileId,
                  lessonId,
                  data: { filePath, contentType: mediaType },
                },
                {
                  onSuccess: () => {
                    addAlert("Success", "File uploaded successfully", "success");
                  },
                  onError: (error: any) => {
                    addAlert(
                      "Error",
                      error?.response?.data?.message ||
                      "An error occurred while uploading the file",
                      "error"
                    );
                  },
                }
              );
            },
            onError: (error: any) => {
              addAlert(
                "Error",
                error?.response?.data?.message ||
                "An error occurred while uploading the file",
                "error"
              );
            },
          }
        );
      }


    } catch (error) {
      setIsUploadingToCloudinary(false);
      console.error("Cloudinary upload failed:", error);
      addAlert("Error", "Failed to upload file, please try again", "error");
    }
  };

  const handleRemoveFile = (fileId?: string) => {
    if (!fileId || !content.id) return;

    removeFile(
      { contentId: content.id, lessonId, fileId },
      {
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message ||
            "An error occurred while removing the file",
            "error"
          );
        },
      }
    );
  };

  const contentType = content.contentType || "normal";

  const grammarExamples: { yoruba: string; translation: string }[] =
    Array.isArray(content.grammarExamples) ? content.grammarExamples : [];

  const handleGrammarExampleChange = (
    index: number,
    field: "yoruba" | "translation",
    value: string
  ) => {
    const updated = grammarExamples.map((example, i) =>
      i === index ? { ...example, [field]: value } : example
    );
    onContentChange("grammarExamples", updated);
  };

  const handleAddGrammarExample = () => {
    onContentChange("grammarExamples", [
      ...grammarExamples,
      { yoruba: "", translation: "" },
    ]);
  };

  const handleRemoveGrammarExample = (index: number) => {
    onContentChange(
      "grammarExamples",
      grammarExamples.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Edit Content
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={content.contentType || "normal"}
                onChange={(e) => {
                  const newType = e.target.value;
                  onContentChange("contentType", newType);
                  if (newType === "grammar_rule") {
                    onContentChange("translation", "Grammar Rule");
                  } else if (content.translation === "Grammar Rule") {
                    onContentChange("translation", "");
                  }
                }}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal</option>
                <option value="proverb">Proverb</option>
                <option value="grammar_rule">Grammar Rule</option>
              </select>
            </div>

            {contentType !== "grammar_rule" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Text
                </label>
                <TextEditor
                  value={content.customText || ""}
                  onChange={(value) => onContentChange("customText", value)}
                  placeholder="Type your content here..."
                  height="150px"
                />
              </div>
            )}

            {contentType === "proverb" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proverb
                </label>
                <textarea
                  value={content.proverb || ""}
                  onChange={(e) => onContentChange("proverb", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {contentType === "grammar_rule" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grammar Title
                  </label>
                  <input
                    type="text"
                    value={content.grammarTitle || ""}
                    onChange={(e) =>
                      onContentChange("grammarTitle", e.target.value)
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
                      onContentChange("grammarSubtitle", e.target.value)
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
                      onContentChange(
                        "grammarDescription",
                        e.target.value.split("\n")
                      )
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
                    {grammarExamples.map((example, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-md flex flex-col sm:flex-row gap-2"
                      >
                        <input
                          type="text"
                          value={example.yoruba}
                          onChange={(e) =>
                            handleGrammarExampleChange(
                              index,
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
                              "translation",
                              e.target.value
                            )
                          }
                          placeholder="Translation"
                          className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGrammarExample(index)}
                          className="text-red-600 hover:text-red-800 hover:cursor-pointer self-center shrink-0"
                          title="Remove example"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddGrammarExample}
                      className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-700 hover:border-blue-500 hover:cursor-pointer"
                    >
                      + Add Example
                    </button>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Translation/Summary
              </label>
              <textarea
                value={content.translation || ""}
                onChange={(e) =>
                  onContentChange("translation", e.target.value)
                }
                disabled={contentType === "grammar_rule"}
                rows={3}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Files <span className="text-xs text-gray-900">[{content?.files.length} file(s) exists]</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => {
                      handleFileSelect(e.target.files?.[0], ContentDataType.AUDIO);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => audioInputRef.current?.click()}
                    className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-700 hover:border-blue-500 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Audio
                  </button>
                </div>

                <div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleFileSelect(e.target.files?.[0], ContentDataType.IMAGE);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => imageInputRef.current?.click()}
                    className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-700 hover:border-blue-500 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Image
                  </button>
                </div>

                <div>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      handleFileSelect(e.target.files?.[0], ContentDataType.VIDEO);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-700 hover:border-blue-500 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Video
                  </button>
                </div>
              </div>

              {isUploading && (
                <p className="text-xs text-gray-500 mb-3">Uploading file...</p>
              )}

              {contentFiles.length > 0 ? (
                <div className="space-y-3">
                  {contentFiles.map((file, fileIndex) => (
                    <div
                      key={file.id || fileIndex}
                      className="p-3 bg-gray-50 rounded-md flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center min-w-0">
                        <span className="text-sm text-gray-700 font-medium capitalize mr-2 shrink-0">
                          {file.contentType}:
                        </span>

                        {file.contentType === ContentDataType.IMAGE && (
                          <img
                            src={file.filePath}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded mr-2 shrink-0"
                          />
                        )}

                        {file.contentType === ContentDataType.AUDIO && (
                          <audio controls className="mr-2" style={{ height: "40px" }}>
                            <source src={file.filePath} />
                            Your browser does not support audio playback.
                          </audio>
                        )}

                        {file.contentType === ContentDataType.VIDEO && (
                          <video
                            controls
                            className="w-24 h-16 object-cover rounded mr-2 shrink-0"
                            style={{ maxHeight: "64px" }}
                          >
                            <source src={file.filePath} />
                            Your browser does not support video playback.
                          </video>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        disabled={isRemoving}
                        className="text-red-600 hover:text-red-800 hover:cursor-pointer disabled:opacity-50 shrink-0"
                        title="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">No media files added yet.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onCancel}
              disabled={isSaving}
              className="px-4 py-2 border flex items-center rounded-md hover:bg-red-900 text-gray-600 hover:cursor-pointer hover:text-white"
            >
              <MdOutlineCancel size={16} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isSaving}
              className="px-4 py-2 border flex items-center rounded-md hover:bg-white bg-[#012657] text-white hover:cursor-pointer hover:text-[#012657]"
            >
              <Save size={16} className="mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
