import { AspectRatio, Image, Stack } from "@chakra-ui/react";
import * as React from "react";
import { LuMapPin } from "react-icons/lu";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { SpotRiderCount } from "@/components/data-display/SpotRiderCount";
import type { SpotHeaderProps } from "./SpotHeader.types";

/**
 * A spot page's header block — guide §26 "Spot" wireframe: banner
 * image/map, name/region, live rider count, and a primary action (e.g.
 * "I'm riding"). A page-level composition of `SpotRiderCount`/
 * `Heading`/`Text`, not built on `AeryoCard` — the wireframe shows a
 * full-bleed hero block, not a bordered summary card (that's what
 * `SpotCard` is for).
 */
export const SpotHeader = React.forwardRef<HTMLDivElement, SpotHeaderProps>(
  function SpotHeader(props, ref) {
    const {
      name,
      region,
      imageSrc,
      imageAlt,
      riding,
      planning,
      action,
      gap = "4",
      ...rest
    } = props;

    return (
      <Stack ref={ref} gap={gap} {...rest}>
        <AspectRatio ratio={16 / 9} borderRadius="l2" overflow="hidden">
          {imageSrc ? (
            <Image src={imageSrc} alt={imageAlt ?? name} objectFit="cover" />
          ) : (
            <Stack align="center" justify="center" bg="bg.muted">
              <LuMapPin size={32} />
            </Stack>
          )}
        </AspectRatio>
        <Stack gap="1">
          {region && (
            <Text variant="label" color="fg.muted">
              {region}
            </Text>
          )}
          <Heading variant="heading">{name}</Heading>
        </Stack>
        <SpotRiderCount riding={riding} planning={planning} />
        {action}
      </Stack>
    );
  },
);
