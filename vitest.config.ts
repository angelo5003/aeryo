import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        // `next/link` is now used by the Link component (AERYO's typography
        // Link — see src/components/typography/Link/Link.tsx). Without this,
        // Vite only discovers it needs to pre-bundle `next/link` the first
        // time a story imports it, mid-run — which reloads the browser test
        // context and fails every in-flight test that run ("Vite
        // unexpectedly reloaded the test"). Pre-declaring it here avoids
        // that one-off flake, in CI as well as locally.
        optimizeDeps: {
          include: ["next/link"],
        },
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
