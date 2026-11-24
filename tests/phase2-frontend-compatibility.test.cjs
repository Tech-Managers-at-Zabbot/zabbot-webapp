/**
 * Phase 2 UI policy / flag compatibility.
 * Compile the real TypeScript modules with the repository's TypeScript dependency.
 * Mock only external React/query hooks; never contact the staging API.
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
function loadTS(file, mocks = {}) {
  const filename = path.join(root, file);
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    },
  }).outputText;
  const m = new Module(filename, module);
  m.filename = filename;
  m.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = m.require.bind(m);
  m.require = (name) => Object.prototype.hasOwnProperty.call(mocks, name)
    ? mocks[name] : originalRequire(name);
  m._compile(compiled, filename);
  return m.exports;
}

test("existing tile decision cases are actually executed by CI", () => {
  const policy = loadTS("lib/subscription-gating/tileAccess.ts");
  const policyCases = loadTS("lib/subscription-gating/tileAccess.policy.test.ts", {
    "./tileAccess": policy,
  });
  policyCases.verifyTileAccessPolicy();
  assert.equal(policyCases.tilePolicyCases.length, 8);
  assert.equal(policy.resolveTileAccess({
    isActive: false, isFreePreview: true, entitlement: "granted",
  }), "admin_inactive");
  assert.equal(policy.resolveTileAccess({
    isActive: true, isFreePreview: false, entitlement: "unavailable",
  }), "unavailable");
});

test("free-preview lesson ID is narrow and does not unlock a whole Journey", () => {
  const free = loadTS("lib/subscription-gating/freePreview.ts");
  assert.equal(free.isFreePreviewLesson(free.FREE_PREVIEW_LESSON_ID), true);
  assert.equal(free.isFreePreviewLesson(free.FREE_PREVIEW_JOURNEY_ID), false);
  assert.equal(free.isFreePreviewJourney(free.FREE_PREVIEW_JOURNEY_ID), true);
  assert.equal(free.isFreePreviewLesson("not-an-authorized-lesson"), false);
});

test("frontend OFF does not query entitlement and preserves legacy accessible state", () => {
  const previous = process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE;
  let lastOptions;
  try {
    delete process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE;
    const hook = loadTS("lib/subscription-gating/useSubscriptionEntitlement.ts", {
      "@tanstack/react-query": { useQuery: options => {
        lastOptions = options;
        return { isPending: true, isError: false, data: null };
      }},
      "@/services/axiosInstance": { __esModule: true, default: { get: () => {
        throw Error("network requests prohibited in this test");
      } }},
      "@/contexts/UserContext": { useUser: () => ({ userDetails: { id: "free-user" } }) },
    });
    let result = hook.useSubscriptionEntitlement();
    assert.equal(result.state, "granted");
    assert.equal(lastOptions.enabled, false);
    process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE = "false";
    result = hook.useSubscriptionEntitlement();
    assert.equal(result.state, "granted");
    assert.equal(lastOptions.enabled, false);
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE;
    else process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE = previous;
  }
});

test("frontend ON handles free, paid, unavailable and unauthenticated states", () => {
  const previous = process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE;
  let user = "free-user";
  let queryResult = { isPending: true, isError: false, data: null };
  let lastOptions;
  try {
    process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE = "true";
    const hook = loadTS("lib/subscription-gating/useSubscriptionEntitlement.ts", {
      "@tanstack/react-query": { useQuery: options => {
        lastOptions = options;
        return queryResult;
      }},
      "@/services/axiosInstance": { __esModule: true, default: { get: () => {
        throw Error("network requests prohibited in this test");
      } }},
      "@/contexts/UserContext": { useUser: () => ({ userDetails: user ? { id: user } : null }) },
    });
    assert.equal(hook.useSubscriptionEntitlement().state, "loading");
    assert.equal(lastOptions.enabled, true);
    queryResult = { isPending: false, isError: false, data: { hasAccess: false } };
    assert.equal(hook.useSubscriptionEntitlement().state, "denied");
    queryResult = { isPending: false, isError: false, data: { hasAccess: true } };
    assert.equal(hook.useSubscriptionEntitlement().state, "granted");
    queryResult = { isPending: false, isError: true, data: null };
    const error = hook.useSubscriptionEntitlement();
    assert.equal(error.state, "unavailable");
    assert.equal(error.isUnavailable, true);
    user = "";
    assert.equal(hook.useSubscriptionEntitlement().state, "loading");
    assert.equal(lastOptions.enabled, false);
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE;
    else process.env.NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE = previous;
  }
});


test("home dashboard Journey and Step cards apply the same access policy as listing pages", () => {
  const journey = fs.readFileSync(path.join(root, "components/dashboard/PopularCourses.tsx"), "utf8");
  const step = fs.readFileSync(path.join(root, "components/dashboard/ProgressSection.tsx"), "utf8");
  for (const [name, content] of [["Journey", journey], ["Step", step]]) {
    assert.match(content, /useSubscriptionEntitlement\(\)/, `${name} must request entitlement`);
    assert.match(content, /resolveTileAccess\(\{/, `${name} must resolve the shared tile policy`);
    assert.match(content, /<SubscriptionTileOverlay state=\{tileState\}/, `${name} must display the shared overlay`);
    assert.match(content, /isClickable=\{gatingEnabled \? tileState === "accessible" :/, `${name} must block navigation when access is denied`);
    assert.match(content, /NEXT_PUBLIC_ZABBOT_SUBSCRIPTION_GATING_ENFORCE/, `${name} must retain the feature flag`);
  }
  assert.match(journey, /isFreePreviewJourney\(lessonProgressData\?\.id\)/);
  assert.match(step, /isFreePreviewLesson\(lessonData\?\.id\)/);
  assert.match(step, /lessonData\?\.course\?\.isActive !== false/);
});


test("Steps page keeps each Journey's Admin-defined order ahead of inactive Journeys", () => {
  const { orderStepsByJourney } = loadTS("lib/steps/orderStepsByJourney.ts");
  const active = { isActive: true, orderNumber: 1 };
  const inactive = { isActive: false, orderNumber: 2 };
  // Recreates staging: 16 inactive first Steps with orderNumber=1 must NOT
  // displace Show You Care (#2) or Introductions (#3) from top row.
  const records = [
    ...Array.from({ length: 16 }, (_, i) => ({
      id: `inactive-${i}`, courseId: `journey-${i}`,
      orderNumber: 1, course: inactive,
    })),
    { id: "intro", courseId: "first", orderNumber: 3, course: active },
    { id: "hello", courseId: "first", orderNumber: 1, course: active },
    { id: "care", courseId: "first", orderNumber: 2, course: active },
  ];
  const ordered = orderStepsByJourney(records);
  assert.deepEqual(ordered.slice(0, 3).map(x => x.id), ["hello", "care", "intro"]);
  assert.equal(ordered.length, records.length);
  assert.deepEqual(records.slice(-3).map(x => x.id), ["intro", "hello", "care"]);
});

test("multiple active Journeys follow Admin Journey order and preserve their Step order", () => {
  const { orderStepsByJourney } = loadTS("lib/steps/orderStepsByJourney.ts");
  const steps = [
    { id: "b2", courseId: "b", orderNumber: 2, course: { isActive: true, orderNumber: 2 } },
    { id: "a2", courseId: "a", orderNumber: 2, course: { isActive: true, orderNumber: 1 } },
    { id: "b1", courseId: "b", orderNumber: 1, course: { isActive: true, orderNumber: 2 } },
    { id: "a1", courseId: "a", orderNumber: 1, course: { isActive: true, orderNumber: 1 } },
  ];
  assert.deepEqual(orderStepsByJourney(steps).map(x => x.id), ["a1", "a2", "b1", "b2"]);
});


test("Steps page hamburger and dropdown stack above the lesson grid", () => {
  const page = fs.readFileSync(path.join(root, "app/user-dashboard/steps/page.tsx"), "utf8");
  assert.match(page, /right-\[5%\] z-\[200\]/, "settings header must stack above the Steps grid");
  assert.match(page, /z-\[201\] hidden lg:flex pointer-events-auto/, "settings trigger must remain interactive");
  assert.match(page, /<section className="relative z-0 mt-30">/, "Steps grid must remain in lower stacking context");
  assert.match(page, /pointer-events-none absolute bg-cover/, "decorative clouds must not intercept clicks");
});


test("Home Steps carousel reuses the Steps page Journey-first ordering and language-scoped data", () => {
  const home = fs.readFileSync(path.join(root, "components/dashboard/ProgressSection.tsx"), "utf8");
  assert.match(home, /useGetLanguageLessons\(userDetails\?\.languageId\)/);
  assert.match(home, /orderStepsByJourney\(allLessonsData\.data\)/);
  assert.doesNotMatch(home, /useGetAllLessons\(/);
  assert.doesNotMatch(home, /Number\(Boolean\(b\?\.isActive\)\)/);
  const { orderStepsByJourney } = loadTS("lib/steps/orderStepsByJourney.ts");
  const first = { isActive: true, orderNumber: 1 };
  const twelfth = { isActive: false, orderNumber: 12 };
  const shuffled = [
    { id: "directions", courseId: "journey12", orderNumber: 1, course: twelfth },
    { id: "origins", courseId: "journey1", orderNumber: 5, course: first },
    { id: "intro", courseId: "journey1", orderNumber: 3, course: first },
    { id: "hello", courseId: "journey1", orderNumber: 1, course: first },
    { id: "care", courseId: "journey1", orderNumber: 2, course: first },
    { id: "know", courseId: "journey1", orderNumber: 4, course: first },
  ];
  assert.deepEqual(orderStepsByJourney(shuffled).map(x => x.id),
    ["hello", "care", "intro", "know", "origins", "directions"]);
});


test("Release B #5: Daily Word congratulations remains outside the conditional card state", () => {
  const src = fs.readFileSync(path.join(root, "components/dashboard/UserGoals.tsx"), "utf8");
  const modalIndex = src.lastIndexOf("<CongratulationsModal");
  const cardsEnd = src.lastIndexOf("      )}");
  assert.ok(modalIndex > cardsEnd, "congratulations modal must survive transition to completed-goal card");
  assert.equal((src.match(/<CongratulationsModal/g) || []).length, 1);
  assert.match(src, /completeGoal\(\s*\(\) => \{\s*setShowCongrats\(true\)/);
  assert.doesNotMatch(src, /if \(!isGoalComplete\) \{\s*setShowCongrats\(true\)/);
  assert.match(src, /onClose=\{\(\) => \{\s*setShowCongrats\(false\)/);
});

test("Release B #2: Pàrà word changes remount feedback and new recordings clear old results", () => {
  const page = fs.readFileSync(path.join(root, "app/premium/pronounce-with-para/page.tsx"), "utf8");
  const selected = fs.readFileSync(path.join(root, "components/premium/pwp/SelectedPwpScreen.tsx"), "utf8");
  assert.match(page, /<SelectedPwpScreen key=\{selectedPwpItem\.id\} data=\{selectedPwpItem\}/);
  assert.match(page, /selectedPwpItem\?\.id === selectedItem/);
  assert.match(selected, /setProcessedData\(null\);\s*if \(audioURL\)/);
  assert.match(selected, /setAudioURL\(null\);\s*chunks\.current = \[\]/);
  assert.match(selected, /mediaRecorderRef\.current\?\.stream\.getTracks\(\)\.forEach/);
});

test("Release B #3: learner labels use Journey > Step > Bite", () => {
  const cards = fs.readFileSync(path.join(root, "components/dashboard/UserLessonDataComponent.tsx"), "utf8");
  const english = JSON.parse(fs.readFileSync(path.join(root, "public/data/languageData/englishDataSet/userDashboard.json"), "utf8"));
  const steps = fs.readFileSync(path.join(root, "components/dashboard/Lessons/AllSteps.tsx"), "utf8");
  const journeys = fs.readFileSync(path.join(root, "components/dashboard/Lessons/AllCourses.tsx"), "utf8");
  const ready = fs.readFileSync(path.join(root, "components/lessons/LessonOneReady.tsx"), "utf8");
  assert.equal(english.immersion_tagline, "Immerse yourself in Yorùbá, one Step at a time");
  assert.equal(english.journey_grows, "Your Journey grows with every Step you finish.");
  assert.match(cards, /data\?\.totalContents === 1 \? "Bite" : "Bites"/);
  assert.doesNotMatch(cards, /data\?\.totalContents === 1 \? "spark" : "sparks"/);
  assert.match(steps, /subtitle="No Steps yet"/);
  assert.match(journeys, /subtitle="No Journeys yet"/);
  assert.match(ready, /Finish this Step and see what awaits you/);
  const intro = fs.readFileSync(path.join(root, "components/lessons/LessonIntro.tsx"), "utf8");
  const introPage = fs.readFileSync(path.join(root, "app/lesson/[courseId]/[lessonId]/learn-intro/page.tsx"), "utf8");
  assert.match(intro, /STEP \{numberToWords\(lessonNumber\)\.toUpperCase\(\)\}/);
  assert.match(introPage, /STEP \{lesson\?\.orderNumber\}/);
  assert.match(introPage, /lesson\?\.totalContents === 1 \? "Bite" : "Bites"/);
});
