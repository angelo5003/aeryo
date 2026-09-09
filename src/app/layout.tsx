import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope, Sora } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { SafeAreaProvider } from "@/components/ui/safe-area";
import { THEME_INIT_SCRIPT } from "@/components/ui/theme-init-script";
import "./globals.css";
import { OnboardingProvider } from "./providers/Onboarding/Provider/OnboardingProvider";
import { SplashProvider } from "./providers/SplashScreen/Provider/SplashProvider";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aeryo",
  description: "Aeryo",
};

// `viewportFit: "cover"` lets the app draw edge-to-edge under the notch /
// status bar / home indicator. Without it, `env(safe-area-inset-*)` always
// reports 0 on iOS regardless of anything else (see
// docs/superpowers/specs/2026-08-22-safe-area-provider-design.md).
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must stay in this Server Component. An in-tree Client
            Component <script> hydrates against Emotion's SSR <style>. */}
        <script id="aeryo-theme-init">{THEME_INIT_SCRIPT}</script>
      </head>
      <body>
        <SplashProvider>
          <OnboardingProvider>
            <SafeAreaProvider>
              <Provider>{children}</Provider>
            </SafeAreaProvider>
          </OnboardingProvider>
        </SplashProvider>
      </body>
    </html>
  );
}
