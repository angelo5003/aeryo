A message confirming that the whole form worked.

## How to use it

- Safe to always mount, because it renders nothing when empty.

Source: `src/components/forms/FormSuccess`. Import from `@/components/forms/FormSuccess`.

## Props

| Prop       | Type              | Required | Default | What it does                                                                                                                                                                           | Belongs to         |
| ---------- | ----------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `children` | `React.ReactNode` | No       |         | The success message. Renders nothing when empty/undefined, so it's safe to always mount unconditionally — e.g. `<FormSuccess>{needsConfirmation && "Check your inbox"}</FormSuccess>`. | `FormSuccessProps` |
