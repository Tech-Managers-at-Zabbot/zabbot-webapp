"use client";

import React from "react";
import Link from "next/link";
import type { TileAccessState } from "./tileAccess";

/**
 * Non-destructive presentation overlay for Steps, Journeys, and lesson tiles.
 * Overlay selection MUST follow resolveTileAccess() in tileAccess.ts:
 * an admin-disabled item never advertises a paid unlock.
 *
 * This component does not authorize API access. The backend must enforce it.
 */
export function SubscriptionTileOverlay({
  state,
}: {
  state: TileAccessState;
}) {
  if (state === "accessible") return null;

  if (state === "loading") {
    return (
      <div
        aria-label="Checking learning access"
        className="absolute inset-0 z-10 flex items-center justify-center rounded-[14px] bg-slate-950/40"
      >
        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900">
          Checking access…
        </span>
      </div>
    );
  }

  if (state === "admin_inactive") {
    return (
      <div
        aria-label="Content coming soon"
        className="absolute inset-0 z-10 flex items-center justify-center rounded-[14px] bg-slate-950/60 p-4 text-center"
      >
        <div className="rounded-xl bg-white/95 px-4 py-3 text-slate-900 shadow-md">
          <p className="text-base font-semibold">Coming Soon</p>
          <p className="mt-1 text-xs">This content is not yet available.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Subscription required"
      className="absolute inset-0 z-10 flex items-center justify-center rounded-[14px] bg-[#002557]/75 p-4 text-center"
    >
      <div className="rounded-xl border border-white/30 bg-white px-4 py-3 text-[#002557] shadow-lg">
        <p className="text-base font-semibold">Unlock with Zabbot</p>
        <p className="mt-1 text-xs">Start your 7-day free trial or subscribe.</p>
        <Link
          href="/"
          onClick={(event) => event.stopPropagation()}
          className="mt-3 inline-block rounded-lg bg-[#0089C8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#006CA0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0089C8]"
        >
          View plans
        </Link>
      </div>
    </div>
  );
}
