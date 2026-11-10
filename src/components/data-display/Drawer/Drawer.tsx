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

const DrawerPlacementContext = React.createContext<DrawerPlacement>("right");

/**
 * Bottom-sheet look, applied only when `placement="bottom"`: rounded top
 * corners (`radii.3xl`, the design's sheet radius), a grab handle drawn
 * with `::before`, and bottom padding that clears the iOS home indicator
 * via `--safe-area-inset-bottom` (set in src/app/globals.css).
 */
const BOTTOM_SHEET_STYLES = {
  borderTopLeftRadius: "3xl",
  borderTopRightRadius: "3xl",
  paddingBottom: "var(--safe-area-inset-bottom, 0px)",
  _before: {
    content: '""',
    alignSelf: "center",
    flexShrink: 0,
    width: "9",
    height: "1",
    marginTop: "2",
    borderRadius: "full",
    // fg.subtle is an Aeryo token (4.7-5.0:1 on the sheet background). Chakra's stock
    // border.emphasized was a gray (#3F3F46) outside the palette.
    bg: "fg.subtle",
  },
} as const;

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
    <DrawerPlacementContext.Provider value={placement}>
      <ChakraDrawer.Root placement={CHAKRA_PLACEMENT[placement]} {...rest}>
        {children}
      </ChakraDrawer.Root>
    </DrawerPlacementContext.Provider>
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
  const placement = React.useContext(DrawerPlacementContext);

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDrawer.Backdrop />
      <ChakraDrawer.Positioner>
        <ChakraDrawer.Content
          ref={ref}
          {...(placement === "bottom" ? BOTTOM_SHEET_STYLES : {})}
          {...rest}
        />
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
