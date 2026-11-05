/**
 * Replaces `next/link` in the preview bundle only. Previews have no Next.js
 * router, so a plain anchor shows the same `Link` styling without one.
 */
import * as React from "react";

type NextLinkStandInProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const NextLinkStandIn = React.forwardRef<
  HTMLAnchorElement,
  NextLinkStandInProps
>((anchorProps, anchorRef) => <a ref={anchorRef} {...anchorProps} />);

NextLinkStandIn.displayName = "NextLinkStandIn";

export default NextLinkStandIn;
