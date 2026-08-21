import { AspectRatio, Skeleton } from "@chakra-ui/react";
import * as React from "react";
import { useAeryoCardContext } from "./internal/AeryoCardContext";
import { ASPECT_RATIOS } from "./internal/aspectRatios";
import type { AeryoCardMediaProps } from "./AeryoCard.types";

/**
 * A card's media slot — an image, a video, or custom content, cropped to
 * one of four named aspect ratios via Chakra's `AspectRatio`. Also
 * establishes `position: relative`, so `AeryoCardBadges`/`AeryoCardActions`
 * composed alongside it can absolutely position themselves as an overlay
 * (e.g. a "Featured" badge pinned top-left, a Save icon button top-right).
 *
 * While the card is `loading` (read from `AeryoCard`'s context), renders a
 * `Skeleton` at the same `aspectRatio` instead of real content — so the
 * loading card's footprint matches the eventual real one.
 */
export const AeryoCardMedia = React.forwardRef<
  HTMLDivElement,
  AeryoCardMediaProps
>(function AeryoCardMedia(props, ref) {
  const { aspectRatio = "landscape", as, src, alt, children, ...rest } = props;
  const { loading } = useAeryoCardContext();
  const ratio = ASPECT_RATIOS[aspectRatio];

  return (
    <AspectRatio ref={ref} ratio={ratio} position="relative" {...rest}>
      {loading ? (
        <Skeleton borderRadius="inherit" />
      ) : as === "img" ? (
        // eslint-disable-next-line @next/next/no-img-element -- media source is caller-supplied and may be non-Next-optimizable (video posters, remote CDNs); a thin card primitive shouldn't force next/image's loader config on every consumer.
        <img src={src} alt={alt ?? ""} style={{ objectFit: "cover" }} />
      ) : as === "video" ? (
        <video src={src} style={{ objectFit: "cover" }} />
      ) : (
        children
      )}
    </AspectRatio>
  );
});
