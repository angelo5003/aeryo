import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Match the "@/*" path alias declared in tsconfig.json
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // `e2e/*.spec.ts` are Playwright tests (run via `npm run test:e2e`);
  // `supabase/functions/**/*.test.ts` are Deno tests (run via
  // `deno task test` in supabase/). Jest's default testMatch would
  // pick both up and fail on their non-Node imports.
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/e2e/",
    "<rootDir>/supabase/",
  ],
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
  // Real measured baseline as of 2026-08-27 (whole-app scope, after
  // removing the stale __tests__/page.test.tsx) is 9.55% statements /
  // 8.98% branches / 3.2% functions / 9.55% lines. These thresholds sit
  // a couple points under that so a trivial fluctuation doesn't flake an
  // unrelated PR. This floor only ever goes up — raise it by hand as
  // real coverage grows, never lower it.
  coverageThreshold: {
    global: {
      statements: 7,
      branches: 6,
      functions: 2,
      lines: 7,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
