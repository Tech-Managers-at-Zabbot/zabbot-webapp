/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/general/Modal";
import { Course, Lesson } from "@/types/interfaces";
import { Level } from "@/types/enums";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  useGetCourseLessons,
  useGetCourseQuizzes,
} from "@/services/generalApi/lessons/mutation";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | Record<string, any>;
  lessons?: Lesson[];
  quizzes?: any[];
  onSaveCourse: (courseData: Course) => void;
  onSaveLesson: (lessonData: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  // onSaveQuiz: (quizData: any) => void;
  onDeleteQuiz: (quizId: string) => void;
  onOpenAddQuizModal: (quiz?: any) => void; // Add this line
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  course,
  onSaveCourse,
  onSaveLesson,
  onDeleteLesson,
  onDeleteQuiz,
  onOpenAddQuizModal,
}) => {
  const [activeTab, setActiveTab] = useState<"course" | "lessons" | "quizzes">(
    "course"
  );
  const [courseData, setCourseData] = useState<
    Course | Record<string, any> | any
  >({});
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(
    new Set()
  );
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<any | null>(null);

  const { data: courseQuizzes, isLoading: quizzesLoading } =
    useGetCourseQuizzes(course?.id);

  const quizzes = courseQuizzes?.data || [];
  console.log("quizzes", courseQuizzes);

  const { data: courseLessons, isLoading: lessonsLoading } =
    useGetCourseLessons(course?.id);

  const lessons = courseLessons?.data || [];

  // Initialize course data when modal opens
  useEffect(() => {
    if (course && isOpen) {
      setCourseData({ ...course });
      setHasChanges(false);
    }
  }, [course, isOpen]);

  if (!course || !courseData) return null;

  const handleCourseChange = (field: keyof Course, value: any) => {
    setCourseData((prev: Record<string, any>) => ({
      ...prev!,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSaveCourse = () => {
    if (courseData && hasChanges) {
      onSaveCourse(courseData);
      setHasChanges(false);
    }
  };

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
      onSaveLesson(editingLesson);
      setEditingLesson(null);
    }
  };

  // Replace the existing handleEditQuiz function with:
  const handleEditQuiz = (quiz: any) => {
    setEditingQuiz(quiz);
    onClose(); // Close the edit course modal
    onOpenAddQuizModal(quiz); // Call the function to open add quiz modal
  };

  const handleQuizChange = (field: string, value: any) => {
    if (editingQuiz) {
      setEditingQuiz((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveQuiz = () => {
    if (editingQuiz) {
      // onSaveQuiz(editingQuiz);
      setEditingQuiz(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Course"
      size="xl"
      containerClassName="w-full"
    >
      <div className="p-6 w-full" style={{ fontFamily: "Lexend" }}>
        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`px-4 py-2 hover:cursor-pointer font-medium text-sm ${
              activeTab === "course"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("course")}
          >
            Course Details
          </button>
          <button
            className={`px-4 py-2 hover:cursor-pointer  font-medium text-sm ml-4 ${
              activeTab === "lessons"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("lessons")}
          >
            Lessons ({lessons.length})
          </button>
          <button
            className={`px-4 py-2 hover:cursor-pointer  font-medium text-sm ml-4 ${
              activeTab === "quizzes"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("quizzes")}
          >
            Quizzes ({quizzes.length})
          </button>
        </div>

        {/* Course Details Tab */}
        {activeTab === "course" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => handleCourseChange("title", e.target.value)}
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={courseData.level}
                  onChange={(e) =>
                    handleCourseChange("level", e.target.value as Level)
                  }
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={Level.BUILDER}>Builder</option>
                  <option value={Level.FOUNDATION}>Intermediate</option>
                  <option value={Level.EXPLORER}>Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={courseData.description}
                onChange={(e) =>
                  handleCourseChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-3 text-[#252525] py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Duration (minutes)
                </label>
                <input
                  type="number"
                  value={courseData.estimatedDuration || ""}
                  onChange={(e) =>
                    handleCourseChange(
                      "estimatedDuration",
                      parseInt(e.target.value) || undefined
                    )
                  }
                  className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={courseData.isActive}
                    onChange={(e) =>
                      handleCourseChange("isActive", e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Course is active
                  </span>
                </label>
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={courseData.tags?.join(', ') || ''}
                onChange={(e) => handleCourseChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. beginner, grammar, vocabulary"
              />
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prerequisites (comma-separated)
              </label>
              <input
                type="text"
                value={courseData.prerequisites?.join(', ') || ''}
                onChange={(e) => handleCourseChange('prerequisites', e.target.value.split(',').map(prereq => prereq.trim()).filter(prereq => prereq))}
                className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Basic alphabet knowledge, Previous course completion"
              />
            </div> */}

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSaveCourse}
                disabled={!hasChanges}
                className={`px-6 py-2 rounded-md font-medium flex items-center ${
                  hasChanges
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} className="mr-2" />
                Save Course Details
              </button>
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Course Lessons
              </h3>
              <button
                onClick={() => {
                  /* Add new lesson logic */
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Lesson
              </button>
            </div>

            {lessonsLoading ? (
              <div className="flex flex-col gap-[15px] min-w-max">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DashboardMetricCardSkeleton key={index} />
                ))}
              </div>
            ) : lessons.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>
                  No lessons available. Add your first lesson to get started.
                </p>
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
                            <ChevronDown size={20} className="text-gray-500" />
                          ) : (
                            <ChevronRight size={20} className="text-gray-500" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            Lesson {lesson.orderNumber}: {lesson.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                        disabled
                          onClick={() => handleEditLesson(lesson)}
                          className="px-3 py-1 text-sm text-gray-600 cursor-not-allowed rounded"
                        >
                          <Edit size={14} className="mr-1 inline" />
                          Edit
                        </button>
                        <button
                        disabled
                          onClick={() => onDeleteLesson(lesson.id!)}
                          className="px-3 py-1 text-sm text-gray-600 cursor-not-allowed rounded"
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
                            <p className="text-sm text-gray-600">
                              {lesson.outcomes}
                            </p>
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
                                .map(
                                  (
                                    content: Record<string, any>,
                                    index: number
                                  ) => (
                                    <div
                                      key={index}
                                      className="text-xs text-gray-500 bg-gray-50 p-2 rounded"
                                    >
                                      {content.customText && (
                                        <>
                                          {content.customText.startsWith(
                                            "<"
                                          ) ? (
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
                                            {content.contentFiles.length} media
                                            file(s)
                                          </div>
                                        )}
                                    </div>
                                  )
                                )}
                              {lesson.contents.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  ... and {lesson.contents.length - 3} more
                                  items
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

            {/* Edit Lesson Form */}
            {editingLesson && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Edit Lesson
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lesson Title
                          </label>
                          <input
                            type="text"
                            value={editingLesson.title}
                            onChange={(e) =>
                              handleLessonChange("title", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Order Number
                          </label>
                          <input
                            type="number"
                            value={editingLesson.orderNumber}
                            onChange={(e) =>
                              handleLessonChange(
                                "orderNumber",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={editingLesson.description}
                          onChange={(e) =>
                            handleLessonChange("description", e.target.value)
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Headline Tag
                          </label>
                          <input
                            type="text"
                            value={editingLesson.headlineTag || ""}
                            onChange={(e) =>
                              handleLessonChange("headlineTag", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Time (minutes)
                          </label>
                          <input
                            type="number"
                            value={editingLesson.estimatedTime || ""}
                            onChange={(e) =>
                              handleLessonChange(
                                "estimatedTime",
                                parseInt(e.target.value) || undefined
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Objectives
                        </label>
                        <textarea
                          value={editingLesson.objectives || ""}
                          onChange={(e) =>
                            handleLessonChange("objectives", e.target.value)
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Outcomes
                        </label>
                        <textarea
                          value={editingLesson.outcomes || ""}
                          onChange={(e) =>
                            handleLessonChange("outcomes", e.target.value)
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setEditingLesson(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveLesson}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      >
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Course Quizzes
              </h3>
              <button
                onClick={() => {
                  onOpenAddQuizModal();
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 hover:cursor-pointer text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Quiz
              </button>
            </div>

            {quizzesLoading ? (
              <div className="flex flex-col gap-[15px] min-w-max">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DashboardMetricCardSkeleton key={index} />
                ))}
              </div>
            ) : quizzes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No quizzes available. Add your first quiz to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {quizzes.map((quiz: Record<string, any>, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg text-gray-900">
                      <span className="font-semibold">Lesson Title:</span>{" "}
                      {quiz?.lessonDetails?.title || "No title provided"}
                    </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditQuiz(quiz)}
                          disabled
                          className="px-3 py-1 text-sm text-gray-600 cursor-not-allowed rounded"
                        >
                          <Edit size={14} className="mr-1 inline" />
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteQuiz(quiz.id)}
                          disabled
                          className="px-3 py-1 text-sm text-gray-600 cursor-not-allowed rounded"
                        >
                          <Trash2 size={14} className="mr-1 inline" />
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Quiz Instruction: </span>
                    {quiz?.instruction || "No instruction provided"}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Quiz Question: {quiz.question}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Edit Quiz Form */}
            {editingQuiz && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Edit Quiz
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quiz Title
                        </label>
                        <input
                          type="text"
                          value={editingQuiz.title}
                          onChange={(e) =>
                            handleQuizChange("title", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={editingQuiz.description}
                          onChange={(e) =>
                            handleQuizChange("description", e.target.value)
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Associated Lesson
                          </label>
                          <select
                            value={editingQuiz.lessonId}
                            onChange={(e) =>
                              handleQuizChange("lessonId", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select a lesson</option>
                            {lessons.map((lesson: Record<string, any>) => (
                              <option key={lesson.id} value={lesson.id}>
                                Lesson {lesson.orderNumber}: {lesson.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration (minutes)
                          </label>
                          <input
                            type="number"
                            value={editingQuiz.duration || ""}
                            onChange={(e) =>
                              handleQuizChange(
                                "duration",
                                parseInt(e.target.value) || undefined
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setEditingQuiz(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveQuiz}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      >
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditCourseModal;
