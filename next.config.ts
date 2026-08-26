import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next's dev server blocks cross-origin requests to /_next/* dev assets
  // by default (only localhost is trusted) — without this, the phone can
  // load the initial HTML from the LAN IP in capacitor.config.ts's
  // server.url, but every JS chunk 403s, so no React code ever runs. See
  // node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/allowedDevOrigins.md.
  allowedDevOrigins: ["192.168.1.71"],
};

export default nextConfig;
