/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { z } from "zod";
import NormalInputField from "@/components/NormalInputField";
import InAppButton from "@/components/InAppButton";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import {
  ChevronDown,
  Plus,
  Trash2,
  Save,
  Upload,
  Play,
  Pause,
} from "lucide-react";
import { appColors } from "@/constants/colors";
import TextEditor from "@/components/general/TextEditor";
import EdedunModal from "@/components/general/EdedunContentModal";
import {
  ContentDataType,
  ContentSourceType,
  LanguageCode,
  Level,
} from "@/types/enums";
import {
  Content,
  ContentFile,
  Course,
  EdedunPhrase,
  Language,
  Lesson,
} from "@/types/interfaces";
import { courseSchema, lessonSchema } from "@/schemas/lessons.schema";
import { Alerts, useAlert } from "next-alert";
import { useUserGoals } from "@/contexts/UserGoalsContext";
import { useCreateCourseWithLessons } from "@/services/generalApi/lessons/mutation";
import { useTheme } from "@/contexts/ThemeProvider";

const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dirr9d0ox",
  uploadPreset:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "zabbot-preset",
};

const FILE_LIMITS = {
  IMAGE_MAX_SIZE: 2,
  VIDEO_MAX_SIZE: 15,
  AUDIO_MAX_SIZE: 10,
};

