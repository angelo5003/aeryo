A placeholder shape while real content loads.

## How to use it

- Pair with cached data or an explicit error. Never leave one loading forever.

Source: `src/components/data-display/Skeleton`. Import from `@/components/data-display/Skeleton`.

## Props

| Prop         | Type              | Required | Default    | What it does                                                                                                                                                                                  | Belongs to      |
| ------------ | ----------------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `variant`    | `SkeletonVariant` | No       | `"custom"` |                                                                                                                                                                                               | `SkeletonProps` |
| `lines`      | `number`          | No       | `3`        | `variant="text"` only: number of lines. @default 3                                                                                                                                            | `SkeletonProps` |
| `avatarSize` | `AvatarSize`      | No       | `"md"`     | `variant="avatar"` only: reuses `Avatar`'s own size scale. @default "md"                                                                                                                      | `SkeletonProps` |
| `cardSize`   | `AeryoCardSize`   | No       | `"md"`     | `variant="card"` only: reuses `AeryoCard`'s own size scale (controls overall footprint, not `AeryoCard` itself — this is a generic card-shaped placeholder, not coupled to it). @default "md" | `SkeletonProps` |
| `children`   | `React.ReactNode` | No       |            | `variant="custom"` only: the real content this stands in for, while it's loading.                                                                                                             | `SkeletonProps` |
