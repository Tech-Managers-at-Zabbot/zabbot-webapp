"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axiosInstance";
import type { EntitlementState } from "./tileAccess";
import { useUser } from "@/contexts/UserContext";

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
  const gatingEnabled = process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE === "true";
  const { userDetails } = useUser();
  const authenticatedUserId: string = userDetails?.id ?? "";
  const query = useQuery({
    queryKey: ["subscriptionEntitlement", authenticatedUserId],
    queryFn: fetchEntitlement,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 1,
    enabled: gatingEnabled && Boolean(authenticatedUserId),
  });

  return {
    state: !gatingEnabled
      ? "granted"
      : !authenticatedUserId
      ? "loading"
      : query.isError
      ? "unavailable"
      : query.isPending
        ? "loading"
        : query.data?.hasAccess
          ? "granted"
          : "denied",
    entitlement: query.data ?? null,
    isUnavailable: gatingEnabled && query.isError,
  };
}
