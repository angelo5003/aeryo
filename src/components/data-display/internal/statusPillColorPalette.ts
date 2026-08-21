import type { ColorPalette } from "@chakra-ui/react";
import type { StatusPillVariant } from "../StatusPill/StatusPill.types";

/**
 * Maps each `StatusPill` variant to the Chakra colorPalette that renders
 * it — same mapping Button/IconButton use for their own
 * `primary`/`success`/`warning`/`danger` intents (see
 * `actions/internal/intentColorPalette.ts`), with `neutral` in place of
 * `secondary` (this component's own vocabulary, not Button's). Kept in
 * one place so the mapping — and any future one-time fix — lives
 * exactly once for this component family, same pattern as
 * `actions/internal`/`typography/internal`.
 */
export const STATUS_PILL_COLOR_PALETTE: Record<
  StatusPillVariant,
  ColorPalette
> = {
  neutral: "ink",
  primary: "teal",
  success: "success",
  warning: "caution",
  danger: "danger",
};
