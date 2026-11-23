/**
 * Subscription-gating tile presentation policy (Phase 2).
 *
 * This is a UI-only decision helper. NEVER use it to authorize backend access.
 * Backend endpoints must independently validate curriculum availability and
 * a server-computed entitlement / explicitly allowlisted free content ID.
 *
 * The administrator's isActive flag ALWAYS takes precedence over a subscription.
 * Free-preview access must come from an explicit server-approved identity,
 * never an array index or page position.
 */
export type EntitlementState = "loading" | "granted" | "denied" | "unavailable";

export type TileAccessState =
  | "admin_inactive"
  | "loading"
  | "unavailable"
  | "accessible"
  | "subscription_required";

export interface TileAccessInput {
  /** Existing admin-controlled course or lesson availability. */
  isActive: boolean;
  /** Server-approved free-preview content ID, not an item index. */
  isFreePreview: boolean;
  /** Server-computed current subscription / trial / lifetime access. */
  entitlement: EntitlementState;
}

export function resolveTileAccess({
  isActive,
  isFreePreview,
  entitlement,
}: TileAccessInput): TileAccessState {
  if (!isActive) return "admin_inactive";
  if (isFreePreview) return "accessible";
  if (entitlement === "loading") return "loading";
  if (entitlement === "unavailable") return "unavailable";
  return entitlement === "granted" ? "accessible" : "subscription_required";
}
