/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Modal } from "@/components/general/Modal";
import { Course } from "@/types/interfaces";
import { Level } from "@/types/enums";
import {
  Clock,
  // Tag,
  ChevronDown,
  ChevronRight,
  Play,
  Image,
  Volume2,
} from "lucide-react";
import {
  useGetCourseLessons,
  useGetCourseQuizzes,
} from "@/services/generalApi/lessons/mutation";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";
import { quizTypeFormatter } from "@/utilities/utilities";

interface ViewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | Record<string, any>;
  quizzes?: any[];
}

const ViewCourseModal: React.FC<ViewCourseModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const [activeTab, setActiveTab] = useState<"course" | "lessons" | "quizzes">(
    "course"
  );
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(
    new Set()
  );

  const { data: courseLessons, isLoading: lessonsLoading } =
    useGetCourseLessons(course?.id);

  const { data: courseQuizzes, isLoading: quizzesLoading } =
    useGetCourseQuizzes(course?.id);

  const quizzes = courseQuizzes?.data || [];

  const lessons = courseLessons?.data || [];
  if (!course) return null;

  const toggleLessonExpansion = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };

  const getLevelBadgeColor = (level: Level) => {
    switch (level) {
      case Level.BUILDER:
        return "bg-green-100 text-green-800";
      case Level.FOUNDATION:
        return "bg-yellow-100 text-yellow-800";
      case Level.EXPLORER:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Not specified";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case "VIDEO":
        return <Play size={16} className="text-blue-500" />;
      case "AUDIO":
        return <Volume2 size={16} className="text-green-500" />;
      case "IMAGE":
        return <Image size={16} className="text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Course Details" size="xl">
      <div className="p-6" style={{ fontFamily: "Lexend" }}>
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
            className={`px-4 py-2 hover:cursor-pointer font-medium text-sm ml-4 ${
              activeTab === "lessons"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("lessons")}
          >
            Lessons ({lessons.length})
          </button>
          <button
            className={`px-4 py-2 hover:cursor-pointer font-medium text-sm ml-4 ${
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
            {/* Course Image and Basic Info */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  {course.thumbnailImage ? (
                    <img
                      src={course.thumbnailImage}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                      <span className="text-white text-2xl font-bold">
                        {course?.title?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadgeColor(
                      course.level
                    )}`}
                  >
                    {course.level}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    {formatDuration(course.estimatedDuration)}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {course.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {/* {course.tags && course.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag: any, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center"
                    >
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )} */}

            {/* Prerequisites */}
            {/* {course.prerequisites && course.prerequisites.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Prerequisites
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {course.prerequisites.map((prereq: any, index: number) => (
                    <li key={index} className="text-gray-700">
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <div className="space-y-4">
            {lessonsLoading ? (
              <div className="flex flex-col gap-[15px] min-w-max">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DashboardMetricCardSkeleton key={index} />
                ))}
              </div>
            ) : lessons.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No lessons available for this course.</p>
              </div>
            ) : (
              lessons.map((lesson: Record<string, any>) => (
                <div
                  key={lesson.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div
                    className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleLessonExpansion(lesson.id!)}
                    style={{ fontFamily: "Lexend" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {expandedLessons.has(lesson.id!) ? (
                          <ChevronDown
                            size={20}
                            className="text-gray-500 mr-2"
                          />
                        ) : (
                          <ChevronRight
                            size={20}
                            className="text-gray-500 mr-2"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Lesson {lesson.orderNumber}: {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        {lesson.estimatedTime && (
                          <>
                            <Clock size={14} className="mr-1" />
                            {formatDuration(lesson.estimatedTime)}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedLessons.has(lesson.id!) && (
                    <div
                      className="p-4 border-t border-gray-200"
                      style={{ fontFamily: "Lexend" }}
                    >
                      {lesson.headlineTag && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700">
                            Headline:{" "}
                          </span>
                          <span className="text-sm text-gray-600">
                            {lesson.headlineTag}
                          </span>
                        </div>
                      )}

                      {lesson.objectives && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Objectives
                          </h4>
                          <p className="text-sm text-gray-600">
                            {lesson.objectives}
                          </p>
                        </div>
                      )}

                      {lesson.outcomes && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Outcomes
                          </h4>
                          <p className="text-sm text-gray-600">
                            {lesson.outcomes}
                          </p>
                        </div>
                      )}

                      {lesson?.contents && lesson?.contents?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Content
                          </h4>
                          <div className="space-y-3">
                            {lesson.contents.map(
                              (
                                content: Record<string, any>,
                                contentIndex: number
                              ) => (
                                <div
                                  key={contentIndex}
                                  className="bg-white p-3 rounded border"
                                >
                                  {content?.customText && (
                                    <div className="mb-2">
                                      <p className="text-sm text-gray-700">
                                        {content.customText.startsWith("<") ? (
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: content.customText,
                                            }}
                                          />
                                        ) : (
                                          content.customText
                                        )}
                                      </p>
                                    </div>
                                  )}
                                  {content.translation && (
                                    <div className="mb-2">
                                      <span className="text-xs font-medium text-gray-600">
                                        Translation:{" "}
                                      </span>
                                      <p className="text-sm text-gray-700">
                                        {content.translation}
                                      </p>
                                    </div>
                                  )}
                                  {content.contentFiles &&
                                    content.contentFiles.length > 0 && (
                                      <div className="space-y-2">
                                        <span className="text-xs font-medium text-gray-600">
                                          Media Files:
                                        </span>
                                        {content.contentFiles.map(
                                          (file: any, fileIndex: number) => (
                                            <div
                                              key={fileIndex}
                                              className="flex items-center gap-2 text-sm"
                                            >
                                              {getContentIcon(file.contentType)}
                                              <span className="text-gray-700">
                                                {file.contentType}{" "}
                                                {file.description &&
                                                  `- ${file.description}`}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div className="space-y-4">
            {quizzesLoading ? (
              <div className="flex flex-col gap-[15px] min-w-max">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DashboardMetricCardSkeleton key={index} />
                ))}
              </div>
            ) : quizzes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No quizzes available for this course.</p>
              </div>
            ) : (
              quizzes.map((quiz: Record<string, any>, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex flex-col items-start gap-6 justify-between mb-2">
                    <h3 className="text-lg text-gray-900">
                      <span className="font-semibold">Lesson Title:</span>{" "}
                      {quiz?.lessonDetails?.title || "No title provided"}
                    </h3>
                    <h3 className="text-lg text-gray-900">
                      <span className="font-semibold">Lesson Description:</span>{" "}
                      {quiz?.lessonDetails?.description ||
                        "No description provided"}
                    </h3>
                  </div>
                  <div className="text-lg text-gray-900 mt-6">
                    <span className="font-semibold">Quiz Instruction: </span>
                    {quiz?.instruction || "No instruction provided"}
                    {/* {quiz.questionCount || 0} | Duration:{" "}
                    {formatDuration(quiz.duration)} */}
                  </div>
                  <div className="text-lg text-gray-900 mt-2">
                    <span className="font-semibold">Quiz Question: </span>
                    {quiz.question}
                  </div>
                  <div className="text-lg text-gray-900 mt-2">
                    <span className="font-semibold">Question Type: </span>
                    {quizTypeFormatter(quiz.quizType)}
                  </div>

                  {quiz.options && quiz.options.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Options:
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {quiz.options.map(
                          (option: string, optionIndex: number) => (
                            <li key={optionIndex} className="text-gray-700">
                              {option}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {quiz.correctOption && (
                    <div className="mt-3">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Correct Option: {quiz.correctOption}
                      </h4>
                    </div>
                  )}

                  {quiz.correctAnswer && (
                    <div className="mt-3">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Correct Answer: {quiz.correctAnswer}
                      </h4>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewCourseModal;
