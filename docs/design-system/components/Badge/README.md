A small read-only label with a meaning-based `intent`.

## How to use it

- Use `Tag` when the label can be removed.

Source: `src/components/typography/Badge`. Import from `@/components/typography/Badge`.

## Props

| Prop      | Type            | Required | Default     | What it does                                                                   | Belongs to   |
| --------- | --------------- | -------- | ----------- | ------------------------------------------------------------------------------ | ------------ |
| `intent`  | `StatusIntent`  | No       | `"neutral"` | Semantic status intent — selects the token-backed colorPalette for this badge. | `BadgeProps` |
| `variant` | `StatusVariant` | No       | `"subtle"`  | Visual treatment.                                                              | `BadgeProps` |
