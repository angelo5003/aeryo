import type { Route } from "next";
import type { IconType } from "react-icons";
import { LuCompass, LuGauge, LuHouse, LuUser, LuUsers } from "react-icons/lu";

export type Role = "rider";

export interface AppRoute {
  href: Route;
  label: string;
  // No roles = open to everyone, signed in or not (start, login, signup).
  roles?: readonly Role[];
  tabBarIcon?: IconType;
}

// satisfies checks if every route has the shape of the AppRoute. Each href must be a real path.
// as const keeps the exact values. That is why for example routes.home.href is the type of /home and not just string.
export const routes = {
  start: {
    href: "/",
    label: "Start",
  },
  login: {
    href: "/login",
    label: "Login",
  },
  signup: {
    href: "/signup",
    label: "Create Account",
  },

  home: {
    href: "/home",
    label: "Home",
    roles: ["rider"],
    tabBarIcon: LuHouse,
  },
  explore: {
    href: "/explore",
    label: "Explore",
    roles: ["rider"],
    tabBarIcon: LuCompass,
  },
  sessions: {
    href: "/sessions",
    label: "Sessions",
    roles: ["rider"],
    tabBarIcon: LuGauge,
  },
  community: {
    href: "/community",
    label: "Community",
    roles: ["rider"],
    tabBarIcon: LuUsers,
  },
  profile: {
    href: "/profile",
    label: "Profile",
    roles: ["rider"],
    tabBarIcon: LuUser,
  },
  settings: {
    href: "/settings",
    label: "Settings",
    roles: ["rider"],
  },
} as const satisfies Record<string, AppRoute>;

// by adding a type to the allRoutes variable, TS sees every item as a AppRoute object.
const allRoutes: readonly AppRoute[] = Object.values(routes);

export const getRoutesForRole = (role: Role): AppRoute[] => {
  return allRoutes.filter((route) => route.roles?.includes(role) === true);
};

export const getRiderRoutes = (): AppRoute[] => getRoutesForRole("rider");
