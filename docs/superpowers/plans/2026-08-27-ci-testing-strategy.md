# CI & Testing Strategy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Aeryo automated CI on GitHub — every PR gated on lint/typecheck/tests/coverage/build/E2E, plus a real native-compile check on every `main` merge — with zero code-signing setup and a coverage floor that only ever goes up.

**Architecture:** Two GitHub Actions workflows. `pr-checks.yml` runs on every PR on Linux runners only (cheap, fast): lint, typecheck, Jest unit/component tests with an enforced coverage floor, Storybook's Vitest interaction tests, a real `next build` (proves the static export still works), `cap sync android` (native config drift check — Android only, see Task 7 note on why iOS sync moves to Tier 2), and a Playwright E2E suite run through both the `webkit` and `chromium` engines (proxies for iOS/Android rendering, no simulator needed). `main-native-build.yml` runs only on push to `main`, on a macOS runner for iOS (Simulator target, unsigned) and a Linux runner for Android (debug `.apk`, unsigned) — pure compile-verification, not a distributable release.

**Tech Stack:** GitHub Actions, Jest (existing), `@playwright/test` (new), `serve` (new, static file server for E2E), existing Next.js/Capacitor toolchain.

**Spec:** `docs/superpowers/specs/2026-08-27-ci-testing-strategy-design.md`

## Global Constraints

- Tier 1 (`pr-checks.yml`) runs on `ubuntu-latest` only — no macOS runners, no secrets, no code signing anywhere in this tier.
- Tier 2 (`main-native-build.yml`) runs only on push to `main`, never on PRs. iOS job targets the **Simulator** SDK only (`-sdk iphonesimulator`) — never a real device — specifically so no signing certificate or provisioning profile is ever needed. Android job builds `assembleDebug` (unsigned `.apk`).
- Jest coverage floor (exact, from the spec's measured baseline): **statements 10%, branches 8%, functions 3%, lines 10%**. `collectCoverageFrom` must cover all of `src/**/*.{ts,tsx}` except `*.stories.tsx`, `*.test.tsx`, and `src/design-system/theme/**` (generated typegen output).
- E2E via `@playwright/test`, two projects only: `webkit` (via the `devices["iPhone 14"]` preset) and `chromium` (via `devices["Pixel 7"]`). E2E tests run against the **built static export** (`out/`, served by `serve`), not `next dev` — that's what actually ships inside the native app.
- iOS deployment target is 15.0 (`ios/App/App.xcodeproj/project.pbxproj`); Android `compileSdkVersion`/`targetSdkVersion` is 36, `minSdkVersion` 24 (`android/variables.gradle`) — the Tier 2 workflow's toolchain choices must satisfy these.
- Node version in CI: 24 (matches local dev environment).
- Branch protection on `main` requires every Tier 1 job as a required status check. Tier 2 is never a required check (it only runs post-merge, so it structurally can't gate a merge).

## File Structure

- `__tests__/page.test.tsx` — **deleted** (stale, asserts on boilerplate content that no longer exists; fully superseded by `src/app/page.stories.tsx`'s `Default`/`TransitionsToHome` stories)
- `jest.config.ts` — modified: add `collectCoverageFrom` + `coverageThreshold`
- `package.json` — modified: add `typecheck`, `test:coverage`, `test:e2e` scripts; add `@playwright/test` and `serve` as devDependencies
- `playwright.config.ts` — new: Playwright config (webServer, two device projects)
- `e2e/intro-sequence.spec.ts` — new: splash→intro→home E2E coverage
- `e2e/color-mode.spec.ts` — new: light/dark rendering E2E coverage
- `.github/workflows/pr-checks.yml` — new: Tier 1 pipeline
- `.github/workflows/main-native-build.yml` — new: Tier 2 pipeline

---

### Task 1: Delete the stale, already-failing Jest test

**Files:**
- Delete: `__tests__/page.test.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: nothing — this just removes dead weight blocking a green baseline

- [ ] **Step 1: Confirm it's currently failing (so we know we're not silencing a real bug)**

Run: `npm test -- __tests__/page.test.tsx`
Expected: FAIL — `useSplashScreen must be used within a SplashProvider` (the test renders `<Home />` with no provider, and `Home` now requires one)

- [ ] **Step 2: Confirm the same coverage already exists elsewhere**

Open `src/app/page.stories.tsx` and confirm the `Default` story asserts the intro renders (logo + tagline) and `TransitionsToHome` asserts the swap to "Hello world" — both scenarios `__tests__/page.test.tsx` was trying (and failing) to cover.

- [ ] **Step 3: Delete the file**

```bash
rm __tests__/page.test.tsx
```

- [ ] **Step 4: Run the full Jest suite, confirm all green**

Run: `npm test`
Expected: PASS, all suites green, no failures

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Remove stale __tests__/page.test.tsx

Fully superseded by page.stories.tsx's Default/TransitionsToHome
stories, which already cover both the intro and post-transition states
against the current Home implementation.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Honest coverage measurement + enforced floor

**Files:**
- Modify: `jest.config.ts`
- Modify: `package.json` (add `test:coverage` script)

**Interfaces:**
- Consumes: nothing
- Produces: `npm run test:coverage` — used by Task 7's Tier 1 workflow

- [ ] **Step 1: Modify `jest.config.ts` to add honest coverage scope + the enforced floor**

Open `jest.config.ts` and change the `config` object from:

```ts
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Match the "@/*" path alias declared in tsconfig.json
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
```

to:

```ts
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Match the "@/*" path alias declared in tsconfig.json
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Without this, coverage only reflects the handful of files that
  // already have tests (previously reported as ~85%, which was
  // misleading) instead of the whole app. `.stories.tsx` files are
  // excluded because their real coverage comes from Storybook's own
  // Vitest run (`npm run test:storybook`), not Jest; the design-system
  // theme directory is excluded because it's Chakra CLI-generated
  // typegen output, not hand-written code.
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.tsx",
    "!src/**/*.test.tsx",
    "!src/design-system/theme/**",
  ],
  // Real measured baseline as of 2026-08-27 (see
  // docs/superpowers/specs/2026-08-27-ci-testing-strategy-design.md) was
  // 12.6% statements / 10.77% branches / 4.48% functions / 12.6% lines.
  // These thresholds sit a couple points under that so a trivial
  // fluctuation doesn't flake an unrelated PR. This floor only ever goes
  // up — raise it by hand as real coverage grows, never lower it.
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 8,
      functions: 3,
      lines: 10,
    },
  },
};
```

- [ ] **Step 2: Add the `test:coverage` npm script**

In `package.json`, in the `"scripts"` block, add a line right after `"test:watch": "jest --watch",`:

```json
    "test:coverage": "jest --coverage",
