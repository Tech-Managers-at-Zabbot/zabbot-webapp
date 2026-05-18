"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Lesson } from "@/types/interfaces";
import { MdOutlineCancel } from "react-icons/md";
import { useAlert } from "next-alert";
import { TbCloudUpload } from "react-icons/tb";
import { useChangeLessonImage } from "@/services/generalApi/lessons/mutation";

interface EditLessonFormProps {
  lesson: Lesson | Record<string, any>;
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
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const [imageFile, setImageFile] = useState<File | null>(null);
      const [isImageDirty, setIsImageDirty] = useState(false);
      const isExistingLesson = Boolean(lesson.id);

      const { addAlert } = useAlert();
    
      const { mutate: updateLessonImage, isPending: isUpdatingCourseImage } =
        useChangeLessonImage();
    
      useEffect(() => {
        return () => {
          if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
      }, [imagePreview]);
    
      const handleImageSelect = (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setImageFile(file);
        setIsImageDirty(true);
      };
    
      const handleSaveImage = () => {
        if (!imageFile) {
          return addAlert("Error", "Please select an image", "error");
        }
        try {
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
            "image/svg+xml"
          ];
          if (!allowedTypes.includes(imageFile.type)) {
            return addAlert("Error", "Invalid file type", "error");
          }
          const maxSize = 10 * 1024 * 1024;
          if (imageFile.size > maxSize) {
            throw new Error("File size exceeds maximum limit of 10MB");
          }
        //   onCourseChange("thumbnailImage", imagePreview);
    
          const formData = new FormData();
    
          formData.append("files", imageFile);
          formData.append("mediaType", "image");
    
          updateLessonImage(
            {
              lessonId: lesson.id,
              data: formData,
              languageId: lesson.languageId,
            },
            {
              onSuccess: () => {
                addAlert("Success", "Change Successful", "success");
                setIsImageDirty(false);
                setImageFile(null);
                setImagePreview(null);
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
        } catch (err) {
          console.error("Upload failed:", err);
        }
      };
    
      const handleDeleteImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setIsImageDirty(false);
      };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isExistingLesson ? "Edit Lesson" : "Add Lesson"}
          </h3>

          <input
        type="file"
        accept="image/*"
        id="course-image-input"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageSelect(file);
        }}
      />

          <div className="space-y-4">
                  {isExistingLesson && (
                  <div className="flex items-center gap-6">
                    {(imagePreview || lesson?.lessonImg) && (
                      <div>
                        <img
                          src={imagePreview || lesson?.lessonImg}
                          className="w-40 h-24 object-cover rounded-md"
                          alt="Lesson Image"
                        />
                      </div>
                    )}
            
                    {!isImageDirty ? (
                      <button
                      disabled={isUpdatingCourseImage}
                        onClick={() =>
                          document.getElementById("course-image-input")?.click()
                        }
                        className="p-3 hover:cursor-pointer hover:text-[white] hover:border-[white] hover:bg-[#012657] text-[#012657] border rounded-xl flex gap-3 items-center"
                      >
                        <TbCloudUpload size={25} />
                        <div>
                          {lesson?.lessonImg
                            ? "Change Image"
                            : "Add Image to Spark"}
                        </div>
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={handleSaveImage}
                          disabled={isUpdatingCourseImage}
                          className="p-3 hover:cursor-pointer hover:text-[white] hover:border-[white] hover:bg-[#012657] text-[#012657] border rounded-xl flex items-center gap-2"
                        >
                          {isUpdatingCourseImage ? "Saving..." : "Save Image"}
                        </button>
            
                        <button
                          onClick={() =>
                            document.getElementById("course-image-input")?.click()
                          }
                          disabled={isUpdatingCourseImage}
                          className="p-3 hover:text-[white] hover:border-[white] hover:bg-[#012657] text-[#012657] hover:cursor-pointer border rounded-xl"
                        >
                          Change Image
                        </button>
            
                        <button
                          onClick={handleDeleteImage}
                          disabled={isUpdatingCourseImage}
                          className="p-3 hover:cursor-pointer hover:text-[white] hover:border-[white] hover:bg-red-900 border rounded-xl text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => onLessonChange("title", e.target.value)}
                  className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline Tag
                </label>
                <input
                  type="text"
                  value={lesson.headLineTag || ""}
                  onChange={(e) =>
                    onLessonChange("headLineTag", e.target.value)
                  }
                  className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Time (minutes)
                </label>
                <input
                  type="number"
                  value={lesson.estimatedDuration || ""}
                  onChange={(e) =>
                    onLessonChange(
                      "estimatedDuration",
                      parseInt(e.target.value) || undefined
                    )
                  }
                  className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {isExistingLesson ? "Save Changes" : "Save Lesson"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
