import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { colors } from "./colors";
import { radii } from "./radii";
import { semanticTokens } from "./semantic-tokens";
import { shadows } from "./shadows";
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
