A yes-or-no choice that sits in a list of options.

## How to use it

- Provide the label as `children`.

Source: `src/components/forms/Checkbox`. Import from `@/components/forms/Checkbox`.

## Props

| Prop         | Type                                          | Required | Default | What it does                                             | Belongs to      |
| ------------ | --------------------------------------------- | -------- | ------- | -------------------------------------------------------- | --------------- |
| `icon`       | `React.ReactElement`                          | No       |         | Replaces the default check icon.                         | `CheckboxProps` |
| `inputProps` | `React.InputHTMLAttributes<HTMLInputElement>` | No       |         | Props forwarded to the native `<input type="checkbox">`. | `CheckboxProps` |
| `rootRef`    | `React.RefObject<HTMLLabelElement \| null>`   | No       |         |                                                          | `CheckboxProps` |
