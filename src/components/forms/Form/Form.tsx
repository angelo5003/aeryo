import { chakra } from "@chakra-ui/react";
import * as React from "react";
import type { FieldValues } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import type { FormProps } from "./Form.types";

const ChakraForm = chakra("form");

/**
 * AERYO's form root — a `<form>` styled as a vertical field stack
 * (`gap` token between children), plus optional react-hook-form wiring.
 *
 * Deliberately a layout-only wrapper, not a submission-state-aware one:
 * it does not track `isSubmitting`, disable fields, or render an error
 * summary on its own. Read `methods.formState.isSubmitting` yourself and
 * pass it to the submit `Button`'s `loading` prop; render `FormError`
 * yourself where you want it. This keeps `Form` usable with or without
 * react-hook-form and matches every other AERYO component's "UI only,
 * consumer owns state" pattern — `methods` is the one exception, and
 * only because `FormProvider` is pure context wiring, not state
 * ownership.
 *
 * When `methods` is given, `noValidate` also defaults to `true`: `Field`
 * auto-propagates its `required`/`invalid` props to descendant `Input`/
 * `Textarea`/etc. via Chakra's field context (confirmed by inspecting a
 * rendered `Field required` — the native `<input required>` attribute
 * really is set), so without `noValidate` the browser's own constraint
 * validation blocks the native submit event before `handleSubmit` ever
 * runs, silently swallowing every zod error. Pass `noValidate={false}`
 * explicitly to opt back into native + react-hook-form validation
 * running together, if a page genuinely wants both.
 *
 * Every other Chakra style/responsive prop, `as`, `asChild`, `ref`, …
 * passes through untouched.
 */
function FormInner<TFieldValues extends FieldValues = FieldValues>(
  props: FormProps<TFieldValues>,
  ref: React.Ref<HTMLFormElement>,
) {
  const { methods, children, gap = "5", noValidate, ...rest } = props;

  const content = (
    <ChakraForm
      ref={ref}
      display="flex"
      flexDirection="column"
      gap={gap}
      noValidate={noValidate ?? !!methods}
      {...rest}
    >
      {children}
    </ChakraForm>
  );

  return methods ? (
    <FormProvider {...methods}>{content}</FormProvider>
  ) : (
    content
  );
}

// Generic forwardRef components lose their type parameter through
// `React.forwardRef`'s own (non-generic) signature — this cast restores
// it so `<Form<SignUpValues> methods={...}>` still type-checks per call
// site, a standard pattern for this exact limitation.
export const Form = React.forwardRef(FormInner) as <
  TFieldValues extends FieldValues = FieldValues,
>(
  props: FormProps<TFieldValues> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;
