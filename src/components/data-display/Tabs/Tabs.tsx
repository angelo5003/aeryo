import { Tabs as ChakraTabs } from "@chakra-ui/react";
import * as React from "react";
import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "./Tabs.types";

/**
 * AERYO's tabs — a thin wrapper around Chakra UI's compound `Tabs`
 * (`Tabs.Root`/`Tabs.List`/`Tabs.Trigger`/`Tabs.Content`). Chakra is an
 * implementation detail consumers never import directly; every Chakra
 * `TabsRootProps` field (`defaultValue`, `value`, `onValueChange`, style
 * props, responsive props, `as`, `ref`, …) passes through untouched.
 * Horizontal only — see `Tabs.types.ts`.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(props, ref) {
    const { size = "md", variant = "line", ...rest } = props;
    return (
      <ChakraTabs.Root ref={ref} size={size} variant={variant} {...rest} />
    );
  },
);

/**
 * The tab strip. `scrollable` makes it scroll horizontally (hidden
 * scrollbar, triggers keep their natural width) instead of shrinking
 * every trigger to fit — reach for it with a long or unbounded tab set.
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(props, ref) {
    const { scrollable = false, ...rest } = props;

    return (
      <ChakraTabs.List
        ref={ref}
        overflowX={scrollable ? "auto" : undefined}
        css={
          scrollable
            ? {
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                "& > *": { flexShrink: 0 },
              }
            : undefined
        }
        {...rest}
      />
    );
  },
);

/**
 * A single tab trigger. `icon` renders before the label (`children`).
 *
 * Explicit `paddingInline`/`paddingBlock` below: Chakra's own Tabs slot
 * recipe *should* supply this via its `size` variant (`px`/`py` on the
 * `trigger` slot), and does apply the rest of that same variant (e.g.
 * `textStyle`) correctly — but reproducibly not `px`/`py` specifically,
 * confirmed against raw, unwrapped `Tabs.Trigger` too (not something
 * introduced by this wrapper, and not a shared file this project's
 * theme/recipe config is allowed to touch). Overriding with the
 * equivalent long-form token values here is a safety net, not a
 * workaround for something this component did — every other Chakra
 * `Tabs.Trigger` field still passes through untouched, and a consumer
 * can still override these two directly.
 */
export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(function TabsTrigger(props, ref) {
  const { icon, children, ...rest } = props;

  return (
    <ChakraTabs.Trigger ref={ref} paddingInline="4" paddingBlock="2" {...rest}>
      {icon}
      {children}
    </ChakraTabs.Trigger>
  );
});

/** A tab's panel content, shown when its `value` matches the active tab. */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent(props, ref) {
    return <ChakraTabs.Content ref={ref} {...props} />;
  },
);
