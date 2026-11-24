/**
 * A Step's orderNumber is relative to its parent Journey, not global.
 * Render available Journeys first, in Admin-defined Journey order, then
 * Steps in each Journey by their own Admin-defined order.
 */
export interface OrderedStep {
  id?: string;
  courseId?: string;
  orderNumber?: number | null;
  course?: {
    isActive?: boolean;
    orderNumber?: number | null;
  } | null;
}

const orderValue = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;

export function orderStepsByJourney<T extends OrderedStep>(steps: T[]): T[] {
  return [...steps].sort((a, b) => {
    const aAvailable = a.course?.isActive === true ? 0 : 1;
    const bAvailable = b.course?.isActive === true ? 0 : 1;
    if (aAvailable !== bAvailable) return aAvailable - bAvailable;

    const courseOrder = orderValue(a.course?.orderNumber) - orderValue(b.course?.orderNumber);
    if (courseOrder !== 0) return courseOrder;

    // Tie-break between Journeys before comparing their internal Step order.
    const courseIdCompare = (a.courseId ?? "").localeCompare(b.courseId ?? "");
    if (courseIdCompare !== 0) return courseIdCompare;

    const stepOrder = orderValue(a.orderNumber) - orderValue(b.orderNumber);
    if (stepOrder !== 0) return stepOrder;
    return (a.id ?? "").localeCompare(b.id ?? "");
  });
}
