"use client";

import { Box, Spinner } from "@chakra-ui/react";
import * as React from "react";
import { LuCheck, LuLockKeyhole, LuMail, LuUser, LuX } from "react-icons/lu";
import { Button } from "@/components/actions/Button/Button";
import { Field } from "@/components/forms/Field/Field";
import { Form } from "@/components/forms/Form/Form";
import { FormError } from "@/components/forms/FormError/FormError";
import { Input } from "@/components/forms/Input/Input";
import { InputGroup } from "@/components/forms/InputGroup/InputGroup";
import { PasswordInput } from "@/components/forms/PasswordInput/PasswordInput";
import { Stack } from "@/components/primitives/Stack/Stack";
import { signUpWithEmail } from "@/lib/supabase/account";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";
import ContinueWithBox from "../ContinueWithBox";
import { useCreateAccountForm } from "../hooks/useCreateAccountForm";
import { useUsernameAvailability } from "../hooks/useUsernameAvailability";

const CreateAccountForm: React.FC = () => {
  const methods = useCreateAccountForm();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const [formError, setFormError] = React.useState<string>();

  const username = watch("username");
  const availability = useUsernameAvailability(username);

  const usernameStatusIcon =
    availability === "checking" ? (
      <Spinner size="xs" />
    ) : availability === "available" ? (
      <Box asChild color="fg.success">
        <LuCheck />
      </Box>
    ) : availability === "taken" ? (
      <Box asChild color="fg.error">
        <LuX />
      </Box>
    ) : undefined;

  const onSubmit = async (data: CreateAccountValues) => {
    setFormError(undefined);

    if (availability === "taken") {
      setError("username", { message: "That username is taken" });
      return;
    }

    const { error } = await signUpWithEmail(data);
    if (error) {
      setFormError(error);
    }
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormError>{formError}</FormError>
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
        errorText={
          errors.username?.message ??
          (availability === "taken" ? "That username is taken" : undefined)
        }
        invalid={!!errors.username || availability === "taken"}
      >
        <InputGroup startElement={<LuUser />} endElement={usernameStatusIcon}>
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
          loading={isSubmitting}
          _active={{ transform: "scale(0.96)" }}
          transitionProperty="transform"
          transitionDuration="normal"
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
