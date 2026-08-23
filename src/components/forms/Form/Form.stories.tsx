import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { z } from "zod";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Button } from "@/components/actions/Button";
import { Heading } from "@/components/typography/Heading";
import { Field } from "@/components/forms/Field";
import { Input } from "@/components/forms/Input";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Checkbox } from "@/components/forms/Checkbox";
import { Form } from "./Form";
import { FormError } from "@/components/forms/FormError";

/**
 * AERYO's form root — a `<form>` styled as a vertical field stack, plus
 * optional react-hook-form wiring via `methods`. See `Form.tsx` for
 * implementation notes. The `SignUpExample` story below is the fullest
 * demonstration: `Form` + `Field` + `Input` + `PasswordInput` +
 * `Checkbox` + `FormError` + `Button`, wired to real `react-hook-form` +
 * `zod` validation — this is the actual sign-up flow shape.
 */
const meta = {
  title: "Forms/Form",
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// A plain, library-free Form — no `methods` prop, just layout + native
// onSubmit. Demonstrates Form works standalone, without react-hook-form.
// ---------------------------------------------------------------------------

export const PlainLayout: Story = {
  render: () => (
    <Form onSubmit={(event) => event.preventDefault()} maxW="20rem">
      <Field label="Spot name">
        <Input placeholder="IJmuiden" />
      </Field>
      <Field label="Notes" helperText="Visible to other riders at this spot.">
        <Input placeholder="Optional" />
      </Field>
      <Button type="submit">Save</Button>
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// The real shape: react-hook-form + zod, every Forms component composed
// together. This is the sign-up flow's actual form.
// ---------------------------------------------------------------------------

const signUpSchema = z
  .object({
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val, {
      message: "You must accept the terms to continue.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

function SignUpForm({
  onSubmitSuccess,
  simulateServerError,
}: {
  onSubmitSuccess?: (values: SignUpValues) => void;
  simulateServerError?: boolean;
}) {
  const [formError, setFormError] = React.useState<string | undefined>();
  const methods = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onValid = async (values: SignUpValues) => {
    setFormError(undefined);
    if (simulateServerError) {
      setFormError("That email address is already registered.");
      return;
    }
    onSubmitSuccess?.(values);
  };

  return (
    <Form
      methods={methods}
      onSubmit={methods.handleSubmit(onValid)}
      maxW="22rem"
    >
      <Heading variant="title" as="h2">
        Create your account
      </Heading>

      <FormError>{formError}</FormError>

      <Field
        label="Email"
        required
        invalid={!!methods.formState.errors.email}
        errorText={methods.formState.errors.email?.message}
      >
        <Input
          type="email"
          placeholder="you@example.com"
          {...methods.register("email")}
        />
      </Field>

      <Field
        label="Password"
        required
        invalid={!!methods.formState.errors.password}
        errorText={methods.formState.errors.password?.message}
      >
        <PasswordInput
          placeholder="At least 8 characters"
          {...methods.register("password")}
        />
      </Field>

      <Field
        label="Confirm password"
        required
        invalid={!!methods.formState.errors.confirmPassword}
        errorText={methods.formState.errors.confirmPassword?.message}
      >
        <PasswordInput
          placeholder="Repeat your password"
          {...methods.register("confirmPassword")}
        />
      </Field>

      <Field
        invalid={!!methods.formState.errors.acceptTerms}
        errorText={methods.formState.errors.acceptTerms?.message}
      >
        {/* Checkbox isn't a native input under the hood (Chakra/Ark's
            checked/onCheckedChange, not a change event) — react-hook-form's
            `Controller` is the correct wiring here, not `register()`. */}
        <Controller
          control={methods.control}
          name="acceptTerms"
          render={({ field }) => (
            <Checkbox
              name={field.name}
              checked={field.value}
              onCheckedChange={(details) => field.onChange(details.checked)}
              onBlur={field.onBlur}
              ref={field.ref}
            >
              I agree to the terms of service
            </Checkbox>
          )}
        />
      </Field>

      <Button type="submit" loading={methods.formState.isSubmitting} fullWidth>
        Sign up
      </Button>
    </Form>
  );
}

export const SignUpExample: Story = {
  render: () => <SignUpForm />,
};

export const SignUpValidationErrors: Story = {
  render: () => <SignUpForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole("button", { name: "Sign up" });
    await userEvent.click(submit);

    await waitFor(() =>
      expect(canvas.getByText("Enter a valid email address.")).toBeVisible(),
    );
    await expect(
      canvas.getByText("Password must be at least 8 characters."),
    ).toBeVisible();
    await expect(
      canvas.getByText("You must accept the terms to continue."),
    ).toBeVisible();
  },
};

export const SignUpPasswordMismatch: Story = {
  render: () => <SignUpForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByPlaceholderText("you@example.com"),
      "rider@aeryo.app",
    );
    await userEvent.type(
      canvas.getByPlaceholderText("At least 8 characters"),
      "kitesurf123",
    );
    await userEvent.type(
      canvas.getByPlaceholderText("Repeat your password"),
      "somethingElse123",
    );
    await userEvent.click(
      canvas.getByRole("checkbox", { name: /terms of service/i }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Sign up" }));

    await waitFor(() =>
      expect(canvas.getByText("Passwords don't match.")).toBeVisible(),
    );
  },
};

export const SignUpServerError: Story = {
  render: () => <SignUpForm simulateServerError />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByPlaceholderText("you@example.com"),
      "rider@aeryo.app",
    );
    await userEvent.type(
      canvas.getByPlaceholderText("At least 8 characters"),
      "kitesurf123",
    );
    await userEvent.type(
      canvas.getByPlaceholderText("Repeat your password"),
      "kitesurf123",
    );
    await userEvent.click(
      canvas.getByRole("checkbox", { name: /terms of service/i }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Sign up" }));

    await waitFor(() =>
      expect(
        canvas.getByText("That email address is already registered."),
      ).toBeVisible(),
    );
  },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: () => (
    <DarkMode>
      <Box bg="bg" p="6">
        <SignUpForm />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: () => (
    <LightMode>
      <Box bg="bg" p="6">
        <SignUpForm />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  render: () => <SignUpForm />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  render: () => <SignUpForm />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  render: () => <SignUpForm />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};