```

- [ ] **Step 3: Run it and confirm it passes at the real baseline**

Run: `npm run test:coverage`
Expected: PASS — coverage summary printed, all four numbers at or above the thresholds set in Step 1 (statements/lines around 12.6%, branches around 10.77%, functions around 4.48%)

- [ ] **Step 4: Prove the floor actually gates (temporarily break it, then fix it)**

Temporarily edit the `functions` threshold in `jest.config.ts` to `50` (well above real coverage), run `npm run test:coverage` again, and confirm it FAILS with a message like `Jest: "global" coverage threshold for functions (50%) not met: 4.48%`. Then revert that line back to `3` (the real value from Step 1) and re-run to confirm PASS again. This proves the gate is real, not just present in config with no effect.

- [ ] **Step 5: Commit**

```bash
git add jest.config.ts package.json
git commit -m "Add honest whole-app coverage measurement + enforced floor

collectCoverageFrom now covers all real app source instead of only the
~9 files that happened to have tests. Enforces today's real baseline
(10/8/3/10) as a floor that can only be raised by hand, never lowered.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Add a `typecheck` npm script

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing
- Produces: `npm run typecheck` — used by Task 7's Tier 1 workflow

- [ ] **Step 1: Add the script**

In `package.json`, in `"scripts"`, add a line right after `"lint:fix": "eslint --fix",`:

```json
    "typecheck": "tsc --noEmit",
```

- [ ] **Step 2: Run it, confirm it's clean**

Run: `npm run typecheck`
Expected: PASS, no output (or only the usual project warnings, no errors), exit code 0

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "Add typecheck npm script

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Add Playwright as the E2E test runner

**Files:**
- Modify: `package.json` (add devDependencies + `test:e2e` script)
- Create: `playwright.config.ts`

**Interfaces:**
- Consumes: the static export build (`out/`, produced by `npm run build`)
- Produces: `npm run test:e2e` — used by Task 7's Tier 1 workflow; `playwright.config.ts`'s `projects` array (`webkit`, `chromium`) — referenced by name in Tasks 5, 6, 7

