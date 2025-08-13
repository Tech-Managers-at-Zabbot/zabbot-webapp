/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/general/Modal";
import { Save, Plus, Trash2 } from "lucide-react";
import {
  useCreateQuiz,
  useGetCourseLessons,
} from "@/services/generalApi/lessons/mutation";
import { useAlert } from "next-alert";
import InAppButton from "@/components/InAppButton";

export enum QuizType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  FILL_IN_BLANK = "FILL_IN_BLANK",
}

interface Quiz {
  id?: string;
  courseId: string;
  lessonId?: string;
  contentId?: string;
  languageId: string;
  quizType: QuizType;
  instruction: string;
  question: string;
  options?: string[];
  correctOption?: string;
  correctAnswer?: string;
}

interface AddQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveQuiz: () => void;
  courseId: string;
  languageId: string;
  editingQuiz?: Quiz | null;
}

const AddQuizModal: React.FC<AddQuizModalProps> = ({
  isOpen,
  onClose,
  courseId,
  languageId,
  editingQuiz,
  onSaveQuiz,
}) => {
  const [quizData, setQuizData] = useState<Quiz>({
    courseId,
    languageId,
    quizType: QuizType.MULTIPLE_CHOICE,
    instruction: "",
    question: "",
    options: ["", ""],
    correctOption: "",
  });

  const [associationType, setAssociationType] = useState<"lesson" | "content">(
    "lesson"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveQuizLoading, setSaveQuizLoading] = useState(false);
  const { mutate: addQuiz, isPending: createQuizLoading } = useCreateQuiz();

  const { addAlert } = useAlert();

  const { data: courseLessons, isLoading: lessonsLoading } =
    useGetCourseLessons(courseId);

  const lessons = courseLessons?.data || [];

  // Initialize form when modal opens or editing quiz changes
  useEffect(() => {
    if (isOpen) {
      if (editingQuiz) {
        setQuizData({ ...editingQuiz });
        setAssociationType(editingQuiz.lessonId ? "lesson" : "content");
      } else {
        setQuizData({
          courseId,
          languageId,
          quizType: QuizType.MULTIPLE_CHOICE,
          instruction: "",
          question: "",
          options: ["", ""],
          correctOption: "",
        });
        setAssociationType("lesson");
      }
      setErrors({});
    }
  }, [isOpen, editingQuiz, courseId, languageId]);

  const handleInputChange = (field: keyof Quiz, value: any) => {
    setQuizData((prev) => {
      const newData = { ...prev, [field]: value };

      // Clear related fields when quiz type changes
      if (field === "quizType") {
        if (value === QuizType.MULTIPLE_CHOICE) {
          newData.correctAnswer = undefined;
          if (!newData.options || newData.options.length < 2) {
            newData.options = ["", ""];
          }
          newData.correctOption = "";
        } else if (value === QuizType.FILL_IN_BLANK) {
          newData.correctOption = undefined;
          newData.correctAnswer = "";
          // Keep options as they are for fill in blank (can be empty array or have values)
        }
      }

      return newData;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAssociationTypeChange = (type: "lesson" | "content") => {
    setAssociationType(type);
    setQuizData((prev) => ({
      ...prev,
      lessonId: type === "lesson" ? "" : undefined,
      contentId: type === "content" ? "" : undefined,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(quizData.options || [])];
    newOptions[index] = value;
    setQuizData((prev) => ({ ...prev, options: newOptions }));
    
    // Clear correct answer/option when options change
    if (quizData.quizType === QuizType.FILL_IN_BLANK) {
      setQuizData((prev) => ({ ...prev, correctAnswer: "" }));
    } else {
      setQuizData((prev) => ({ ...prev, correctOption: "" }));
    }
  };

  const addOption = () => {
    const newOptions = [...(quizData.options || []), ""];
    setQuizData((prev) => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index: number) => {
    const currentOptions = quizData.options || [];
    
    // For multiple choice, minimum 2 options required
    if (quizData.quizType === QuizType.MULTIPLE_CHOICE && currentOptions.length <= 2) {
      return;
    }
    
    // For fill in blank, allow removal of all options
    const newOptions = currentOptions.filter((_, i) => i !== index);
    
    setQuizData((prev) => {
      const updatedData = { ...prev, options: newOptions };
      
      if (quizData.quizType === QuizType.MULTIPLE_CHOICE) {
        // For multiple choice, update correctOption if it's no longer valid
        if (!newOptions.includes(prev.correctOption || "")) {
          updatedData.correctOption = "";
        }
      } else {
        // For fill in blank, clear correctAnswer when options change
        updatedData.correctAnswer = "";
      }
      
      return updatedData;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!quizData.instruction.trim()) {
      newErrors.instruction = "Instruction is required";
    }

    if (!quizData.question.trim()) {
      newErrors.question = "Question is required";
    }

    if (!quizData.lessonId && !quizData.contentId) {
      newErrors.association = "Please select either a lesson or content";
    }

    if (quizData.quizType === QuizType.MULTIPLE_CHOICE) {
      if (!quizData.options || quizData.options.length < 2) {
        newErrors.options = "At least 2 options are required";
      } else if (quizData.options.some((option) => !option.trim())) {
        newErrors.options = "All options must be filled";
      }

      if (!quizData.correctOption?.trim()) {
        newErrors.correctOption = "Correct option is required";
      } else if (
        quizData.options &&
        !quizData.options.includes(quizData.correctOption)
      ) {
        newErrors.correctOption =
          "Correct option must be one of the provided options";
      }
    } else if (quizData.quizType === QuizType.FILL_IN_BLANK) {
      if (!quizData.correctAnswer?.trim()) {
        newErrors.correctAnswer = "Correct answer is required";
      }

      // If options are provided for fill in blank, validate them
      if (quizData.options && quizData.options.length > 0) {
        const filledOptions = quizData.options.filter(option => option.trim());
        if (filledOptions.length !== quizData.options.length && quizData.options.some(option => option.trim())) {
          newErrors.options = "All options must be filled or remove empty ones";
        } else if (
          filledOptions.length > 0 &&
          quizData.correctAnswer &&
          !filledOptions
            .map((o) => o.toLowerCase())
            .includes(quizData.correctAnswer.toLowerCase())
        ) {
          newErrors.correctAnswer =
            "Correct answer must be one of the provided options";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setSaveQuizLoading(true);
      const cleanData = { ...quizData };
      if (cleanData.quizType === QuizType.MULTIPLE_CHOICE) {
        delete cleanData.correctAnswer;
      } else if (cleanData.quizType === QuizType.FILL_IN_BLANK) {
        delete cleanData.correctOption;

        if (cleanData.options) {
          cleanData.options = cleanData.options.filter((option) =>
            option.trim()
          );
          if (cleanData.options.length === 0) {
            delete cleanData.options;
          }
        }
      }

      addQuiz(
        { quizPayload: cleanData },
        {
          onSuccess: () => {
            setSaveQuizLoading(false);
            addAlert("Success", "Quiz created successfully", "success");
            onClose();
            onSaveQuiz();
          },
          onError: (error) => {
            setSaveQuizLoading(false);
            addAlert(
              "Error",
              `Unable to create quiz: ${error.message}`,
              "error"
            );
            console.error("Error saving quiz:", error);
          },
        }
      );
    }
  };

  const modalTitle = editingQuiz ? "Edit Quiz" : "Add New Quiz";
  
  // Get filled options for fill in blank dropdown
  const filledOptions = quizData.options?.filter(option => option.trim()) || [];
  const hasOptions = filledOptions.length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      size="lg"
      containerClassName="w-full"
      disableClose={saveQuizLoading || createQuizLoading}
    >
      <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
        <div className="space-y-6">
          {/* Quiz Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiz Type
            </label>
            <div className="flex gap-4">
              <label className="flex text-gray-700 items-center">
                <input
                  type="radio"
                  value={QuizType.MULTIPLE_CHOICE}
                  checked={quizData.quizType === QuizType.MULTIPLE_CHOICE}
                  onChange={(e) =>
                    handleInputChange("quizType", e.target.value as QuizType)
                  }
                  className="mr-2"
                />
                Multiple Choice
              </label>
              <label className="flex text-gray-700 items-center">
                <input
                  type="radio"
                  value={QuizType.FILL_IN_BLANK}
                  checked={quizData.quizType === QuizType.FILL_IN_BLANK}
                  onChange={(e) =>
                    handleInputChange("quizType", e.target.value as QuizType)
                  }
                  className="mr-2"
                />
                Fill in the Blank
              </label>
            </div>
          </div>

          {/* Association Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Associate with
            </label>
            <div className="flex gap-4 mb-3">
              <label className="flex text-gray-700 items-center">
                <input
                  type="radio"
                  value="lesson"
                  checked={associationType === "lesson"}
                  onChange={(e) =>
                    handleAssociationTypeChange(
                      e.target.value as "lesson" | "content"
                    )
                  }
                  className="mr-2"
                />
                Lesson
              </label>
            </div>

            {associationType === "lesson" &&
              (lessonsLoading ? (
                <div className="flex flex-col gap-[15px] min-w-max italic">
                  loading steps Please wait...
                </div>
              ) : lessons.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    No steps available. Add your first lesson to get started.
                  </p>
                </div>
              ) : (
                <select
                  onChange={(e) =>
                    handleInputChange("lessonId", e.target.value)
                  }
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select step</option>
                  {lessons?.map((lesson: any) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.customText
                        ? lesson.customText.slice(0, 50) + "..."
                        : `Step ${lesson.orderNumber}: ${lesson.title}`}
                    </option>
                  ))}
                </select>
              ))}
            {errors.association && (
              <p className="text-red-500 text-sm mt-1">{errors.association}</p>
            )}
          </div>

          {/* Instruction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instruction
            </label>
            <input
              type="text"
              value={quizData.instruction}
              onChange={(e) => handleInputChange("instruction", e.target.value)}
              placeholder="e.g., Choose the correct word, Fill in the blank"
              className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.instruction && (
              <p className="text-red-500 text-sm mt-1">{errors.instruction}</p>
            )}
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={quizData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              rows={3}
              placeholder="Enter your question here..."
              className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.question && (
              <p className="text-red-500 text-sm mt-1">{errors.question}</p>
            )}
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {quizData.quizType === QuizType.MULTIPLE_CHOICE
                ? "Options (Required)"
                : "Options (Optional - for memory boost)"}
            </label>
            <div className="space-y-2">
              {(quizData.options || []).map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Show remove button based on quiz type and minimum requirements */}
                  {((quizData.quizType === QuizType.MULTIPLE_CHOICE && (quizData.options?.length || 0) > 2) ||
                    (quizData.quizType === QuizType.FILL_IN_BLANK)) && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {(quizData.options?.length || 0) < 6 && (
              <button
                type="button"
                onClick={addOption}
                className="mt-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded flex items-center"
              >
                <Plus size={14} className="mr-1" />
                Add Option
              </button>
            )}
            {errors.options && (
              <p className="text-red-500 text-sm mt-1">{errors.options}</p>
            )}
          </div>

          {/* Correct Answer/Option */}
          {quizData.quizType === QuizType.MULTIPLE_CHOICE && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Option
              </label>
              <select
                value={quizData.correctOption || ""}
                onChange={(e) =>
                  handleInputChange("correctOption", e.target.value)
                }
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select the correct option</option>
                {(quizData.options || []).map(
                  (option, index) =>
                    option.trim() && (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                )}
              </select>
              {errors.correctOption && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.correctOption}
                </p>
              )}
            </div>
          )}

          {quizData.quizType === QuizType.FILL_IN_BLANK && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              {hasOptions ? (
                // Show dropdown if options are available
                <select
                  value={quizData.correctAnswer || ""}
                  onChange={(e) =>
                    handleInputChange("correctAnswer", e.target.value)
                  }
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select the correct answer</option>
                  {filledOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                // Show text input if no options are available
                <input
                  type="text"
                  value={quizData.correctAnswer || ""}
                  onChange={(e) =>
                    handleInputChange("correctAnswer", e.target.value)
                  }
                  placeholder="Enter the correct answer"
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {errors.correctAnswer && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.correctAnswer}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <InAppButton
            onClick={onClose}
            background="#8a0c03"
            disabled={saveQuizLoading || createQuizLoading}
          >
            Cancel
          </InAppButton>
          <InAppButton
            onClick={handleSave}
            background="#012657"
            disabled={saveQuizLoading || createQuizLoading}
          >
            <div className="flex justify-center items-center">
              <Save size={16} className="mr-2" />
              {saveQuizLoading || createQuizLoading
                ? "Processing..."
                : editingQuiz
                ? "Update Quiz"
                : "Create Quiz"}
            </div>
          </InAppButton>
        </div>
      </div>
    </Modal>
  );
};

export default AddQuizModal;