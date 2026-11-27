import { Icon as ChakraIcon } from "@chakra-ui/react";
import * as React from "react";
import type { IconProps } from "./Icon.types";

/**
 * AERYO's icon primitive — a thin wrapper around Chakra UI's `Icon`. Chakra
 * is an implementation detail consumers never import directly; every Chakra
 * `IconProps` field (`as`, `asChild`, `size`, style props, `ref`, …) passes
 * through untouched.
 *
 * An icon with no label is decoration, so it is hidden from screen readers
 * (VoiceOver, TalkBack). Giving it `aria-label` or `aria-labelledby` makes it
 * a labelled image instead. Props passed by the caller win over both defaults.
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  function Icon(props, ref) {
    const hasAccessibleName =
      props["aria-label"] !== undefined ||
      props["aria-labelledby"] !== undefined;

    return (
      <ChakraIcon
        ref={ref}
        aria-hidden={hasAccessibleName ? undefined : true}
        role={hasAccessibleName ? "img" : undefined}
        {...props}
      />
    );
  },
);
