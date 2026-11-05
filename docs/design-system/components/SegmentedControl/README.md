A compact switch between two to four views.

## How to use it

- Provide `items`. A plain string is short for a matching value and label.

Source: `src/components/forms/SegmentedControl`. Import from `@/components/forms/SegmentedControl`.

## Props

| Prop       | Type                                    | Required | Default | What it does                                                            | Belongs to              |
| ---------- | --------------------------------------- | -------- | ------- | ----------------------------------------------------------------------- | ----------------------- |
| `value`    | `string`                                | Yes      |         |                                                                         | `SegmentedControlItem`  |
| `label`    | `React.ReactNode`                       | Yes      |         |                                                                         | `SegmentedControlItem`  |
| `disabled` | `boolean`                               | No       |         |                                                                         | `SegmentedControlItem`  |
| `items`    | `Array<string \| SegmentedControlItem>` | Yes      |         | The options. A plain string is shorthand for `{ value, label: value }`. | `SegmentedControlProps` |
