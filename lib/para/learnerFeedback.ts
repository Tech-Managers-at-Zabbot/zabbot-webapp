import { formatYorubaDisplayWord, formatSyllableTone, formatToneName } from "./formatTone";
/**
 * Learner-facing guidance derived from trusted target tone labels and existing
 * Pàrà syllable movement evidence. No new pronunciation judgments are inferred.
 * `differenceCents` represents a measured difference in transitions,
 * NOT a verdict on the absolute pitch or vowel quality of one syllable.
 */
export type ToneSyllable = {
  index: number;
  label: string;
  solfege: "DO" | "RE" | "MI";
  status: "practice" | "close" | "uncertain";
  differenceCents: number | null;
};
export type LearnerToneEvidence = {
  confidence: "limited" | "moderate";
  syllables: ToneSyllable[];
};
export type LearnerFeedbackItem = {
  key: string;
  kind: "close" | "practice" | "uncertain";
  title: string;
  message: string;
};
export type LearnerToneFeedback = {
  summary: string;
  items: LearnerFeedbackItem[];
  nextStep: string;
};
const target = (s: ToneSyllable) => formatSyllableTone(s.label, s.solfege);
const sequence = (syllables: ToneSyllable[]) => syllables.map(s => formatToneName(s.solfege)).join("–");

export function buildLearnerToneFeedback(evidence: LearnerToneEvidence): LearnerToneFeedback | null {
  if (!evidence?.syllables?.length) return null;
  const syllables = evidence.syllables;
  const pattern = sequence(syllables);
  const nextStep = `Listen to the reference, then say ${syllables.map(s => formatYorubaDisplayWord(s.label)).join("–")} using ${pattern}. Record again to check your tone movement.`;

  if (evidence.confidence !== "moderate") {
    return {
      summary: "We couldn't reliably identify an individual syllable to correct in this recording.",
      items: [{
        key: "limited",
        kind: "uncertain",
        title: `Expected tones: ${pattern}`,
        message: "The syllable boundaries are approximate, so we won't guess which syllable needs correction.",
      }],
      nextStep,
    };
  }

  const items: LearnerFeedbackItem[] = syllables.map((s, i) => {
    const title = `Syllable ${s.index}: ${target(s)}`;
    const previous = syllables[i - 1];
    if (i === 0) {
      return {
        key: String(s.index), kind: "uncertain", title,
        message: "This is the starting tone. The graph compares changes between syllables, so it cannot independently confirm this syllable's tone.",
      };
    }
    if (s.status === "practice" && s.differenceCents !== null && Number.isFinite(s.differenceCents)) {
      const relative = s.differenceCents > 0
        ? "ends higher relative to the preceding syllable"
        : "ends lower relative to the preceding syllable";
      return {
        key: String(s.index), kind: "practice", title,
        message: `Compared with the reference, your movement from ${target(previous)} into this syllable ${relative}. Practice the ${formatToneName(previous.solfege)}–${formatToneName(s.solfege)} transition.`,
      };
    }
    if (s.status === "close" && s.differenceCents !== null) {
      return {
        key: String(s.index), kind: "close", title,
        message: `Your tone movement from ${target(previous)} into this syllable is close to the reference. Keep practicing this ${previous.solfege}–${s.solfege} transition.`,
      };
    }
    return {
      key: String(s.index), kind: "uncertain", title,
      message: "We couldn't assess this syllable's tone movement reliably, so no specific correction is suggested.",
    };
  });
  const practiceCount = items.filter(item => item.kind === "practice").length;
  const closeCount = items.filter(item => item.kind === "close").length;
  const summary = practiceCount
    ? "One or more tone transitions differ from the reference. Here's what to practice."
    : closeCount
      ? "Your measured tone transitions are close to the reference."
      : "There isn't enough reliable syllable-level detail to recommend a specific correction.";
  return { summary, items, nextStep };
}
