A password field with a show or hide button.

## How to use it

- Set `visibilityToggleLabel` so the toggle has a spoken name.

Source: `src/components/forms/PasswordInput`. Import from `@/components/forms/PasswordInput`.

## Props

| Prop                    | Type                                                               | Required | Default | What it does                                                                                                                                                                                        | Belongs to           |
| ----------------------- | ------------------------------------------------------------------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `defaultVisible`        | `boolean`                                                          | No       |         | The default visibility state, for uncontrolled usage.                                                                                                                                               | `PasswordInputProps` |
| `visible`               | `boolean`                                                          | No       |         | The controlled visibility state.                                                                                                                                                                    | `PasswordInputProps` |
| `onVisibleChange`       | `(visible: boolean) => void`                                       | No       |         | Called when the visibility toggle is pressed.                                                                                                                                                       | `PasswordInputProps` |
| `rootProps`             | `Omit<InputGroupProps, "endElement" \| "endOffset" \| "children">` | No       |         | Props forwarded to the outer `InputGroup` (the element the toggle sits in). `endElement`/`endOffset`/`children` are already controlled by this component — set here, they'd be silently overridden. | `PasswordInputProps` |
| `visibilityToggleLabel` | `string`                                                           | No       |         | Accessible label for the show/hide toggle button.                                                                                                                                                   | `PasswordInputProps` |
