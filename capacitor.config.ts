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
  },
};

export default config;
