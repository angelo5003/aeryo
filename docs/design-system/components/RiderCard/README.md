One rider's row: avatar, name, discipline, level and presence.

## How to use it

- Pass `presence` as a status, never a location.

Source: `src/components/surfaces/RiderCard`. Import from `@/components/surfaces/RiderCard`.

## Props

| Prop         | Type                                           | Required | Default | What it does                                                                                          | Belongs to       |
| ------------ | ---------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- | ---------------- |
| `name`       | `string`                                       | Yes      |         | The rider's display name.                                                                             | `RiderCardProps` |
| `avatarSrc`  | `string`                                       | No       |         | Avatar image URL — falls back to initials, same as `Avatar`.                                          | `RiderCardProps` |
| `discipline` | `string`                                       | No       |         | e.g. `"Freeride"`, `"Big Air"` — the guide's §26 "Freeride · Intermediate" line, first half.          | `RiderCardProps` |
| `skillLevel` | `string`                                       | No       |         | e.g. `"Intermediate"`, `"Advanced"` — second half of that line.                                       | `RiderCardProps` |
| `presence`   | `Pick<RiderPresenceProps, "status" \| "time">` | No       |         | The rider's presence — rendered as a `RiderPresence` pill. Omit for a row with no presence indicator. | `RiderCardProps` |
| `avatarSize` | `AvatarProps["size"]`                          | No       | `"md"`  | Avatar size.                                                                                          | `RiderCardProps` |
