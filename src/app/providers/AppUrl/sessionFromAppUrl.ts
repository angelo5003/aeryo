// Shape Supabase gives back: the two tokens setSession() needs to sign someone in.
export type AppUrlSessionTokens = {
  access_token: string;
  refresh_token: string;
};

/**
 * Pulls Supabase's access/refresh tokens off the hash fragment of a path
 * produced by pathFromAppUrl (e.g.
 * "/auth-confirm#access_token=...&refresh_token=...&type=signup").
 * Returns null if there's no hash, or either token is missing.
 */
export const sessionFromAppUrl = (path: string): AppUrlSessionTokens | null => {
  // No "#" means no tokens were attached to this link at all.
  const hashIndex = path.indexOf("#");
  if (hashIndex === -1) {
    return null;
  }

  // Read everything after "#" as ordinary URL params (key=value pairs).
  const params = new URLSearchParams(path.slice(hashIndex + 1));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  // Both tokens are required — a partial pair can't start a session.
  if (!accessToken || !refreshToken) {
    return null;
  }

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};
