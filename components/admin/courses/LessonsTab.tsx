/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";
import { EditLessonForm } from "./EditLessonForm";
import { EditContentForm } from "./EditContentForm";
import { AddContentForm } from "./AddContentForm";
import { Lesson } from "@/types/interfaces";
import { ContentSourceType } from "@/types/enums";
import { useAlert } from "next-alert";
import {
  useUpdateLessonById,
  useGetLessonWithContents,
  useUpdateContentById,
  useDeleteContentById,
} from "@/services/generalApi/lessons/mutation";

interface LessonAccordionItemProps {
  lesson: Record<string, any>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onEditContent: (content: Record<string, any>, lessonId: string) => void;
  onDeleteContent: (contentId: string, lessonId: string) => void;
  onAddContent: (lessonId: string, languageId?: string) => void;
}

const isEditableContent = (content: Record<string, any>) =>
  content.sourceType !== ContentSourceType.EDEDUN &&
  !(content.ededunPhrases && content.ededunPhrases.length > 0);

const LessonAccordionItem: React.FC<LessonAccordionItemProps> = ({
  lesson,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onEditContent,
  onDeleteContent,
  onAddContent,
}) => {
  const { data: lessonWithContents, isLoading: contentsLoading } =
    useGetLessonWithContents(isExpanded ? lesson.id : undefined);

  const contents = lessonWithContents?.data?.contents || [];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button onClick={onToggleExpand} className="mr-2">
            {isExpanded ? (
              <ChevronDown
                size={20}
                className="text-gray-500 hover:cursor-pointer"
              />
            ) : (
              <ChevronRight
                size={20}
                className="text-gray-500 hover:cursor-pointer"
              />
            )}
          </button>
          <div className="flex items-center gap-4">
            <div>
              {lesson?.lessonImg && (
                <div>
                  <img
                    src={lesson?.lessonImg}
                    className="w-40 h-40 object-cover rounded-md"
                    alt="Lesson Image"
                  />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                Lesson {lesson.orderNumber}: {lesson.title}
              </h4>
              <p className="text-sm text-gray-600">{lesson.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 cursor-pointer hover:text-gray-900 text-sm text-gray-600 rounded"
          >
            <Edit size={14} className="mr-1 inline" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 cursor-pointer hover:text-gray-900 text-sm text-gray-600 rounded"
          >
            <Trash2 size={14} className="mr-1 inline" />
            Delete
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm font-medium text-gray-700">
                Headline:{" "}
              </span>
              <span className="text-sm text-gray-600">
                {lesson.headLineTag || "Not set"}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">
                Estimated Time:{" "}
              </span>
              <span className="text-sm text-gray-600">
                {lesson.estimatedDuration
                  ? `${lesson.estimatedDuration} mins`
                  : "Not set"}
              </span>
            </div>
          </div>

          {lesson.objectives && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700 block mb-1">
                Objectives:
              </span>
              <p className="text-sm text-gray-600">{lesson.objectives}</p>
            </div>
          )}

          {lesson.outcomes && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700 block mb-1">
                Outcomes:
              </span>
              <p className="text-sm text-gray-600">{lesson.outcomes}</p>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Content Items{contents.length > 0 ? `: ${contents.length}` : ""}
              </span>
              <button
                onClick={() => onAddContent(lesson.id, lesson.languageId)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
              >
                <Plus size={14} className="mr-1 inline" />
                Add Content
              </button>
            </div>
            {contentsLoading ? (
              <p className="text-xs text-gray-500">Loading content...</p>
            ) : contents.length === 0 ? (
              <p className="text-xs text-gray-500">
                No content items added yet.
              </p>
            ) : (
              <div className="space-y-2">
                {contents.map((content: Record<string, any>, index: number) => (
                  <div
                    key={content.id || index}
                    className="text-xs text-gray-500 bg-gray-50 p-2 rounded flex items-start justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      {content.customText && (
                        <>
                          {content.customText.startsWith("<") ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: content.customText,
                              }}
                            />
                          ) : (
                            content.customText
                          )}
                        </>
                      )}
                      {content.files && content.files.length > 0 && (
                        <div className="text-gray-500">
                          {content.files.length} media file(s)
                        </div>
                      )}
                      {!isEditableContent(content) && (
                        <div className="text-gray-400 italic">
                          Added via Ededun
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pr-2">
                      {isEditableContent(content) && (
                        <button
                          onClick={() => onEditContent(content, lesson.id)}
                          className="flex items-center text-gray-600 hover:text-gray-900 hover:cursor-pointer"
                        >
                          <Edit size={12} className="mr-1 inline" />
                          Edit
                        </button>
                      )}
                      {isEditableContent(content) && (
                        <button
                          onClick={() => onDeleteContent(content.id, lesson.id)}
                          className="flex items-center text-gray-600 hover:text-red-700 hover:cursor-pointer"
                        >
                          <Trash2 size={12} className="mr-1 inline" />
                          Delete
                        </button>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface LessonsTabProps {
  lessons: Lesson[];
  isLoading: boolean;
  onSaveLesson: (lessonData: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  onOpenAddLessonModal: () => void;
  onCloseEditModal: () => void;
}

export const LessonsTab: React.FC<LessonsTabProps> = ({
  lessons,
  isLoading,
  onDeleteLesson,
  onOpenAddLessonModal,
  onCloseEditModal,
}) => {
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingContent, setEditingContent] = useState<Record<string, any> | null>(null);
  const [editingContentLessonId, setEditingContentLessonId] = useState<string | null>(null);
  const [addingContent, setAddingContent] = useState<{
    lessonId: string;
    languageId?: string;
  } | null>(null);

  const { addAlert } = useAlert();
  const { mutate: handleUpdateLessonById } = useUpdateLessonById();
  const { mutate: handleUpdateContentById, isPending: isSavingContent } =
    useUpdateContentById();
  const { mutate: handleDeleteContentById } = useDeleteContentById();

  const toggleLessonExpansion = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };

  const handleLessonChange = (field: keyof Lesson, value: any) => {
    if (editingLesson) {
      setEditingLesson((prev) => ({ ...prev!, [field]: value }));
    }
  };

  const handleEditLesson = (lesson: Record<string, any> | any) => {
    setEditingLesson({ ...lesson });
  };

  const handleSaveLesson = () => {
    if (editingLesson) {
      const { description, estimatedDuration, headLineTag, objectives, orderNumber, outcomes, title, id } = editingLesson;
      handleUpdateLessonById({
        lessonId: editingLesson.id || '',
        updateData: { description, estimatedDuration, headLineTag, objectives, orderNumber, outcomes, title, id },
      });
      setEditingLesson(null);
    }
  };

  const handleEditContent = (content: Record<string, any>, lessonId: string) => {
    setEditingContent({ ...content });
    setEditingContentLessonId(lessonId);
  };

  const handleDeleteContent = (contentId: string, lessonId: string) => {
    if (!contentId) return;
    if (
      !window.confirm(
        "Are you sure you want to delete this content item? This cannot be undone."
      )
    ) {
      return;
    }
    handleDeleteContentById(
      { contentId, lessonId },
      {
        onSuccess: () => {
          addAlert("Success", "Content deleted successfully", "success");
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

  const handleContentChange = (field: string, value: any) => {
    if (editingContent) {
      setEditingContent((prev) => ({ ...prev!, [field]: value }));
    }
  };

  const handleSaveContent = () => {
    if (editingContent && editingContentLessonId) {
      const {
        customText,
        translation,
        contentType,
        proverb,
        grammarTitle,
        grammarSubtitle,
        grammarDescription,
        grammarExamples,
        id,
      } = editingContent;
      handleUpdateContentById(
        {
          contentId: id || "",
          lessonId: editingContentLessonId,
          updateData: {
            customText,
            translation,
            contentType,
            proverb,
            grammarTitle,
            grammarSubtitle,
            grammarDescription,
            grammarExamples,
          },
        },
        {
          onSuccess: () => {
            addAlert("Success", "Content updated successfully", "success");
            setEditingContent(null);
            setEditingContentLessonId(null);
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
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Course Lessons</h3>
        <button
          onClick={() => {
            onOpenAddLessonModal();
            onCloseEditModal();
          }}
          className="px-4 hover:cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Lesson
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-[15px] min-w-max">
          {Array.from({ length: 6 }).map((_, index) => (
            <DashboardMetricCardSkeleton key={index} />
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No lessons available. Add your first lesson to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson: Record<string, any>) => (
            <LessonAccordionItem
              key={lesson.id}
              lesson={lesson}
              isExpanded={expandedLessons.has(lesson.id!)}
              onToggleExpand={() => toggleLessonExpansion(lesson.id!)}
              onEdit={() => handleEditLesson(lesson)}
              onDelete={() => onDeleteLesson(lesson.id!)}
              onEditContent={handleEditContent}
              onDeleteContent={handleDeleteContent}
              onAddContent={(lessonId, languageId) =>
                setAddingContent({ lessonId, languageId })
              }
            />
          ))}
        </div>
      )}

      {editingLesson && (
        <EditLessonForm
          lesson={editingLesson}
          onLessonChange={handleLessonChange}
          onSave={handleSaveLesson}
          onCancel={() => setEditingLesson(null)}
        />
      )}

      {editingContent && editingContentLessonId && (
        <EditContentForm
          content={editingContent}
          lessonId={editingContentLessonId}
          onContentChange={handleContentChange}
          onSave={handleSaveContent}
          onCancel={() => {
            setEditingContent(null);
            setEditingContentLessonId(null);
          }}
          isSaving={isSavingContent}
        />
      )}

      {addingContent && (
        <AddContentForm
          lessonId={addingContent.lessonId}
          languageId={addingContent.languageId}
          onClose={() => setAddingContent(null)}
        />
      )}
    </div>
  );
};