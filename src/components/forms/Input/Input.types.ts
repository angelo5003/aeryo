import type { InputProps as ChakraInputProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Input` props (the `variant: "outline" | "subtle" |
 * "flushed"` recipe, `size`, style/responsive props, `as`/`asChild`).
 * `Input` is a pure pass-through — its recipe already resolves entirely
 * from AERYO's own tokens (`border`, `bg.muted`, `border.error` via
 * semantic-tokens.ts), so there's nothing AERYO-specific to add. Compose
 * it inside `Field` for label/helper/error text.
 */
export type InputProps = ChakraInputProps;
