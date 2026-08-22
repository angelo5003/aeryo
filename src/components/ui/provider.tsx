"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/design-system/theme";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { StatusBarSync } from "./status-bar-sync";

export function Provider(props: ColorModeProviderProps) {
  const { children, ...colorModeProps } = props;
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...colorModeProps}>
        <StatusBarSync />
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
