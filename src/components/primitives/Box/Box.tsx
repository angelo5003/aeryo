import { Box as ChakraBox } from "@chakra-ui/react";
import * as React from "react";
import type { BoxProps } from "./Box.types";

/**
 * AERYO's most abstract layout primitive — a thin wrapper around Chakra
 * UI's `Box`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `BoxProps` field (style props, responsive props,
 * `as`, `asChild`, `ref`, …) passes through untouched.
 *
 * Passing `iconLeft` and/or `iconRight` turns the box into a centred row
 * around `children`. Without icons it renders exactly like Chakra's `Box`.
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { iconLeft, iconRight, children, ...chakraBoxProps } = props;

  // `children` must reach Chakra untouched here: `asChild` picks the first
  // element it finds, so wrapping it in a list would break it.
  if (!iconLeft && !iconRight) {
    return (
      <ChakraBox ref={ref} {...chakraBoxProps}>
        {children}
      </ChakraBox>
    );
  }

  return (
    <ChakraBox
      ref={ref}
      display="flex"
      alignItems="center"
      gap="2"
      // `_icon` per node_modules/@chakra-ui/react/dist/esm/preset-base.js
      _icon={{ flexShrink: 0 }}
      {...chakraBoxProps}
    >
      {iconLeft}
      {children}
      {iconRight}
    </ChakraBox>
  );
});

Box.displayName = "Box";
