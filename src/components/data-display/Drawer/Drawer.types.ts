import type {
  DrawerBodyProps as ChakraDrawerBodyProps,
  DrawerCloseTriggerProps as ChakraDrawerCloseTriggerProps,
  DrawerContentProps as ChakraDrawerContentProps,
  DrawerFooterProps as ChakraDrawerFooterProps,
  DrawerHeaderProps as ChakraDrawerHeaderProps,
  DrawerRootProps as ChakraDrawerRootProps,
  DrawerTitleProps as ChakraDrawerTitleProps,
  DrawerTriggerProps as ChakraDrawerTriggerProps,
} from "@chakra-ui/react";
import type * as React from "react";

/**
 * Which edge the drawer slides in from. AERYO's own physical vocabulary
 * (`left`/`right`) in place of Chakra's logical `start`/`end` — this app
 * has no RTL support to make the logical distinction meaningful, and
 * "left"/"right" is what the spec itself asks for.
 */
export type DrawerPlacement = "left" | "right" | "bottom";

export interface DrawerProps extends Omit<
  ChakraDrawerRootProps,
  "placement" | "children"
> {
  /**
   * Which edge the drawer slides in from.
   * @default "right"
   */
  placement?: DrawerPlacement;
  /**
   * Typically a `DrawerTrigger` and a `DrawerContent`. Optional only to
   * keep this type Storybook/CSF-friendly (Chakra's own `Drawer.Root`
   * requires it) — a drawer that renders nothing does nothing.
   */
  children?: React.ReactNode;
}

export type DrawerTriggerProps = ChakraDrawerTriggerProps;

/**
 * The drawer panel itself. Wraps Chakra's `Drawer.Backdrop` +
 * `Drawer.Positioner` + `Drawer.Content` inside a `Portal` — consumers
 * compose one `DrawerContent`, not three separate parts (same pattern as
 * `src/components/ui/tooltip.tsx`'s existing `Portal` wrapping).
 */
export interface DrawerContentProps extends ChakraDrawerContentProps {
  /** @default true */
  portalled?: boolean;
  /**
   * Portal destination. Omit to portal to `document.body` (the usual
   * case). Pass one when the drawer must stay inside a specific DOM
   * subtree — e.g. `LightMode`/`DarkMode` color-mode scoping (see
   * `src/components/ui/color-mode.tsx`) only affects descendants of the
   * element it's applied to, and a `document.body` portal escapes that
   * subtree entirely; same reasoning as `Tooltip`'s existing `portalRef`.
   */
  portalRef?: React.RefObject<HTMLElement | null>;
}

export type DrawerHeaderProps = ChakraDrawerHeaderProps;
export type DrawerBodyProps = ChakraDrawerBodyProps;
export type DrawerFooterProps = ChakraDrawerFooterProps;
export type DrawerTitleProps = ChakraDrawerTitleProps;

export interface DrawerCloseTriggerProps extends Omit<
  ChakraDrawerCloseTriggerProps,
  "children"
> {
  /** Omit for a default "X" icon. */
  children?: React.ReactNode;
}
