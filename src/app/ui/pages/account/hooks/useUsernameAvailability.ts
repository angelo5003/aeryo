"use client";

import * as React from "react";
import { isUsernameAvailable } from "@/lib/supabase/account";

export type UsernameAvailability =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "error";

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{4,12}$/;
const DEBOUNCE_MS = 400;

export function useUsernameAvailability(
  username: string,
): UsernameAvailability {
  const [status, setStatus] = React.useState<UsernameAvailability>("idle");

  React.useEffect(() => {
    if (!USERNAME_PATTERN.test(username)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("idle");
      return;
    }

    setStatus("checking");
    let cancelled = false;

    const timer = setTimeout(() => {
      isUsernameAvailable(username)
        .then((available) => {
          if (!cancelled) setStatus(available ? "available" : "taken");
        })
        .catch(() => {
          if (!cancelled) setStatus("error");
        });
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [username]);

  return status;
}
