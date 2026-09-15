"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "@/components/data-display/Toaster";
import { system } from "@/design-system/theme";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { StatusBarSync } from "./status-bar-sync";

export function Provider({ children }: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <StatusBarSync />
        <Toaster />
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
