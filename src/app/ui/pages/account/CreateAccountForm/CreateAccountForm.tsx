"use client";

import type React from "react";
import { LuLockKeyhole, LuMail, LuUser } from "react-icons/lu";
import { Button } from "@/components/actions/Button/Button";
import { Field } from "@/components/forms/Field/Field";
import { Form } from "@/components/forms/Form/Form";
import { FormError } from "@/components/forms/FormError/FormError";
import { Input } from "@/components/forms/Input/Input";
import { InputGroup } from "@/components/forms/InputGroup/InputGroup";
import { PasswordInput } from "@/components/forms/PasswordInput/PasswordInput";
import { Stack } from "@/components/primitives/Stack/Stack";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";
import ContinueWithBox from "../ContinueWithBox";
import { useCreateAccountForm } from "../hooks/useCreateAccountForm";
import { accountActions } from "../utilities/accountActions/accountActions";

const CreateAccountForm: React.FC = () => {
  const methods = useCreateAccountForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;
  const { createAccount } = accountActions();

  const onSubmit = async (data: CreateAccountValues) => {
    try {
      await createAccount(data);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormError>{errors.root?.message}</FormError>
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
        <ContinueWithBox />
      </Stack>
    </Form>
  );
};

export default CreateAccountForm;
