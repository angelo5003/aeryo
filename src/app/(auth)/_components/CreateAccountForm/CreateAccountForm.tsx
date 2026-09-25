"use client";

import type React from "react";
import { LuLockKeyhole, LuMail, LuUser } from "react-icons/lu";
import { Button } from "@/components/actions/Button/Button";
import { Field } from "@/components/forms/Field/Field";
import { Form } from "@/components/forms/Form/Form";
import { FormError } from "@/components/forms/FormError/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess/FormSuccess";
import { Input } from "@/components/forms/Input/Input";
import { InputGroup } from "@/components/forms/InputGroup/InputGroup";
import { PasswordInput } from "@/components/forms/PasswordInput/PasswordInput";
import { Stack } from "@/components/primitives/Stack/Stack";
import { useCreateAccountForm } from "@/app/(auth)/_hooks/useCreateAccountForm";
import { useCreateAccountSubmit } from "@/app/(auth)/_hooks/useCreateAccountSubmit/useCreateAccountSubmit";

const CreateAccountForm: React.FC = () => {
  const methods = useCreateAccountForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { onSubmit, needsConfirmation } = useCreateAccountSubmit(methods);

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormError>{errors.root?.message}</FormError>
      {needsConfirmation && (
        <FormSuccess>
          Please check your email for a confirmation link.
        </FormSuccess>
      )}
      <Field
        label="Email"
        required
        errorText={errors.email?.message}
        invalid={!!errors.email}
      >
        <InputGroup startElement={<LuMail />}>
          <Input
            type="email"
            placeholder="you@example.com"
            size="lg"
            focusRingColor={errors.email ? "border.error" : "accent.solid"}
            {...register("email")}
          />
        </InputGroup>
      </Field>
      <Field
        label="Username"
        required
        errorText={errors.username?.message}
        invalid={!!errors.username}
      >
        <InputGroup startElement={<LuUser />}>
          <Input
            placeholder="stormrider"
            size="lg"
            focusRingColor={errors.username ? "border.error" : "accent.solid"}
            {...register("username")}
          />
        </InputGroup>
      </Field>
      <Field
        label="Password"
        required
        errorText={errors.password?.message}
        invalid={!!errors.password}
      >
        <PasswordInput
          placeholder="Password"
          size="lg"
          rootProps={{ startElement: <LuLockKeyhole /> }}
          focusRingColor={errors.password ? "border.error" : "accent.solid"}
          {...register("password")}
        />
      </Field>
      <Field
        label="Confirm Password"
        required
        errorText={errors.confirmPassword?.message}
        invalid={!!errors.confirmPassword}
      >
        <PasswordInput
          placeholder="Confirm Password"
          size="lg"
          rootProps={{ startElement: <LuLockKeyhole /> }}
          focusRingColor={
            errors.confirmPassword ? "border.error" : "accent.solid"
          }
          {...register("confirmPassword")}
        />
      </Field>
      <Stack direction="column" gap="12">
        <Button
          type="submit"
          size="lg"
          fontWeight="bold"
          _active={{ transform: "scale(0.96)" }}
          transitionProperty="transform"
          transitionDuration="normal"
          transitionTimingFunction="easeOut"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Create Account
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateAccountForm;
