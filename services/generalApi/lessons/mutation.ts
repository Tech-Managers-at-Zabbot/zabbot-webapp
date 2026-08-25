/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addQuiz,
  addUserCourse,
  createCourseWithLessons,
  createLesson,
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
  updateCourseImage,
  updateLessonImage,
  addUserLesson,
  deleteUserLesson,
  getUserLesson,
  getUserLessons,
  updateUserLesson,
  deleteCourse,
  updateCourse,
  deleteLessonById,
  updateLessonById,
  deleteQuizById,
  updateQuizById,
  createContent,
  updateContentById,
  deleteContentById,
  addContentFile,
  deleteContentFile,
  addSingleContentFile,
  getAllLessons,
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

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      updateData,
    }: {
      courseId: string | any;
      updateData: Record<string, any>;
    }) => {
      return await updateCourse(courseId, updateData);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCourses"],
      });
    },
    onError: (error: any) => {
      console.error("Error updating user course:", error);
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseId: string) => {
      return await deleteCourse(courseId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCourses"],
      });
    },
    onError: (error: any) => {
      console.error("Error deleting course:", error);
    },
  });
}

export function useGetAllCourses(
  languageId: string,
  isActive = true,
  isAdmin = false
) {
  return useQuery({
    queryKey: ["getAllCourses", languageId, isActive, isAdmin],
    queryFn: () => getCourses(isActive, languageId, isAdmin),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });
}

export function useGetAllLessons(
) {
  return useQuery({
    queryKey: ["getAllLessons"],
    queryFn: () => getAllLessons(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
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

export function useCreateLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ lessonData }: { lessonData: any }) => {
      return await createLesson(lessonData);
    },
    onSuccess: async (_, variables) => {
      const courseId = variables?.lessonData?.courseId;
      if (courseId) {
        queryClient.invalidateQueries({
          queryKey: ["getCourseLessons", courseId],
        });
      }
    },
    onError: (error: any) => {
      console.error("Error Creating Lesson:", error);
    },
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


export function useChangeCourseImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      data,
      // languageId,
    }: {
      courseId: string;
      data: FormData;
      languageId: string;
    }) => updateCourseImage(courseId, data),

    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getAllCourses", variables?.languageId] });
    },
    onError: (error: any) => {
      console.error("Error uploading course image:", error);
    },
  });
}

export function useChangeLessonImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      lessonId,
      data,
      // languageId,
    }: {
      lessonId: string;
      data: FormData;
      languageId: string;
    }) => updateLessonImage(lessonId, data),

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getCourseLessons"] });
    },
    onError: (error: any) => {
      console.error("Error uploading lesson image:", error);
    },
  });
}

// handles everything around user and lessons
export function useCreateUserLesson() {
  return useMutation({
    mutationFn: async (lessonData: {
      languageId: string;
      courseId: string | any;
      lessonId: string | any;
      score: number;
    }) => {
      console.log("lessonData in useCreateUserLesson", lessonData);
      return await addUserLesson(lessonData);
    },
    onSuccess: async () => {
      console.log("User lesson created successfully");
    },
    onError: (error: any) => {
      console.error("Error Creating user lesson:", error);
    },
  });
}

export function useGetUserLesson(lessonId: string) {
  return useQuery({
    queryKey: ["getUserLesson", lessonId],
    queryFn: () => getUserLesson(lessonId),
    refetchOnMount: true,
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
  });
}

export function useGetUserLessons() {
  return useQuery({
    queryKey: ["getUserLessons"],
    queryFn: () => getUserLessons(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateUserLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      lessonId,
      updateData,
    }: {
      lessonId: string;
      updateData: Record<string, any>;
    }) => {
      return await updateUserLesson(lessonId, updateData);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getUserLesson", variables.lessonId],
      });
      queryClient.invalidateQueries({ queryKey: ["getUserLessons"] });
    },
    onError: (error: any) => {
      console.error("Error updating user lesson:", error);
    },
  });
}

export function useDeleteUserLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, lessonId }: { userId: string; lessonId: string }) => {
      return await deleteUserLesson(userId, lessonId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getUserLesson", variables.lessonId],
      });
      queryClient.invalidateQueries({ queryKey: ["getUserLessons"] });
    },
    onError: (error: any) => {
      console.error("Error deleting user lesson:", error);
    },
  });
}

export function useDeleteLessonById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lessonId: string) => {
      return await deleteLessonById(lessonId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourseLessons"],
      });
    },
    onError: (error: any) => {
      console.error("Error deleting lesson:", error);
    },
  });
}

export function useUpdateLessonById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      lessonId,
      updateData,
    }: {
      lessonId: string;
      updateData: Record<string, any>;
    }) => {
      return await updateLessonById(lessonId, updateData);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getLessonById", variables.lessonId],
      });
      queryClient.invalidateQueries({ queryKey: ["getLessonById"] });
      queryClient.invalidateQueries({ queryKey: ["getCourseLessons"] });
      queryClient.invalidateQueries({
        queryKey: ["getLessonWithContents", variables.lessonId],
      });
    },
    onError: (error: any) => {
      console.error("Error updating lesson:", error);
    },
  });
}

export function useDeleteQuizById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quizId: string) => {
      return await deleteQuizById(quizId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourseQuizzes"],
      });
    },
    onError: (error: any) => {
      console.error("Error deleting quiz:", error);
    },
  });
}

export function useUpdateQuizById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      quizId,
      updateData,
    }: {
      quizId: string;
      updateData: Record<string, any>;
    }) => {
      return await updateQuizById(quizId, updateData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourseQuizzes"],
      });
    },
    onError: (error: any) => {
      console.error("Error updating quiz:", error);
    },
  });
}

export function useCreateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      lessonId,
      payload,
    }: {
      lessonId: string;
      payload: Record<string, any>;
    }) => {
      return await createContent({ ...payload, lessonId });
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getLessonWithContents", variables.lessonId],
      });
    },
    onError: (error: any) => {
      console.error("Error creating content:", error);
    },
  });
}

export function useUpdateContentById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      contentId,
      updateData,
    }: {
      contentId: string;
      lessonId: string;
      updateData: Record<string, any>;
    }) => {
      return await updateContentById(contentId, updateData);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getLessonWithContents", variables.lessonId],
      });
    },
    onError: (error: any) => {
      console.error("Error updating content:", error);
    },
  });
}

export function useDeleteContentById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      contentId,
    }: {
      contentId: string;
      lessonId: string;
    }) => {
      return await deleteContentById(contentId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getLessonWithContents", variables.lessonId],
      });
    },
    onError: (error: any) => {
      console.error("Error deleting content:", error);
    },
  });
}

export function useAddContentFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      contentId,
      data,
    }: {
      contentId: string;
      lessonId: string;
      data: { filePath: string; contentType: string; description?: string };
    }) => {
      return await addContentFile(contentId, data);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getLessonWithContents", variables.lessonId],
      });
    },
    onError: (error: any) => {
      console.error("Error adding content file:", error);
    },
  });
}

export function useDeleteContentFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      contentId,
      fileId,
    }: {
      contentId: string;
      lessonId: string;
      fileId: string;
    }) => {
      return await deleteContentFile(contentId, fileId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getLessonWithContents", variables.lessonId],
      });
    },
    onError: (error: any) => {
      console.error("Error deleting content file:", error);
    },
  });
}

export function useAddSingleContentFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: { filePath: string; contentType: string; description?: string, contentId: string };
    }) => {
      return await addSingleContentFile(data);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getLessonWithContents", variables.data],
      });
    },
    onError: (error: any) => {
      console.error("Error adding content file:", error);
    },
  });
}