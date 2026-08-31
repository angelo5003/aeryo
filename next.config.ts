import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next's dev server blocks cross-origin requests to /_next/* dev assets
  // by default (only localhost is trusted) — without this, the phone can
  // load the initial HTML from the LAN IP in capacitor.config.ts's
  // server.url, but every JS chunk 403s, so no React code ever runs. See
  // node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/allowedDevOrigins.md.
  allowedDevOrigins: ["192.168.1.107"],

  // Capacitor's webDir is "out" (capacitor.config.ts) — that folder only
  // gets created by `next build` when output is set to a static export.
  // Without this, a production build for the App/Play Store has nothing
  // for `npx cap sync` to bundle into the native app at all. See
  // node_modules/next/dist/docs/01-app/02-guides/static-exports.md.
  output: "export",

  // The default next/image loader calls a Next.js server at runtime to
  // resize/optimize images — there is no server once this ships as a
  // static export inside the native app, so that loader is explicitly
  // unsupported in this mode (same doc as above, "Unsupported Features").
  // `unoptimized: true` makes next/image fall back to plain <img> tags
  // instead, which is exactly what a locally-bundled app needs.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
