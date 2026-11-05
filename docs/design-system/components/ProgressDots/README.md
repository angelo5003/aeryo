Step dots for the onboarding carousel, drawn for a photo scrim.

## How to use it

- Pass stable `ids` and `activeId` rather than an index.
- Place on `bg-photo`, because the marks use `fg-photo` and `fg-photo-muted`.

Source: `src/components/data-display/ProgressDots`. Import from `@/components/data-display/ProgressDots`.

## Props

| Prop          | Type                | Required | Default | What it does                                                                                                                             | Belongs to          |
| ------------- | ------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `ids`         | `readonly string[]` | No       |         | Stable ids for each step. Prefer this — dots key and compare by id. Falls back to `count` / `activeIndex` only when no ids are supplied. | `ProgressDotsProps` |
| `activeId`    | `string`            | No       |         | Currently active step. Used with `ids`.                                                                                                  | `ProgressDotsProps` |
| `count`       | `number`            | No       |         | Fallback total when `ids` is omitted.                                                                                                    | `ProgressDotsProps` |
| `activeIndex` | `number`            | No       |         | Fallback selection when `activeId` is omitted.                                                                                           | `ProgressDotsProps` |
