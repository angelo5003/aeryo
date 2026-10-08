import type { Route } from "next";
import type { IconType } from "react-icons";
import { LuCompass, LuGauge, LuHouse, LuUser, LuUsers } from "react-icons/lu";

export type UserRole = "rider"; // what an account can be, not what a route can be

// Who may open this URL. "public" = no account needed.
export type RouteAccess = UserRole | "public";

export interface AppRoute {
  href: Route;
  label: string;
  roles: readonly [RouteAccess, ...RouteAccess[]];
  tabBarIcon?: IconType;
}

// satisfies checks if every route has the shape of the AppRoute. Each href must be a real path.
// as const keeps the exact values. That is why for example routes.home.href is the type of /home and not just string.
export const routes = {
  start: {
    href: "/",
    label: "Start",
    roles: ["rider", "public"],
  },
  login: {
    href: "/login",
    label: "Login",
    roles: ["public"],
  },
  signup: {
    href: "/signup",
    label: "Create Account",
    roles: ["public"],
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

export const getRoutesForAccess = (access: RouteAccess): AppRoute[] => {
  return allRoutes.filter((route) => route.roles.includes(access));
};

export const getRiderRoutes = (): AppRoute[] => getRoutesForAccess("rider");

export const getPublicRoutes = (): AppRoute[] => getRoutesForAccess("public");
