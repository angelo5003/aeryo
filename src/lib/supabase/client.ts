import { createClient } from "@supabase/supabase-js";

// Static export (output: "export") has no server runtime, so this is a
// plain browser client — no @supabase/ssr / cookie-based session needed.
// per node_modules/@supabase/supabase-js/src/index.ts createClient doc comment
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
