import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { colors } from "../tokens/colors";
import { radii } from "../tokens/radii";
import { shadows } from "../tokens/shadows";
import { semanticTokens } from "./semantic-tokens";
import { fonts } from "./typography";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
      radii,
      shadows,
    },
    semanticTokens,
  },
});

/**
 * The Aeryo design system, built on top of Chakra UI v3's default system.
 * Pass this to `ChakraProvider` (see `src/components/ui/provider.tsx`)
 * instead of `defaultSystem`.
 */
export const system = createSystem(defaultConfig, config);
