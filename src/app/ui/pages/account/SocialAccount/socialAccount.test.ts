import { SOCIAL_ACCOUNT_PROVIDERS } from "./socialAccount";

describe("SOCIAL_ACCOUNT_PROVIDERS", () => {
  it("lists Apple, Google, and Facebook exactly once each", () => {
    const ids = SOCIAL_ACCOUNT_PROVIDERS.map((provider) => provider.id);

    expect(ids).toEqual(["apple", "google", "facebook"]);
  });

  it("gives every provider an id, display name, and icon", () => {
    for (const provider of SOCIAL_ACCOUNT_PROVIDERS) {
      expect(provider.id).toBeTruthy();
      expect(provider.name).toBeTruthy();
      expect(provider.icon).toBeDefined();
    }
  });

  it("uses the fg token for Apple's icon so it follows light/dark mode", () => {
    const apple = SOCIAL_ACCOUNT_PROVIDERS.find((p) => p.id === "apple");

    expect(apple?.iconColor).toBe("fg");
  });

  it("leaves Google's icon color unset since FcGoogle is a fixed multi-color mark", () => {
    const google = SOCIAL_ACCOUNT_PROVIDERS.find((p) => p.id === "google");

    expect(google?.iconColor).toBeUndefined();
  });

  it("hardcodes Facebook's brand blue since it's a third-party mark, not an AERYO token", () => {
    const facebook = SOCIAL_ACCOUNT_PROVIDERS.find((p) => p.id === "facebook");

    // Meta brand blue, matches the source's own exemption — see socialAccount.ts.
    // eslint-disable-next-line no-restricted-syntax
    expect(facebook?.iconColor).toBe("#1877F2");
  });
});
