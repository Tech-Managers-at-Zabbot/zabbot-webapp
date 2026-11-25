"use client";

import React from "react";

export type ParaScoringDiagnostics = {
  version: 1;
  kind: "experimental-shadow-calibration";
  reference: { pronunciationId: string | null; voice: string | null; expectedWord: string | null };
  recognition: {
    referenceTranscript: string;
    learnerTranscript: string;
    referenceNormalized: string;
    learnerNormalized: string;
    recognizedTranscriptAgreement: number;
    expectedWordAgreement: number | null;
    transcriptionRisk: "high" | "low";
  };
  scoring: {
    path: "acoustic-syllable-transcript" | "acoustic-transcript-fallback" | "legacy-text-only";
    weights: { acoustic: number; syllableTone: number; transcript: number };
    components: { acoustic: number | null; syllableTone: number | null; transcript: number; syllablePattern: number | null; interSyllable: number | null };
    liveScore: number;
    reconstruction: number;
  };
  pitchQuality: { referenceOctaveJumpCandidates: number | null; learnerOctaveJumpCandidates: number | null };
  evidenceQualityCalibration?: {
    referenceAsrReliable: boolean | null;
    asrDecision: "withhold-unreliable-reference" | "retain-provisional" | "unknown";
    rawAcousticScore: number | null;
    correctedAcousticScore: number | null;
    correctedRelativeScore: number | null;
    correctedAcousticDelta: number | null;
    correctedReferenceOctaveJumpCandidates: number | null;
    correctedLearnerOctaveJumpCandidates: number | null;
    transcriptUsedInCandidate: boolean;
    changesLiveScore: false;
    explanation: string;
  };
  shadowCalibration: {
    score: number | null;
    weights: { acoustic: number; syllableTone: number; transcript: number } | null;
    reason: string;
    isLearnerScore: false;
  };
};

const pct = (value: number | null) =>
  value === null || !Number.isFinite(value) ? "Not available" : `${Math.round(value * 100)}%`;

export default function ParaScoringDiagnosticsPanel({
  diagnostics,
}: {
  diagnostics?: ParaScoringDiagnostics | null;
}) {
  if (!diagnostics || diagnostics.version !== 1 ||
      diagnostics.kind !== "experimental-shadow-calibration") return null;

  const { reference, recognition, scoring, pitchQuality, shadowCalibration, evidenceQualityCalibration } = diagnostics;
  return (
    <details className="w-full rounded-xl border border-slate-300 bg-slate-50 text-slate-900 p-3 text-left mt-3">
      <summary className="font-semibold cursor-pointer">
        STAGING scoring diagnostics (experimental)
      </summary>
      <p className="text-sm mt-2">
        These diagnostic values explain the current score. The shadow calibration
        is a research comparison, <strong>not</strong> your pronunciation accuracy.
      </p>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3">
        <div><dt className="font-semibold">Expected word</dt><dd>{reference.expectedWord || "Not available"}</dd></div>
        <div><dt className="font-semibold">Reference voice</dt><dd>{reference.voice || "Lesson audio"}</dd></div>
        <div><dt className="font-semibold">Reference recognized as</dt><dd>{recognition.referenceTranscript || "(empty)"}</dd></div>
        <div><dt className="font-semibold">Your recording recognized as</dt><dd>{recognition.learnerTranscript || "(empty)"}</dd></div>
        <div><dt className="font-semibold">Recognized-text agreement</dt><dd>{pct(recognition.recognizedTranscriptAgreement)}</dd></div>
        <div><dt className="font-semibold">Expected-word agreement</dt><dd>{pct(recognition.expectedWordAgreement)}</dd></div>
        <div><dt className="font-semibold">Acoustic component</dt><dd>{pct(scoring.components.acoustic)} (weight {pct(scoring.weights.acoustic)})</dd></div>
        <div><dt className="font-semibold">Syllable-tone component</dt><dd>{pct(scoring.components.syllableTone)} (weight {pct(scoring.weights.syllableTone)})</dd></div>
        <div><dt className="font-semibold">ASR transcript component</dt><dd>{pct(scoring.components.transcript)} (weight {pct(scoring.weights.transcript)})</dd></div>
        <div><dt className="font-semibold">Scoring path</dt><dd className="break-words">{scoring.path}</dd></div>
        <div><dt className="font-semibold">Actual score</dt><dd>{pct(scoring.liveScore)}</dd></div>
        <div><dt className="font-semibold">Reconstructed score</dt><dd>{pct(scoring.reconstruction)}</dd></div>
        <div><dt className="font-semibold">Reference octave-jump candidates</dt><dd>{pitchQuality.referenceOctaveJumpCandidates ?? "Not available"}</dd></div>
        <div><dt className="font-semibold">Learner octave-jump candidates</dt><dd>{pitchQuality.learnerOctaveJumpCandidates ?? "Not available"}</dd></div>
      </dl>
      {recognition.transcriptionRisk === "high" && (
        <p className="text-sm mt-3 font-medium">
          The speech recognizer may be unreliable on this attempt. This does not prove a pronunciation error.
        </p>
      )}
      {evidenceQualityCalibration && (
        <div className="mt-3 border-t border-slate-300 pt-3">
          <p className="font-semibold text-sm">Quality-corrected experiment — does not affect your grade</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2">
            <div><dt className="font-semibold">Original acoustic score</dt><dd>{pct(evidenceQualityCalibration.rawAcousticScore)}</dd></div>
            <div><dt className="font-semibold">After isolated-octave correction</dt><dd>{pct(evidenceQualityCalibration.correctedAcousticScore)}</dd></div>
            <div><dt className="font-semibold">Reference speech recognition</dt><dd>{evidenceQualityCalibration.asrDecision === "withhold-unreliable-reference" ? "Unreliable — excluded in experimental calculation" : evidenceQualityCalibration.asrDecision === "unknown" ? "Cannot verify without trusted word" : "Provisionally accepted"}</dd></div>
            <div><dt className="font-semibold">Corrected experimental composite</dt><dd>{pct(evidenceQualityCalibration.correctedRelativeScore)}</dd></div>
            <div><dt className="font-semibold">Corrected reference octave jump candidates</dt><dd>{evidenceQualityCalibration.correctedReferenceOctaveJumpCandidates ?? "Not available"}</dd></div>
            <div><dt className="font-semibold">Corrected learner octave jump candidates</dt><dd>{evidenceQualityCalibration.correctedLearnerOctaveJumpCandidates ?? "Not available"}</dd></div>
          </dl>
          <p className="text-xs mt-2">{evidenceQualityCalibration.explanation}</p>
        </div>
      )}
      <div className="mt-3 border-t border-slate-300 pt-3">
        <p className="font-semibold text-sm">Research-only shadow score: {pct(shadowCalibration.score)}</p>
        <p className="text-xs mt-1">{shadowCalibration.reason}</p>
        <p className="text-xs mt-1">The shadow score does not affect grading, progress, or feedback.</p>
      </div>
    </details>
  );
}
