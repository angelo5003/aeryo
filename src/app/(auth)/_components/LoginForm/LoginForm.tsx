"use client";

import type React from "react";
import { LuLockKeyhole, LuMail } from "react-icons/lu";
import { Button } from "@/components/actions/Button/Button";
import { Field } from "@/components/forms/Field/Field";
import { Form } from "@/components/forms/Form/Form";
import { FormError } from "@/components/forms/FormError/FormError";
import { Input } from "@/components/forms/Input/Input";
import { InputGroup } from "@/components/forms/InputGroup/InputGroup";
import { PasswordInput } from "@/components/forms/PasswordInput/PasswordInput";
import { Stack } from "@/components/primitives/Stack/Stack";
import { useLoginForm } from "@/app/(auth)/_hooks/useLoginForm/useLoginForm";
import { useLoginOnSubmit } from "@/app/(auth)/_hooks/useLoginOnSubmit/useLoginOnSubmit";

const LoginForm: React.FC = () => {
  const methods = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { onSubmit } = useLoginOnSubmit(methods);

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormError>{errors.root?.message}</FormError>
      <Field
        label="Email or Username"
        required
        errorText={errors.identifier?.message}
        invalid={!!errors.identifier}
      >
        <InputGroup startElement={<LuMail />}>
          <Input
            type="text"
            autoComplete="username"
            spellCheck={false}
            placeholder="you@example.com"
            size="lg"
            focusRingColor={errors.identifier ? "border.error" : "accent.solid"}
            {...register("identifier")}
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
          Login
        </Button>
      </Stack>
    </Form>
  );
};

export default LoginForm;
