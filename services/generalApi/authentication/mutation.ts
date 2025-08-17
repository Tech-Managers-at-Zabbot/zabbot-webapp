/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  // useQueryClient 
} from "@tanstack/react-query";
// import { queryKeys } from './queryKeys';
import { registerUser, verifyUserOtp, resendUserOtp, loginUser, requestPasswordResetLink, resetPassword, initiateGoogleRegister, initiateGoogleLogin } from './api';
import { useState } from "react";
// import {toast} from 'react-toastify';


export function useRegisterUser() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (
      // data
    ) => {
      //   toast.success(data?.message || "Service Request Created Successfully");
      // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error: any) => {
      console.error('Error Registering User:', error);
      //   toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}

export function useVerifyUserEmail() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyUserOtp,
    onSuccess: async (
      // data
    ) => {
      //   toast.success(data?.message || "Service Request Created Successfully");
      // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error: any) => {
      console.error('Error verifying email address:', error);
      //   toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}

export function useResendVerificationOtp() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resendUserOtp,
    onSuccess: async (
      // data
    ) => {
      //   toast.success(data?.message || "Service Request Created Successfully");
      // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error: any) => {
      console.error('Error creating Service Request:', error);
      //   toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}

export function useLoginUser() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (
      // data
    ) => {
      //   toast.success(data?.message || "Service Request Created Successfully");
      // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error: any) => {
      console.error('Error logging in user:', error);
      //   toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}

export function useRequestPasswordLink() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestPasswordResetLink,
    onSuccess: async (
      // data
    ) => {
      //   toast.success(data?.message || "Service Request Created Successfully");
      // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error: any) => {
      console.error('Error requesting password link:', error);
      //   toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}

export function useResetPassword() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: async (
      // data
    ) => {
      //   toast.success(data?.message || "Service Request Created Successfully");
      // queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error: any) => {
      console.error('Error resetting password:', error);
      //   toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}


export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const initiateGoogleRegistration = () => {
    setIsLoading(true);
    initiateGoogleRegister();
  };

  const initiateGoogleSignIn = () => {
    setIsLoading(true);
    initiateGoogleLogin();
  };

  return {
    initiateGoogleRegistration,
    initiateGoogleSignIn,
    isLoading
  };
}