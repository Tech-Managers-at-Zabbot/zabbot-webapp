/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addQuiz,
  addUserCourse,
  createCourseWithLessons,
  getCourse,
  getCourseLessons,
  getCourseQuizzes,
  getCourses,
  getCourseWithLessons,
  getLanguageContents,
  getLanguageLessons,
  getLessonWithContents,
  getUserCourse,
  updateUserCourse,
  getUserCompletedCourses,
} from "./api";

export function useCreateCourseWithLessons() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseData,
      languageId,
    }: {
      courseData: any;
      languageId: string;
    }) => {
      return await createCourseWithLessons(courseData, languageId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCourses", variables?.languageId],
      });
      //   queryClient.invalidateQueries({ queryKey: ['getGoalsCount', userId] });
    },
    onError: (error: any) => {
      console.error("Error Creating Course with Lessons:", error);
    },
  });
}

export function useGetAllCourses(languageId: string) {
  return useQuery({
    queryKey: ["getAllCourses", languageId],
    queryFn: () => getCourses(true, languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetCoursesWithLessons(languageId: string) {
  return useQuery({
    queryKey: ["getCoursesWithLessons", languageId],
    queryFn: () => getCourseWithLessons(languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetLessonWithContents(lessonId: any) {
  return useQuery({
    queryKey: ["getLessonWithContents", lessonId],
    queryFn: () => getLessonWithContents(lessonId),
    refetchOnMount: true,
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetLanguageContents(languageId: string) {
  return useQuery({
    queryKey: ["getLanguageContents", languageId],
    queryFn: () => getLanguageContents(languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetLanguageLessons(languageId: string) {
  return useQuery({
    queryKey: ["getLanguageLessons", languageId],
    queryFn: () => getLanguageLessons(languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetCourseLessons(courseId: string) {
  return useQuery({
    queryKey: ["getCourseLessons", courseId],
    queryFn: () => getCourseLessons(courseId),
    refetchOnMount: true,
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetCourseQuizzes(courseId: string) {
  return useQuery({
    queryKey: ["getCourseQuizzes", courseId],
    queryFn: () => getCourseQuizzes(courseId),
    refetchOnMount: true,
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quizPayload }: { quizPayload: any }) => {
      return await addQuiz(quizPayload);
    },
    onSuccess: async (_, variables) => {
      // Fix: Access courseId from quizPayload instead of variables directly
      const courseId = variables?.quizPayload?.courseId;
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: ["getCourseQuizzes", courseId],
        });
      }
    },
    onError: (error: any) => {
      console.error("Error Creating Quiz", error);
    },
  });
}

export function useGetCourseDetails(courseId: string, projections?: string) {
  return useQuery({
    queryKey: ["getCourseDetails", courseId, projections],
    queryFn: () => getCourse(courseId, projections),
    refetchOnMount: true,
    enabled: !!courseId,
    refetchOnWindowFocus: false,
  });
}

export function useCreateUserCourse() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      languageId,
      courseId,
      userCourseData,
    }: {
      languageId: string;
      courseId: string | any;
      userCourseData?: Record<string, any>;
    }) => {
      return await addUserCourse(languageId, courseId, userCourseData);
    },
    onSuccess: async () => {
      //_, variables
      // queryClient.invalidateQueries({ queryKey: ['getAllCourses', variables?.languageId] });
    },
    onError: (error: any) => {
      console.error("Error Creating user course:", error);
    },
  });
}

export function useGetUserCourse(
  languageId: string,
  courseId: string | any,
  lessonId: string | any,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["getUserCourse", languageId, courseId, lessonId],
    queryFn: async () => {
      try {
        const response = await getUserCourse(languageId, courseId, lessonId);
        return response;
      } catch (error: any) {
        // Re-throw the error so React Query can handle it properly
        if (error.response?.status === 404) {
          // You can handle 404 specifically if needed
          throw new Error("User course not found");
        }
        throw error;
      }
    },
    enabled: options?.enabled ?? !!courseId,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false, // Don't retry on 404 errors
  });
}


export function useUpdateUserCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      languageId,
      courseId,
      updateData,
    }: {
      languageId: string;
      courseId: string | any;
      updateData: Record<string, any>;
    }) => {
      return await updateUserCourse(courseId, updateData, languageId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getUserCourse", variables?.languageId, variables.courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserCompletedCourses", variables?.languageId],
      });
    },
    onError: (error: any) => {
      console.error("Error updating user course:", error);
    },
  });
}

//getUserCompletedCourses

export function useGetUserCompletedCourses(
  langugageId: string,
  countOnly: boolean = false
) {
  return useQuery({
    queryKey: ["getUserCompletedCourses", langugageId],
    queryFn: () => getUserCompletedCourses(langugageId, countOnly),
    refetchOnMount: true,
    enabled: !!langugageId,
    refetchOnWindowFocus: false,
  });
}
