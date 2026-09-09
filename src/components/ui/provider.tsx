"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/design-system/theme";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { StatusBarSync } from "./status-bar-sync";

export function Provider({ children }: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <StatusBarSync />
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
