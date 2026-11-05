A rider's picture, falling back to initials and then a generic icon.

## How to use it

- Provide `name` so initials and alt text work when there is no image.
- `status` is a social presence dot, never a location signal.

Source: `src/components/data-display/Avatar`. Import from `@/components/data-display/Avatar`.

## Props

| Prop       | Type              | Required | Default | What it does                                                                                                                    | Belongs to    |
| ---------- | ----------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `src`      | `string`          | No       |         | Image URL. Falls back to initials (from `name`), then a generic icon, if it fails to load or is omitted — see `Avatar.tsx`.     | `AvatarProps` |
| `name`     | `string`          | No       |         | The person/entity's name — derives initials for the fallback, and the image's `alt` text.                                       | `AvatarProps` |
| `icon`     | `React.ReactNode` | No       |         | Custom fallback icon, shown instead of initials when there's no image and no `name`. Omit for Chakra's own generic person icon. | `AvatarProps` |
| `size`     | `AvatarSize`      | No       | `"md"`  | Size.                                                                                                                           | `AvatarProps` |
| `status`   | `AvatarStatus`    | No       |         | Presence status — renders a small dot indicator. Omit for none.                                                                 | `AvatarProps` |
| `verified` | `boolean`         | No       |         | Renders a small verified-checkmark badge.                                                                                       | `AvatarProps` |
