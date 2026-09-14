"use client";

import { App } from "@capacitor/app";
import type { PluginListenerHandle } from "@capacitor/core";
import { Capacitor } from "@capacitor/core";
import * as React from "react";

import { pathFromAppUrl } from "./pathFromAppUrl";

export interface AppUrlListenerProps {
  /**
   * Called with the in-app path when the native app is opened via a link.
   * Optional so this can mount as a no-op listener until a screen needs it.
   */
  onUrlOpen?: (path: string) => void;
}

/**
 * Listens for "the app was opened by a link" on the phone. No-op in a
 * regular browser (including `next dev`) — there is no native URL-open
 * event there.
 *
 * Cold start (app was closed) uses `getLaunchUrl`. Warm start (app already
 * running) uses the `appUrlOpen` event. Same URL is delivered at most once.
 *
 * Phone screens in this app are ifs on `/`, not extra URLs (`page.tsx`).
 * This listener is the hook for later destinations (invite, auth callback)
 * without inventing Next.js routes.
 */
export function AppUrlListener({ onUrlOpen }: AppUrlListenerProps) {
  const onUrlOpenRef = React.useRef(onUrlOpen);

  React.useEffect(() => {
    onUrlOpenRef.current = onUrlOpen;
  }, [onUrlOpen]);

  React.useEffect(() => {
    // matches src/components/ui/status-bar-sync.tsx
    if (!Capacitor.isNativePlatform()) return;

    let cancelled = false;
    let handle: PluginListenerHandle | undefined;
    let lastRawUrl: string | null = null;

    const deliver = (rawUrl: string) => {
      if (lastRawUrl === rawUrl) return;
      lastRawUrl = rawUrl;
      const path = pathFromAppUrl(rawUrl);
      if (path) onUrlOpenRef.current?.(path);
    };

    // per node_modules/@capacitor/app/dist/esm/definitions.d.ts — addListener('appUrlOpen')
    const listenerPromise = App.addListener("appUrlOpen", (event) => {
      deliver(event.url);
    });

    listenerPromise
      .then((listenerHandle) => {
        if (cancelled) {
          void listenerHandle.remove();
          return;
        }
        handle = listenerHandle;
      })
      .catch((error: unknown) => {
        console.error("AppUrlListener: failed to listen for appUrlOpen", error);
      });

    // per node_modules/@capacitor/app/dist/esm/definitions.d.ts — getLaunchUrl()
    App.getLaunchUrl()
      .then((launch) => {
        if (cancelled || !launch?.url) return;
        deliver(launch.url);
      })
      .catch((error: unknown) => {
        console.error("AppUrlListener: failed to read launch URL", error);
      });

    return () => {
      cancelled = true;
      void handle?.remove();
    };
  }, []);

  return null;
}
