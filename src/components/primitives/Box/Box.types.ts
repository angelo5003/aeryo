import type { BoxProps as ChakraBoxProps } from "@chakra-ui/react";
import type * as React from "react";

type BoxIconProps =
  | {
      asChild?: false;
      /**
       * Icon rendered before `children`. Pass an already-sized icon element
       * (e.g. from `react-icons`). When an icon is given, `Box` lays its
       * content out in a centred row with a small gap; your own `display`,
       * `alignItems` and `gap` props win. Cannot be combined with `asChild`.
       */
      iconLeft?: React.ReactElement;
      /**
       * Icon rendered after `children`. See `iconLeft`.
       */
      iconRight?: React.ReactElement;
    }
  | {
      // `asChild` styles the single child element, so there is no room for icons.
      asChild: boolean;
      iconLeft?: never;
      iconRight?: never;
    };

/**
 * All of Chakra's `Box` props — style props (which resolve to AERYO's
 * tokens automatically, since they read from the theme in
 * src/design-system/theme), responsive props, and polymorphic `as`/
 * `asChild` — plus AERYO's optional `iconLeft`/`iconRight`.
 */
export type BoxProps = ChakraBoxProps & BoxIconProps;
