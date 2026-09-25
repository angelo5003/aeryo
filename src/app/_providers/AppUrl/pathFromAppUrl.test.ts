import { APP_URL_SCHEME, pathFromAppUrl } from "./pathFromAppUrl";

describe("pathFromAppUrl", () => {
  it("turns a custom-scheme host path into an in-app path", () => {
    expect(pathFromAppUrl(`${APP_URL_SCHEME}://invite`)).toBe("/invite");
  });

  it("turns a custom-scheme pathname into an in-app path", () => {
    expect(pathFromAppUrl(`${APP_URL_SCHEME}:///invite/friend`)).toBe(
      "/invite/friend",
    );
  });

  it("keeps query and hash on a custom-scheme URL", () => {
    expect(pathFromAppUrl(`${APP_URL_SCHEME}://invite?code=abc#ok`)).toBe(
      "/invite?code=abc#ok",
    );
  });

  it("returns / when the custom scheme has no path", () => {
    expect(pathFromAppUrl(`${APP_URL_SCHEME}://`)).toBe("/");
  });

  it("turns an https link into pathname plus query", () => {
    expect(pathFromAppUrl("https://aeryo.app/invite?code=abc")).toBe(
      "/invite?code=abc",
    );
  });

  it("returns null for a scheme this app does not handle", () => {
    expect(pathFromAppUrl("mailto:kite@example.com")).toBeNull();
  });

  it("returns null for a string that is not a URL", () => {
    expect(pathFromAppUrl("not a url")).toBeNull();
  });
});
