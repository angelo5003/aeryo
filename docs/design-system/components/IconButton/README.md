An icon-only action that must carry an `aria-label`.

## How to use it

- Use only when the icon is unmistakable, such as save or close.
- Provide the icon as `children` and a spoken name as `aria-label`.

Source: `src/components/actions/IconButton`. Import from `@/components/actions/IconButton`.

## Props

| Prop         | Type            | Required | Default     | What it does                                                                                                                                                                                                                                           | Belongs to        |
| ------------ | --------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `intent`     | `ButtonIntent`  | No       | `"primary"` | Semantic intent — selects the token-backed colorPalette for this button.                                                                                                                                                                               | `IconButtonProps` |
| `variant`    | `ButtonVariant` | No       | `"solid"`   | Visual treatment.                                                                                                                                                                                                                                      | `IconButtonProps` |
| `size`       | `ButtonSize`    | No       | `"md"`      | Size.                                                                                                                                                                                                                                                  | `IconButtonProps` |
| `aria-label` | `string`        | Yes      |             | Required, not optional: this is an icon-only control with no visible text label, so it has no other accessible name (see Step 6 of the chakra-ui-builder skill, and `ColorModeButton` in src/components/ui/color-mode.tsx for the existing precedent). | `IconButtonProps` |
