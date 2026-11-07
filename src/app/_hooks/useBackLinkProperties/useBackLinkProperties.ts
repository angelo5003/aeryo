"use client";

import { usePathname } from "next/navigation";
import type { BackLinkProps } from "@/app/_components/TopNavBar/BackLink";
import { getRouteByHref } from "@/app/_routes/routes";

// The back arrow only shows when the page has a `parentHref` in routes.ts.
export const useBackLinkProperties = (): BackLinkProps | null => {
  const pathname = usePathname();
  const routeOfCurrentPage = getRouteByHref(pathname);
  const routeToGoBackTo = routeOfCurrentPage?.parentHref
    ? getRouteByHref(routeOfCurrentPage.parentHref)
    : null;

  // This page has no parent page, so there is nothing to go back to: no back arrow.
  if (!routeToGoBackTo) {
    return null;
  }

  // The back arrow goes to the parent page and shows the parent page's name.
  return {
    label: routeToGoBackTo.label,
    href: routeToGoBackTo.href,
  };
};
