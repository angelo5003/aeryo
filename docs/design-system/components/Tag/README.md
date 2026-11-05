A small label that can hold an icon and be removed.

## How to use it

- Use `closable` with `onClose` for filters the rider can clear.

Source: `src/components/typography/Tag`. Import from `@/components/typography/Tag`.

## Props

| Prop           | Type                 | Required | Default     | What it does                                                                                   | Belongs to |
| -------------- | -------------------- | -------- | ----------- | ---------------------------------------------------------------------------------------------- | ---------- |
| `intent`       | `StatusIntent`       | No       | `"neutral"` | Semantic status intent — selects the token-backed colorPalette for this tag.                   | `TagProps` |
| `variant`      | `StatusVariant`      | No       | `"subtle"`  | Visual treatment.                                                                              | `TagProps` |
| `startElement` | `React.ReactElement` | No       |             | Icon rendered at the start of the tag, before the label.                                       | `TagProps` |
| `endElement`   | `React.ReactElement` | No       |             | Icon rendered at the end of the tag, after the label (before the close button, if `closable`). | `TagProps` |
| `closable`     | `boolean`            | No       |             | Shows a close button.                                                                          | `TagProps` |
| `onClose`      | `() => void`         | No       |             | Called when the close button is clicked. Requires `closable`.                                  | `TagProps` |
