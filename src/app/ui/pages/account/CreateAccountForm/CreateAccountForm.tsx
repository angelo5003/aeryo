"use client";

import type React from "react";
import { LuLockKeyhole, LuMail } from "react-icons/lu";
import { Button } from "@/components/actions/Button/Button";
import { Field } from "@/components/forms/Field/Field";
import { Form } from "@/components/forms/Form/Form";
import { FormError } from "@/components/forms/FormError/FormError";
import { Input } from "@/components/forms/Input/Input";
import { InputGroup } from "@/components/forms/InputGroup/InputGroup";
import { Stack } from "@/components/primitives/Stack/Stack";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";
import ContinueWithBox from "../ContinueWithBox";
import { useCreateAccountForm } from "../hooks/useCreateAccountForm";

const CreateAccountForm: React.FC = () => {
  const methods = useCreateAccountForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: CreateAccountValues) => {
    console.log(data);
  };
  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormError />
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
        label="Password"
        required
        errorText={errors.password?.message}
        invalid={!!errors.password}
      >
        <InputGroup startElement={<LuLockKeyhole />}>
          <Input
            type="password"
            placeholder="Password"
            size="lg"
            focusRingColor={errors.password ? "border.error" : "accent.solid"}
            {...register("password")}
          />
        </InputGroup>
      </Field>
      <Field
        label="Confirm Password"
        required
        errorText={errors.confirmPassword?.message}
        invalid={!!errors.confirmPassword}
      >
        <InputGroup startElement={<LuLockKeyhole />}>
          <Input
            type="password"
            placeholder="Confirm Password"
            size="lg"
            focusRingColor={
              errors.confirmPassword ? "border.error" : "accent.solid"
            }
            {...register("confirmPassword")}
          />
        </InputGroup>
      </Field>
      <Stack direction="column" gap="12">
        <Button
          type="submit"
          size="lg"
          color="fg"
          fontWeight="bold"
          _active={{ transform: "scale(0.96)" }}
          transitionProperty="transform"
          transitionDuration="fast"
          transitionTimingFunction="easeOut"
        >
          Create Account
        </Button>
        <ContinueWithBox />
      </Stack>
    </Form>
  );
};

export default CreateAccountForm;
