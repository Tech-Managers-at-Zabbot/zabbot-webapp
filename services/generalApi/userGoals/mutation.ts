/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  useQueryClient 
} from "@tanstack/react-query";
import { completeUserDailyGoal, getUserCompletedDailyGoalCount, getUserDailyGoal } from './api';


export function useGetUserDailyGoals(userId: string, languageId:string) {

  return useQuery({
    queryKey: ['getUserDailyGoals'],
    queryFn: () => getUserDailyGoal(userId, languageId),
    enabled: !!userId,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useCompleteUserDailyGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, goalId }: { userId: string; goalId: string }) => {
      return await completeUserDailyGoal(userId, goalId);
    },
    onSuccess: async (_, variables) => {
      const { userId } = variables;
      queryClient.invalidateQueries({ queryKey: ['getUserDailyGoals', userId] });
      queryClient.invalidateQueries({ queryKey: ['getGoalsCount', userId] });
    },
    onError: (error: any) => {
      console.error('Error Completing Daily Goal:', error);
    },
  });
}

export function useGetUserDailyGoalsCount(userId:string) {

  return useQuery({
    queryKey: ['getGoalsCount', userId],
    queryFn: () => getUserCompletedDailyGoalCount(userId),
    enabled: !!userId,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
  });

}


// export function useVerifyUserEmail() {
//   // const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: verifyUserOtp,
//     onSuccess: async (
//       // data
//     ) => {
//       //   toast.success(data?.message || "Service Request Created Successfully");
//       // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
//     },
//     onError: (error: any) => {
//       console.error('Error verifying email address:', error);
//       //   toast.error(error?.response?.data?.message || "Error creating space");
//     },
//   });
// }