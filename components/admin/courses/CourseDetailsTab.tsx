/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TbCloudUpload } from "react-icons/tb";
import { Save } from "lucide-react";
import { useAlert } from "next-alert";
import { Course } from "@/types/interfaces";
import { Level } from "@/types/enums";
import { useChangeCourseImage } from "@/services/generalApi/lessons/mutation";

interface CourseDetailsTabProps {
  courseData: Course | Record<string, any>;
  onCourseChange: (field: keyof Course, value: any) => void;
  onSaveCourse: () => void;
  hasChanges: boolean;
}

export const CourseDetailsTab: React.FC<CourseDetailsTabProps> = ({
  courseData,
  onCourseChange,
  onSaveCourse,
  hasChanges,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageDirty, setIsImageDirty] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const { addAlert } = useAlert();

  const { mutate: updateCourseImage, isPending: isUpdatingCourseImage } =
    useChangeCourseImage();

  useEffect(() => {
    setOriginalImage(courseData.thumbnailImage || null);
  }, [courseData.thumbnailImage]);

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
      onCourseChange("thumbnailImage", imagePreview);

      const formData = new FormData();

      formData.append("files", imageFile);
      formData.append("mediaType", "image");

      updateCourseImage(
        {
          courseId: courseData.id,
          data: formData,
          languageId: courseData.languageId,
        },
        {
          onSuccess: () => {
            addAlert("Success", "Change Successful", "success");
            setIsImageDirty(false);
            setImageFile(null);
            setOriginalImage(null);
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
    onCourseChange("thumbnailImage", originalImage);
  };

  return (
    <div className="space-y-6">
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

      <div className="flex items-center gap-6">
        {(imagePreview || courseData?.thumbnailImage) && (
          <div>
            <img
              src={imagePreview || courseData?.thumbnailImage}
              className="w-40 h-24 object-cover rounded-md"
              alt="Course thumbnail"
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
              {courseData?.thumbnailImage
                ? "Change Image"
                : "Add Image to journey"}
            </div>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSaveImage}
              disabled={isUpdatingCourseImage}
              className="p-3 hover:cursor-pointer hover:text-[white] hover:border-[white] hover:bg-[#012657] text-[#012657] border rounded-xl flex items-center gap-2"
            >
              {isUpdatingCourseImage ? "Saving Image" : "Save Image"}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title
          </label>
          <input
            type="text"
            value={courseData.title ?? ""}
            onChange={(e) => onCourseChange("title", e.target.value)}
            className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={courseData.level ?? Level.BUILDER}
            onChange={(e) => onCourseChange("level", e.target.value as Level)}
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
          value={courseData.description ?? ""}
          onChange={(e) => onCourseChange("description", e.target.value)}
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
              onCourseChange(
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
              checked={!!courseData.isActive}
              onChange={(e) => onCourseChange("isActive", e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Course is active</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Number
          </label>
          <input
            type="number"
            value={courseData.orderNumber ?? ""}
            onChange={(e) =>
              onCourseChange("orderNumber", parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 text-[#252525] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onSaveCourse}
          disabled={!hasChanges}
          className={`px-6 py-2 rounded-md font-medium flex items-center ${
            hasChanges
              ? "bg-blue-900 hover:cursor-pointer hover:bg-[white] hover:border hover:border-blue-900 hover:text-blue-900 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Save size={16} className="mr-2" />
          Save Course Details
        </button>
      </div>
    </div>
  );
};
