/**
 * Spacing scale on a 4px base unit (1rem = 16px, so step `1` = 0.25rem =
 * 4px). Covers the steps actually used across layout/gap/padding/margin —
 * intentionally not every integer, to keep the scale to a small, memorable
 * set (§ "Spacing" in docs/guides/aeryo-branding.md's Foundations list).
 */
export const spacing = {
  0: { value: "0" },
  1: { value: "0.25rem" }, // 4px
  2: { value: "0.5rem" }, // 8px
  3: { value: "0.75rem" }, // 12px
  4: { value: "1rem" }, // 16px
  5: { value: "1.25rem" }, // 20px
  6: { value: "1.5rem" }, // 24px
  8: { value: "2rem" }, // 32px
  10: { value: "2.5rem" }, // 40px
  12: { value: "3rem" }, // 48px
  16: { value: "4rem" }, // 64px
  20: { value: "5rem" }, // 80px
  24: { value: "6rem" }, // 96px
  32: { value: "8rem" }, // 128px
} as const;
