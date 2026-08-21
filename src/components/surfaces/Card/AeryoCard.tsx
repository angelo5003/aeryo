import { Card, Flex, LinkBox, LinkOverlay } from "@chakra-ui/react";
import * as React from "react";
import { AeryoCardMedia } from "./AeryoCardMedia";
import { AeryoCardProvider } from "./internal/AeryoCardContext";
import { LOCAL_VARIANT_STYLES } from "./internal/cardVariantStyles";
import type { AeryoCardProps, AeryoCardVariant } from "./AeryoCard.types";

/** The three variants Chakra's own Card recipe ships — everything else is supplied locally (`LOCAL_VARIANT_STYLES`). */
const CHAKRA_VARIANT: Partial<
  Record<AeryoCardVariant, "elevated" | "outline">
> = {
  elevated: "elevated",
  outlined: "outline",
};

/**
 * Pulls the first `AeryoCardMedia` child out of `children` for
 * `layout="horizontal"` (see `AeryoCard.types.ts`'s `AeryoCardLayout` doc
 * comment) — consumers keep authoring a flat child list in either layout;
 * only the root needs to know the split happened.
 */
function splitMediaChild(children: React.ReactNode): {
  media: React.ReactNode;
  rest: React.ReactNode[];
} {
  let media: React.ReactNode = null;
  const rest: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (
      !media &&
      React.isValidElement(child) &&
      child.type === AeryoCardMedia
    ) {
      media = child;
    } else {
      rest.push(child);
    }
  });

  return { media, rest };
}

/**
 * AERYO's card foundation — the compound component every product card
 * (SpotCard, ForecastCard, WeatherCard, …) composes from. A thin wrapper
 * around Chakra UI's `Card.Root`; Chakra is an implementation detail
 * consumers never import directly.
 *
 * Compose with `AeryoCardHeader`/`AeryoCardMedia`/`AeryoCardBody`/
 * `AeryoCardFooter` (and `AeryoCardMeta`/`AeryoCardBadges`/
 * `AeryoCardActions` inside those) in any order — `size`/`layout`/
 * `variant`/`disabled`/`loading` reach every subcomponent via context, so
 * they don't need to be repeated on each one.
 *
 * Pass `clickable` and/or `href` to make the *entire* card one accessible
 * click/navigation target, without wiring a handler on any element inside
 * it yourself: an invisible full-bleed control (a real `<button>` for
 * `clickable`, a real `<a>` for `href`) is layered over the card inside a
 * Chakra `LinkBox`, giving native keyboard nav, focus styles, and link-or-
 * button semantics for free. Nested `AeryoCardActions`/`AeryoCardBadges`
 * stay independently clickable (they set their own stacking order) — so a
 * Save button in the footer keeps working even though the whole card
 * navigates elsewhere on click. Because that control has no visible text
 * of its own, `aria-label` is required whenever `clickable`/`href` is set
 * (TypeScript enforces this — same requirement as `IconButtonProps`).
 */
export const AeryoCard = React.forwardRef<HTMLDivElement, AeryoCardProps>(
  function AeryoCard(props, ref) {
    const {
      variant = "default",
      size = "md",
      layout = "vertical",
      selected = false,
      disabled = false,
      loading = false,
      clickable = false,
      href,
      onClick,
      "aria-label": ariaLabel,
      children,
      ...rest
    } = props;

    const isInteractive = Boolean(clickable || href);
    const localStyle =
      variant === "default" || variant === "filled" || variant === "interactive"
        ? LOCAL_VARIANT_STYLES[variant]
        : undefined;

    const { media, rest: restChildren } = React.useMemo(
      () => splitMediaChild(children),
      [children],
    );

    const content =
      layout === "horizontal" && media ? (
        <>
          {media}
          <Flex direction="column" flex="1" minWidth="0">
            {restChildren}
          </Flex>
        </>
      ) : (
        children
      );

    const cardRoot = (
      <Card.Root
        ref={isInteractive ? undefined : ref}
        variant={CHAKRA_VARIANT[variant]}
        size={size}
        borderRadius="xl"
        overflow="hidden"
        flexDirection={layout === "horizontal" ? "row" : "column"}
        opacity={disabled ? 0.5 : undefined}
        aria-disabled={disabled || undefined}
        aria-selected={selected || undefined}
        outlineWidth={selected ? "2px" : undefined}
        outlineStyle={selected ? "solid" : undefined}
        outlineColor={selected ? "accent.solid" : undefined}
        outlineOffset={selected ? "2px" : undefined}
        {...localStyle}
        {...rest}
      >
        {content}
      </Card.Root>
    );

    return (
      <AeryoCardProvider value={{ size, layout, variant, disabled, loading }}>
        {isInteractive ? (
          <LinkBox ref={ref} borderRadius="xl">
            {cardRoot}
            <LinkOverlay
              as={href ? "a" : "button"}
              type={href ? undefined : "button"}
              href={disabled ? undefined : href}
              onClick={disabled ? undefined : onClick}
              aria-label={ariaLabel}
              aria-disabled={disabled || undefined}
              tabIndex={disabled ? -1 : undefined}
              position="absolute"
              inset="0"
              opacity="0"
              borderRadius="inherit"
            />
          </LinkBox>
        ) : (
          cardRoot
        )}
      </AeryoCardProvider>
    );
  },
);