- [ ] **Step 1: Install `@playwright/test` and `serve`**

```bash
npm install -D @playwright/test serve
```

- [ ] **Step 2: Install the Playwright browser binaries locally**

```bash
npx playwright install --with-deps webkit chromium
```

- [ ] **Step 3: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

// E2E runs against the actual static export (`out/`), served by `serve`
// — that's what Capacitor bundles into the native app shell, not
// `next dev`'s server. `webkit` and `chromium` stand in for iOS's
// WKWebView and Android's WebView respectively: they're the same
// underlying rendering engines, without needing a simulator/emulator.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173",
  },
  webServer: {
    command: "npm run build && npx serve out -p 4173 -s",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "webkit", use: { ...devices["iPhone 14"] } },
    { name: "chromium", use: { ...devices["Pixel 7"] } },
  ],
});
```

- [ ] **Step 4: Add the `test:e2e` npm script**

In `package.json`, in `"scripts"`, add a line right after `"test:coverage": "jest --coverage",`:

```json
    "test:e2e": "playwright test",
```

- [ ] **Step 5: Verify the config loads (no tests exist yet, so this just proves the harness is wired correctly)**

Run: `npx playwright test --list`
Expected: exits 0, prints something like "Total: 0 tests in 0 files" — no config errors, no missing-browser errors

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json playwright.config.ts
git commit -m "Add Playwright as the E2E test runner

webkit + chromium projects, testing against the built static export
(out/) via serve rather than next dev, since that's what actually ships
inside the native app.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: E2E test — splash → intro → home sequence

**Files:**
- Create: `e2e/intro-sequence.spec.ts`

**Interfaces:**
- Consumes: `playwright.config.ts`'s `webkit`/`chromium` projects (Task 4); the running app's DOM structure from `src/app/page.tsx` and `src/app/_providers/SplashScreen/IntroScreen/IntroScreen.tsx` — specifically: an `<img alt="Aeryo">` (logo), the text "Where the Unseen Leads" (tagline), and eventually an `<h1>` containing "Hello world"
- Produces: nothing further downstream — this is a leaf test

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from "@playwright/test";

test.describe("splash → intro → home", () => {
  test("renders the intro (logo + tagline) then transitions to home", async ({
    page,
  }) => {
    await page.goto("/");

    // Intro content should be visible — Framer Motion fades these in, so
    // wait rather than asserting instantly.
    await expect(page.getByAltText("Aeryo")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Where the Unseen Leads")).toBeVisible({
      timeout: 3000,
    });

    // After the minDwellElapsed && appReady gate (2.5s dwell in
    // src/app/page.tsx), it should swap to the real app content.
    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("home page is never scrollable", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    const { scrollHeight, clientHeight } = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    }));

    expect(scrollHeight).toBeLessThanOrEqual(clientHeight);
  });
});
```

- [ ] **Step 2: Run it on both projects, confirm PASS**

Run: `npm run test:e2e -- e2e/intro-sequence.spec.ts`
Expected: PASS — 2 tests × 2 projects (webkit, chromium) = 4 passed

- [ ] **Step 3: Commit**

```bash
git add e2e/intro-sequence.spec.ts
git commit -m "Add E2E coverage for the splash/intro/home sequence

Covers the intro rendering (logo + tagline), the transition to real app
content, and the no-scroll regression fixed earlier — run through both
webkit and chromium.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: E2E test — color mode rendering

**Files:**
- Create: `e2e/color-mode.spec.ts`

**Interfaces:**
- Consumes: `playwright.config.ts`'s projects (Task 4); the app's `bg`/`fg` semantic tokens resolving to `ink.50`/`ink.950` per `src/design-system/tokens/colors.ts` (`#EDF8F6` light, `#071216` dark — as `rgb(237, 248, 246)` / `rgb(7, 18, 22)` in computed style)
- Produces: nothing further downstream — leaf test

- [ ] **Step 1: Write the test**

```ts
import { test, expect } from "@playwright/test";

test.describe("color mode rendering", () => {
  test("renders the dark bg token under dark system preference", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Hello world",
    });
    await expect(heading).toBeVisible({ timeout: 5000 });

    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(bg).toBe("rgb(7, 18, 22)");
  });

  test("renders the light bg token under light system preference", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Hello world",
    });
    await expect(heading).toBeVisible({ timeout: 5000 });

    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(bg).toBe("rgb(237, 248, 246)");
  });
});
```

