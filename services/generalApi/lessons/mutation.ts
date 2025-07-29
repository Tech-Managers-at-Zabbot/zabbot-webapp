/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCourseWithLessons, getCourses } from "./api";




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