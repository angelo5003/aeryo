import type { IconProps as ChakraIconProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Icon` props — `as` (pass a `react-icons` component),
 * `asChild` (style an inline `svg`), style props that resolve to AERYO's
 * tokens, `size` (`inherit`, `xs` … `2xl`) and `ref`.
 *
 * AERYO adds one behaviour, not a prop: an icon is hidden from screen readers
 * unless `aria-label` or `aria-labelledby` is given. Pass `aria-hidden`
 * yourself to override it.
 */
export type IconProps = ChakraIconProps;
