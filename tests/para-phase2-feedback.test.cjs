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
