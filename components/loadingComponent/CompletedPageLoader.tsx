/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

// ─── Skeleton pulse animation ───────────────────────────────────────────────
const skeletonStyle = `
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #e2d5b8 0%,
    #f0e6cc 40%,
    #f5edd8 50%,
    #f0e6cc 60%,
    #e2d5b8 100%
  );
  background-size: 600px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
`;

// ─── Reusable skeleton bar ───────────────────────────────────────────────────
const SkeletonBar = ({
  width = "100%",
  height = 12,
  radius = 9999,
}: {
  width?: string | number;
  height?: number;
  radius?: number;
}) => (
  <div
    className="skeleton-shimmer"
    style={{ width, height, borderRadius: radius }}
  />
);

// ─── COMPLETION PAGE LOADER ─────────────────────────────────────────────────
const CompletionLoader = () => {
  // subtle pulsing dot for the confetti-area header
  const [
    pulse, 
    setPulse
] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p:any) => !p), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: skeletonStyle }} />
      <div
        className="bg-[#FEECBC] flex flex-col justify-start py-6 items-center min-h-screen relative"
        style={{ fontFamily: "Lexend" }}
      >
        {/* top decorative header bg */}
        <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-center bg-no-repeat min-h-[200px]" />

        {/* back-button row */}
        <div className="flex w-full relative items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3">
            <SkeletonBar width={24} height={24} radius={9999} />
          </div>
          <div className="p-2 sm:p-3">
            <SkeletonBar width={40} height={40} radius={9999} />
          </div>
        </div>

        {/* lesson title area */}
        <div className="text-center mb-6 space-y-3">
          <div className="flex justify-center">
            <SkeletonBar width={100} height={14} radius={9999} />
          </div>
          <div className="flex justify-center">
            <SkeletonBar width={260} height={36} radius={12} />
          </div>
        </div>

        {/* conclusion illustration placeholder */}
        <div className="w-full flex justify-center mb-6">
          <div
            className="skeleton-shimmer rounded-2xl"
            style={{ width: 220, height: 180, borderRadius: 16 }}
          />
        </div>

        {/* stats row: position ── divider ── score */}
        <section className="flex justify-center items-center w-full mb-8">
          <div className="flex flex-col sm:flex-row w-full max-w-[800px] items-center justify-center gap-6 sm:gap-10">
            {/* left stat */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center">
              <div className="flex justify-center">
                <SkeletonBar width={180} height={16} radius={9999} />
              </div>
              <div className="flex justify-center">
                <SkeletonBar width={72} height={44} radius={12} />
              </div>
            </div>

            {/* divider */}
            <div className="bg-[#B2ABAB] w-16 h-[1px] sm:w-[1px] sm:h-12" />

            {/* right stat */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center">
              <div className="flex justify-center">
                <SkeletonBar width={72} height={44} radius={12} />
              </div>
              <div className="flex justify-center">
                <SkeletonBar width={140} height={16} radius={9999} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA button skeleton */}
        <div className="z-50 mb-6">
          <div
            className="skeleton-shimmer rounded-full"
            style={{ width: 220, height: 52, borderRadius: 9999 }}
          />
        </div>

        {/* "other things to try" divider + label */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 w-full px-6">
          <hr className="bg-[#94612C] flex-1 max-w-[160px] h-0.5" />
          <div className="flex justify-center">
            <SkeletonBar width={200} height={16} radius={9999} />
          </div>
          <hr className="bg-[#94612C] flex-1 max-w-[160px] h-0.5" />
        </div>

        {/* in-lesson packages row */}
        <div className="flex gap-3 px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="skeleton-shimmer rounded-xl"
              style={{ width: 100, height: 120, borderRadius: 12 }}
            />
          ))}
        </div>

        {/* bottom decorative footer bg */}
        <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[100px]" />
      </div>
    </>
  );
};

export default CompletionLoader;
