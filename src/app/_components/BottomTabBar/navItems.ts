import type { IconType } from "react-icons";
import { LuCompass, LuGauge, LuHouse, LuUser, LuUsers } from "react-icons/lu";

type NavItemId = "home" | "explore" | "sessions" | "community" | "profile";

interface NavItem {
  id: NavItemId;
  label: string;
  icon: IconType;
  href: `/${NavItemId}`;
}

export const navItems: readonly NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: LuHouse,
    href: "/home",
  },
  {
    id: "explore",
    label: "Explore",
    icon: LuCompass,
    href: "/explore",
  },
  {
    id: "sessions",
    label: "Sessions",
    icon: LuGauge,
    href: "/sessions",
  },
  {
    id: "community",
    label: "Community",
    icon: LuUsers,
    href: "/community",
  },
  {
    id: "profile",
    label: "Profile",
    icon: LuUser,
    href: "/profile",
  },
];
