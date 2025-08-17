/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Course, Language } from "../../../types/interfaces";
import { Level } from "../../../types/enums";
import NormalInputField from "@/components/NormalInputField";
import { ChevronDown, Trash2, Upload } from "lucide-react";

interface CourseFormProps {
  courseData: Course;
  languages: Language[];
  selectedLanguage?: Language;
  showLanguageDropdown: boolean;
  showLevelDropdown: boolean;
  courseErrors: any;
  handleCourseChange: (field: keyof Course, value: any) => void;
  handleLanguageSelect: (language: Language) => void;
  handleLevelSelect: (level: Level) => void;
  setShowLanguageDropdown: (show: boolean) => void;
  setShowLevelDropdown: (show: boolean) => void;
  handleThumbnailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // theme: string;
}

const CourseForm: React.FC<CourseFormProps> = ({
  courseData,
  languages,
  selectedLanguage,
  showLanguageDropdown,
  showLevelDropdown,
  courseErrors,
  handleCourseChange,
  handleLanguageSelect,
  handleLevelSelect,
  setShowLanguageDropdown,
  setShowLevelDropdown,
  handleThumbnailUpload,
  // theme,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <NormalInputField
            id="courseTitle"
            value={courseData.title}
            onChange={(e) => handleCourseChange("title", e.target.value)}
            placeholder="Enter course title"
            type="text"
            error={!!courseErrors.title}
            errorMessage={courseErrors.title}
            backgroundColor="#E3EFFC"
            border="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Duration (minutes)
          </label>
          <NormalInputField
            id="estimatedDuration"
            value={courseData.estimatedDuration?.toString() || ""}
            onChange={(e) =>
              handleCourseChange(
                "estimatedDuration",
                parseInt(e.target.value) || undefined
              )
            }
            placeholder="Enter estimated duration"
            type="number"
            error={!!courseErrors.estimatedDuration}
            errorMessage={courseErrors.estimatedDuration}
            backgroundColor="#E3EFFC"
            border="0"
          />
        </div>
      </div>

      {/* Course Thumbnail Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Thumbnail Image
        </label>
        <div className="flex items-center gap-4">
          {courseData.thumbnailImage ? (
            <>
              <img
                src={courseData.thumbnailImage}
                alt="Course thumbnail"
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                onClick={() => handleCourseChange("thumbnailImage", undefined)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </>
          ) : (
            <label className="cursor-pointer">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-blue-500">
                <Upload size={24} className="text-gray-400" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={courseData.description || ""}
          onChange={(e) => handleCourseChange("description", e.target.value)}
          placeholder="Enter course description"
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            backgroundColor: "#E3EFFC",
            border: courseErrors.description ? "1px solid #D42620" : "0",
            fontFamily: "Lexend",
          }}
        />
        {courseErrors.description && (
          <p className="text-red-600 text-sm mt-1">
            {courseErrors.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language *
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full px-3 py-2 text-left bg-blue-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={{
                backgroundColor: "#E3EFFC",
                border: courseErrors.languageId ? "1px solid #D42620" : "0",
                height: "56px",
              }}
            >
              <span>
                {selectedLanguage ? (
                  <span className="flex items-center">
                    <span className="mr-2">{selectedLanguage.flagIcon}</span>
                    {selectedLanguage.title}
                  </span>
                ) : (
                  "Select a language"
                )}
              </span>
              <ChevronDown size={20} />
            </button>

            {showLanguageDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {languages.map((language) => (
                  <button
                    key={language.id}
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <span className="mr-2">{language.flagIcon}</span>
                    {language.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          {courseErrors.languageId && (
            <p className="text-red-600 text-sm mt-1">
              {courseErrors.languageId}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level *
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full px-3 py-2 text-left bg-blue-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
              onClick={() => setShowLevelDropdown(!showLevelDropdown)}
              style={{
                backgroundColor: "#E3EFFC",
                border: courseErrors.level ? "1px solid #D42620" : "0",
                height: "56px",
              }}
            >
              <span className="capitalize">
                {courseData.level || "Select level"}
              </span>
              <ChevronDown size={20} />
            </button>

            {showLevelDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {Object.values(Level).map((level) => (
                  <button
                    key={level}
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 capitalize"
                    onClick={() => handleLevelSelect(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>
          {courseErrors.level && (
            <p className="text-red-600 text-sm mt-1">{courseErrors.level}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseForm;