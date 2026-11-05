The primary action control, with a meaning-based `intent` instead of a raw color.

## How to use it

- Use one solid primary action per screen. Use `ghost` for Skip on a photo scrim.
- Provide `children` as a short verb phrase. Icons go in `iconLeft` or `iconRight`, already sized.
- Keep the 8px corner. Do not make buttons pills.

Source: `src/components/actions/Button`. Import from `@/components/actions/Button`.

## Props

| Prop        | Type                 | Required | Default     | What it does                                                                                                                                                                    | Belongs to    |
| ----------- | -------------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `intent`    | `ButtonIntent`       | No       | `"primary"` | Semantic intent — selects the token-backed colorPalette for this button.                                                                                                        | `ButtonProps` |
| `variant`   | `ButtonVariant`      | No       | `"solid"`   | Visual treatment.                                                                                                                                                               | `ButtonProps` |
| `size`      | `ButtonSize`         | No       | `"md"`      | Size.                                                                                                                                                                           | `ButtonProps` |
| `iconLeft`  | `React.ReactElement` | No       |             | Icon rendered before `children`. Sized and spaced by the button's own recipe (via the `gap` token for its size) — pass an already-sized icon element (e.g. from `react-icons`). | `ButtonProps` |
| `iconRight` | `React.ReactElement` | No       |             | Icon rendered after `children`. See `iconLeft`.                                                                                                                                 | `ButtonProps` |
| `fullWidth` | `boolean`            | No       |             | Stretches the button to 100% of its container's width.                                                                                                                          | `ButtonProps` |
