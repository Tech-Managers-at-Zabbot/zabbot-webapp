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
import { Lesson } from "@/types/interfaces";
import { useUpdateLessonById } from "@/services/generalApi/lessons/mutation";


interface LessonsTabProps {
  lessons: Lesson[];
  isLoading: boolean;
  onSaveLesson: (lessonData: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
}

export const LessonsTab: React.FC<LessonsTabProps> = ({
  lessons,
  isLoading,
  onSaveLesson,
  onDeleteLesson,
}) => {
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const { mutate: handleUpdateLessonById } = useUpdateLessonById();
  const toggleLessonExpansion = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };

  const handleEditLesson = (lesson: Record<string, any> | any) => {
    setEditingLesson({ ...lesson });
  };

  const handleLessonChange = (field: keyof Lesson, value: any) => {
    if (editingLesson) {
      setEditingLesson((prev) => ({ ...prev!, [field]: value }));
    }
  };

  const handleSaveLesson = () => {
    if (editingLesson) {
      console.log("Saving lesson.....>>>>:", editingLesson);
      const { description, estimatedDuration, headLineTag, objectives, orderNumber, outcomes, title, id } = editingLesson;
      handleUpdateLessonById({
        lessonId: editingLesson.id || '',
        updateData: { description, estimatedDuration, headLineTag, objectives, orderNumber, outcomes, title, id },
      });
      setEditingLesson(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Course Lessons</h3>
        <button
          onClick={() => {
            /* Add new lesson logic */
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
            <div
              key={lesson.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="p-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <button
                    onClick={() => toggleLessonExpansion(lesson.id!)}
                    className="mr-2"
                  >
                    {expandedLessons.has(lesson.id!) ? (
                      <ChevronDown size={20} className="text-gray-500 hover:cursor-pointer" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-500 hover:cursor-pointer" />
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
                      <p className="text-sm text-gray-600">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditLesson(lesson)}
                    // disabled
                    className="px-3 py-1 cursor-pointer hover:text-gray-900 text-sm text-gray-600 rounded"
                  >
                    <Edit size={14} className="mr-1 inline" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteLesson(lesson.id!)}
                    // disabled
                    className="px-3 py-1 cursor-pointer hover:text-gray-900 text-sm text-gray-600 rounded"
                  >
                    <Trash2 size={14} className="mr-1 inline" />
                    Delete
                  </button>
                </div>
              </div>

              {expandedLessons.has(lesson.id!) && (
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
                      <p className="text-sm text-gray-600">
                        {lesson.objectives}
                      </p>
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

                  {lesson.contents && lesson.contents.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">
                        Content Items: {lesson.contents.length}
                      </span>
                      <div className="space-y-2">
                        {lesson.contents
                          .slice(0, 3)
                          .map((content: Record<string, any>, index: number) => (
                            <div
                              key={index}
                              className="text-xs text-gray-500 bg-gray-50 p-2 rounded"
                            >
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
                              {content.contentFiles &&
                                content.contentFiles.length > 0 && (
                                  <div className="text-gray-500">
                                    {content.contentFiles.length} media file(s)
                                  </div>
                                )}
                            </div>
                          ))}
                        {lesson.contents.length > 3 && (
                          <div className="text-xs text-gray-500">
                            ... and {lesson.contents.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
    </div>
  );
};