- [ ] **Step 2: Run it on both projects, confirm PASS**

Run: `npm run test:e2e -- e2e/color-mode.spec.ts`
Expected: PASS — 2 tests × 2 projects = 4 passed

- [ ] **Step 3: Commit**

```bash
git add e2e/color-mode.spec.ts
git commit -m "Add E2E coverage for light/dark background rendering

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: Tier 1 GitHub Actions workflow (`pr-checks.yml`)

**Files:**
- Create: `.github/workflows/pr-checks.yml`

**Interfaces:**
- Consumes: `npm run lint`, `npm run typecheck` (Task 3), `npm run test:coverage` (Task 2), `npm run test:e2e` (Tasks 4-6), `npx vitest run --project storybook` (existing), `npm run build` (existing), `npx cap sync android` (existing `@capacitor/cli`)
- Produces: named jobs (`lint`, `typecheck`, `unit-tests`, `storybook-tests`, `web-build`, `native-config-sync`, `e2e`) — these exact names are what Task 9's branch-protection required-checks list must reference

**Note on scope vs. the spec:** the spec says "cap sync for both platforms" in Tier 1. In practice, `cap sync ios` shells out to `pod install` (CocoaPods), which isn't reliably available on a Linux runner — Android's sync has no such dependency. So this task syncs Android only in Tier 1; iOS's sync moves into Task 8's macOS-runner job, right alongside the iOS Simulator build that needs it anyway. This is a refinement discovered during implementation, not a silent scope cut — flagged here and worth mentioning back to the user once this task is done.

- [ ] **Step 1: Create the workflow file**

```yaml
name: PR Checks

on:
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run typecheck

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run test:coverage

  storybook-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx vitest run --project storybook

  web-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Confirm static export was produced
        run: test -f out/index.html

  native-config-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx cap sync android

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps webkit chromium
      - run: npm run test:e2e
```

- [ ] **Step 2: Validate the YAML locally**

Run: `npx -y js-yaml .github/workflows/pr-checks.yml > /dev/null && echo "valid YAML"`
Expected: prints `valid YAML`, no parse errors

- [ ] **Step 3: Dry-run each job's commands locally, one at a time, confirming each still passes on its own** (this is the closest thing to testing the workflow without actually pushing a PR)

```bash
npm run lint
npm run typecheck
npm run test:coverage
npx vitest run --project storybook
npm run build && test -f out/index.html
npx cap sync android
npm run test:e2e
```

Expected: every command exits 0

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/pr-checks.yml
git commit -m "Add Tier 1 PR checks workflow

Lint, typecheck, Jest unit/component tests with coverage floor,
Storybook interaction tests, static export build, Android cap sync, and
Playwright E2E (webkit + chromium) — all on ubuntu-latest, no secrets,
no code signing. iOS cap sync moves to the Tier 2 workflow since it
needs CocoaPods, which isn't reliable on Linux.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Push a throwaway branch and open a real PR to confirm the workflow actually runs on GitHub** (local dry-runs in Step 3 prove the commands work, but not that Actions' YAML/triggers/runner environment behave identically — this is the real end-to-end proof)

```bash
git checkout -b ci/verify-pr-checks
git push -u origin ci/verify-pr-checks
gh pr create --title "CI: verify pr-checks.yml" --body "Throwaway PR to confirm the new Tier 1 workflow actually runs on GitHub Actions." --base main
```

Watch the PR's checks tab. Expected: all 6 jobs (`lint`, `typecheck`, `unit-tests`, `storybook-tests`, `web-build`, `native-config-sync`, `e2e`) run and pass. Once confirmed, close the PR without merging (`gh pr close`) and delete the branch — its only purpose was proving the pipeline works.

---

### Task 8: Tier 2 GitHub Actions workflow (`main-native-build.yml`)

**Files:**
- Create: `.github/workflows/main-native-build.yml`

**Interfaces:**
- Consumes: `npm run build` (produces `out/`), `npx cap sync ios`/`npx cap sync android` (`@capacitor/cli`, already a devDependency)
- Produces: named jobs (`ios-build`, `android-build`) — visible as commit statuses on `main`, not required PR checks

- [ ] **Step 1: Create the workflow file**

```yaml
name: Main Native Build

on:
  push:
    branches: [main]

