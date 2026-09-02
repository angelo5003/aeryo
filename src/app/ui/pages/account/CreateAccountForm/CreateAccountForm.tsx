import type React from "react";
import { LuLockKeyhole, LuMail } from "react-icons/lu";
import { Button } from "@/components/actions/Button/Button";
import { Field } from "@/components/forms/Field/Field";
import { Form } from "@/components/forms/Form/Form";
import { Input } from "@/components/forms/Input/Input";
import { InputGroup } from "@/components/forms/InputGroup/InputGroup";

const CreateAccountForm: React.FC = () => {
  return (
    <Form>
      <Field label="Email" required>
        <InputGroup startElement={<LuMail />}>
          <Input type="email" placeholder="you@example.com" size="lg" />
        </InputGroup>
      </Field>
      <Field label="Password" required>
        <InputGroup startElement={<LuLockKeyhole />}>
          <Input type="password" placeholder="Password" size="lg" />
        </InputGroup>
      </Field>
      <Field label="Confirm Password" required>
        <InputGroup startElement={<LuLockKeyhole />}>
          <Input type="password" placeholder="Confirm Password" size="lg" />
        </InputGroup>
      </Field>
      <Button type="submit">Create Account</Button>
    </Form>
  );
};

export default CreateAccountForm;
