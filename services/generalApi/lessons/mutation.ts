/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addQuiz,createCourseWithLessons, getCourseLessons, getCourseQuizzes, getCourses, getCourseWithLessons, getLanguageContents, getLanguageLessons, getLessonWithContents } from "./api";




export function useCreateCourseWithLessons() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseData, languageId }: { courseData: any; languageId: string }) => {
      return await createCourseWithLessons(courseData, languageId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['getAllCourses', variables?.languageId] });
    //   queryClient.invalidateQueries({ queryKey: ['getGoalsCount', userId] });
    },
    onError: (error: any) => {
      console.error('Error Creating Course with Lessons:', error);
    },
  });
}

export function useGetAllCourses(languageId:string) {

  return useQuery({
    queryKey: ['getAllCourses', languageId],
    queryFn: () => getCourses(true, languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}

export function useGetCoursesWithLessons(languageId:string) {

  return useQuery({
    queryKey: ['getCoursesWithLessons', languageId],
    queryFn: () => getCourseWithLessons(languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}

export function useGetLessonWithContents(lessonId:any) {

  return useQuery({
    queryKey: ['getLessonWithContents', lessonId],
    queryFn: () => getLessonWithContents(lessonId),
    refetchOnMount: true,
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}

export function useGetLanguageContents(languageId:string) {

  return useQuery({
    queryKey: ['getLanguageContents', languageId],
    queryFn: () => getLanguageContents(languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}

export function useGetLanguageLessons(languageId:string) {

  return useQuery({
    queryKey: ['getLanguageLessons', languageId],
    queryFn: () => getLanguageLessons(languageId),
    refetchOnMount: true,
    enabled: !!languageId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}

export function useGetCourseLessons(courseId:string) {

  return useQuery({
    queryKey: ['getCourseLessons', courseId],
    queryFn: () => getCourseLessons(courseId),
    refetchOnMount: true,
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}

export function useGetCourseQuizzes(courseId:string) {

  return useQuery({
    queryKey: ['getCourseQuizzes', courseId],
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
        queryClient.invalidateQueries({ queryKey: ['getCourseQuizzes', courseId] });
      }
    },
    onError: (error: any) => {
      console.error('Error Creating Quiz', error);
    },
  });
}