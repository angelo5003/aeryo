/**
 * Must match `custom_url_scheme` in
 * `android/app/src/main/res/values/strings.xml` and `CFBundleURLSchemes` in
 * `ios/App/App/Info.plist`.
 */
export const APP_URL_SCHEME = "com.aeryo.app";

/**
 * Turn a native "opened via link" URL into an in-app path.
 *
 * Custom scheme: `com.aeryo.app://invite` → `/invite`
 * https (later Universal/App Links): `https://example.com/invite` → `/invite`
 *
 * Returns `null` when the string is not a URL, or uses a scheme this app
 * does not handle.
 */
export function pathFromAppUrl(rawUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const protocol = url.protocol.replace(/:$/, "");

  if (protocol === APP_URL_SCHEME) {
    const joined = `${url.host}${url.pathname}`;
    const withSlash = joined.startsWith("/") ? joined : `/${joined}`;
    const collapsed = withSlash.replace(/\/{2,}/g, "/");
    const path = collapsed === "/" ? "/" : collapsed.replace(/\/$/, "") || "/";
    return `${path}${url.search}${url.hash}`;
  }

  if (protocol === "https" || protocol === "http") {
    return `${url.pathname}${url.search}${url.hash}` || "/";
  }

  return null;
}
