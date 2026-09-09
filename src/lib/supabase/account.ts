import { supabase } from "./client";

export async function isUsernameAvailable(
  username: string,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_username_available", {
    check_username: username,
  });

  if (error) throw error;
  return data === true;
}

export async function signUpWithEmail({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });

  return { error: error?.message ?? null };
}
