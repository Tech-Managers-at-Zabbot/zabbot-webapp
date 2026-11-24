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
    assert.match(source, /pitchFeedback: feedbackRes\.data/);
    assert.match(source, /!processedData\.pitchFeedback && processedData\.plot/);
  }
});
test("graph renders reference and learner contours and guarded syllable guidance", () => {
  const graph = file("components/general/ParaPitchGraph.tsx");
  assert.match(graph, /feedback\.referencePitch/);
  assert.match(graph, /feedback\.learnerPitch/);
  assert.match(graph, /feedback\.syllables/);
  assert.match(graph, /feedback\.guidance/);
  assert.match(graph, /feedback\.confidence === "limited"/);
  assert.match(graph, /not verified phonetic alignment/);
});
