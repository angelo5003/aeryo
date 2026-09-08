import type { IconType } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { SiApple, SiFacebook } from "react-icons/si";

export type SocialAccountId = "google" | "facebook" | "apple";

export type SocialAccountProvider = {
  id: SocialAccountId;
  name: string;
  icon: IconType;
  iconColor?: string;
};

export const SOCIAL_ACCOUNT_PROVIDERS: SocialAccountProvider[] = [
  {
    id: "apple",
    name: "Apple",
    icon: SiApple,
    iconColor: "fg",
  },
  {
    id: "google",
    name: "Google",
    icon: FcGoogle,
  },

  {
    id: "facebook",
    name: "Facebook",
    icon: SiFacebook,
    // Meta brand blue — fixed, not mode-aware (facebook.com/brandresources).
    // Not an Aeryo token: this is a third-party mark, not our palette.
    // eslint-disable-next-line no-restricted-syntax
    iconColor: "#1877F2",
  },
];
