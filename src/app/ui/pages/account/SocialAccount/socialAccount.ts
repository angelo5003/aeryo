import type { IconType } from "react-icons";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export type SocialAccountId = "google" | "facebook" | "apple";

export type SocialAccountProvider = {
  id: SocialAccountId;
  name: string;
  icon: IconType;
};

export const SOCIAL_ACCOUNT_PROVIDERS: SocialAccountProvider[] = [
  {
    id: "google",
    name: "Google",
    icon: FcGoogle,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: FaFacebook,
  },
  {
    id: "apple",
    name: "Apple",
    icon: FaApple,
  },
];
