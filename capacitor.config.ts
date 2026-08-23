import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.aeryo.app",
  appName: "Aeryo",
  webDir: "out",
  // Live-reload against the local `next dev` server. Update the IP if your
  // Mac's LAN address changes (`ipconfig getifaddr en0`), and make sure your
  // iPhone is on the same Wi-Fi network. Remove this `server` block before
  // shipping a production build.
  server: {
    url: "http://192.168.1.71:3000",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 500,
      launchAutoHide: true,
      showSpinner: false,
      backgroundColor: "#0B0F14",
    },
    // Bundled with @capacitor/core (no separate package) — the current,
    // Android-16-safe replacement for @capacitor/status-bar's
    // `overlaysWebView`, which Android no longer allows apps to opt out of.
    // `insetsHandling: "css"` makes Android inject the same
    // `--safe-area-inset-*` custom properties iOS reports natively via
    // `env()`, so `src/app/globals.css` can read one set of variables on
    // both platforms. `style: "DEFAULT"` follows the OS-level appearance
    // setting until the app finishes hydrating; `StatusBarSync`
    // (src/components/ui/status-bar-sync.tsx) then takes over and matches
    // the app's own color mode (which can differ from the OS setting, e.g.
    // if the user picked a mode in-app).
    SystemBars: {
      insetsHandling: "css",
      style: "DEFAULT",
    },
  },
};

export default config;
