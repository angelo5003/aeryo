Label, helper text and error text around any input.

## How to use it

- Set `invalid` together with `errorText`, since the text alone does not mark the field invalid.

Source: `src/components/forms/Field`. Import from `@/components/forms/Field`.

## Props

| Prop           | Type              | Required | Default | What it does                                                                                                                                                                                                                                                                       | Belongs to   |
| -------------- | ----------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `label`        | `React.ReactNode` | No       |         | The field's label, rendered above `children`.                                                                                                                                                                                                                                      | `FieldProps` |
| `helperText`   | `React.ReactNode` | No       |         | Helper text shown below `children` when there's no error.                                                                                                                                                                                                                          | `FieldProps` |
| `errorText`    | `React.ReactNode` | No       |         | Error text shown below `children` instead of `helperText`. Rendering this alone does not mark the field invalid — pass `invalid` too (or let Chakra's own `required`/native validation set it) so the error styling (see `fg.error`/`border.error` in semantic-tokens.ts) applies. | `FieldProps` |
| `optionalText` | `React.ReactNode` | No       |         | Replaces the default `*` required indicator for optional fields.                                                                                                                                                                                                                   | `FieldProps` |
