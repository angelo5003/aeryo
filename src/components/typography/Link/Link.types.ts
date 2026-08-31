import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import type { LinkProps as NextLinkProps } from "next/link";

/**
 * All of Chakra's `Link` props (the `variant: "underline" | "plain"`
 * recipe, style/responsive props, `as`/`asChild`), minus `colorPalette` —
 * Link always uses AERYO's one brand color (`teal`), matching the
 * restraint principle in semantic-tokens.ts.
 *
 * `href` is optional and typed as Next's `Url` (string | `UrlObject`), not
 * a plain string — when set, Link renders `next/link` under the hood (see
 * Link.tsx) so callers get real client-side navigation/prefetching without
 * importing `next/link` themselves. `prefetch`/`replace`/`scroll`/
 * `onNavigate` are Next's own Link props, threaded through for the same
 * reason; leaving `href` unset renders a plain, inert anchor.
 */
export type LinkProps = Omit<ChakraLinkProps, "colorPalette" | "href"> &
  Pick<NextLinkProps, "prefetch" | "replace" | "scroll" | "onNavigate"> & {
    href?: NextLinkProps["href"];
  };
