export type SocialAccountId = "google" | "facebook" | "apple";

export type SocialAccountProvider = {
  id: SocialAccountId;
  name: string;
};

export const SOCIAL_ACCOUNT_PROVIDERS: SocialAccountProvider[] = [
  {
    id: "google",
    name: "Google",
  },
  {
    id: "facebook",
    name: "Facebook",
  },
  {
    id: "apple",
    name: "Apple",
  },
];
