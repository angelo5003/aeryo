import type { IconType } from "react-icons";
import { type AppRoute, getRiderRoutes } from "@/app/_routes/routes";

// A route that is sure to have a tab bar icon.
type TabBarRoute = AppRoute & { tabBarIcon: IconType };

// The tabs in the bottom bar: every rider page that has a tab bar icon,
// in the same order as in routes.ts. Pages without an icon (Start, Settings)
// are left out. The "route is TabBarRoute" part tells TypeScript that every
// route that passes this check has an icon, so BottomBar can use it directly.
export const navItems: readonly TabBarRoute[] = getRiderRoutes().filter(
  (route): route is TabBarRoute => route.tabBarIcon !== undefined,
);
