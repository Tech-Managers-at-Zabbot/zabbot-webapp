/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";

interface QuizzesTabProps {
  quizzes: any[];
  isLoading: boolean;
  onDeleteQuiz: (quizId: string) => void;
  onOpenAddQuizModal: (quiz?: any) => void;
  onCloseEditModal: () => void;
}

export const QuizzesTab: React.FC<QuizzesTabProps> = ({
  quizzes,
  isLoading,
  onDeleteQuiz,
  onOpenAddQuizModal,
  onCloseEditModal,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEditQuiz = (quiz: any) => {
    onCloseEditModal();
    onOpenAddQuizModal(quiz);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Course Quizzes</h3>
        <button
          onClick={() => {
            onOpenAddQuizModal();
            onCloseEditModal();
          }}
          className="px-4 py-2 bg-blue-600 hover:cursor-pointer text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Quiz
        </button>
      </div>

      {isLoading ? (
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
                    className="px-3 py-1 text-sm text-gray-600 cursor-pointer rounded"
                  >
                    <Edit size={14} className="mr-1 inline" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirmDelete) {
                        onDeleteQuiz(quiz.id);
                        setConfirmDelete(false);
                      } else {
                        setConfirmDelete(true);
                        setTimeout(() => setConfirmDelete(false), 5000); // Reset after 3 seconds
                      }
                    }}
                    className="px-3 py-1 text-sm text-red-600 cursor-pointer rounded"
                  >
                    <Trash2 size={14} className="mr-1 inline" />
                    {confirmDelete ? "Confirm Delete" : "Delete"}
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
    </div>
  );
};