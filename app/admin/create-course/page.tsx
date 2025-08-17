/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { z } from "zod";
import { Plus, Save } from "lucide-react";
import { appColors } from "@/constants/colors";
import { useAlert } from "next-alert";
import { useUser } from "@/contexts/UserContext";
import { useCreateCourseWithLessons } from "@/services/generalApi/lessons/mutation";
import { useTheme } from "@/contexts/ThemeProvider";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import InAppButton from "@/components/InAppButton";
import EdedunModal from "@/components/general/EdedunContentModal";
import {
  ContentDataType,
  ContentSourceType,
  LanguageCode,
  Level,
} from "@/types/enums";
import { courseSchema, lessonSchema } from "@/schemas/lessons.schema";
import {
  Course,
  Language,
  Lesson,
  Content,
  ContentFile,
  EdedunPhrase,
  FILE_LIMITS,
  CLOUDINARY_CONFIG,
} from "../../../types/interfaces";
import CourseForm from "../../../components/admin/createCourseFlow/CourseForm";
import LessonsList from "../../../components/admin/createCourseFlow/LessonList";
import LessonModal from "../../../components/admin/createCourseFlow/LessonModal";
import { useLoading } from "@/contexts/LoadingProvider";

const CreateCoursePage = () => {
  // State and hooks initialization
  const [
    languages,
    // setLanguages
  ] = useState<Language[]>([
    {
      id: "1",
      code: LanguageCode.YORUBA,
      title: "Yorùbá",
      flagIcon: "🇳🇬",
      isActive: true,
    },
  ]);

  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  // const [
  //   // uploadErrors,
  //   setUploadErrors
  // ] = useState<{ [key: string]: string }>({});

  const { addAlert } = useAlert();
  const { userDetails } = useUser();
  const router = useRouter();
  const { theme } = useTheme();

  // Course state
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    description: "",
    languageId: "",
    level: Level.BUILDER,
    isActive: true,
    estimatedDuration: undefined,
    thumbnailFile: undefined,
    tags: [],
    prerequisites: [],
  });

  // Lessons state
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(
    null
  );

  const { setLoading } = useLoading();
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
  const [showEdeunModal, setShowEdeunModal] = useState(false);
  const [editingContentIndex, setEditingContentIndex] = useState<number | null>(
    null
  );
  const [
    // currentContentSourceType,
    setCurrentContentSourceType,
  ] = useState<ContentSourceType | any>(ContentSourceType.NEW);

  // Form validation states
  const [courseErrors, setCourseErrors] = useState<any>({});
  const [lessonErrors, setLessonErrors] = useState<any>({});

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");
  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");

  // Theme effect
  useEffect(() => {
    setCloudsUrl(
      theme === "dark"
        ? "/userDashboard/dark-clouds.svg"
        : "/userDashboard/light-clouds.svg"
    );
    setBackgroundColor(theme === "dark" ? "#012657" : "#dff9fb");
  }, [theme]);

  // Modal scroll effect
  useEffect(() => {
    if (showLessonModal || showEdeunModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLessonModal, showEdeunModal]);

  // Validation functions
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

          if (!firstErrorField) {
            firstErrorField = field;
            firstErrorMessage = err.message;
          }
        });

        // const formattedField = firstErrorField
        //   ? firstErrorField
        //       .replace(/([A-Z])/g, " $1")
        //       .replace(/^./, (str) => str.toUpperCase())
        //   : "";

        addAlert("Error", `${firstErrorMessage}`, "error");
        setLessonErrors(errors);
      }
      return false;
    }
  };

  // Handler functions
  const handleCourseChange = (field: keyof Course, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
    if (courseErrors[field]) {
      setCourseErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const handleLanguageSelect = (language: Language) => {
    handleCourseChange("languageId", language.id);
    setShowLanguageDropdown(false);
  };

  const handleLevelSelect = (level: Level) => {
    handleCourseChange("level", level);
    setShowLevelDropdown(false);
  };

  const handleLessonChange = (field: keyof Lesson, value: any) => {
    setCurrentLesson((prev) => ({ ...prev, [field]: value }));
    if (lessonErrors[field]) {
      setLessonErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

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
    // setCurrentContentSourceType(sourceType);

    if (sourceType === ContentSourceType.EDEDUN) {
      setShowEdeunModal(true);
    }
  };

  const updateContent = (index: number, updates: Partial<Content>) => {
    setCurrentLesson((prev) => ({
      ...prev,
      contents: prev.contents.map((content, i) =>
        i === index ? { ...content, ...updates } : content
      ),
    }));
  };

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

  const removeContentFile = (contentIndex: number, fileIndex: number) => {
    const currentContent = currentLesson.contents[contentIndex];
    const updatedContentFiles = currentContent.contentFiles.filter(
      (_, i) => i !== fileIndex
    );
    updateContent(contentIndex, { contentFiles: updatedContentFiles });
  };

  const saveLesson = () => {
    if (!validateLesson()) return;

    if (currentLessonIndex !== null) {
      setLessons((prev) =>
        prev.map((lesson, i) =>
          i === currentLessonIndex
            ? {
                ...currentLesson,
                id: lesson.id,
                contents: currentLesson.contents.map((content) => ({
                  ...content,
                  contentFiles: content.contentFiles.map((file) => ({
                    ...file,
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

  const editLesson = (index: number) => {
    setCurrentLesson(lessons[index]);
    setCurrentLessonIndex(index);
    setShowLessonModal(true);
  };

  const deleteLesson = (index: number) => {
    setLessons((prev) => prev.filter((_, i) => i !== index));
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeError = validateFileSize(file, ContentDataType.IMAGE);
      if (sizeError) {
        addAlert("Error", sizeError, "error");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      handleCourseChange("thumbnailImage", imageUrl);
      handleCourseChange("thumbnailFile", file);
    }
  };

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
        resourceType = "video";
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

      if (lessonIndex !== undefined) {
        setLessons((prev) =>
          prev.map((lesson, lIdx) =>
            lIdx === lessonIndex
              ? {
                  ...lesson,
                  contents: lesson.contents.map((content, cIdx) =>
                    cIdx === contentIndex
                      ? {
                          ...content,
                          contentFiles: content.contentFiles.map((f, fIdx) =>
                            fIdx === fileIndex
                              ? {
                                  ...f,
                                  filePath: secureUrl,
                                  file: undefined,
                                }
                              : f
                          ),
                        }
                      : content
                  ),
                }
              : lesson
          )
        );
      } else {
        setCurrentLesson((prev) => ({
          ...prev,
          contents: prev.contents.map((content, cIdx) =>
            cIdx === contentIndex
              ? {
                  ...content,
                  contentFiles: content.contentFiles.map((f, fIdx) =>
                    fIdx === fileIndex
                      ? {
                          ...f,
                          filePath: secureUrl,
                          file: undefined,
                        }
                      : f
                  ),
                }
              : content
          ),
        }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // setUploadErrors(prev => ({
      //   ...prev,
      //   [fileId]: error instanceof Error ? error.message : "Upload failed",
      // }));
      throw error;
    } finally {
      setUploadingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const handleThumbnailCloudinaryUpload = async (
    file: File
  ): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
      formData.append("resource_type", "image");

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

  const prepareDataForBackend = async () => {
    try {
      const uploadPromises: Promise<void>[] = [];

      lessons.forEach((lesson, lessonIndex) => {
        lesson.contents.forEach((content, contentIndex) => {
          content.contentFiles.forEach((file, fileIndex) => {
            if (file.file) {
              const promise = handleCloudinaryUpload(
                file.file,
                contentIndex,
                fileIndex,
                file.contentType,
                lessonIndex
              ).catch((error) => {
                console.error(
                  `Upload failed for lesson ${lessonIndex}, content ${contentIndex}, file ${fileIndex}:`,
                  error
                );
                throw error;
              });
              uploadPromises.push(promise);
            }
          });
        });
      });

      await Promise.all(uploadPromises);

      let thumbnailImageUrl = courseData.thumbnailImage;
      if (courseData.thumbnailFile) {
        thumbnailImageUrl = await handleThumbnailCloudinaryUpload(
          courseData.thumbnailFile
        );
      }

      const coursePayload = {
        courseData: {
          ...courseData,
          thumbnailImage: thumbnailImageUrl,
        },
        lessons: lessons.map((lesson) => ({
          ...lesson,
          contents: lesson.contents.map((content) => ({
            ...content,
            contentFiles: content.contentFiles.map((file) => ({
              ...file,
              filePath: file.filePath.startsWith("blob:")
                ? file.filePath
                : file.filePath,
            })),
          })),
        })),
      };

      return coursePayload;
    } catch (error) {
      console.error("Error preparing data:", error);
      throw error;
    }
  };

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
              <div className="relative">
                <InAppButton
                  onClick={() => {
                    setLoading(true);
                    router.push("/admin");
                  }}
                  background={theme === 'dark' ? '#dff9fb' : '#012657'}
                  width="100px"
                  borderRadius="10px"
                >
                  <div className="text-white flex justify-center items-center"
                  style={{color: theme === 'dark' ? '#012657' : '#dff9fb'}}
                  >
                    Journeys
                  </div>
                </InAppButton>
              </div>
              <div className="hidden lg:flex">
                <SettingsBreadcrumb isDark={theme === "dark"} />
              </div>
            </div>
          </div>

          <header className="">
            <div className="flex relative z-10 mt-6 justify-between text-[24px] font-semibold leading-[100%] text-[#162B6E]">
              <div className="flex-shrink-0">
                <span
                  className="text-sm md:text-sm lg:text-2xl"
                  style={{ color: theme === "dark" ? "#D0F7F6" : "#202124" }}
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
                <CourseForm
                  courseData={courseData}
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  showLanguageDropdown={showLanguageDropdown}
                  showLevelDropdown={showLevelDropdown}
                  courseErrors={courseErrors}
                  handleCourseChange={handleCourseChange}
                  handleLanguageSelect={handleLanguageSelect}
                  handleLevelSelect={handleLevelSelect}
                  setShowLanguageDropdown={setShowLanguageDropdown}
                  setShowLevelDropdown={setShowLevelDropdown}
                  handleThumbnailUpload={handleThumbnailUpload}
                  // theme={theme}
                />
              )}

              {/* Lessons Tab */}
              {activeTab === "lessons" && (
                <LessonsList
                  lessons={lessons}
                  editLesson={editLesson}
                  deleteLesson={deleteLesson}
                  setShowLessonModal={setShowLessonModal}
                  resetLessonForm={resetLessonForm}
                />
              )}

              {activeTab === "quizzes" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Lesson Quizzes</h3>
                    <InAppButton
                      disabled
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
      <LessonModal
        showLessonModal={showLessonModal}
        currentLesson={currentLesson}
        currentLessonIndex={currentLessonIndex}
        lessonErrors={lessonErrors}
        editingContentIndex={editingContentIndex}
        showEdeunModal={showEdeunModal}
        setShowLessonModal={setShowLessonModal}
        setCurrentLessonIndex={setCurrentLessonIndex}
        handleLessonChange={handleLessonChange}
        updateContent={updateContent}
        removeContent={removeContent}
        handleFileUpload={handleFileUpload}
        removeContentFile={removeContentFile}
        updateMediaDescription={updateMediaDescription}
        saveLesson={saveLesson}
        resetLessonForm={resetLessonForm}
        setEditingContentIndex={setEditingContentIndex}
        setShowEdeunModal={setShowEdeunModal}
        setCurrentContentSourceType={setCurrentContentSourceType}
        addContent={addContent}
      />

      {/* Ededun Modal */}
      <EdedunModal
        isOpen={showEdeunModal}
        onClose={() => setShowEdeunModal(false)}
        onSelect={handleEdedunSelection}
      />
    </div>
  );
};

export default CreateCoursePage;
