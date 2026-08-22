import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Sora } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { SafeAreaProvider } from "@/components/ui/safe-area";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
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
      className={`${sora.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SafeAreaProvider>
          <Provider>{children}</Provider>
        </SafeAreaProvider>
      </body>
    </html>
  );
}
