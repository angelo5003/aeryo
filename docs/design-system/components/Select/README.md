A dropdown choice built from parts such as `Select.Root` and `Select.Trigger`.

## How to use it

- Build `collection` with `createListCollection`, exported beside `Select`.

Source: `src/components/forms/Select`. Import from `@/components/forms/Select`.

## Props

| Prop        | Type                                   | Required | Default | What it does                                   | Belongs to             |
| ----------- | -------------------------------------- | -------- | ------- | ---------------------------------------------- | ---------------------- |
| `clearable` | `boolean`                              | No       |         | Shows a clear button when a value is selected. | `SelectTriggerProps`   |
| `portalled` | `boolean`                              | No       | `true`  | Renders the content in a portal. @default true | `SelectContentProps`   |
| `portalRef` | `React.RefObject<HTMLElement \| null>` | No       |         |                                                | `SelectContentProps`   |
| `label`     | `React.ReactNode`                      | Yes      |         |                                                | `SelectItemGroupProps` |
