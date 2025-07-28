/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { z } from "zod";
import NormalInputField from "@/components/NormalInputField";
import InAppButton from "@/components/InAppButton";
import SettingsBreadcrumb from "@/components/dashboard/SettingsBreadcrumb";
import { ChevronDown, Plus, Trash2, Save } from "lucide-react";
import { appColors } from "@/constants/colors";

// Validation schemas
const courseSchema = z.object({
  title: z.string().min(1, "Course title is required").min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required").min(10, "Description must be at least 10 characters"),
  language: z.string().min(1, "Please select a language"),
});

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required").min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  order: z.number().min(1, "Order must be at least 1"),
});

const phaseSchema = z.object({
  title: z.string().min(1, "Phase title is required"),
  type: z.enum(["introduction", "content", "practice"]),
  content: z.object({
    text: z.string().optional(),
    images: z.array(z.string()).optional(),
    audio: z.string().optional(),
    video: z.string().optional(),
  }),
});

const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  type: z.enum(["multiple_choice", "true_false", "fill_blank"]),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.number(), z.string()]),
  explanation: z.string().optional(),
  points: z.number().min(1, "Points must be at least 1"),
});

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Phase {
  id: string;
  title: string;
  type: "introduction" | "content" | "practice";
  content: {
    text?: string;
    images?: string[];
    audio?: string;
    video?: string;
  };
  order: number;
}

interface Question {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false" | "fill_blank";
  options?: string[];
  correctAnswer: number | string;
  explanation?: string;
  points: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  phases: Phase[];
  quiz: {
    title: string;
    questions: Question[];
    timeLimit?: number;
    maxAttempts: number;
    passingScore: number;
  };
}

