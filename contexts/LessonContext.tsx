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
import { getLessonWithContents } from "@/services/generalApi/lessons/api";

interface Content {
  id: string;
  lessonId: string;
  customText: string;
  translation: string;
  isGrammarRule: boolean;
  sourceType: string;
  ededunPhrases?: any;
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

interface LessonContextType {
  lesson: Lesson | null;
  contents: Content[];
  currentContentIndex: number;
  currentContent: Content | null;
  userCourse: UserCourse | null;
  isLoading: boolean;

  // Actions
  nextContent: () => void;
  startLesson: () => void;
  previousContent: () => void;
  goToContent: (index: number) => void;
  markContentComplete: () => void;
  completeLesson: () => void;
  navigateToCompletion: () => void;

  // Progress
  progressPercentage: number;
  isFirstContent: boolean;
  isLastContent: boolean;
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
  const { courseId, lessonId } = params;

  // State
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(-1);
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Local Storage Keys
  const LESSON_PROGRESS_KEY = `lesson_progress_${lessonId}`;
  const USER_COURSE_KEY = `user_course_${courseId}`;

  // Load lesson data and user progress
  const loadLessonData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getLessonWithContents(lessonId);
      const data = response?.data;
      setLesson(data.lesson);
      setContents(data.contents);

      // Load saved progress from localStorage
      const savedProgress = localStorage.getItem(LESSON_PROGRESS_KEY);
      if (savedProgress) {
        const { contentIndex } = JSON.parse(savedProgress);
        setCurrentContentIndex(
          Math.min(contentIndex, data.contents.length - 1)
        );
      } else {
        // If no saved progress, start at -1 (intro state)
        setCurrentContentIndex(-1);
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
      // Check if user course exists in localStorage first
      const savedUserCourse = localStorage.getItem(USER_COURSE_KEY);

      if (savedUserCourse) {
        setUserCourse(JSON.parse(savedUserCourse));
        return;
      }

      // Try to fetch from backend
      const response = await fetch(`/api/user-courses/${courseId}`);

      if (response.ok) {
        const data = await response.json();
        setUserCourse(data);
        localStorage.setItem(USER_COURSE_KEY, JSON.stringify(data));
      } else {
        // Create new user course
        const createResponse = await fetch("/api/user-courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId,
            lastLessonId: lessonId,
            languageId: "your-language-id", // Get this from your app context
          }),
        });

        if (createResponse.ok) {
          const newUserCourse = await createResponse.json();
          setUserCourse(newUserCourse);
          localStorage.setItem(USER_COURSE_KEY, JSON.stringify(newUserCourse));
        }
      }
    } catch (error) {
      console.error("Error loading/creating user course:", error);
    }
  };

  // Save progress to localStorage and backend
  const saveProgress = useCallback(
    async (contentIndex: number, contentId?: string) => {
      // Save to localStorage immediately
      const progressData = {
        contentIndex,
        contentId,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(progressData));

      // Update user course
      if (userCourse && contentId) {
        const updatedUserCourse = {
          ...userCourse,
          lastLessonId: lessonId as string,
          lastContentId: contentId,
          lastAccessed: new Date(),
          progress: Math.round((contentIndex / contents.length) * 100),
        };

        setUserCourse(updatedUserCourse);
        localStorage.setItem(
          USER_COURSE_KEY,
          JSON.stringify(updatedUserCourse)
        );

        // Save to backend (don't await to avoid blocking UI)
        fetch(`/api/user-courses/${userCourse.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserCourse),
        }).catch((error) =>
          console.error("Error saving progress to backend:", error)
        );
      }
    },
    [userCourse, lessonId, contents.length]
  );

  // Actions
  const nextContent = useCallback(() => {
    if (currentContentIndex < contents.length - 1) {
      const newIndex = currentContentIndex + 1;
      setCurrentContentIndex(newIndex);
      saveProgress(newIndex, contents[newIndex]?.id);
    }
  }, [currentContentIndex, contents, saveProgress]);

  const previousContent = useCallback(() => {
    if (currentContentIndex > 0) {
      const newIndex = currentContentIndex - 1;
      setCurrentContentIndex(newIndex);
      saveProgress(newIndex, contents[newIndex]?.id);
    }
  }, [currentContentIndex, contents, saveProgress]);

  const goToContent = useCallback(
    (index: number) => {
      if (index >= 0 && index < contents.length) {
        setCurrentContentIndex(index);
        saveProgress(index, contents[index]?.id);
      }
    },
    [contents, saveProgress]
  );

  const startLesson = useCallback(() => {
    // Use the latest contents from state
    setContents((prevContents) => {
      if (prevContents.length > 0) {
        setCurrentContentIndex(0);
        saveProgress(0, prevContents[0]?.id);
      }
      return prevContents;
    });
  }, [saveProgress]);

  useEffect(() => {
    if (contents.length > 0 && currentContentIndex === -1) {
      // Ensure we have contents before allowing start
      setCurrentContentIndex((prev) => (prev === -1 ? prev : 0));
    }
  }, [contents.length, currentContentIndex]);

  const markContentComplete = useCallback(() => {
    // You can add logic here to mark individual content as complete
    // For now, just move to next content
    nextContent();
  }, [nextContent]);

  const completeLesson = useCallback(async () => {
    // First, set the content index beyond the contents length to show completion screen
    setCurrentContentIndex(contents.length);

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
      localStorage.removeItem(LESSON_PROGRESS_KEY); // Clear lesson progress

      // Save to backend
      try {
        await fetch(`/api/user-courses/${userCourse.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completedUserCourse),
        });
      } catch (error) {
        console.error("Error completing lesson:", error);
      }
    }
  }, [userCourse, contents.length]);

  const navigateToCompletion = useCallback(() => {
    // Navigate to completion page or next lesson
    router.push(`/lesson/${courseId}/completed`);
  }, [router, courseId]);

  // Load data on mount
  useEffect(() => {
    if (lessonId) {
      loadLessonData();
    }
  }, [lessonId, loadLessonData]);

  // Auto-save progress when content changes
  useEffect(() => {
    if (contents.length > 0 && currentContentIndex >= 0) {
      const currentContent = contents[currentContentIndex];
      if (currentContent) {
        saveProgress(currentContentIndex, currentContent.id);
      }
    }
  }, [currentContentIndex, contents, saveProgress]);

  // Calculated values
  const currentContent =
    currentContentIndex >= 0 ? contents[currentContentIndex] || null : null;
  const progressPercentage =
    contents.length > 0 && currentContentIndex >= 0
      ? Math.round(((currentContentIndex + 1) / contents.length) * 100)
      : 0;
  const isFirstContent = currentContentIndex === 0;
  const isLastContent = currentContentIndex === contents.length - 1;

  const value: LessonContextType = {
    lesson,
    contents,
    currentContentIndex,
    currentContent,
    userCourse,
    isLoading,
    startLesson,

    nextContent,
    previousContent,
    goToContent,
    markContentComplete,
    completeLesson,
    navigateToCompletion,

    progressPercentage,
    isFirstContent,
    isLastContent,
  };

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
};
