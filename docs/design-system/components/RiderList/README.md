A headed list of `RiderCard` rows, with a slot for an empty state.

## How to use it

- Give every rider a stable `id` so the list keys by identity.

Source: `src/components/data-display/RiderList`. Import from `@/components/data-display/RiderList`.

## Props

| Prop      | Type              | Required | Default | What it does                                                                                              | Belongs to       |
| --------- | ----------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------- | ---------------- |
| `id`      | `string`          | No       |         | A stable key for this rider — falls back to `name` if omitted.                                            | `RiderListItem`  |
| `riders`  | `RiderListItem[]` | Yes      |         | The riders to render, one `RiderCard` each, in the given order.                                           | `RiderListProps` |
| `heading` | `React.ReactNode` | No       |         | Heading shown above the list, e.g. `"14 riders"` (guide §26 "Rider list" wireframe). Omit for no heading. | `RiderListProps` |
| `empty`   | `React.ReactNode` | No       |         | Rendered instead of the list when `riders` is empty — typically an `EmptyState`.                          | `RiderListProps` |
