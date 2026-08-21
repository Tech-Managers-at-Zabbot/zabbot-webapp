"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { MdOutlineCancel } from "react-icons/md";
import { useAlert } from "next-alert";
import TextEditor from "@/components/general/TextEditor";
import { useCreateContent } from "@/services/generalApi/lessons/mutation";

interface AddContentFormProps {
  lessonId: string;
  languageId?: string;
  onClose: () => void;
}

const emptyContent = {
  contentType: "normal",
  customText: "",
  translation: "",
  proverb: "",
  grammarTitle: "",
  grammarSubtitle: "",
  grammarDescription: [] as string[],
  grammarExamples: [] as { yoruba: string; translation: string }[],
};

export const AddContentForm: React.FC<AddContentFormProps> = ({
  lessonId,
  languageId,
  onClose,
}) => {
  const { addAlert } = useAlert();
  const [content, setContent] = useState<Record<string, any>>(emptyContent);
  const { mutate: createContent, isPending: isSaving } = useCreateContent();

  const handleContentChange = (field: string, value: any) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleContentTypeChange = (newType: string) => {
    if (newType === "grammar_rule") {
      setContent((prev) => ({
        ...prev,
        contentType: newType,
        translation: "Grammar Rule",
      }));
    } else if (content.translation === "Grammar Rule") {
      setContent((prev) => ({ ...prev, contentType: newType, translation: "" }));
    } else {
      setContent((prev) => ({ ...prev, contentType: newType }));
    }
  };

  const grammarExamples: { yoruba: string; translation: string }[] =
    content.grammarExamples || [];

  const handleGrammarExampleChange = (
    index: number,
    field: "yoruba" | "translation",
    value: string
  ) => {
    handleContentChange(
      "grammarExamples",
      grammarExamples.map((example, i) =>
        i === index ? { ...example, [field]: value } : example
      )
    );
  };

  const handleAddGrammarExample = () => {
    handleContentChange("grammarExamples", [
      ...grammarExamples,
      { yoruba: "", translation: "" },
    ]);
  };

  const handleRemoveGrammarExample = (index: number) => {
    handleContentChange(
      "grammarExamples",
      grammarExamples.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    const payload = { ...content, languageId };

    createContent(
      { lessonId, payload },
      {
        onSuccess: (data: any) => {
          console.log("createContent response:", data);
          addAlert("Success", "Content created successfully", "success");
          onClose();
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message ||
            "An error occurred, please try again",
            "error"
          );
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add Content
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={content.contentType || "normal"}
                onChange={(e) => handleContentTypeChange(e.target.value)}
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
                  onChange={(value) => handleContentChange("customText", value)}
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
                  onChange={(e) => handleContentChange("proverb", e.target.value)}
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
                      handleContentChange("grammarTitle", e.target.value)
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
                      handleContentChange("grammarSubtitle", e.target.value)
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
                      handleContentChange(
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
                  handleContentChange("translation", e.target.value)
                }
                disabled={content.contentType === "grammar_rule"}
                rows={3}
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <p className="text-xs text-gray-500">
              Media files can be added once this content item has been created.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 border flex items-center rounded-md hover:bg-red-900 text-gray-600 hover:cursor-pointer hover:text-white"
            >
              <MdOutlineCancel size={16} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 border flex items-center rounded-md hover:bg-white bg-[#012657] text-white hover:cursor-pointer hover:text-[#012657]"
            >
              <Save size={16} className="mr-2" />
              {isSaving ? "Saving..." : "Create Content"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
