"use client";
import React from "react";
import { buildLearnerToneFeedback } from "@/lib/para/learnerFeedback";

export type ParaPitchFeedback = {
  version: 2;
  alignment: "estimated-energy-boundaries";
  confidence: "limited" | "moderate";
  expectedPattern: Array<"L" | "M" | "H">;
  syllables: Array<{
    index: number;
    label: string;
    expected: "L" | "M" | "H";
    solfege: "DO" | "RE" | "MI";
    start: number;
    end: number;
    status: "practice" | "close" | "uncertain";
    differenceCents: number | null;
  }>;
  referencePitch: Array<{ x: number; cents: number }>;
  learnerPitch: Array<{ x: number; cents: number }>;
  guidance: string;
};

const W = 620;
const H = 228;
const PAD_X = 30;
const PAD_TOP = 18;
const PAD_BOTTOM = 40;

function plotPath(points: Array<{ x: number; cents: number }>, lo: number, hi: number): string {
  // Break lines across unvoiced gaps; do not join unrelated pitch segments.
  let path = "";
  let previous = -1;
  for (const point of points) {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.cents)) continue;
    const x = PAD_X + Math.max(0, Math.min(1, point.x)) * (W - 2 * PAD_X);
    const y = PAD_TOP + (hi - Math.max(lo, Math.min(hi, point.cents))) / (hi - lo) *
      (H - PAD_TOP - PAD_BOTTOM);
    path += (previous < 0 || point.x - previous > 0.065 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    previous = point.x;
  }
  return path;
}

export default function ParaPitchGraph({ feedback }: { feedback?: ParaPitchFeedback | null }) {
  if (!feedback || feedback.version !== 2 ||
      !Array.isArray(feedback.referencePitch) || !Array.isArray(feedback.learnerPitch) ||
      !Array.isArray(feedback.syllables) || !feedback.syllables.length) return null;

  const values = [...feedback.referencePitch, ...feedback.learnerPitch]
    .map(point => point.cents).filter(Number.isFinite);
  if (values.length < 12) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = Math.min(-100, min - 60);
  const hi = Math.max(100, max + 60);
  const learnerGuidance = buildLearnerToneFeedback(feedback);
  const refPath = plotPath(feedback.referencePitch, lo, hi);
  const learnerPath = plotPath(feedback.learnerPitch, lo, hi);

  return (
    <section className="w-full rounded-xl bg-white p-3 text-slate-900 text-left" aria-label="Pàrà syllable tone comparison">
      <h3 className="text-base font-semibold">Compare your tone movement</h3>
      <p className="text-xs text-slate-600 mt-1">
        Relative pitch, independently centered for each voice. Higher lines mean higher pitch.
      </p>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} role="img"
          aria-label="Green reference pitch and orange learner pitch, shown across estimated syllable intervals"
          className="w-full min-w-[280px] h-auto mt-2">
          {(() => {
            const zeroY = PAD_TOP + (hi / (hi - lo)) * (H - PAD_TOP - PAD_BOTTOM);
            return <line x1={PAD_X} y1={zeroY} x2={W-PAD_X} y2={zeroY}
              stroke="#cbd5e1" strokeDasharray="4 4" />;
          })()}
          {feedback.syllables.map(s => {
            const left = PAD_X + s.start * (W-2*PAD_X);
            const right = PAD_X + s.end * (W-2*PAD_X);
            return <g key={s.index}>
              {s.status === "practice" && <rect x={left} y={PAD_TOP} width={Math.max(0,right-left)}
                height={H-PAD_TOP-PAD_BOTTOM} fill="#fef3c7" opacity="0.7" />}
              <line x1={left} y1={PAD_TOP} x2={left} y2={H-PAD_BOTTOM}
                stroke="#94a3b8" strokeDasharray="3 4" />
              <text x={(left+right)/2} y={H-15} fontSize="13" fill="#334155"
                textAnchor="middle">{s.label} ({s.solfege})</text>
            </g>;
          })}
          <path d={refPath} fill="none" stroke="#10865b" strokeWidth="2.8" />
          <path d={learnerPath} fill="none" stroke="#e87923" strokeWidth="2.8" />
        </svg>
      </div>
      <div className="flex gap-5 text-xs mt-1 flex-wrap">
        <span><span className="inline-block w-4 h-0.5 bg-emerald-700 align-middle mr-1" />Reference</span>
        <span><span className="inline-block w-4 h-0.5 bg-orange-500 align-middle mr-1" />Your recording</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="Expected syllable tones">
        {feedback.syllables.map(s => (
          <span key={s.index} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm">
            {s.index}. {s.label} ({s.solfege})
          </span>
        ))}
      </div>
      {learnerGuidance ? (
        <div className="mt-3 border-t border-slate-200 pt-3" aria-label="Your tone feedback">
          <h4 className="text-sm font-semibold">Your tone feedback</h4>
          <p className="mt-1 text-sm">{learnerGuidance.summary}</p>
          <ul className="mt-2 space-y-2" aria-label="Syllable-by-syllable practice guidance">
            {learnerGuidance.items.map(item => (
              <li key={item.key} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1">{item.message}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-medium"><strong>Next practice goal:</strong> {learnerGuidance.nextStep}</p>
        </div>
      ) : feedback.guidance ? (
        <p className="mt-3 text-sm font-medium" role="status">{feedback.guidance}</p>
      ) : null}
      <p className="mt-2 text-xs text-slate-600">
        Syllable boundaries are estimates, not verified phonetic alignment.
      </p>
    </section>
  );
}
