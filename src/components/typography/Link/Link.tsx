import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import type { LinkProps } from "./Link.types";

/**
 * AERYO's link primitive — a thin wrapper around Chakra UI's `Link`.
 * Always uses AERYO's one brand color (`colorPalette="teal"`, not
 * configurable — matches the restraint principle in semantic-tokens.ts).
 * Chakra's own recipe already covers default (`colorPalette.fg`) and
 * hover (underline) styling; `_active` and `_visited` are added here
 * using existing semantic tokens (`accent.solid`, `fg.muted`) since
 * Chakra's link recipe doesn't define either.
 *
 * When `href` is set, this renders `next/link` under the hood via
 * Chakra's `asChild` — Link is the styling layer, `next/link` is the real
 * navigation layer, composed here so callers never import `next/link`
 * themselves and can't end up with a styled-but-not-actually-routed
 * anchor. With no `href` (e.g. a link that's intentionally not wired to a
 * destination yet), it renders a plain, inert anchor instead.
 *
 * Every other Chakra `LinkProps` field (the `variant: "underline" |
 * "plain"` recipe, style props, responsive props, `as`, `asChild`, `ref`,
 * …) passes through untouched.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    { href, prefetch, replace, scroll, onNavigate, children, ...rest },
    ref,
  ) {
    return (
      <ChakraLink
        ref={ref}
        asChild={href !== undefined}
        colorPalette="teal"
        _active={{ color: "accent.solid" }}
        _visited={{ color: "fg.muted" }}
        {...rest}
      >
        {href !== undefined ? (
          <NextLink
            href={href}
            prefetch={prefetch}
            replace={replace}
            scroll={scroll}
            onNavigate={onNavigate}
          >
            {children}
          </NextLink>
        ) : (
          children
        )}
      </ChakraLink>
    );
  },
);
