What a screen shows when there is nothing to list yet.

## How to use it

- Provide a `title`, and an `action` when the rider can fix it.

Source: `src/components/data-display/EmptyState`. Import from `@/components/data-display/EmptyState`.

## Props

| Prop          | Type              | Required | Default | What it does                                                                                                                                                                                                                                                            | Belongs to        |
| ------------- | ----------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `icon`        | `React.ReactNode` | No       |         | A small icon (e.g. a react-icons glyph) or a larger illustration (a custom SVG/image element) — both just render in the same slot; an icon-sized glyph and a bigger illustration graphic both make sense here depending on context, and neither needs a different prop. | `EmptyStateProps` |
| `title`       | `React.ReactNode` | Yes      |         | The main message (e.g. "No spots found").                                                                                                                                                                                                                               | `EmptyStateProps` |
| `description` | `React.ReactNode` | No       |         | Secondary, more detailed text below the title.                                                                                                                                                                                                                          | `EmptyStateProps` |
| `action`      | `React.ReactNode` | No       |         | Typically a `Button` — e.g. "Clear filters", "Add a spot".                                                                                                                                                                                                              | `EmptyStateProps` |
| `size`        | `EmptyStateSize`  | No       | `"md"`  | Size.                                                                                                                                                                                                                                                                   | `EmptyStateProps` |
