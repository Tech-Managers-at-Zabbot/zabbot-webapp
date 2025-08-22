/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getLessonWithContents,
  getUserCourse,
} from "@/services/generalApi/lessons/api";
import { useUser } from "./UserContext";
import {
  useCreateUserCourse,
  useUpdateUserCourse,
} from "@/services/generalApi/lessons/mutation";

interface Content {
  id: string;
  lessonId: string;
  customText: string;
  translation: string;
  isGrammarRule: boolean;
  sourceType: string;
  ededunPhrases?: any;
}

interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  contentId?: string;
  languageId: string;
  quizType: "MULTIPLE_CHOICE" | "FILL_IN_BLANK";
  instruction: string;
  question: string;
  options?: string[];
  correctOption?: string;
  correctAnswer?: string;
  createdAt: string;
  updatedAt?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  courseId: string;
  orderNumber: number;
  estimatedDuration: number;
  totalContents: number;
}

interface UserCourse {
  id: string;
  userId: string;
  courseId: string;
  lastLessonId?: string;
  lastContentId?: string;
  progress: number;
  isCompleted: boolean;
}

interface QuizResult {
  quizId: string;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: string;
}

type LessonStep =
  | "intro"
  | "content"
  | "lesson-completed"
  | "quiz"
  | "completed";

interface LessonContextType {
  lesson: Lesson | null;
  contents: Content[];
  lessonQuizzes: Quiz[];
  currentContentIndex: number;
  currentContent: Content | null;
  userCourse: UserCourse | null;
  isLoading: boolean;

  // Quiz-related state
  quizzes: Quiz[];
  currentQuizIndex: number;
  currentQuiz: Quiz | any;
  currentStep: LessonStep;
  quizResults: QuizResult[];

  // Actions
  nextContent: () => void;
  startLesson: () => void;
  previousContent: () => void;
  goToContent: (index: number) => void;
  markContentComplete: () => void;
  completeLesson: () => void;
  navigateToCompletion: () => void;

  // Quiz actions
  nextQuiz: () => void;
  previousQuiz: () => void;
  goToQuiz: (index: number) => void;
  startQuizPhase: () => void;
  submitQuizAnswer: (
    quizId: string,
    userAnswer: string,
    isCorrect: boolean
  ) => void;
  completeQuizPhase: () => void;

  // Progress
  progressPercentage: number;
  isFirstContent: boolean;
  isLastContent: boolean;
  isFirstQuiz: boolean;
  isLastQuiz: boolean;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const useLessonContext = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within a LessonProvider");
  }
  return context;
};

interface LessonProviderProps {
  children: React.ReactNode;
}

