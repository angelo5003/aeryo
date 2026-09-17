"use client";

import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useAuth } from "@/app/providers/Auth/AuthProvider";
import CreateAccountForm from "@/app/ui/pages/account/CreateAccountForm/CreateAccountForm";
import { Stack } from "@/components/primitives/Stack";
import { Heading } from "@/components/typography/Heading";

// Extra breathing room below the keyboard, so the CTA/login link don't sit
// flush against it.
const KEYBOARD_GAP_PX = 24;

/**
 * Height (px) of the currently-visible native keyboard, 0 when hidden.
 * `capacitor.config.ts` sets `Keyboard.resize: "none"` (see the comment
 * there) so the WebView never shrinks — the keyboard overlays it instead.
 * Without this, the keyboard covers the bottom of the form. No-op on web
 * (`Capacitor.isNativePlatform()` false), same guard as
 * `src/components/ui/status-bar-sync.tsx`.
 */
function useKeyboardInset(): number {
  const [inset, setInset] = React.useState(0);

  React.useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const showHandle = Keyboard.addListener("keyboardWillShow", (info) => {
      setInset(info.keyboardHeight);
    });
    const hideHandle = Keyboard.addListener("keyboardWillHide", () => {
      setInset(0);
    });

    return () => {
      void showHandle.then((handle) => handle.remove());
      void hideHandle.then((handle) => handle.remove());
    };
  }, []);

  return inset;
}

// `flex="1"` fills the body's already-inset-padded viewport, same pattern
// as the home screen (src/app/page.tsx) — a literal 100dvh here would
// double-count the safe-area padding `body` already applies (globals.css).
// No top padding/centering — the form starts right at the top, same as the
// home screen's own `Box`, which reserves no extra space above its content.
export default function SignupPage() {
  const keyboardInset = useKeyboardInset();
  const router = useRouter();
  const { session, isReady } = useAuth();

  // signUp() resolves with a session immediately when email confirmation is
  // off (accountActions.ts) — AuthProvider picks that up via
  // onAuthStateChange and session flips truthy right here on /signup, with
  // nothing that sent the user anywhere. Mirrors page.tsx's own
  // needsAccount redirect, just pointed the opposite direction. Gated on
  // isReady too — page.tsx's stillLoading holds off render the same way —
  // so a fresh mount (session still null, answer not back yet) doesn't
  // flash the form before AuthProvider resolves an already-logged-in user.
  React.useEffect(() => {
    if (isReady && session) router.replace("/");
  }, [isReady, session, router]);

  if (!isReady || session) return null;

  return (
    <Box
      bg="bg"
      color="fg"
      flex="1"
      display="flex"
      flexDirection="column"
      overflowY="auto"
      px="6"
      pb={keyboardInset > 0 ? `${keyboardInset + KEYBOARD_GAP_PX}px` : "10"}
    >
      <Stack direction="column" gap="8" maxWidth="sm" width="100%" mx="auto">
        <Heading as="h1" textAlign="center" color="fg">
          AERYO
        </Heading>
        <CreateAccountForm />
      </Stack>
    </Box>
  );
}
