"use client";

import type React from "react";
import { LuLockKeyhole, LuMail } from "react-icons/lu";
import { Button } from "@/components/actions/Button/Button";
import { Field } from "@/components/forms/Field/Field";
import { Form } from "@/components/forms/Form/Form";
import { FormError } from "@/components/forms/FormError/FormError";
import { Input } from "@/components/forms/Input/Input";
import { InputGroup } from "@/components/forms/InputGroup/InputGroup";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";
import { useCreateAccountForm } from "../hooks/useCreateAccountForm";

const CreateAccountForm: React.FC = () => {
  const methods = useCreateAccountForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // TODO(you): wire this up to Supabase Auth once it's provisioned
  // (see PRODUCT.md / docs/guides/kitesurf-app.md — "Supabase is not
  // provisioned yet"). For now this just proves validated data reaches
  // a submit handler.
  const onSubmit = (values: CreateAccountValues) => {
    console.log("create account submit", values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormError />
      <Field label="Email" required errorText={errors.email?.message}>
        <InputGroup startElement={<LuMail />}>
          <Input
            type="email"
            placeholder="you@example.com"
            size="lg"
            focusRingColor="accent.solid"
            {...register("email")}
          />
        </InputGroup>
      </Field>
      <Field label="Password" required errorText={errors.password?.message}>
        <InputGroup startElement={<LuLockKeyhole />}>
          <Input
            type="password"
            placeholder="Password"
            size="lg"
            focusRingColor="accent.solid"
            {...register("password")}
          />
        </InputGroup>
      </Field>
      <Field
        label="Confirm Password"
        required
        errorText={errors.confirmPassword?.message}
      >
        <InputGroup startElement={<LuLockKeyhole />}>
          <Input
            type="password"
            placeholder="Confirm Password"
            size="lg"
            focusRingColor="accent.solid"
            {...register("confirmPassword")}
          />
        </InputGroup>
      </Field>
      <Button
        type="submit"
        size="lg"
        color="fg"
        fontWeight="bold"
        loading={isSubmitting}
        _active={{ transform: "scale(0.96)" }}
        transitionProperty="transform"
        transitionDuration="fast"
        transitionTimingFunction="easeOut"
      >
        Create Account
      </Button>
    </Form>
  );
};

export default CreateAccountForm;
