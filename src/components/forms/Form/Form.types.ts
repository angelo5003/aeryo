import type { HTMLChakraProps } from "@chakra-ui/react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
> extends HTMLChakraProps<"form"> {
  /**
   * react-hook-form's `useForm()` return value. When given, `Form` wraps
   * `children` in `FormProvider` so `Field`/`Input`/etc. can read
   * validation state via `useFormContext()` without prop-drilling
   * `control`. `Form` itself stays a layout-only wrapper otherwise — it
   * doesn't call `handleSubmit` for you; pass
   * `onSubmit={methods.handleSubmit(onValid)}` yourself.
   */
  methods?: UseFormReturn<TFieldValues>;
}
