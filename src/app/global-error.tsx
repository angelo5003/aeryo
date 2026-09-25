"use client";

import { Provider } from "@/components/ui/provider";
import ErrorPage from "./error";
import "./globals.css";

// Replaces the root layout when the layout itself (or a provider in it)
// throws, so it brings its own <html>/<body>, styles and Chakra Provider —
// per node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md
// ("Global Error"). Reuses error.tsx for the actual UI.
export default function GlobalError(props: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <title>Aeryo</title>
        <Provider>
          <ErrorPage {...props} />
        </Provider>
      </body>
    </html>
  );
}