export const LessonProvider: React.FC<LessonProviderProps> = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const {
    mutateAsync: addUserCourse,
    // isPending: createUserCourseLoading
  } = useCreateUserCourse();

  const {
    mutate: userCourseUpdate,
    // isPending: userCourseUpdateLoading
  } = useUpdateUserCourse();

  const { courseId, lessonId } = params;

  // State
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessonQuizzes, setLessonQuizzes] = useState<Quiz[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(-1);
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userDetails } = useUser();

  //  const {
  //   data: userCourseDetails,
  //   refetch: refetchUserCourse,
  //   error: userCourseError
  // } = useGetUserCourse(userDetails.languageId, courseId, {
  //   enabled: false,
  // });

  // Quiz-related state
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(-1);
  const [currentStep, setCurrentStep] = useState<LessonStep>("intro");
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  // Local Storage Keys
  const LESSON_PROGRESS_KEY = `lesson_progress_${lessonId}`;
  const USER_COURSE_KEY = `user_course_${courseId}`;
  const QUIZ_RESULTS_KEY = `quiz_results_${lessonId}`;

  // Load lesson data and user progress
  const loadLessonData = useCallback(async () => {
    try {
      localStorage.removeItem(USER_COURSE_KEY);
      localStorage.removeItem(LESSON_PROGRESS_KEY);
      localStorage.removeItem(QUIZ_RESULTS_KEY);

      setIsLoading(true);

      const response = await getLessonWithContents(lessonId);
      const data = response?.data;
      setLesson(data.lesson);
      setContents(data.contents);
      setLessonQuizzes(data.lessonQuizzes);
      setQuizzes(data.lessonQuizzes || []);

      // Load saved progress from localStorage
      const savedProgress = localStorage.getItem(LESSON_PROGRESS_KEY);
      if (savedProgress) {
        const { contentIndex, quizIndex, step } = JSON.parse(savedProgress);
        setCurrentContentIndex(
          Math.min(contentIndex, data.contents.length - 1)
        );
        if (quizIndex !== undefined) {
          setCurrentQuizIndex(
            Math.min(quizIndex, (data.lessonQuizzes || []).length - 1)
          );
        }
        if (step) {
          setCurrentStep(step);
        }
      } else {
        // If no saved progress, start at intro state
        setCurrentContentIndex(-1);
        setCurrentQuizIndex(-1);
        setCurrentStep("intro");
      }

      // Load saved quiz results
      const savedQuizResults = localStorage.getItem(QUIZ_RESULTS_KEY);
      if (savedQuizResults) {
        setQuizResults(JSON.parse(savedQuizResults));
      }

      await loadOrCreateUserCourse();
    } catch (error) {
      console.error("Error loading lesson data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId]);

  // Load or create user course
  const loadOrCreateUserCourse = async () => {
    try {
      localStorage.removeItem(USER_COURSE_KEY);
      localStorage.removeItem(LESSON_PROGRESS_KEY);
      localStorage.removeItem(QUIZ_RESULTS_KEY);
      let userCourse;

      try {
        const response = await getUserCourse(
          userDetails.languageId,
          courseId,
          lessonId
        );
        userCourse = response.data;
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          const userCourseDetailsInfo = {
            lastLessonId: lessonId,
            lastContentId: null,
          };

          const createResponse = await addUserCourse({
            languageId: userDetails.languageId,
            courseId: courseId,
            userCourseData: userCourseDetailsInfo,
          });

          userCourse = createResponse?.data;
        } else {
          throw error;
        }
      }

      if (userCourse) {
        setUserCourse(userCourse);
        localStorage.setItem(USER_COURSE_KEY, JSON.stringify(userCourse));
      }
    } catch (error) {
      console.error("Error in loadOrCreateUserCourse:", error);
    }
  };

  const saveProgress = useCallback(
    async (
      contentIndex: number,
      quizIndex: number = -1,
      step: LessonStep,
      contentId?: string,
      sendToBackend: boolean = false
    ) => {
      const progressData = {
        contentIndex,
        quizIndex,
        step,
        contentId,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(progressData));

      if (userCourse && contentId) {
        const totalItems = contents.length + quizzes.length;
        const completedItems =
          Math.max(0, contentIndex + 1) + Math.max(0, quizIndex + 1);
        const progress =
          totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

        const newLastAccessed = new Date().toISOString();

        const updatedUserCourse = {
          ...userCourse,
          isCompleted: progress >= 100 ? true : false,
          lastLessonId: lessonId as string,
          lastContentId: contentId,
          lastAccessed: newLastAccessed,
          progress,
        };
        const existing = JSON.stringify(userCourse);
        const updated = JSON.stringify(updatedUserCourse);

        if (existing !== updated) {
          setUserCourse(updatedUserCourse);
          localStorage.setItem(USER_COURSE_KEY, updated);
        }

        if (sendToBackend) {
          userCourseUpdate(
            {
              languageId: userDetails.languageId,
              courseId,
              updateData: {
                ...updatedUserCourse,
                progress: 100,
                isCompleted: true,
              },
            },
            {
              onSuccess: () => localStorage.removeItem(USER_COURSE_KEY),
              onError: (error: any) => {
                console.log("failedCompletion", error);
              },
            }
          );
        }
      }
    },
    [
      lessonId,
      contents.length,
      quizzes.length,
      userCourseUpdate,
      userDetails.languageId,
      courseId,
    ]
  );

  // Content Actions
  const nextContent = useCallback(() => {
    if (currentContentIndex < contents.length - 1) {
      const newIndex = currentContentIndex + 1;
      setCurrentContentIndex(newIndex);
      saveProgress(
        newIndex,
        currentQuizIndex,
        "content",
        contents[newIndex]?.id
      );
    } else if (currentContentIndex === contents.length - 1) {
      setCurrentStep("lesson-completed");
      saveProgress(contents.length, currentQuizIndex, "lesson-completed");
    } else if (quizzes.length > 0) {
      // Move to quiz phase after completing all content
      startQuizPhase();
    } else {
      // No quizzes, complete lesson
      completeLesson();
    }
  }, [
    currentContentIndex,
    currentQuizIndex,
    contents,
    quizzes.length,
    saveProgress,
  ]);

  const previousContent = useCallback(() => {
    if (currentContentIndex > 0) {
      const newIndex = currentContentIndex - 1;
      setCurrentContentIndex(newIndex);
      setCurrentStep("content");
      saveProgress(
        newIndex,
        currentQuizIndex,
        "content",
        contents[newIndex]?.id
      );
    }
  }, [currentContentIndex, currentQuizIndex, contents, saveProgress]);

  const goToContent = useCallback(
    (index: number) => {
      if (index >= 0 && index < contents.length) {
        setCurrentContentIndex(index);
        setCurrentStep("content");
        saveProgress(index, currentQuizIndex, "content", contents[index]?.id);
      }
    },
    [contents, currentQuizIndex, saveProgress]
  );

  const startLesson = useCallback(() => {
    setCurrentContentIndex(0);
    setCurrentStep("content");
    if (contents.length > 0) {
      saveProgress(0, currentQuizIndex, "content", contents[0]?.id);
    }
  }, [contents, currentQuizIndex, saveProgress]);

  // Quiz Actions
  const nextQuiz = useCallback(() => {
    const isLast = currentQuizIndex >= quizzes.length - 1;

    if (!isLast) {
      const newIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(newIndex);
      saveProgress(currentContentIndex, newIndex, "quiz");
    }

    if (isLast || currentQuizIndex + 1 >= quizzes.length) {
      setCurrentStep("completed");
      saveProgress(currentContentIndex, currentQuizIndex, "completed");
      completeQuizPhase();
    }
  }, [currentQuizIndex, currentContentIndex, quizzes.length, saveProgress]);

  const previousQuiz = useCallback(() => {
    if (currentQuizIndex > 0) {
      const newIndex = currentQuizIndex - 1;
      setCurrentQuizIndex(newIndex);
      saveProgress(currentContentIndex, newIndex, "quiz");
    } else {
      // Go back to content phase
      setCurrentStep("content");
      setCurrentContentIndex(contents.length - 1);
      saveProgress(contents.length - 1, -1, "content");
    }
  }, [currentQuizIndex, currentContentIndex, contents.length, saveProgress]);

  const goToQuiz = useCallback(
    (index: number) => {
      if (index >= 0 && index < quizzes.length) {
        setCurrentQuizIndex(index);
        setCurrentStep("quiz");
        saveProgress(currentContentIndex, index, "quiz");
      }
    },
    [quizzes.length, currentContentIndex, saveProgress]
  );

  const startQuizPhase = useCallback(() => {
    if (quizzes.length > 0) {
      setCurrentQuizIndex(0);
      setCurrentStep("quiz");
      saveProgress(currentContentIndex, 0, "quiz");
    } else {
      // No quizzes, go straight to completion
      setCurrentStep("completed");
      saveProgress(currentContentIndex, -1, "completed");
    }
  }, [quizzes.length, currentContentIndex, saveProgress]);

  const submitQuizAnswer = useCallback(
    (quizId: string, userAnswer: string, isCorrect: boolean) => {
      const quizResult: QuizResult = {
        quizId,
        userAnswer,
        isCorrect,
        timestamp: new Date().toISOString(),
      };

      setQuizResults((prev) => {
        const updated = [
          ...prev.filter((r) => r.quizId !== quizId),
          quizResult,
        ];
        localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const completeQuizPhase = useCallback(() => {
    setCurrentStep("completed");
    saveProgress(currentContentIndex, currentQuizIndex, "completed");
    completeLesson();
  }, [currentContentIndex, currentQuizIndex, saveProgress]);

  const markContentComplete = useCallback(() => {
    nextContent();
  }, [nextContent]);

  const completeLesson = useCallback(async () => {
    setCurrentStep("completed");

    if (userCourse) {
      const completedUserCourse = {
        ...userCourse,
        isCompleted: true,
        progress: 100,
        lastAccessed: new Date(),
      };

      setUserCourse(completedUserCourse);
      localStorage.setItem(
        USER_COURSE_KEY,
        JSON.stringify(completedUserCourse)
      );
      localStorage.removeItem(LESSON_PROGRESS_KEY);
      saveProgress(
        contents.length - 1,
        quizzes.length - 1,
        "lesson-completed",
        quizzes.length > 0
          ? quizzes[quizzes.length - 1].id
          : contents[contents.length - 1].id,
        true
      );
    }
  }, [
    userCourse,
    saveProgress,
    contents,
    quizzes,
    LESSON_PROGRESS_KEY,
    USER_COURSE_KEY,
  ]);

  const navigateToCompletion = useCallback(async () => {
    router.push(`/lesson/${courseId}/completed`);
  }, [router, courseId]);

  // Load data on mount
  useEffect(() => {
    if (lessonId) {
      loadLessonData();
    }
  }, [lessonId, loadLessonData]);

  // Auto-save progress when content or quiz changes
  useEffect(() => {
    if (
      currentStep === "content" &&
      contents.length > 0 &&
      currentContentIndex >= 0
    ) {
      const currentContent = contents[currentContentIndex];
      if (currentContent) {
        saveProgress(
          currentContentIndex,
          currentQuizIndex,
          "content",
          currentContent.id
        );
      }
    } else if (
      currentStep === "quiz" &&
      quizzes.length > 0 &&
      currentQuizIndex >= 0
    ) {
      saveProgress(currentContentIndex, currentQuizIndex, "quiz");
    }
  }, [
    currentContentIndex,
    currentQuizIndex,
    currentStep,
    contents,
    quizzes,
    saveProgress,
  ]);

  // Calculated values
  const currentContent =
    currentContentIndex >= 0 ? contents[currentContentIndex] || null : null;
  const currentQuiz =
    currentQuizIndex >= 0 ? quizzes[currentQuizIndex] || null : null;

  const totalItems = contents.length + quizzes.length;
  const completedContentItems = Math.max(
    0,
    currentContentIndex + (currentStep === "content" ? 1 : 0)
  );
  const completedQuizItems = Math.max(
    0,
    currentQuizIndex + (currentStep === "quiz" ? 1 : 0)
  );
  const progressPercentage =
    totalItems > 0
      ? Math.round(
          ((completedContentItems + completedQuizItems) / totalItems) * 100
        )
      : 0;

  const isFirstContent = currentContentIndex === 0;
  const isLastContent = currentContentIndex === contents.length - 1;
  const isFirstQuiz = currentQuizIndex === 0;
  const isLastQuiz = currentQuizIndex === quizzes.length - 1;

  const value: LessonContextType = {
    lesson,
    contents,
    lessonQuizzes,
    currentContentIndex,
    currentContent,
    userCourse,
    isLoading,

    // Quiz-related state
    quizzes,
    currentQuizIndex,
    currentQuiz,
    currentStep,
    quizResults,

    // Content actions
    startLesson,
    nextContent,
    previousContent,
    goToContent,
    markContentComplete,
    completeLesson,
    navigateToCompletion,

    // Quiz actions
    nextQuiz,
    previousQuiz,
    goToQuiz,
    startQuizPhase,
    submitQuizAnswer,
    completeQuizPhase,

    // Progress
    progressPercentage,
    isFirstContent,
    isLastContent,
    isFirstQuiz,
    isLastQuiz,
  };

  useEffect(() => {
    const syncCourse = () => {
      const storedUserCourse = localStorage.getItem(USER_COURSE_KEY);
      if (storedUserCourse) {
        const parsed = JSON.parse(storedUserCourse);
        const currentContent =
          currentContentIndex >= 0
            ? contents[currentContentIndex] || null
            : null;
        const currentQuiz =
          currentQuizIndex >= 0 ? quizzes[currentQuizIndex] || null : null;

        const totalItems = contents.length + quizzes.length;
        const completedContentItems = Math.max(
          0,
          currentContentIndex + (currentStep === "content" ? 1 : 0)
        );
        const completedQuizItems = Math.max(
          0,
          currentQuizIndex + (currentStep === "quiz" ? 1 : 0)
        );
        const progressPercentage =
          totalItems > 0
            ? Math.round(
                ((completedContentItems + completedQuizItems) / totalItems) *
                  100
              )
            : 0;
        userCourseUpdate({
          languageId: userDetails.languageId,
          courseId,
          updateData: {
            ...parsed,
            lastLessonId: parsed.lastLessonId || lessonId || null,
            lastContentId:
              parsed.lastContentId || contents[currentContentIndex]?.id || null,
            progress: progressPercentage,
            isCompleted: parsed?.progress >= 100 || progressPercentage >= 100,
          },
        });
      }
    };

    syncCourse();
    const interval = setInterval(syncCourse, 60 * 60 * 1000);
    window.addEventListener("focus", syncCourse);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", syncCourse);
    };
  }, [
    userCourseUpdate,
    userDetails.languageId,
    courseId,
    contents,
    quizzes,
    currentContentIndex,
    currentQuizIndex,
    currentStep,
    lessonId,
  ]);

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
};
