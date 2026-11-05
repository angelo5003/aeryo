A message for an error that belongs to the whole form.

## How to use it

- Safe to always mount, because it renders nothing when empty.

Source: `src/components/forms/FormError`. Import from `@/components/forms/FormError`.

## Props

| Prop       | Type              | Required | Default | What it does                                                                                                                                                                       | Belongs to       |
| ---------- | ----------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `children` | `React.ReactNode` | No       |         | The error message. Renders nothing when empty/undefined, so it's safe to always mount unconditionally — e.g. `<FormError>{errors.root?.message}</FormError>` with react-hook-form. | `FormErrorProps` |
