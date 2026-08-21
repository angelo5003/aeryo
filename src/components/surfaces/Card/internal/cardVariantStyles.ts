import type { SystemStyleObject } from "@chakra-ui/react";

/**
 * Style props for the three `AeryoCardVariant`s Chakra's own Card recipe
 * doesn't ship (`elevated`/`outline`/`subtle` are Chakra's own —
 * `AeryoCard.tsx` passes those straight through as `variant`). Kept local
 * to this component rather than added to the shared theme recipe (design
 * spec's "Variant styling" decision) — every value below traces back to
 * an existing token/semantic token, nothing is a raw hex/px. Spread onto
 * `Card.Root` *after* Chakra's own `variant` prop, so these values take
 * precedence for the variants that need them.
 */
export const LOCAL_VARIANT_STYLES: Record<
  "default" | "filled" | "interactive",
  SystemStyleObject
> = {
  default: {
    bg: "bg.panel",
    borderWidth: "1px",
    borderColor: "border.muted",
  },
  filled: {
    bg: "bg.muted",
    borderWidth: "1px",
    borderColor: "transparent",
  },
  interactive: {
    bg: "bg.panel",
    borderWidth: "1px",
    borderColor: "border.muted",
    cursor: "pointer",
    transitionProperty: "border-color, box-shadow, transform",
    transitionDuration: "fast",
    transitionTimingFunction: "easeOut",
    _hover: {
      borderColor: "border",
      boxShadow: "sm",
    },
    _active: {
      transform: "scale(0.99)",
    },
  },
};
