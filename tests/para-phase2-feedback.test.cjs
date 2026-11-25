const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
function file(name) { return fs.readFileSync(path.join(root, name), "utf8"); }

test("both Pàrà surfaces share one graph and preserve waveform fallback", () => {
  const standalone = file("components/premium/pwp/SelectedPwpScreen.tsx");
  const lesson = file("components/lessons/contents/InLessonRecordWithPara.tsx");
  for (const source of [standalone, lesson]) {
    assert.match(source, /ParaPitchGraph/);
    assert.ok(source.includes("pitchFeedback: feedbackRes.data"), "API pitch feedback must be mapped");
    assert.match(source, /!processedData\.pitchFeedback && processedData\.plot/);
  }
});
test("graph renders reference and learner contours and guarded syllable guidance", () => {
  const graph = file("components/general/ParaPitchGraph.tsx");
  assert.match(graph, /feedback\.referencePitch/);
  assert.match(graph, /feedback\.learnerPitch/);
  assert.match(graph, /feedback\.syllables/);
  assert.match(graph, /feedback\.guidance/);
});

test("learner graph shows clean predefined tone targets without technical disclaimers", () => {
  const graph = file("components/general/ParaPitchGraph.tsx");
  assert.ok(graph.includes("Relative pitch, independently centered for each voice. Higher lines mean higher pitch."));
  assert.match(graph, /aria-label="Expected syllable tones"/);
  assert.doesNotMatch(graph, /¢|not certain|not a fixed DO|does not support a confident/);
  assert.doesNotMatch(graph, /\{s\.status === "practice" \? "practice"/);
});

test("four exact Pàrà graph presentation requirements are preserved", () => {
  const graph = file("components/general/ParaPitchGraph.tsx");
  assert.ok(graph.includes("Relative pitch, independently centered for each voice. Higher lines mean higher pitch."));
  assert.match(graph, /const zeroY = PAD_TOP/);
  assert.match(graph, /stroke="#cbd5e1" strokeDasharray="4 4"/);
  assert.match(graph, /\{s.label\} \(\{s.solfege\}\)/);
  assert.match(graph, /\{s.index\}\. \{s.label\} \(\{s.solfege\}\)/);
  assert.ok(graph.includes("Syllable boundaries are estimates, not verified phonetic alignment."));
  assert.doesNotMatch(graph, /0¢|200¢|not certain|not a fixed DO–RE–MI frequency scale/);
});

test("Listen and Record are locked during acoustic and graph processing on both surfaces", () => {
  const standalone = file("components/premium/pwp/SelectedPwpScreen.tsx");
  const lesson = file("components/lessons/contents/InLessonRecordWithPara.tsx");
  assert.match(standalone, /disabled=\{speaking \|\| isRecording \|\| isProcessingRecord \|\| getFeedbackLoading\}/);
  assert.match(standalone, /disabled=\{speaking \|\| isProcessingRecord \|\| getFeedbackLoading\}/);
  assert.match(standalone, /await audio\.play\(\)/);
  assert.match(lesson, /disabled=\{speaking \|\| isProcessing \|\| isRecording \|\| getFeedbackLoading\}/);
  assert.match(lesson, /disabled=\{speaking \|\| isProcessing \|\| getFeedbackLoading\}/);
});

test("Pàrà randomly selects one voice per word and uses it for both Listen and scoring", () => {
  const standalone = file("components/premium/pwp/SelectedPwpScreen.tsx");
  const page = file("app/premium/pronounce-with-para/page.tsx");
  assert.match(standalone, /type ReferenceVoice = 'maleVoice' \| 'femaleVoice'/);
  assert.match(standalone, /React\.useState<ReferenceVoice>\(/);
  assert.match(standalone, /Math\.random\(\) < 0\.5 \? 'maleVoice' : 'femaleVoice'/);
  assert.match(standalone, /handleListen\(data\[referenceVoice\]\)/);
  assert.match(standalone, /formData\.append\("voice", referenceVoice\)/);
  assert.match(page, /<SelectedPwpScreen key=\{selectedPwpItem\.id\}/);
  assert.doesNotMatch(standalone, /const REFERENCE_VOICE = 'maleVoice'/);
});

test("STAGING scoring diagnostics appear only when the gated backend includes payload", () => {
  const standalone = file("components/premium/pwp/SelectedPwpScreen.tsx");
  const lesson = file("components/lessons/contents/InLessonRecordWithPara.tsx");
  const panel = file("components/general/ParaScoringDiagnosticsPanel.tsx");
  for (const source of [standalone, lesson]) {
    assert.match(source, /scoringDiagnostics: feedbackRes\.data/);
    assert.match(source, /processedData\.scoringDiagnostics && <ParaScoringDiagnosticsPanel/);
  }
  assert.match(panel, /STAGING scoring diagnostics \(experimental\)/);
  assert.match(panel, /shadowCalibration\.score/);
  assert.match(panel, /is a research comparison/);
  assert.match(panel, /isLearnerScore: false/);
});

test("corrected pitch and unreliable baseline ASR remain diagnostic-only", () => {
  const panel = file("components/general/ParaScoringDiagnosticsPanel.tsx");
  assert.match(panel, /evidenceQualityCalibration\.correctedAcousticScore/);
  assert.match(panel, /evidenceQualityCalibration\.correctedRelativeScore/);
  assert.match(panel, /evidenceQualityCalibration\.asrDecision/);
  assert.match(panel, /does not affect your grade/);
  assert.match(panel, /changesLiveScore: false/);
  assert.doesNotMatch(panel, /setProcessedData\(/);
});

test("conditional ASR evidence decision and effective weights appear distinctly from research shadows", () => {
  const panel = file("components/general/ParaScoringDiagnosticsPanel.tsx");
  assert.match(panel, /scoring\.effectiveAsrDecision/);
  assert.match(panel, /scoring\.effectiveWeights/);
  assert.match(panel, /scoring\.effectiveScore/);
  assert.match(panel, /Previous formula \(for comparison\)/);
  assert.match(panel, /Reference ASR withheld/);
});

test("actionable feedback respects uncertain first syllable and praises measured GBOGBO transition", () => {
  const ts = require("typescript");
  const Module = require("node:module");
  const source = file("lib/para/learnerFeedback.ts");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const m = new Module(path.join(root, "lib/para/learnerFeedback.ts"), module);
  m.filename = path.join(root, "lib/para/learnerFeedback.ts");
  m.paths = module.paths;
  const fmt = new Module(path.join(root, "lib/para/formatTone.ts"), module);
  fmt.filename = path.join(root, "lib/para/formatTone.ts");
  fmt.paths = module.paths;
  fmt._compile(ts.transpileModule(file("lib/para/formatTone.ts"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText, fmt.filename);
  const moduleRequire = m.require.bind(m);
  m.require = id => id === "./formatTone" ? fmt.exports : moduleRequire(id);
  m._compile(compiled, m.filename);
  const derive = m.exports.buildLearnerToneFeedback;
  const base = {
    confidence: "moderate",
    syllables: [
      { index: 1, label: "GBO", solfege: "RE", status: "uncertain", differenceCents: null },
      { index: 2, label: "GBO", solfege: "RE", status: "close", differenceCents: 18 },
    ],
  };
  const result = derive(base);
  assert.match(result.summary, /close to the reference/);
  assert.match(result.items[0].message, /cannot independently confirm/);
  assert.match(result.items[1].message, /close to the reference/);
  assert.match(result.nextStep, /re–re/);
  assert.doesNotMatch(result.items[0].message, /wrong|too high|too low/);

  const limited = derive({ ...base, confidence: "limited" });
  assert.equal(limited.items.length, 1);
  assert.match(limited.items[0].message, /won't guess/);
  assert.doesNotMatch(limited.summary, /close to the reference/);

  const practice = derive({
    ...base,
    syllables: [base.syllables[0], { ...base.syllables[1], status: "practice", differenceCents: 240 }],
  });
  assert.match(practice.items[1].message, /ends higher relative to the preceding syllable/);
  assert.match(practice.items[1].message, /re–re transition/);
  const negative = derive({
    ...base,
    syllables: [base.syllables[0], { ...base.syllables[1], status: "practice", differenceCents: -240 }],
  });
  assert.match(negative.items[1].message, /ends lower relative to the preceding syllable/);
  const unknown = derive({
    ...base,
    syllables: [base.syllables[0], { ...base.syllables[1], status: "uncertain", differenceCents: null }],
  });
  assert.match(unknown.items[1].message, /no specific correction/);
});

test("both surfaces retain shared chart, trusted labels and original graph wording", () => {
  const graph = file("components/general/ParaPitchGraph.tsx");
  const standalone = file("components/premium/pwp/SelectedPwpScreen.tsx");
  const lesson = file("components/lessons/contents/InLessonRecordWithPara.tsx");
  assert.match(graph, /buildLearnerToneFeedback\(feedback\)/);
  assert.match(graph, /Your tone feedback/);
  assert.match(graph, /Next practice goal:/);
  assert.match(graph, /Syllable boundaries are estimates, not verified phonetic alignment/);
  assert.match(standalone, /Review your tone feedback below to see what to practice/);
  assert.match(standalone, /processedData\.pitchFeedback \? /);
  assert.match(lesson, /<ParaPitchGraph feedback=\{processedData\.pitchFeedback\}/);
});

test("word and tone presentation is consistently uppercase and parenthesized lowercase", () => {
  const ts = require("typescript");
  const Module = require("node:module");
  const fmt = new Module(path.join(root, "lib/para/formatTone.ts"), module);
  fmt.filename = path.join(root, "lib/para/formatTone.ts");
  fmt.paths = module.paths;
  fmt._compile(ts.transpileModule(file("lib/para/formatTone.ts"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText, fmt.filename);
  const { formatYorubaDisplayWord, formatTonePattern, formatSyllableTone } = fmt.exports;
  assert.equal(formatYorubaDisplayWord("àbúrò"), "ÀBÚRÒ");
  assert.equal(formatTonePattern("Do Mi Do"), "(do–mi–do)");
  assert.equal(formatTonePattern("RE RE"), "(re–re)");
  assert.equal(formatSyllableTone("bú", "MI"), "BÚ (mi)");
  const graph = file("components/general/ParaPitchGraph.tsx");
  assert.match(graph, /formatSyllableTone\(s\.label, s\.solfege\)/);
});
test("ungraded status never becomes a fake zero percent score", () => {
  const screen = file("components/premium/pwp/SelectedPwpScreen.tsx");
  assert.match(screen, /payload\?\.graded === false/);
  assert.match(screen, /finalScore: null/);
  assert.match(screen, /feedbackRes\.data\.finalScore !== null/);
  assert.match(screen, /Practice recorded — no score assigned/);
  assert.match(screen, /processedData\.graded !== false/);
  assert.match(screen, /formData\.append\("voice", referenceVoice\)/);
});
