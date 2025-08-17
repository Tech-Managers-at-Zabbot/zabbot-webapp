/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Lesson } from "../../../types/interfaces";
import { Plus, Trash2 } from "lucide-react";
import InAppButton from "@/components/InAppButton";
import { appColors } from "@/constants/colors";

interface LessonsListProps {
  lessons: Lesson[];
  editLesson: (index: number) => void;
  deleteLesson: (index: number) => void;
  setShowLessonModal: (show: boolean) => void;
  resetLessonForm: () => void;
}

const LessonsList: React.FC<LessonsListProps> = ({
  lessons,
  editLesson,
  deleteLesson,
  setShowLessonModal,
  resetLessonForm,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Course Lessons</h3>
        <InAppButton
          onClick={() => {
            resetLessonForm();
            setShowLessonModal(true);
          }}
          background={appColors.darkRoyalBlueForBtn}
          width="auto"
          height="40px"
        >
          <div className="flex justify-center items-center p-2">
            <div>
              <Plus size={20} className="mr-2" />
            </div>
            <div>Add Lesson</div>
          </div>
        </InAppButton>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No lessons created yet. Click "Add Lesson" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-lg">{lesson.title}</h4>
                  <p className="text-[#80838D] text-sm mt-1">
                    {lesson.description}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Order: {lesson.orderNumber}</span>
                    <span>Contents: {lesson.contents.length}</span>
                    {lesson.estimatedTime && (
                      <span>Estimated Time: {lesson.estimatedTime} mins</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editLesson(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLesson(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsList;