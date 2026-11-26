import type { Route } from "next";
import type { IconType } from "react-icons";
import {
  LuBackpack,
  LuBell,
  LuCompass,
  LuGauge,
  LuHouse,
  LuSlidersHorizontal,
  LuSunMedium,
  LuUser,
  LuUsers,
  LuWind,
} from "react-icons/lu";
import type { SettingsGroupKey } from "./config";

export type UserRole = "rider"; // what an account can be, not what a route can be

// Who may open this URL. "public" = no account needed.
export type RouteAccess = UserRole | "public";

export interface AppRoute {
  href: Route;
  label: string;
  roles: readonly [RouteAccess, ...RouteAccess[]];
  tabBarIcon?: IconType;
  parentHref?: Route; // if the route is a child of another route, this is the parent href. Tabs or pages like home don't need a parent href. that is why it is optional.
  isHiddenInSettings?: boolean;
  settingsCardIcon?: IconType;
  groupKey?: SettingsGroupKey;
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
    parentHref: "/profile",
  },
  account: {
    href: "/account",
    label: "Account",
    roles: ["rider"],
    parentHref: "/settings",
    isHiddenInSettings: true,
  },
  riderPreferences: {
    href: "/riding-preferences",
    label: "Riding preferences",
    roles: ["rider"],
    parentHref: "/settings",
    settingsCardIcon: LuSlidersHorizontal,
    groupKey: "riding",
  },
  myGear: {
    href: "/my-gear",
    label: "My Gear",
    roles: ["rider"],
    parentHref: "/settings",
    settingsCardIcon: LuBackpack,
    groupKey: "riding",
  },
  notifications: {
    href: "/notifications",
    label: "Notifications",
    roles: ["rider"],
    parentHref: "/settings",
    settingsCardIcon: LuBell,
    groupKey: "preferences",
  },
  onlineStatus: {
    href: "/online-status",
    label: "Online Status",
    roles: ["rider"],
    parentHref: "/settings",
    settingsCardIcon: LuUsers,
    groupKey: "preferences",
  },
  windspeed: {
    href: "/windspeed",
    label: "Windspeed",
    roles: ["rider"],
    parentHref: "/settings",
    settingsCardIcon: LuWind,
    groupKey: "preferences",
  },
  appearance: {
    href: "/appearance",
    label: "Appearance",
    roles: ["rider"],
    parentHref: "/settings",
    settingsCardIcon: LuSunMedium,
    groupKey: "preferences",
  },
} as const satisfies Record<string, AppRoute>;

// by adding a type to the allRoutes variable, TS sees every item as a AppRoute object.
const allRoutes: readonly AppRoute[] = Object.values(routes);

export const getRouteByHref = (href: string): AppRoute | undefined => {
  return allRoutes.find((route) => route.href === href);
};

export const getRoutesForAccess = (access: RouteAccess): AppRoute[] => {
  return allRoutes.filter((route) => route.roles.includes(access));
};

export const getSettingsRoutes = (): AppRoute[] =>
  getRoutesForAccess("rider").filter(
    (route) => route.parentHref === "/settings" && !route.isHiddenInSettings,
  );

export const getRiderRoutes = (): AppRoute[] => getRoutesForAccess("rider");

export const getPublicRoutes = (): AppRoute[] => getRoutesForAccess("public");
