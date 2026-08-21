import { Avatar as ChakraAvatar, Box } from "@chakra-ui/react";
import * as React from "react";
import { LuCheck } from "react-icons/lu";
import type { AvatarProps, AvatarSize } from "./Avatar.types";

/** Status-dot/verified-badge diameter per size, and the ring width separating them from the avatar underneath — all Chakra spacing tokens, scaled with the avatar itself. */
const INDICATOR_SIZE: Record<AvatarSize, string> = {
  xs: "2",
  sm: "2",
  md: "2.5",
  lg: "3",
  xl: "3.5",
};

/**
 * AERYO's avatar — a thin wrapper around Chakra UI's compound `Avatar`
 * (`Avatar.Root`/`Avatar.Image`/`Avatar.Fallback`). Chakra is an
 * implementation detail consumers never import directly: pass `src` for
 * a photo, `name` for initials, or neither for a generic icon — Chakra's
 * own Image → Fallback cascade handles which one actually renders
 * (including a failed image load falling through to initials/icon).
 * Narrows `size` to AERYO's supported subset.
 *
 * `status`/`verified` are AERYO's own additions (Chakra's Avatar has
 * neither): `status` renders a small presence dot bottom-right;
 * `verified` renders a small checkmark badge top-right. Both scale with
 * `size` and are purely presentational — no online-presence polling or
 * verification logic lives here.
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { src, name, icon, size = "md", status, verified, ...rest } = props;
    const indicatorSize = INDICATOR_SIZE[size];

    return (
      <ChakraAvatar.Root ref={ref} size={size} {...rest}>
        {src && <ChakraAvatar.Image src={src} alt={name ?? ""} />}
        <ChakraAvatar.Fallback name={name}>
          {!name && icon}
        </ChakraAvatar.Fallback>
        {status && (
          <Box
            position="absolute"
            bottom="0"
            right="0"
            boxSize={indicatorSize}
            borderRadius="full"
            bg={status === "online" ? "success.solid" : "ink.emphasized"}
            borderWidth="2px"
            borderColor="bg"
          />
        )}
        {verified && (
          <Box
            position="absolute"
            top="0"
            right="0"
            boxSize={indicatorSize}
            borderRadius="full"
            bg="accent.solid"
            color="accent.contrast"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderWidth="2px"
            borderColor="bg"
          >
            <LuCheck style={{ width: "70%", height: "70%" }} />
          </Box>
        )}
      </ChakraAvatar.Root>
    );
  },
);
