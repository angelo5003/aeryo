import type { StatusPillProps } from "@/components/data-display/StatusPill";

/**
 * A rider's presence state at a spot — the kitesurf-app domain vocabulary
 * from `docs/guides/kitesurf-app.md` §32 ("Rider" semantic states),
 * narrowed to the three V1 needs (`private` is a profile-visibility
 * setting, not a presence value, so it isn't one of these).
 */
export type RiderPresenceStatus = "riding" | "planning" | "offline";

export interface RiderPresenceProps extends Omit<
  StatusPillProps,
  "variant" | "children"
> {
  /** The rider's current presence state — selects both the label and the token-backed color. */
  status: RiderPresenceStatus;
  /**
   * Time text shown for `planning`, e.g. `"16:00"` — rendered as
   * "Planning 16:00" per the guide's §26 wireframe. Ignored for
   * `riding`/`offline`.
   */
  time?: string;
}
