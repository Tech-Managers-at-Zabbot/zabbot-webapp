import { resolveTileAccess } from "./tileAccess";

type Case = {
  name: string;
  adminActive: boolean;
  free: boolean;
  entitlement: "loading" | "granted" | "denied" | "unavailable";
  expected: ReturnType<typeof resolveTileAccess>;
};

export const tilePolicyCases: Case[] = [
  { name: "admin lock overrides paid subscription", adminActive: false, free: false, entitlement: "granted", expected: "admin_inactive" },
  { name: "admin lock overrides free preview", adminActive: false, free: true, entitlement: "denied", expected: "admin_inactive" },
  { name: "free preview without subscription", adminActive: true, free: true, entitlement: "denied", expected: "accessible" },
  { name: "free preview during entitlement outage", adminActive: true, free: true, entitlement: "unavailable", expected: "accessible" },
  { name: "premium content for subscriber", adminActive: true, free: false, entitlement: "granted", expected: "accessible" },
  { name: "premium content for free user", adminActive: true, free: false, entitlement: "denied", expected: "subscription_required" },
  { name: "pending entitlement is not granted", adminActive: true, free: false, entitlement: "loading", expected: "loading" },
  { name: "unavailable entitlement is not granted", adminActive: true, free: false, entitlement: "unavailable", expected: "unavailable" },
];

/**
 * No third-party test dependency required. Call from a test runner or
 * a local TS execution environment; never imported by app runtime.
 */
export function verifyTileAccessPolicy(): void {
  for (const row of tilePolicyCases) {
    const actual = resolveTileAccess({
      isActive: row.adminActive,
      isFreePreview: row.free,
      entitlement: row.entitlement,
    });
    if (actual !== row.expected) {
      throw new Error(`tile policy failure: ${row.name}: ${actual} != ${row.expected}`);
    }
  }
}
