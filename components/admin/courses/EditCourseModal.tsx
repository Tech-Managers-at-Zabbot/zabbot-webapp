/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/general/Modal";
import { Course, Lesson } from "@/types/interfaces";
import {
  useGetCourseLessons,
  useGetCourseQuizzes,
} from "@/services/generalApi/lessons/mutation";
import { CourseDetailsTab } from "./CourseDetailsTab";
import { LessonsTab } from "./LessonsTab";
import { QuizzesTab } from "./QuizzesTab";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | Record<string, any>;
  onSaveCourse: (courseData: Course) => void;
  onSaveLesson: (lessonData: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  onDeleteQuiz: (quizId: string) => void;
  onOpenAddQuizModal: (quiz?: any) => void;
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

  const { data: courseQuizzes, isLoading: quizzesLoading } =
    useGetCourseQuizzes(course?.id);
  const { data: courseLessons, isLoading: lessonsLoading } =
    useGetCourseLessons(course?.id);

  const quizzes = courseQuizzes?.data || [];
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Course"
      size="xl"
      containerClassName="w-full"
    >
      <div className="p-6 w-full" style={{ fontFamily: "Lexend", overflowY: "scroll" }}>
        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`px-4 py-2 hover:cursor-pointer font-medium text-sm ${activeTab === "course"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
            onClick={() => setActiveTab("course")}
          >
            Course Details
          </button>
          <button
            className={`px-4 py-2 hover:cursor-pointer font-medium text-sm ml-4 ${activeTab === "lessons"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
            onClick={() => setActiveTab("lessons")}
          >
            Lessons ({lessons.length})
          </button>
          <button
            className={`px-4 py-2 hover:cursor-pointer font-medium text-sm ml-4 ${activeTab === "quizzes"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
              }`}
            onClick={() => setActiveTab("quizzes")}
          >
            Quizzes ({quizzes.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "course" && (
          <CourseDetailsTab
            courseData={courseData}
            onCourseChange={handleCourseChange}
            onSaveCourse={handleSaveCourse}
            hasChanges={hasChanges}
          />
        )}

        {activeTab === "lessons" && (
          <LessonsTab
            lessons={lessons}
            isLoading={lessonsLoading}
            onSaveLesson={onSaveLesson}
            onDeleteLesson={onDeleteLesson}
          />
        )}

        {activeTab === "quizzes" && (
          <QuizzesTab
            quizzes={quizzes}
            lessons={lessons}
            isLoading={quizzesLoading}
            onDeleteQuiz={onDeleteQuiz}
            onOpenAddQuizModal={onOpenAddQuizModal}
            onCloseEditModal={onClose}
          />
        )}
      </div>
    </Modal>
  );
};

export default EditCourseModal;