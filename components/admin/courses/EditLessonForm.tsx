/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Save } from "lucide-react";
import { Lesson } from "@/types/interfaces";
import { MdOutlineCancel } from "react-icons/md";

interface EditLessonFormProps {
  lesson: Lesson;
  onLessonChange: (field: keyof Lesson, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EditLessonForm: React.FC<EditLessonFormProps> = ({
  lesson,
  onLessonChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                  value={lesson.title}
                  onChange={(e) => onLessonChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number
                </label>
                <input
                  type="number"
                  value={lesson.orderNumber}
                  onChange={(e) =>
                    onLessonChange("orderNumber", parseInt(e.target.value))
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
                value={lesson.description}
                onChange={(e) => onLessonChange("description", e.target.value)}
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
                  value={lesson.headlineTag || ""}
                  onChange={(e) =>
                    onLessonChange("headlineTag", e.target.value)
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
                  value={lesson.estimatedTime || ""}
                  onChange={(e) =>
                    onLessonChange(
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
                value={lesson.objectives || ""}
                onChange={(e) => onLessonChange("objectives", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outcomes
              </label>
              <textarea
                value={lesson.outcomes || ""}
                onChange={(e) => onLessonChange("outcomes", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="px-4 py-2 border flex items-center rounded-md hover:bg-red-900 text-gray-600 hover:cursor-pointer hover:text-white"
            >
              <MdOutlineCancel size={16} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 border flex items-center rounded-md hover:bg-white bg-[#012657] text-white hover:cursor-pointer hover:text-[#012657]"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
