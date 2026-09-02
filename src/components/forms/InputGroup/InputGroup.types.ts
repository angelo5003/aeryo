import type { InputGroupProps as ChakraInputGroupProps } from "@chakra-ui/react";

/**
 * All of Chakra's `InputGroup` props (`startElement`/`endElement` for
 * icons or icon buttons, `startAddon`/`endAddon` for attached segments,
 * `startOffset`/`endOffset` to tune the input's padding around them).
 * Pure pass-through, same reasoning as `InputProps` — nothing AERYO-specific
 * to add. `children` must be a single `Input` (Chakra clones it to inject
 * the padding that makes room for `startElement`/`endElement`).
 */
export type InputGroupProps = ChakraInputGroupProps;