const CreateContentPage = () => {
  // Language options
  const languages: Language[] = [
    { code: "YO", name: "Yorùbá", flag: "🇳🇬" },
    { code: "IG", name: "Igbo", flag: "🇳🇬" },
    { code: "HA", name: "Hausa", flag: "🇳🇬" },
    { code: "FR", name: "French", flag: "🇫🇷" },
    { code: "ES", name: "Spanish", flag: "🇪🇸" },
    { code: "DE", name: "German", flag: "🇩🇪" },
  ];

  // Course state
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    language: "",
  });

  // Lessons state
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number | null>(null);

  // Current lesson being edited
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    id: "",
    title: "",
    description: "",
    order: 1,
    phases: [],
    quiz: {
      title: "",
      questions: [],
      maxAttempts: 3,
      passingScore: 70,
    },
  });

  // UI state
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<"course" | "lessons">("course");
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingPhaseIndex, setEditingPhaseIndex] = useState<number | null>(null);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  // Form validation states
  const [courseErrors, setCourseErrors] = useState({
    title: "",
    description: "",
    language: "",
  });

  const [lessonErrors, setLessonErrors] = useState({
    title: "",
    description: "",
    order: "",
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Theme state
  const [isDark, setIsDark] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#dff9fb");
  const [cloudsUrl, setCloudsUrl] = useState("/userDashboard/light-clouds.svg");

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 18 || hours < 6) {
      setBackgroundColor("#012657");
      setCloudsUrl("/userDashboard/dark-clouds.svg");
      setIsDark(true);
    }
  }, []);

  // Validate course data
  const validateCourse = () => {
    try {
      courseSchema.parse(courseData);
      setCourseErrors({ title: "", description: "", language: "" });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = { title: "", description: "", language: "" };
        error.errors.forEach((err) => {
          if (err.path[0] === "title") errors.title = err.message;
          if (err.path[0] === "description") errors.description = err.message;
          if (err.path[0] === "language") errors.language = err.message;
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
        order: currentLesson.order,
      });
      setLessonErrors({ title: "", description: "", order: "" });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = { title: "", description: "", order: "" };
        error.errors.forEach((err) => {
          if (err.path[0] === "title") errors.title = err.message;
          if (err.path[0] === "description") errors.description = err.message;
          if (err.path[0] === "order") errors.order = err.message;
        });
        setLessonErrors(errors);
      }
      return false;
    }
  };

  // Handle course input changes
  const handleCourseChange = (field: keyof typeof courseData, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error when user starts typing
    if (courseErrors[field as keyof typeof courseErrors]) {
      setCourseErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Handle language selection
  const handleLanguageSelect = (language: Language) => {
    handleCourseChange("language", language.code);
    setShowLanguageDropdown(false);
  };

  // Handle lesson changes
  const handleLessonChange = (field: keyof Lesson, value: any) => {
    setCurrentLesson(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error when user starts typing
    if (lessonErrors[field as keyof typeof lessonErrors]) {
      setLessonErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Add new phase
  const addPhase = () => {
    const newPhase: Phase = {
      id: `phase_${Date.now()}`,
      title: "",
      type: "introduction",
      content: { text: "" },
      order: currentLesson.phases.length + 1,
    };
    
    setCurrentLesson(prev => ({
      ...prev,
      phases: [...prev.phases, newPhase],
    }));
    setEditingPhaseIndex(currentLesson.phases.length);
  };

  // Update phase
  const updatePhase = (index: number, updates: Partial<Phase>) => {
    setCurrentLesson(prev => ({
      ...prev,
      phases: prev.phases.map((phase, i) => 
        i === index ? { ...phase, ...updates } : phase
      ),
    }));
  };

  // Remove phase
  const removePhase = (index: number) => {
    setCurrentLesson(prev => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index),
    }));
    setEditingPhaseIndex(null);
  };

  // Add new question
  const addQuestion = () => {
    const newQuestion: Question = {
      id: `question_${Date.now()}`,
      question: "",
      type: "multiple_choice",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      points: 1,
    };
    
    setCurrentLesson(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        questions: [...prev.quiz.questions, newQuestion],
      },
    }));
    setEditingQuestionIndex(currentLesson.quiz.questions.length);
  };

  // Update question
  const updateQuestion = (index: number, updates: Partial<Question>) => {
    setCurrentLesson(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        questions: prev.quiz.questions.map((question, i) => 
          i === index ? { ...question, ...updates } : question
        ),
      },
    }));
  };

  // Remove question
  const removeQuestion = (index: number) => {
    setCurrentLesson(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        questions: prev.quiz.questions.filter((_, i) => i !== index),
      },
    }));
    setEditingQuestionIndex(null);
  };

  // Save lesson
  const saveLesson = () => {
    if (!validateLesson()) return;
    
    if (currentLessonIndex !== null) {
      // Update existing lesson
      setLessons(prev => 
        prev.map((lesson, i) => 
          i === currentLessonIndex ? { ...currentLesson, id: lesson.id } : lesson
        )
      );
    } else {
      // Add new lesson
      const newLesson = { ...currentLesson, id: `lesson_${Date.now()}` };
      setLessons(prev => [...prev, newLesson]);
    }
    
    setShowLessonModal(false);
    setCurrentLessonIndex(null);
    resetLessonForm();
  };

  // Reset lesson form
  const resetLessonForm = () => {
    setCurrentLesson({
      id: "",
      title: "",
      description: "",
      order: lessons.length + 1,
      phases: [],
      quiz: {
        title: "",
        questions: [],
        maxAttempts: 3,
        passingScore: 70,
      },
    });
    setEditingPhaseIndex(null);
    setEditingQuestionIndex(null);
  };

  // Edit lesson
  const editLesson = (index: number) => {
    setCurrentLesson(lessons[index]);
    setCurrentLessonIndex(index);
    setShowLessonModal(true);
  };

  // Delete lesson
  const deleteLesson = (index: number) => {
    setLessons(prev => prev.filter((_, i) => i !== index));
  };

  // Submit entire course
  const handleSubmit = async () => {
    if (!validateCourse()) {
      setActiveTab("course");
      return;
    }
    
    if (lessons.length === 0) {
      alert("Please add at least one lesson");
      setActiveTab("lessons");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const coursePayload = {
        ...courseData,
        lessons: lessons,
      };
      
      console.log("Submitting course:", coursePayload);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("Course created successfully!");
      
      // Reset form
      setCourseData({ title: "", description: "", language: "" });
      setLessons([]);
      setActiveTab("course");
      
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedLanguage = languages.find(lang => lang.code === courseData.language);

  return (
    <div className="">
      <Head>
        <title>Create Language Content</title>
        <meta name="description" content="Create courses and lessons for language learning" />
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
                <SettingsBreadcrumb isDark={isDark} />
              </div>
            </div>
          </div>
          
          <header className="relative">
            <div className="flex relative z-10 mt-6 justify-between text-[24px] font-semibold leading-[100%] text-[#162B6E]">
              <div className="flex-shrink-0">
                <span
                  className="text-sm md:text-sm lg:text-2xl"
                  style={{ color: isDark ? "#D0F7F6" : "#202124" }}
                >
                  Create Language Content
                </span>
              </div>
            </div>
          </header>

          <section className="mt-36"
          style={{zIndex: 1000}}
          >
            <div className="bg-white rounded-lg shadow-md p-6"
            style={{zIndex: 1000}}
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
              </div>

              {/* Course Details Tab */}
              {activeTab === "course" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title
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
                      Description
                    </label>
                    <textarea
                      value={courseData.description}
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
                      <p className="text-red-600 text-sm mt-1">{courseErrors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left bg-blue-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        style={{
                          backgroundColor: "#E3EFFC",
                          border: courseErrors.language ? "1px solid #D42620" : "0",
                          height: "56px",
                        }}
                      >
                        <span>
                          {selectedLanguage ? (
                            <span className="flex items-center">
                              <span className="mr-2">{selectedLanguage.flag}</span>
                              {selectedLanguage.name}
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
                              key={language.code}
                              type="button"
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
                              onClick={() => handleLanguageSelect(language)}
                            >
                              <span className="mr-2">{language.flag}</span>
                              {language.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {courseErrors.language && (
                      <p className="text-red-600 text-sm mt-1">{courseErrors.language}</p>
                    )}
                  </div>
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
                      <div><Plus size={20} className="mr-2" /></div>
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
                              <p className="text-gray-600 text-sm mt-1">{lesson.description}</p>
                              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                <span>Order: {lesson.order}</span>
                                <span>Phases: {lesson.phases.length}</span>
                                <span>Quiz Questions: {lesson.quiz.questions.length}</span>
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

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t">
                <InAppButton
                  onClick={handleSubmit}
                  disabled={isLoading}
                  backgroundColor={appColors.darkRoyalBlueForBtn}
                  disabledColor={appColors.disabledButtonBlue}
                  width="200px"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div><Save size={20} className="mr-2" /></div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {currentLessonIndex !== null ? "Edit Lesson" : "Create New Lesson"}
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
                      Lesson Title
                    </label>
                    <NormalInputField
                      id="lessonTitle"
                      value={currentLesson.title}
                      onChange={(e) => handleLessonChange("title", e.target.value)}
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
                      Order
                    </label>
                    <NormalInputField
                      id="lessonOrder"
                      value={currentLesson.order.toString()}
                      onChange={(e) => handleLessonChange("order", parseInt(e.target.value) || 1)}
                      placeholder="Lesson order"
                      type="number"
                      error={!!lessonErrors.order}
                      errorMessage={lessonErrors.order}
                      backgroundColor="#E3EFFC"
                      border="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={currentLesson.description}
                    onChange={(e) => handleLessonChange("description", e.target.value)}
                    placeholder="Enter lesson description"
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: "#E3EFFC",
                      border: lessonErrors.description ? "1px solid #D42620" : "0",
                      fontFamily: "Lexend",
                    }}
                  />
                  {lessonErrors.description && (
                    <p className="text-red-600 text-sm mt-1">{lessonErrors.description}</p>
                  )}
                </div>

                {/* Phases Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Lesson Phases</h3>
                    <button
                      onClick={addPhase}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Phase
                    </button>
                  </div>
                  
                  {currentLesson.phases.map((phase, index) => (
                    <div key={phase.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Phase {index + 1}</h4>
                        <button
                          onClick={() => removePhase(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <NormalInputField
                          id={`phase-title-${index}`}
                          value={phase.title}
                          onChange={(e) => updatePhase(index, { title: e.target.value })}
                          placeholder="Phase title"
                          type="text"
                          backgroundColor="#F8F9FA"
                          border="1px solid #E9ECEF"
                        />
                        
                        <select
                          value={phase.type}
                          onChange={(e) => updatePhase(index, { type: e.target.value as Phase["type"] })}
                          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ backgroundColor: "#F8F9FA", height: "56px" }}
                        >
                          <option value="introduction">Introduction</option>
                          <option value="content">Content</option>
                          <option value="practice">Practice</option>
                        </select>
                      </div>
                      
                      <textarea
                        value={phase.content.text || ""}
                        onChange={(e) => updatePhase(index, { 
                          content: { ...phase.content, text: e.target.value }
                        })}
                        placeholder="Phase content"
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ backgroundColor: "#F8F9FA" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Quiz Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Quiz Questions</h3>
                    <button
                      onClick={addQuestion}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Question
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <NormalInputField
                      id="quizTitle"
                      value={currentLesson.quiz.title}
                      onChange={(e) => handleLessonChange("quiz", { 
                        ...currentLesson.quiz, 
                        title: e.target.value 
                      })}
                      placeholder="Quiz title"
                      type="text"
                      backgroundColor="#E3EFFC"
                      border="0"
                    />
                    
                    <NormalInputField
                      id="maxAttempts"
                      value={currentLesson.quiz.maxAttempts.toString()}
                      onChange={(e) => handleLessonChange("quiz", { 
                        ...currentLesson.quiz, 
                        maxAttempts: parseInt(e.target.value) || 3 
                      })}
                      placeholder="Max attempts"
                      type="number"
                      backgroundColor="#E3EFFC"
                      border="0"
                    />
                    
                    <NormalInputField
                      id="passingScore"
                      value={currentLesson.quiz.passingScore.toString()}
                      onChange={(e) => handleLessonChange("quiz", { 
                        ...currentLesson.quiz, 
                        passingScore: parseInt(e.target.value) || 70 
                      })}
                      placeholder="Passing score (%)"
                      type="number"
                      backgroundColor="#E3EFFC"
                      border="0"
                    />
                  </div>
                  
                  {currentLesson.quiz.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        <button
                          onClick={() => removeQuestion(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <select
                            value={question.type}
                            onChange={(e) => updateQuestion(index, { 
                              type: e.target.value as Question["type"],
                              options: e.target.value === "multiple_choice" ? ["", "", "", ""] : undefined,
                              correctAnswer: e.target.value === "true_false" ? 0 : question.correctAnswer
                            })}
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ backgroundColor: "#F8F9FA", height: "56px" }}
                          >
                            <option value="multiple_choice">Multiple Choice</option>
                            <option value="true_false">True/False</option>
                            <option value="fill_blank">Fill in the Blank</option>
                          </select>
                          
                          <NormalInputField
                            id={`question-points-${index}`}
                            value={question.points.toString()}
                            onChange={(e) => updateQuestion(index, { 
                              points: parseInt(e.target.value) || 1 
                            })}
                            placeholder="Points"
                            type="number"
                            backgroundColor="#F8F9FA"
                            border="1px solid #E9ECEF"
                          />
                        </div>
                        
                        <textarea
                          value={question.question}
                          onChange={(e) => updateQuestion(index, { question: e.target.value })}
                          placeholder="Enter your question"
                          rows={2}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ backgroundColor: "#F8F9FA" }}
                        />
                        
                        {/* Multiple Choice Options */}
                        {question.type === "multiple_choice" && question.options && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Answer Options (select correct answer):
                            </label>
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${index}`}
                                  checked={question.correctAnswer === optionIndex}
                                  onChange={() => updateQuestion(index, { correctAnswer: optionIndex })}
                                  className="w-4 h-4"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...question.options!];
                                    newOptions[optionIndex] = e.target.value;
                                    updateQuestion(index, { options: newOptions });
                                  }}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  style={{ backgroundColor: "#F8F9FA" }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* True/False Options */}
                        {question.type === "true_false" && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Correct Answer:
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`tf-correct-${index}`}
                                  checked={question.correctAnswer === 0}
                                  onChange={() => updateQuestion(index, { correctAnswer: 0 })}
                                  className="w-4 h-4 mr-2"
                                />
                                True
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`tf-correct-${index}`}
                                  checked={question.correctAnswer === 1}
                                  onChange={() => updateQuestion(index, { correctAnswer: 1 })}
                                  className="w-4 h-4 mr-2"
                                />
                                False
                              </label>
                            </div>
                          </div>
                        )}
                        
                        {/* Fill in the Blank */}
                        {question.type === "fill_blank" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Correct Answer:
                            </label>
                            <NormalInputField
                              id={`fill-answer-${index}`}
                              value={question.correctAnswer.toString()}
                              onChange={(e) => updateQuestion(index, { correctAnswer: e.target.value })}
                              placeholder="Enter the correct answer"
                              type="text"
                              backgroundColor="#F8F9FA"
                              border="1px solid #E9ECEF"
                            />
                          </div>
                        )}
                        
                        {/* Explanation */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Explanation (optional):
                          </label>
                          <textarea
                            value={question.explanation || ""}
                            onChange={(e) => updateQuestion(index, { explanation: e.target.value })}
                            placeholder="Explain why this is the correct answer"
                            rows={2}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ backgroundColor: "#F8F9FA" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {currentLesson.quiz.questions.length === 0 && (
                    <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      No quiz questions added yet. Click "Add Question" to create your first question.
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
                  backgroundColor={appColors.darkRoyalBlueForBtn}
                  width="120px"
                  height="40px"
                >
                  Save Lesson
                </InAppButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentPage;