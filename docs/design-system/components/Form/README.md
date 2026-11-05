A layout wrapper for forms that can share react-hook-form state.

## How to use it

- Pass `methods` from `useForm()`, and call `handleSubmit` yourself in `onSubmit`.

Source: `src/components/forms/Form`. Import from `@/components/forms/Form`.

## Props

| Prop      | Type                          | Required | Default | What it does                                                                                                                                                                                                                                                                                                                                                        | Belongs to  |
| --------- | ----------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `methods` | `UseFormReturn<TFieldValues>` | No       |         | react-hook-form's `useForm()` return value. When given, `Form` wraps `children` in `FormProvider` so `Field`/`Input`/etc. can read validation state via `useFormContext()` without prop-drilling `control`. `Form` itself stays a layout-only wrapper otherwise — it doesn't call `handleSubmit` for you; pass `onSubmit={methods.handleSubmit(onValid)}` yourself. | `FormProps` |
