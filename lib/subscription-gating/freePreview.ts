/**
 * Phase 2: free curriculum preview.
 *
 * IDs observed on the Zabbot-Users STAGING branch on 2026-11-22.
 * Production parity MUST be checked before enabling gating.
 *
 * The first Journey is visible/browsable for free. Only "Say Hello in
 * Yorùbá" is free within it; do not unlock the Journey's other lessons.
 * Admin course/lesson isActive always takes precedence.
 */
export const FREE_PREVIEW_JOURNEY_ID =
  "1a64676a-f16e-4054-9d61-bef443f32339";

export const FREE_PREVIEW_LESSON_ID =
  "2dfcd37e-364e-4490-a8ef-7e3b18caa6c6";

export function isFreePreviewJourney(id: string): boolean {
  return id === FREE_PREVIEW_JOURNEY_ID;
}

export function isFreePreviewLesson(id: string): boolean {
  return id === FREE_PREVIEW_LESSON_ID;
}
