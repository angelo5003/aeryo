import { Drawer as ChakraDrawer, Portal } from "@chakra-ui/react";
import * as React from "react";
import { LuX } from "react-icons/lu";
import type {
  DrawerBodyProps,
  DrawerCloseTriggerProps,
  DrawerContentProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPlacement,
  DrawerProps,
  DrawerTitleProps,
  DrawerTriggerProps,
} from "./Drawer.types";

const CHAKRA_PLACEMENT: Record<DrawerPlacement, "start" | "end" | "bottom"> = {
  left: "start",
  right: "end",
  bottom: "bottom",
};

/**
 * AERYO's drawer — a thin wrapper around Chakra UI's compound `Drawer`
 * (built on Ark UI's Dialog). Chakra is an implementation detail
 * consumers never import directly; every Chakra `Drawer.Root` field
 * (`open`, `defaultOpen`, `onOpenChange`, …) passes through untouched.
 * `placement` narrows Chakra's logical `start`/`end` to AERYO's own
 * `left`/`right` vocabulary (see `Drawer.types.ts`). No DOM ref — same as
 * Chakra's own `Drawer.Root`, which is a logical/context provider, not a
 * rendered element.
 */
export function Drawer(props: DrawerProps) {
  const { placement = "right", children = null, ...rest } = props;

  return (
    <ChakraDrawer.Root placement={CHAKRA_PLACEMENT[placement]} {...rest}>
      {children}
    </ChakraDrawer.Root>
  );
}

/** Opens the drawer when clicked/activated. */
export const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerTriggerProps
>(function DrawerTrigger(props, ref) {
  return <ChakraDrawer.Trigger ref={ref} {...props} />;
});

/**
 * The drawer panel. Wraps Chakra's `Drawer.Backdrop` + `Drawer.Positioner`
 * + `Drawer.Content` inside a `Portal` — compose one `DrawerContent`, not
 * three separate parts (same pattern as `src/components/ui/tooltip.tsx`'s
 * existing `Portal` wrapping). `DrawerBody` (below) scrolls on overflow,
 * so long content never breaks the drawer's own layout.
 */
export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(function DrawerContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDrawer.Backdrop />
      <ChakraDrawer.Positioner>
        <ChakraDrawer.Content ref={ref} {...rest} />
      </ChakraDrawer.Positioner>
    </Portal>
  );
});

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader(props, ref) {
    return <ChakraDrawer.Header ref={ref} {...props} />;
  },
);

/** Scrolls on overflow — see `DrawerContent`'s doc comment. */
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  function DrawerBody(props, ref) {
    return <ChakraDrawer.Body ref={ref} {...props} />;
  },
);

export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooter(props, ref) {
    return <ChakraDrawer.Footer ref={ref} {...props} />;
  },
);

export const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  DrawerTitleProps
>(function DrawerTitle(props, ref) {
  return <ChakraDrawer.Title ref={ref} {...props} />;
});

/**
 * Closes the drawer when clicked/activated. Renders a default "X" icon
 * (react-icons) when no `children` is given, with a default `aria-label`
 * — same required-accessible-name reasoning as `IconButtonProps["aria-label"]`,
 * since an icon-only close control has no other accessible name.
 */
export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerCloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  const { children, "aria-label": ariaLabel = "Close", ...rest } = props;

  return (
    <ChakraDrawer.CloseTrigger ref={ref} aria-label={ariaLabel} {...rest}>
      {children ?? <LuX />}
    </ChakraDrawer.CloseTrigger>
  );
});
