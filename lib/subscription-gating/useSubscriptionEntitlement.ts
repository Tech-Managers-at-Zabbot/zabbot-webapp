"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axiosInstance";
import type { EntitlementState } from "./tileAccess";

export interface UserEntitlement {
  hasAccess: boolean;
  reason: "lifetime_paid" | "lifetime_trial" | "recurring_period" | "no_entitlement";
  planType: "monthly" | "annual" | "lifetime" | null;
  accessUntil: string | null;
}

/**
 * Informational Phase 2 endpoint.
 * No localStorage/cookie-based premium claims; server is authoritative.
 * We do not infer "denied" from a network or backend error.
 */
async function fetchEntitlement(): Promise<UserEntitlement> {
  const response = await axiosInstance.get<{
    status: string;
    data: UserEntitlement;
  }>("/payments/payment-services/subscription-plans/entitlement");
  if (response.data?.status !== "success" ||
      typeof response.data.data?.hasAccess !== "boolean") {
    throw new Error("Invalid entitlement response");
  }
  return response.data.data;
}

export function useSubscriptionEntitlement(): {
  state: EntitlementState;
  entitlement: UserEntitlement | null;
  isUnavailable: boolean;
} {
  const query = useQuery({
    queryKey: ["subscriptionEntitlement"],
    queryFn: fetchEntitlement,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  return {
    state: query.isError
      ? "unavailable"
      : query.isPending
        ? "loading"
        : query.data?.hasAccess
          ? "granted"
          : "denied",
    entitlement: query.data ?? null,
    isUnavailable: query.isError,
  };
}
