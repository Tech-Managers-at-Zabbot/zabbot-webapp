/** Display-only normalization: never modify trusted words sent to scoring. */
export const formatYorubaDisplayWord = (word: string) =>
  word.normalize("NFC").toLocaleUpperCase("yo");

export const formatToneName = (tone: string) =>
  tone.toLocaleLowerCase("en");

export function formatTonePattern(pattern: string): string {
  const tones = pattern.trim().split(/[\s,–-]+/u).filter(Boolean).map(formatToneName);
  return tones.length ? `(${tones.join("–")})` : "";
}

export const formatSyllableTone = (syllable: string, tone: string) =>
  `${formatYorubaDisplayWord(syllable)} (${formatToneName(tone)})`;
