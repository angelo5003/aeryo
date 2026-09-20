"use client";

import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { Box } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/Auth/AuthProvider";
import { Stack } from "@/components/primitives/Stack";
import { Heading } from "@/components/typography/Heading";
import { Link } from "@/components/typography/Link";
import { Text } from "@/components/typography/Text/Text";

// Extra space under the keyboard so the login button
// isn't pressed right up against it.
// Only used when the phone keyboard is open.
const KEYBOARD_GAP_PX = 24;

// How tall the on-screen keyboard is, in pixels. 0 when hidden.
// On the phone it sits on top of the page instead of shrinking it
// (see capacitor.config.ts). On the website this hook does nothing.
const useKeyboardInset = (): number => {
  const [inset, setInset] = useState(0);

  useEffect(() => {
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
};

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const keyboardInset = useKeyboardInset();
  const router = useRouter();
  const { session, isReady } = useAuth();
  const pathname = usePathname();

  // After signup (or if already logged in), send the user home.
  // Wait for AuthProvider to finish checking first, so we don't
  // flash the form and then yank them away.
  useEffect(() => {
    if (isReady && session) router.replace("/");
  }, [isReady, session, router]);

  if (!isReady || session) return null;

  // Fill the leftover screen space. Don't use 100dvh — body already has
  // safe-area padding, and 100dvh would add that padding twice.
  // No extra top space: the form starts at the top, same as the home screen.
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
      <Stack
        direction="column"
        gap="5"
        maxWidth="sm"
        width="100%"
        mx="auto"
        pt="5"
      >
        <Heading as="h1" textAlign="center" color="fg">
          AERYO
        </Heading>
        {children}
        <footer>
          {pathname === "/login" && (
            <Stack direction="row" flexWrap="wrap" justify="center">
              <Text color="fg.muted" fontSize="md">
                New to AERYO?
                <Link
                  href="/signup"
                  color="rider.riding"
                  _visited={{ color: "rider.riding" }}
                  fontSize="md"
                  ml="1"
                >
                  Create account
                </Link>
              </Text>
            </Stack>
          )}
          {pathname === "/signup" && (
            <Stack direction="row" flexWrap="wrap" justify="center">
              <Text color="fg.muted" fontSize="md">
                Already have an account?
                <Link
                  href="/login"
                  color="rider.riding"
                  _visited={{ color: "rider.riding" }}
                  fontSize="md"
                  ml="1"
                >
                  Login
                </Link>
              </Text>
            </Stack>
          )}
        </footer>
      </Stack>
    </Box>
  );
};

export default AuthLayout;
