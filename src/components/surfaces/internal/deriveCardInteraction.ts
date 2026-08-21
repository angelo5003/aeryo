import type * as React from "react";
import type { AeryoCardInteractionProps } from "@/components/surfaces/Card";

/**
 * Shared by SpotCard/ForecastCard/WeatherCard (and any future curated card):
 * builds `AeryoCard`'s discriminated `href`/`clickable`/`aria-label` union
 * from a curated component's own plain `href?`/`clickable?` props, deriving
 * the required accessible name from a field the curated component already
 * has (its title/date/etc.) — consumers of SpotCard/ForecastCard/
 * WeatherCard never have to think about `aria-label` themselves, unlike
 * `AeryoCard` itself.
 */
export function deriveCardInteraction(params: {
  href?: string;
  clickable?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  ariaLabel: string;
}): AeryoCardInteractionProps {
  const { href, clickable, onClick, ariaLabel } = params;

  if (href) {
    return { href, clickable, onClick, "aria-label": ariaLabel };
  }
  if (clickable) {
    return { clickable: true, onClick, "aria-label": ariaLabel };
  }
  return { clickable: false };
}
