import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { breakpoints } from "../tokens/breakpoints";
import { colors } from "../tokens/colors";
import { durations, easings } from "../tokens/motion";
import { radii } from "../tokens/radii";
import { shadows } from "../tokens/shadows";
import { spacing } from "../tokens/spacing";
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  textStyles,
} from "../tokens/typography";
import { headingRecipe } from "./headingRecipe";
import { semanticTokens } from "./semantic-tokens";

const config = defineConfig({
  theme: {
    breakpoints,
    tokens: {
      colors,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      radii,
      shadows,
      spacing,
      durations,
      easings,
    },
    semanticTokens,
    textStyles,
    recipes: {
      heading: headingRecipe,
    },
  },
});

/**
 * The Aeryo design system, built on top of Chakra UI v3's default system.
 * Pass this to `ChakraProvider` (see `src/components/ui/provider.tsx`)
 * instead of `defaultSystem`.
 */
export const system = createSystem(defaultConfig, config);
