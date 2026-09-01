import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
import * as React from "react";
import { LuX } from "react-icons/lu";
import type {
  DialogBodyProps,
  DialogCloseTriggerProps,
  DialogContentProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./Dialog.types";

/**
 * AERYO's dialog — a thin wrapper around Chakra UI's compound `Dialog`
 * (built on Ark UI's Dialog, the same primitive `Drawer` wraps). Chakra is
 * an implementation detail consumers never import directly; every Chakra
 * `Dialog.Root` field (`open`, `defaultOpen`, `onOpenChange`, `size`,
 * `placement`, …) passes through untouched — unlike `Drawer`, a dialog has
 * no edge to slide from, so there's no physical-vocabulary prop to narrow.
 */
export function Dialog(props: DialogProps) {
  const { children = null, ...rest } = props;

  return <ChakraDialog.Root {...rest}>{children}</ChakraDialog.Root>;
}

/** Opens the dialog when clicked/activated. */
export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(function DialogTrigger(props, ref) {
  return <ChakraDialog.Trigger ref={ref} {...props} />;
});

/**
 * The dialog panel. Wraps Chakra's `Dialog.Backdrop` + `Dialog.Positioner`
 * + `Dialog.Content` inside a `Portal` — compose one `DialogContent`, not
 * three separate parts (same pattern as `src/components/ui/tooltip.tsx`'s
 * existing `Portal` wrapping). `DialogBody` (below) scrolls on overflow,
 * so long content never breaks the dialog's own layout.
 */
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDialog.Backdrop />
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest} />
      </ChakraDialog.Positioner>
    </Portal>
  );
});

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(props, ref) {
    return <ChakraDialog.Header ref={ref} {...props} />;
  },
);

/** Scrolls on overflow — see `DialogContent`'s doc comment. */
export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  function DialogBody(props, ref) {
    return <ChakraDialog.Body ref={ref} {...props} />;
  },
);

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter(props, ref) {
    return <ChakraDialog.Footer ref={ref} {...props} />;
  },
);

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(function DialogTitle(props, ref) {
  return <ChakraDialog.Title ref={ref} {...props} />;
});

/**
 * Closes the dialog when clicked/activated. Renders a default "X" icon
 * (react-icons) when no `children` is given, with a default `aria-label`
 * — same required-accessible-name reasoning as `IconButtonProps["aria-label"]`,
 * since an icon-only close control has no other accessible name.
 */
export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogCloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  const { children, "aria-label": ariaLabel = "Close", ...rest } = props;

  return (
    <ChakraDialog.CloseTrigger ref={ref} aria-label={ariaLabel} {...rest}>
      {children ?? <LuX />}
    </ChakraDialog.CloseTrigger>
  );
});
