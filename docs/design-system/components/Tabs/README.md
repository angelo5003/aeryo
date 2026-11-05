Horizontal tabs, which can scroll when the set is long.

## How to use it

- Use `scrollable` on `TabsList` for long sets. Vertical tabs are out of scope.

Source: `src/components/data-display/Tabs`. Import from `@/components/data-display/Tabs`.

## Props

| Prop         | Type              | Required | Default | What it does                                                                                                                                                                                                                                                       | Belongs to         |
| ------------ | ----------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `scrollable` | `boolean`         | No       |         | Scrolls horizontally (hidden scrollbar, tabs keep their natural width and never wrap) instead of the default behavior of shrinking every trigger to fit — use when the tab set is long or unbounded (e.g. per-spot session history) rather than a small fixed set. | `TabsListProps`    |
| `icon`       | `React.ReactNode` | No       |         | Leading icon, rendered before the label.                                                                                                                                                                                                                           | `TabsTriggerProps` |
