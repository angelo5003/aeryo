/**
 * Font tokens. Sora (display/heading) + Inter (body) per the brand board.
 * The CSS variables are supplied by `next/font/google` in `app/layout.tsx`
 * — see the `sora` / `inter` font loaders there.
 *
 * Font sizes, weights, and letter-spacing all use Chakra's default scale —
 * it already covers everything the current mockups need (Sora at
 * bold/extrabold, Inter at regular/medium/semibold), so there's nothing
 * brand-specific to override yet. Add a custom scale here if a real
 * typographic need shows up (e.g. the ~40px display numerals used for
 * stats) rather than guessing sizes ahead of that need.
 */
export const fonts = {
  heading: { value: "var(--font-sora), 'Sora', sans-serif" },
  body: { value: "var(--font-inter), 'Inter', sans-serif" },
  mono: { value: "var(--font-geist-mono), ui-monospace, monospace" },
} as const;