const CreateContentPage = () => {
  // Mock languages - in real app, fetch from API
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: "1",
      code: LanguageCode.YORUBA,
      title: "Yorùbá",
      flagIcon: "🇳🇬",
      isActive: true,
    },
    // {
    //   id: "2",
    //   code: LanguageCode.IGBO,
    //   title: "Igbo",
    //   flagIcon: "🇳🇬",
    //   isActive: true,
    // },
    // {
    //   id: "3",
    //   code: LanguageCode.HAUSA,
    //   title: "Hausa",
    //   flagIcon: "🇳🇬",
    //   isActive: true,
    // },
    // {
    //   id: "4",
    //   code: LanguageCode.FRENCH,
    //   title: "French",
    //   flagIcon: "🇫🇷",
    //   isActive: true,
    // },
    // {
    //   id: "5",
    //   code: LanguageCode.SPANISH,
    //   title: "Spanish",
    //   flagIcon: "🇪🇸",
    //   isActive: true,
    // },
    // {
    //   id: "6",
    //   code: LanguageCode.GERMAN,
    //   title: "German",
    //   flagIcon: "🇩🇪",
    //   isActive: true,
    // },
  ]);

  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>(
    {}
  );

  const { addAlert } = useAlert();

  const { userDetails } = useUserGoals();

  const router = useRouter();

  // Course state
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    description: "",
    languageId: "",
    level: Level.BUILDER,
    isActive: true,
    estimatedDuration: undefined,
    thumbnailFile: undefined, // Add this
    tags: [],
    prerequisites: [],
  });

  // Lessons state
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(
    null
  );

  // Current lesson being edited
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    title: "",
    description: "",
    orderNumber: 1,
    contents: [],
    headlineTag: "",
    estimatedTime: undefined,
    outcomes: "",
    objectives: "",
  });

  // UI state
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<"course" | "lessons" | "quizzes">(
    "course"
  );
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingContentIndex, setEditingContentIndex] = useState<number | null>(
    null
  );

  // Form validation states
  const [courseErrors, setCourseErrors] = useState<any>({});
  const [lessonErrors, setLessonErrors] = useState<any>({});
  const [tagsInput, setTagsInput] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");
  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");

  // Add these new state variables
  const [showEdeunModal, setShowEdeunModal] = useState(false);
  const [currentContentSourceType, setCurrentContentSourceType] =
    useState<ContentSourceType>(ContentSourceType.NEW);
  const [editingMediaDescription, setEditingMediaDescription] = useState<{
    contentIndex: number;
    fileIndex: number;
  } | null>(null);

  const { theme } = useTheme();
  
  useEffect(() => {
    setCloudsUrl(
      theme === "dark" ? "/userDashboard/dark-clouds.svg" : "/userDashboard/light-clouds.svg"
    );
    setBackgroundColor(theme === 'dark' ? "#012657" : "#dff9fb");
  }, [theme]);

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    if (showLessonModal || showEdeunModal) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLessonModal, showEdeunModal]);

  // Validate course data
  const validateCourse = () => {
    try {
      courseSchema.parse(courseData);
      setCourseErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: any = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = err.message;
        });
        setCourseErrors(errors);
      }
      return false;
    }
  };

  // Validate lesson data
  const validateLesson = () => {
    try {
      lessonSchema.parse({
        title: currentLesson.title,
        description: currentLesson.description,
        orderNumber: currentLesson.orderNumber,
        contents: currentLesson.contents,
      });
      setLessonErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: any = {};
        let firstErrorField = "";
        let firstErrorMessage = "";

        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = err.message;

          // Capture the first error to show in alert
          if (!firstErrorField) {
            firstErrorField = field;
            firstErrorMessage = err.message;
          }
        });

        // Format the field name for display (e.g., "orderNumber" -> "Order number")
        const formattedField = firstErrorField
          ? firstErrorField
              .replace(/([A-Z])/g, " $1") // Add space before capital letters
              .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
          : "";

        addAlert("Error", `${firstErrorMessage}`, "error");
        setLessonErrors(errors);
      }
      return false;
    }
  };

  // Handle course input changes
  const handleCourseChange = (field: keyof Course, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));

    // Clear specific error when user starts typing
    if (courseErrors[field]) {
      setCourseErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle language selection
  const handleLanguageSelect = (language: Language) => {
    handleCourseChange("languageId", language.id);
    setShowLanguageDropdown(false);
  };

  // Handle level selection
  const handleLevelSelect = (level: Level) => {
    handleCourseChange("level", level);
    setShowLevelDropdown(false);
  };

  // Handle lesson changes
  const handleLessonChange = (field: keyof Lesson, value: any) => {
    setCurrentLesson((prev) => ({ ...prev, [field]: value }));

    // Clear specific error when user starts typing
    if (lessonErrors[field]) {
      setLessonErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle tags
  // const addTag = () => {
  //   if (tagsInput.trim() && !courseData.tags?.includes(tagsInput.trim())) {
  //     handleCourseChange("tags", [
  //       ...(courseData.tags || []),
  //       tagsInput.trim(),
  //     ]);
  //     setTagsInput("");
  //   }
  // };

  // const removeTag = (index: number) => {
  //   const newTags = courseData.tags?.filter((_, i) => i !== index) || [];
  //   handleCourseChange("tags", newTags);
  // };

  // Add these new handler functions
  const handleEdedunSelection = (phrases: EdedunPhrase[]) => {
    if (editingContentIndex !== null) {
      updateContent(editingContentIndex, {
        ededunPhrases: phrases,
        translation: phrases
          .map((p) => `${p.yorubaText} - ${p.englishTranslation}`)
          .join("\n"),
      });
    }
  };

  const updateMediaDescription = (
    contentIndex: number,
    fileIndex: number,
    description: string
  ) => {
    setCurrentLesson((prev) => ({
      ...prev,
      contents: prev.contents.map((content, cIndex) => {
        if (cIndex === contentIndex) {
          return {
            ...content,
            contentFiles: content.contentFiles.map((file, fIndex) => {
              if (fIndex === fileIndex) {
                return {
                  ...file,
                  description,
                };
              }
              return file;
            }),
          };
        }
        return content;
      }),
    }));
  };

  // Add new content
  const addContent = (
    sourceType: ContentSourceType = ContentSourceType.NEW
  ) => {
    const newContent: Content = {
      translation: "",
      contentFiles: [],
      sourceType,
      ededunPhrases: sourceType === ContentSourceType.EDEDUN ? [] : undefined,
      customText: sourceType === ContentSourceType.NEW ? "" : undefined,
    };

    setCurrentLesson((prev) => ({
      ...prev,
      contents: [...prev.contents, newContent],
    }));
    setEditingContentIndex(currentLesson.contents.length);
    setCurrentContentSourceType(sourceType);

    if (sourceType === ContentSourceType.EDEDUN) {
      setShowEdeunModal(true);
    }
  };

  // Update content
  const updateContent = (index: number, updates: Partial<Content>) => {
    setCurrentLesson((prev) => ({
      ...prev,
      contents: prev.contents.map((content, i) =>
        i === index ? { ...content, ...updates } : content
      ),
    }));
  };

  // Remove content
  const removeContent = (index: number) => {
    setCurrentLesson((prev) => ({
      ...prev,
      contents: prev.contents.filter((_, i) => i !== index),
    }));
    setEditingContentIndex(null);
  };

  const handleFileUpload = (
    contentIndex: number,
    files: FileList | null,
    contentType: ContentDataType
  ) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    const sizeError = validateFileSize(file, contentType);
    if (sizeError) {
      addAlert("Error", sizeError, "error");
      return;
    }

    const newContentFile: ContentFile = {
      contentType,
      filePath: URL.createObjectURL(file),
      file,
      description: "",
    };

    const currentContent = currentLesson.contents[contentIndex];
    const updatedContentFiles = [
      ...currentContent.contentFiles,
      newContentFile,
    ];

    updateContent(contentIndex, { contentFiles: updatedContentFiles });
  };

  // Remove content file
  const removeContentFile = (contentIndex: number, fileIndex: number) => {
    const currentContent = currentLesson.contents[contentIndex];
    const updatedContentFiles = currentContent.contentFiles.filter(
      (_, i) => i !== fileIndex
    );
    updateContent(contentIndex, { contentFiles: updatedContentFiles });
  };

  // Save lesson
  const saveLesson = () => {
    if (!validateLesson()) return;

    if (currentLessonIndex !== null) {
      // Update existing lesson - preserve any uploaded files
      setLessons((prev) =>
        prev.map((lesson, i) =>
          i === currentLessonIndex
            ? {
                ...currentLesson,
                id: lesson.id,
                // Merge content files to preserve uploaded URLs
                contents: currentLesson.contents.map((content, cIndex) => ({
                  ...content,
                  contentFiles: content.contentFiles.map((file) => ({
                    ...file,
                    // Keep the Cloudinary URL if it exists, otherwise keep the blob URL
                    filePath: file.filePath.startsWith("https://")
                      ? file.filePath
                      : file.filePath,
                  })),
                })),
              }
            : lesson
        )
      );
    } else {
      // Add new lesson
      const newLesson = {
        ...currentLesson,
        id: `lesson_${Date.now()}`,
        contents: currentLesson.contents.map((content) => ({
          ...content,
          contentFiles: content.contentFiles.map((file) => ({
            ...file,
            filePath: file.filePath.startsWith("https://")
              ? file.filePath
              : file.filePath,
          })),
        })),
      };
      setLessons((prev) => [...prev, newLesson]);
    }

    setShowLessonModal(false);
    setCurrentLessonIndex(null);
    resetLessonForm();
  };

  // Reset lesson form
  const resetLessonForm = () => {
    setCurrentLesson({
      title: "",
      description: "",
      orderNumber: lessons.length + 1,
      contents: [],
      headlineTag: "",
      estimatedTime: undefined,
      outcomes: "",
      objectives: "",
    });
    setEditingContentIndex(null);
  };

  // Edit lesson
  const editLesson = (index: number) => {
    setCurrentLesson(lessons[index]);
    setCurrentLessonIndex(index);
    setShowLessonModal(true);
  };

  // Delete lesson
  const deleteLesson = (index: number) => {
    setLessons((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle course thumbnail upload
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (2MB limit for images)
      const sizeError = validateFileSize(file, ContentDataType.IMAGE);
      if (sizeError) {
        addAlert("Error", sizeError, "error");
        return;
      }

      // Create preview URL
      const imageUrl = URL.createObjectURL(file);

      // Store both the preview URL and the file for later upload
      handleCourseChange("thumbnailImage", imageUrl);
      handleCourseChange("thumbnailFile", file); // Add this new field to store the file
    }
  };

  const handleThumbnailCloudinaryUpload = async (
    file: File
  ): Promise<string> => {
    try {
      // Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
      formData.append("resource_type", "image");

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Thumbnail upload error:", error);
      throw error;
    }
  };

  const { mutate: createCourse, isPending: creatCourseLoading } =
    useCreateCourseWithLessons();

  // Submit entire course
  const handleSubmit = async () => {
    if (!validateCourse()) {
      setActiveTab("course");
      return;
    }

    if (lessons.length === 0) {
      addAlert("Error", "Please add at least one lesson", "error");
      setActiveTab("lessons");
      return;
    }

    setIsLoading(true);

    try {
      // Check if there are any files still uploading
      if (uploadingFiles.size > 0) {
        addAlert(
          "Info",
          "Please wait for all files to finish uploading",
          "info"
        );
        setIsLoading(false);
        return;
      }

      const coursePayload = await prepareDataForBackend();
      const languageId = userDetails?.languageId;

      if (!languageId) {
        return addAlert(
          "Error",
          "An error occurred, please try again",
          "error"
        );
      }

      // Send to backend
      // const response = await apiService.createCourseWithLessons(coursePayload, languageId);
      createCourse(
        {
          courseData: coursePayload,
          languageId,
        },
        {
          onSuccess: () => {
            addAlert("Success", "Course created successfully!", "success");
            setCourseData({
              title: "",
              description: "",
              languageId: "",
              level: Level.BUILDER,
              isActive: true,
              thumbnailFile: undefined,
              tags: [],
              prerequisites: [],
            });
            setLessons([]);
            setActiveTab("course");
            router.push("/user-dashboard");
          },
          onError: () => {
            addAlert("Error", "Course not created, try again", "error");
          },
        }
      );
    } catch (error) {
      console.error("Error creating course:", error);
      addAlert(
        "Error",
        `Error creating course: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectedLanguage = languages.find(
    (lang) => lang.id === courseData.languageId
  );

  const validateFileSize = (
    file: File,
    contentType: ContentDataType
  ): string | null => {
    let maxSize: number;

    switch (contentType) {
      case ContentDataType.IMAGE:
        maxSize = FILE_LIMITS.IMAGE_MAX_SIZE;
        break;
      case ContentDataType.VIDEO:
        maxSize = FILE_LIMITS.VIDEO_MAX_SIZE;
        break;
      case ContentDataType.AUDIO:
        maxSize = FILE_LIMITS.AUDIO_MAX_SIZE;
        break;
      default:
        return null;
    }

    const maxSizeInBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return `File size must be less than ${maxSize}MB`;
    }

    return null;
  };

const handleCloudinaryUpload = async (
  file: File,
  contentIndex: number,
  fileIndex: number,
  contentType: ContentDataType,
  lessonIndex?: number
): Promise<void> => {
  const fileId = `${
    lessonIndex !== undefined ? lessonIndex + "-" : ""
  }${contentIndex}-${fileIndex}`;

  try {
    setUploadingFiles((prev) => new Set([...prev, fileId]));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

    let resourceType = "auto";
    if (contentType === ContentDataType.IMAGE) {
      resourceType = "image";
    } else if (contentType === ContentDataType.VIDEO) {
      resourceType = "video";
    } else if (contentType === ContentDataType.AUDIO) {
      resourceType = "video"; // Cloudinary uses 'video' for audio files
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result = await response.json();
    const secureUrl = result.secure_url;

    // Update state with the secure URL
    if (lessonIndex !== undefined) {
      setLessons(prev =>
        prev.map((lesson, lIdx) => 
          lIdx === lessonIndex ? {
            ...lesson,
            contents: lesson.contents.map((content, cIdx) => 
              cIdx === contentIndex ? {
                ...content,
                contentFiles: content.contentFiles.map((f, fIdx) => 
                  fIdx === fileIndex ? {
                    ...f,
                    filePath: secureUrl,
                    file: undefined // Remove the file object since we have the URL
                  } : f
                )
              } : content
            )
          } : lesson
        )
      );
    } else {
      setCurrentLesson(prev => ({
        ...prev,
        contents: prev.contents.map((content, cIdx) => 
          cIdx === contentIndex ? {
            ...content,
            contentFiles: content.contentFiles.map((f, fIdx) => 
              fIdx === fileIndex ? {
                ...f,
                filePath: secureUrl,
                file: undefined
              } : f
            )
          } : content
        )
      }));
    }
  } catch (error) {
    console.error("Upload failed:", error);
    setUploadErrors(prev => ({
      ...prev,
      [fileId]: error instanceof Error ? error.message : "Upload failed",
    }));
    throw error;
  } finally {
    setUploadingFiles(prev => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
  }
};

const prepareDataForBackend = async () => {
  try {
    // Upload all lesson content files first
    const uploadPromises: Promise<void>[] = [];

    lessons.forEach((lesson, lessonIndex) => {
      lesson.contents.forEach((content, contentIndex) => {
        content.contentFiles.forEach((file, fileIndex) => {
          if (file.file) { // Only upload if there's a file object
            const promise = handleCloudinaryUpload(
              file.file,
              contentIndex,
              fileIndex,
              file.contentType,
              lessonIndex
            ).catch(error => {
              console.error(`Upload failed for lesson ${lessonIndex}, content ${contentIndex}, file ${fileIndex}:`, error);
              throw error; // Re-throw to fail the whole operation
            });
            uploadPromises.push(promise);
          }
        });
      });
    });

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    // Then handle thumbnail upload
    let thumbnailImageUrl = courseData.thumbnailImage;
    if (courseData.thumbnailFile) {
      thumbnailImageUrl = await handleThumbnailCloudinaryUpload(
        courseData.thumbnailFile
      );
    }

    // Prepare the payload with updated URLs
    const coursePayload = {
      courseData: {
        ...courseData,
        thumbnailImage: thumbnailImageUrl,
      },
      lessons: lessons.map(lesson => ({
        ...lesson,
        contents: lesson.contents.map(content => ({
          ...content,
          contentFiles: content.contentFiles.map(file => ({
            ...file,
            // Ensure we're using the Cloudinary URL if available
            filePath: file.filePath.startsWith('blob:') 
              ? file.filePath // This shouldn't happen since we waited for uploads
              : file.filePath,
          })),
        })),
      })),
    };

    return coursePayload;
  } catch (error) {
    console.error('Error preparing data:', error);
    throw error;
  }
};

  return (
    <div className="">
      <Head>
        <title>Create Language Content</title>
        <meta
          name="description"
          content="Create courses and lessons for language learning"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div
        className="min-h-screen relative pb-50 px-[5%] overflow-x-hidden"
        style={{
          fontFamily: "Lexend",
          color: "#162B6E",
          background: backgroundColor,
        }}
      >
        <div
          className="absolute bg-cover inset-0 top-0 h-40 bg-center"
          style={{ backgroundImage: `url(${cloudsUrl})` }}
        ></div>

        <div className="max-w-screen-2xl">
          <div className="w-full">
            <div className="flex absolute top-0 right-[5%] items-center z-10 gap-20 flex-shrink-0">
              <div className="w-[70px] mt-1 flex">
                <div className="h-[80px]">
                  <Image
                    src="/userDashboard/parrot-head.svg"
                    alt="Centralized rounded parrot mascot"
                    width={300}
                    height={80}
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="hidden lg:flex">
                <SettingsBreadcrumb isDark={theme === 'dark'} />
              </div>
            </div>
          </div>

          <header className="relative">
            <div className="flex relative z-10 mt-6 justify-between text-[24px] font-semibold leading-[100%] text-[#162B6E]">
              <div className="flex-shrink-0">
                <span
                  className="text-sm md:text-sm lg:text-2xl"
                  style={{ color: theme=== 'dark' ? "#D0F7F6" : "#202124" }}
                >
                  Create Language Content
                </span>
              </div>
            </div>
          </header>

          <section className="mt-36" style={{ zIndex: 1000 }}>
            <div
              className="bg-white rounded-lg shadow-md p-6"
              style={{ zIndex: 1000 }}
            >
              {/* Tab Navigation */}
              <div className="flex mb-6 border-b">
                <button
                  className={`px-4 py-2 font-medium hover:cursor-pointer ${
                    activeTab === "course"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-[#f9c10f]"
                  }`}
                  onClick={() => setActiveTab("course")}
                >
                  Course Details
                </button>
                <button
                  className={`px-4 py-2 font-medium ml-4 hover:cursor-pointer ${
                    activeTab === "lessons"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-[#f9c10f]"
                  }`}
                  onClick={() => setActiveTab("lessons")}
                >
                  Lessons ({lessons.length})
                </button>
                <button
                  className={`px-4 py-2 font-medium ml-4 hover:cursor-pointer ${
                    activeTab === "quizzes"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-[#f9c10f]"
                  }`}
                  onClick={() => setActiveTab("quizzes")}
                >
                  Quizzes (0)
                </button>
              </div>

              {/* Course Details Tab */}
              {activeTab === "course" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title *
                      </label>
                      <NormalInputField
                        id="courseTitle"
                        value={courseData.title}
                        onChange={(e) =>
                          handleCourseChange("title", e.target.value)
                        }
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
                            onClick={() =>
                              handleCourseChange("thumbnailImage", undefined)
                            }
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
                      onChange={(e) =>
                        handleCourseChange("description", e.target.value)
                      }
                      placeholder="Enter course description"
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor: "#E3EFFC",
                        border: courseErrors.description
                          ? "1px solid #D42620"
                          : "0",
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
                          onClick={() =>
                            setShowLanguageDropdown(!showLanguageDropdown)
                          }
                          style={{
                            backgroundColor: "#E3EFFC",
                            border: courseErrors.languageId
                              ? "1px solid #D42620"
                              : "0",
                            height: "56px",
                          }}
                        >
                          <span>
                            {selectedLanguage ? (
                              <span className="flex items-center">
                                <span className="mr-2">
                                  {selectedLanguage.flagIcon}
                                </span>
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
                                <span className="mr-2">
                                  {language.flagIcon}
                                </span>
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
                          onClick={() =>
                            setShowLevelDropdown(!showLevelDropdown)
                          }
                          style={{
                            backgroundColor: "#E3EFFC",
                            border: courseErrors.level
                              ? "1px solid #D42620"
                              : "0",
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
                        <p className="text-red-600 text-sm mt-1">
                          {courseErrors.level}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ backgroundColor: "#E3EFFC", border: "0" }}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {courseData.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div> */}
                </div>
              )}

              {/* Lessons Tab */}
              {activeTab === "lessons" && (
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
                              <h4 className="font-medium text-lg">
                                {lesson.title}
                              </h4>
                              <p className="text-[#80838D] text-sm mt-1">
                                {lesson.description}
                              </p>
                              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                <span>Order: {lesson.orderNumber}</span>
                                <span>Contents: {lesson.contents.length}</span>
                                {lesson.estimatedTime && (
                                  <span>
                                    Estimated Time: {lesson.estimatedTime} mins
                                  </span>
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
              )}

              {activeTab === "quizzes" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Lesson Quizzes</h3>
                    <InAppButton
                      disabled
                      // onClick={() => {
                      //   resetLessonForm();
                      //   setShowLessonModal(true);
                      // }}
                      background={appColors.darkRoyalBlueForBtn}
                      width="auto"
                      height="40px"
                    >
                      <div className="flex justify-center items-center p-2">
                        <div>
                          <Plus size={20} className="mr-2" />
                        </div>
                        <div>Add Quiz</div>
                      </div>
                    </InAppButton>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    No lessons created yet. Add a lesson first to attach quizzes
                    to it.
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t">
                <InAppButton
                  onClick={handleSubmit}
                  disabled={isLoading}
                  background={appColors.darkRoyalBlueForBtn}
                  disabledColor={appColors.disabledButtonBlue}
                  width="200px"
                >
                  {isLoading || creatCourseLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div>
                        <Save size={20} className="mr-2" />
                      </div>
                      <div>Create Course</div>
                    </div>
                  )}
                </InAppButton>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Lesson Modal */}
      {showLessonModal && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.stopPropagation()} // This prevents clicks from closing the modal
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Also prevent clicks inside modal from bubbling
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-[#012657] font-semibold">
                  {currentLessonIndex !== null
                    ? "Edit Lesson"
                    : "Create New Lesson"}
                </h2>
                <button
                  onClick={() => {
                    setShowLessonModal(false);
                    setCurrentLessonIndex(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Lesson Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Title *
                    </label>
                    <NormalInputField
                      id="lessonTitle"
                      value={currentLesson.title}
                      onChange={(e) =>
                        handleLessonChange("title", e.target.value)
                      }
                      placeholder="Enter lesson title"
                      type="text"
                      error={!!lessonErrors.title}
                      errorMessage={lessonErrors.title}
                      backgroundColor="#E3EFFC"
                      border="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Number *
                    </label>
                    <NormalInputField
                      id="lessonOrder"
                      value={currentLesson.orderNumber.toString()}
                      onChange={(e) =>
                        handleLessonChange(
                          "orderNumber",
                          parseInt(e.target.value)
                        )
                      }
                      placeholder="Lesson order"
                      type="number"
                      error={!!lessonErrors.orderNumber}
                      errorMessage={lessonErrors.orderNumber}
                      backgroundColor="#E3EFFC"
                      border="0"
                    />
                  </div>
                </div>

                {/* Lesson Headline Tag */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headline Tag
                  </label>
                  <NormalInputField
                    id="lessonHeadlineTag"
                    value={currentLesson.headlineTag || ""}
                    onChange={(e) =>
                      handleLessonChange("headlineTag", e.target.value)
                    }
                    placeholder="Enter a short headline tag for this lesson"
                    type="text"
                    backgroundColor="#E3EFFC"
                    border="0"
                  />
                </div>

                {/* Lesson Estimated Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Time (minutes)
                  </label>
                  <NormalInputField
                    id="lessonEstimatedTime"
                    value={currentLesson.estimatedTime?.toString() || ""}
                    onChange={(e) =>
                      handleLessonChange(
                        "estimatedTime",
                        parseInt(e.target.value) || undefined
                      )
                    }
                    placeholder="Enter estimated time to complete this lesson"
                    type="number"
                    backgroundColor="#E3EFFC"
                    border="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={currentLesson.description}
                    onChange={(e) =>
                      handleLessonChange("description", e.target.value)
                    }
                    placeholder="Enter lesson description"
                    rows={3}
                    className="w-full text-[#80838D] font-[500] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: "#E3EFFC",
                      border: lessonErrors.description
                        ? "1px solid #D42620"
                        : "0",
                      fontFamily: "Lexend",
                    }}
                  />
                  {lessonErrors.description && (
                    <p className="text-red-600 text-sm mt-1">
                      {lessonErrors.description}
                    </p>
                  )}
                </div>

                {/* Lesson Outcomes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Outcomes
                  </label>
                  <textarea
                    value={currentLesson.outcomes || ""}
                    onChange={(e) =>
                      handleLessonChange("outcomes", e.target.value)
                    }
                    placeholder="What will students learn from this lesson? (One per line)"
                    rows={3}
                    className="w-full px-3 text-[#80838D] border-0 font-[500] py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: "#E3EFFC",
                      fontFamily: "Lexend",
                    }}
                  />
                </div>

                {/* Lesson Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Objectives
                  </label>
                  <textarea
                    value={currentLesson.objectives || ""}
                    onChange={(e) =>
                      handleLessonChange("objectives", e.target.value)
                    }
                    placeholder="What are the measurable objectives for this lesson? (One per line)"
                    rows={3}
                    className="w-full px-3 text-[#80838D] font-[500] py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: "#E3EFFC",
                      fontFamily: "Lexend",
                    }}
                  />
                </div>

                {/* Contents Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-700">
                      Lesson Contents
                    </h3>
                    <div className="relative">
                      <select
                        onChange={(e) => {
                          const sourceType = e.target
                            .value as ContentSourceType;
                          addContent(sourceType);
                          e.target.value = ""; // Reset select
                        }}
                        className="px-4 py-2 flex justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Add Content
                        </option>
                        <option value={ContentSourceType.EDEDUN}>
                          Add from Ededun
                        </option>
                        <option value={ContentSourceType.NEW}>
                          Add New Content
                        </option>
                      </select>
                    </div>
                  </div>

                  {currentLesson.contents.map((content, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[#012657] font-medium">
                            Content {index + 1}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              content.sourceType === ContentSourceType.EDEDUN
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {content.sourceType === ContentSourceType.EDEDUN
                              ? "From Ededun"
                              : "New Content"}
                          </span>
                        </div>
                        <button
                          onClick={() => removeContent(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {content.sourceType === ContentSourceType.EDEDUN ? (
                          <div>
                            <label className="block text-sm font-medium text-[#012657] mb-2">
                              Selected Ededun Phrases
                            </label>
                            {content.ededunPhrases &&
                            content.ededunPhrases.length > 0 ? (
                              <div className="space-y-2">
                                {content.ededunPhrases.map((phrase) => (
                                  <div
                                    key={phrase.id}
                                    className="p-3 bg-green-50 rounded-md text-[#012657] border border-green-200"
                                  >
                                    <div className="font-medium">
                                      {phrase.yorubaText}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {phrase.englishTranslation}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {phrase.category}
                                    </div>
                                  </div>
                                ))}
                                <button
                                  onClick={() => {
                                    setEditingContentIndex(index);
                                    setShowEdeunModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Edit Selection
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingContentIndex(index);
                                  setShowEdeunModal(true);
                                }}
                                className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-600"
                              >
                                Select Phrases from Ededun
                              </button>
                            )}
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Content Text
                            </label>
                            <TextEditor
                              value={content.customText || ""}
                              onChange={(value) =>
                                updateContent(index, { customText: value })
                              }
                              placeholder="Type your content here..."
                              height="150px"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Translation/Summary *
                          </label>
                          <textarea
                            value={content.translation}
                            onChange={(e) =>
                              updateContent(index, {
                                translation: e.target.value,
                              })
                            }
                            placeholder="Enter translation or summary text"
                            rows={3}
                            className="w-full px-3 py-2 border rounded-md text-[#012657] font-[500] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ backgroundColor: "#F8F9FA" }}
                          />
                        </div>

                        {/* Media Files Section - same as before but with media descriptions */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Media Files
                          </label>

                          {/* File Upload Buttons - keep the same as before */}
                          {/* File Upload Buttons */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block">
                                <input
                                  type="file"
                                  accept="audio/*"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      index,
                                      e.target.files,
                                      ContentDataType.AUDIO
                                    )
                                  }
                                  className="hidden"
                                />
                                <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                                  <Upload size={16} className="mr-2" />
                                  Upload Audio
                                </div>
                              </label>
                            </div>

                            <div>
                              <label className="block">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      index,
                                      e.target.files,
                                      ContentDataType.IMAGE
                                    )
                                  }
                                  className="hidden"
                                />
                                <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                                  <Upload size={16} className="mr-2" />
                                  Upload Image
                                </div>
                              </label>
                            </div>

                            <div>
                              <label className="block">
                                <input
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      index,
                                      e.target.files,
                                      ContentDataType.VIDEO
                                    )
                                  }
                                  className="hidden"
                                />
                                <div className="flex items-center text-[#012657] justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 cursor-pointer">
                                  <Upload size={16} className="mr-2" />
                                  Upload Video
                                </div>
                              </label>
                            </div>
                          </div>

                          {/* Display uploaded files with description option */}
                          {content.contentFiles.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-gray-700">
                                Uploaded Files:
                              </h5>
                              {content.contentFiles.map((file, fileIndex) => {
                                const fileId = `${index}-${fileIndex}`;
                                const description = file.description || "";

                                return (
                                  <div
                                    key={fileIndex}
                                    className="p-3 bg-gray-50 rounded-md"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center">
                                        <span className="text-sm text-[#012657] font-medium capitalize mr-2">
                                          {file.contentType}:
                                        </span>

                                        {/* Preview based on file type */}
                                        {file.contentType ===
                                          ContentDataType.IMAGE && (
                                          <img
                                            src={file.filePath}
                                            alt="Preview"
                                            className="w-16 h-16 object-cover rounded mr-2"
                                          />
                                        )}

                                        {file.contentType ===
                                          ContentDataType.AUDIO && (
                                          <audio
                                            controls
                                            className="mr-2"
                                            style={{ height: "40px" }}
                                          >
                                            <source src={file.filePath} />
                                            Your browser does not support audio
                                            playback.
                                          </audio>
                                        )}

                                        {file.contentType ===
                                          ContentDataType.VIDEO && (
                                          <video
                                            controls
                                            className="w-24 h-16 object-cover rounded mr-2"
                                            style={{ maxHeight: "64px" }}
                                          >
                                            <source src={file.filePath} />
                                            Your browser does not support video
                                            playback.
                                          </video>
                                        )}
                                        <span className="text-sm text-gray-600">
                                          {file.file?.name || "File"}
                                        </span>
                                      </div>

                                      <button
                                        onClick={() =>
                                          removeContentFile(index, fileIndex)
                                        }
                                        className="text-red-600 hover:text-red-800"
                                        title="Remove file"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>

                                    {/* Yoruba description for media */}
                                    <div className="mt-2">
                                      <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Yoruba Description (optional):
                                      </label>
                                      <textarea
                                        value={description}
                                        onChange={(e) =>
                                          updateMediaDescription(
                                            index,
                                            fileIndex,
                                            e.target.value
                                          )
                                        }
                                        placeholder="Kọ àlàyé nípa fáìlì yìí ní èdè Yorùbá..."
                                        rows={2}
                                        className="w-full px-2 py-1 text-sm border text-[#012657] font-[400] border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {currentLesson.contents.length === 0 && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      No content added yet. Click "Add Content" to create your
                      first content item.
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowLessonModal(false);
                    setCurrentLessonIndex(null);
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <InAppButton
                  onClick={saveLesson}
                  background={appColors.darkRoyalBlueForBtn}
                  width="120px"
                  height="40px"
                >
                  Save Lesson
                </InAppButton>
              </div>
              <Alerts
                position="top-right"
                direction="right"
                timer={5000}
                className="rounded-md relative z-100 !w-80"
              />
            </div>
            {/* Add this before the lesson modal's closing div */}
            <EdedunModal
              isOpen={showEdeunModal}
              onClose={() => setShowEdeunModal(false)}
              onSelect={handleEdedunSelection}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentPage;