jobs:
  ios-build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx cap sync ios
      - name: Build for iOS Simulator (no signing — Simulator target only)
        working-directory: ios/App
        run: |
          xcodebuild \
            -workspace App.xcworkspace \
            -scheme App \
            -sdk iphonesimulator \
            -configuration Debug \
            CODE_SIGNING_ALLOWED=NO \
            build

  android-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: "21"
      - uses: android-actions/setup-android@v3
      - run: npm ci
      - run: npm run build
      - run: npx cap sync android
      - name: Build unsigned debug APK
        working-directory: android
        run: ./gradlew assembleDebug
```

- [ ] **Step 2: Validate the YAML locally**

Run: `npx -y js-yaml .github/workflows/main-native-build.yml > /dev/null && echo "valid YAML"`
Expected: prints `valid YAML`

- [ ] **Step 3: Confirm the Android job's commands work locally** (the iOS job needs macOS + Xcode, which may or may not be this machine — if it is, dry-run that too the same way; if not, Step 4's real push is what proves it)

```bash
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
```

Expected: exits 0, produces `android/app/build/outputs/apk/debug/app-debug.apk`

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/main-native-build.yml
git commit -m "Add Tier 2 native build verification workflow

Runs only on push to main. Real iOS Simulator build (unsigned, no
provisioning profile needed) and real Android debug APK build
(unsigned) — pure compile-verification, not a distributable release.
Not a PR-required check since it only runs post-merge.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Merge to `main` and watch it actually run** (this is the only way to prove the iOS job works end-to-end without a local macOS+Xcode dry-run)

After this task's commit reaches `main` (directly, or via the PR flow once Task 9's branch protection is live), check the Actions tab for the `Main Native Build` run. Expected: both `ios-build` and `android-build` jobs pass.

---

### Task 9: Branch protection on `main`

**Files:** none — this is a GitHub repository setting, not a code change.

**Interfaces:**
- Consumes: the exact job names from Task 7 (`lint`, `typecheck`, `unit-tests`, `storybook-tests`, `web-build`, `native-config-sync`, `e2e`)
- Produces: nothing downstream

This changes a live GitHub repository setting — confirm with the user before running Step 1, the way any repo-settings change should be confirmed rather than applied unilaterally.

- [ ] **Step 1: Apply branch protection requiring Task 7's jobs**

```bash
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["lint","typecheck","unit-tests","storybook-tests","web-build","native-config-sync","e2e"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews=null \
  --field restrictions=null
```

(`gh api` infers `:owner/:repo` from the current directory's git remote — run this from inside the `aeryo` repo.)

- [ ] **Step 2: Verify it took effect**

Run: `gh api repos/:owner/:repo/branches/main/protection --jq '.required_status_checks.contexts'`
Expected: prints the array of 7 job names from Step 1

- [ ] **Step 3: Confirm a PR is actually blocked without them** — reuse Task 7 Step 5's throwaway-PR flow (or open a new one) and confirm the "Merge" button is disabled/blocked until all 7 checks report success. No commit for this task (it's a settings change, not a file change) — the verification in Steps 2-3 is the record of it.

---

## Self-Review

**Spec coverage check:**
- Two-tier split (Linux PR checks / macOS+Linux main-only native builds) — Tasks 7, 8 ✓
- Lint, typecheck, unit tests+coverage, Storybook tests, web build, native config sync, E2E — all present in Task 7 ✓
- Coverage ratchet from real baseline (10/8/3/10) — Task 2 ✓
- Playwright webkit+chromium E2E, testing intro sequence + color mode — Tasks 4, 5, 6 ✓
- iOS Simulator build (no signing) + Android debug build (no signing) — Task 8 ✓
- Branch protection requiring Tier 1 checks, Tier 2 not required — Task 9 ✓
- Stale `__tests__/page.test.tsx` deleted — Task 1 ✓
- Known gap (Storybook coverage not merged into Jest's number) — intentionally not a task; spec explicitly deferred this

**Placeholder scan:** no TBD/TODO, no "add appropriate error handling"-style steps, no "similar to Task N" — every step has real content.

**Type/name consistency:** job names in Task 7's YAML (`lint`, `typecheck`, `unit-tests`, `storybook-tests`, `web-build`, `native-config-sync`, `e2e`) match exactly what Task 9's `gh api` call references. npm script names (`typecheck`, `test:coverage`, `test:e2e`) are introduced once (Tasks 2-4) and referenced identically everywhere else (Task 7's workflow, this review). Playwright project names (`webkit`, `chromium`) are defined once in Task 4 and used identically in Tasks 5-7.
