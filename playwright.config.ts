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
