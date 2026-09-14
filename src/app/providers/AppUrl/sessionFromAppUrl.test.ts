import { sessionFromAppUrl } from "./sessionFromAppUrl";

describe("sessionFromAppUrl", () => {
  it("returns null when there is no #", () => {
    expect(sessionFromAppUrl("https://aeryo.app")).toBeNull();
  });

  it("returns null when there are no access or refresh tokens", () => {
    expect(sessionFromAppUrl("https://aeryo.app#")).toBeNull();
  });

  it("returns null when only the access token is present", () => {
    expect(sessionFromAppUrl("https://aeryo.app#access_token=123")).toBeNull();
  });

  it("returns null when only the refresh token is present", () => {
    expect(sessionFromAppUrl("https://aeryo.app#refresh_token=456")).toBeNull();
  });

  it("returns the access and refresh tokens when they are present", () => {
    expect(
      sessionFromAppUrl("https://aeryo.app#access_token=123&refresh_token=456"),
    ).toStrictEqual({
      access_token: "123",
      refresh_token: "456",
    });
  });

  it("ignores the extra params a real Supabase confirmation link includes", () => {
    expect(
      sessionFromAppUrl(
        "/auth-confirm#access_token=123&refresh_token=456&type=signup&expires_in=3600",
      ),
    ).toStrictEqual({
      access_token: "123",
      refresh_token: "456",
    });
  });
});
