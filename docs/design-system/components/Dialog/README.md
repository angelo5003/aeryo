A centered modal for a decision the rider has to make before moving on.

## How to use it

- Use for confirmations such as deleting an account. Use `Drawer` for longer content.
- Provide `DialogTrigger` and one `DialogContent`, which handles the backdrop and portal.

Source: `src/components/data-display/Dialog`. Import from `@/components/data-display/Dialog`.

## Props

| Prop        | Type                                   | Required | Default | What it does                                                                                                                                                                                                                                                                                                                                                                                               | Belongs to                |
| ----------- | -------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `children`  | `React.ReactNode`                      | No       |         | Typically a `DialogTrigger` and a `DialogContent`. Optional only to keep this type Storybook/CSF-friendly (Chakra's own `Dialog.Root` requires it) — a dialog that renders nothing does nothing.                                                                                                                                                                                                           | `DialogProps`             |
| `portalled` | `boolean`                              | No       | `true`  |                                                                                                                                                                                                                                                                                                                                                                                                            | `DialogContentProps`      |
| `portalRef` | `React.RefObject<HTMLElement \| null>` | No       |         | Portal destination. Omit to portal to `document.body` (the usual case). Pass one when the dialog must stay inside a specific DOM subtree — e.g. `LightMode`/`DarkMode` color-mode scoping (see `src/components/ui/color-mode.tsx`) only affects descendants of the element it's applied to, and a `document.body` portal escapes that subtree entirely; same reasoning as `Drawer`'s existing `portalRef`. | `DialogContentProps`      |
| `children`  | `React.ReactNode`                      | No       |         | Omit for a default "X" icon.                                                                                                                                                                                                                                                                                                                                                                               | `DialogCloseTriggerProps` |
