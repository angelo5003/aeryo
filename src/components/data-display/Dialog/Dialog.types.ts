import type {
  DialogBodyProps as ChakraDialogBodyProps,
  DialogCloseTriggerProps as ChakraDialogCloseTriggerProps,
  DialogContentProps as ChakraDialogContentProps,
  DialogFooterProps as ChakraDialogFooterProps,
  DialogHeaderProps as ChakraDialogHeaderProps,
  DialogRootProps as ChakraDialogRootProps,
  DialogTitleProps as ChakraDialogTitleProps,
  DialogTriggerProps as ChakraDialogTriggerProps,
} from "@chakra-ui/react";
import type * as React from "react";

export interface DialogProps extends Omit<ChakraDialogRootProps, "children"> {
  /**
   * Typically a `DialogTrigger` and a `DialogContent`. Optional only to
   * keep this type Storybook/CSF-friendly (Chakra's own `Dialog.Root`
   * requires it) — a dialog that renders nothing does nothing.
   */
  children?: React.ReactNode;
}

export type DialogTriggerProps = ChakraDialogTriggerProps;

/**
 * The dialog panel itself. Wraps Chakra's `Dialog.Backdrop` +
 * `Dialog.Positioner` + `Dialog.Content` inside a `Portal` — consumers
 * compose one `DialogContent`, not three separate parts (same pattern as
 * `src/components/ui/tooltip.tsx`'s existing `Portal` wrapping, and
 * `Drawer`'s `DrawerContent`).
 */
export interface DialogContentProps extends ChakraDialogContentProps {
  /** @default true */
  portalled?: boolean;
  /**
   * Portal destination. Omit to portal to `document.body` (the usual
   * case). Pass one when the dialog must stay inside a specific DOM
   * subtree — e.g. `LightMode`/`DarkMode` color-mode scoping (see
   * `src/components/ui/color-mode.tsx`) only affects descendants of the
   * element it's applied to, and a `document.body` portal escapes that
   * subtree entirely; same reasoning as `Drawer`'s existing `portalRef`.
   */
  portalRef?: React.RefObject<HTMLElement | null>;
}

export type DialogHeaderProps = ChakraDialogHeaderProps;
export type DialogBodyProps = ChakraDialogBodyProps;
export type DialogFooterProps = ChakraDialogFooterProps;
export type DialogTitleProps = ChakraDialogTitleProps;

export interface DialogCloseTriggerProps extends Omit<
  ChakraDialogCloseTriggerProps,
  "children"
> {
  /** Omit for a default "X" icon. */
  children?: React.ReactNode;
}
