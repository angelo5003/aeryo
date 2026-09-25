import { act, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";
import type { LoginValues } from "@/server/validation/account/login.schema";
import { useLoginOnSubmit } from "./useLoginOnSubmit";

const loginAccount = jest.fn();

jest.mock(
  "@/lib/account/accountActions",
  () => ({
    accountActions: () => ({
      loginAccount: (...args: unknown[]) => loginAccount(...args),
    }),
  }),
);

const validValues: LoginValues = {
  identifier: "user@example.com",
  password: "SecurePass123",
};

// Real react-hook-form instance, same as LoginForm wires up — a fake object
// here would let the hook pass without proving reset()/setError() land on
// real form state. Matches useCreateAccountSubmit.test.tsx's pattern.
const renderLoginOnSubmit = () =>
  renderHook(() => {
    const methods = useForm<LoginValues>();
    const submit = useLoginOnSubmit(methods);
    void methods.formState.errors; // touch the proxy — see useLoginForm.test.ts
    return { methods, ...submit };
  });

describe("useLoginOnSubmit", () => {
  beforeEach(() => {
    loginAccount.mockReset();
  });

  it("resets the form once loginAccount resolves", async () => {
    loginAccount.mockResolvedValue(undefined);
    const { result } = renderLoginOnSubmit();

    result.current.methods.setValue("identifier", validValues.identifier);
    await act(async () => {
      await result.current.onSubmit(validValues);
    });

    expect(loginAccount).toHaveBeenCalledWith(validValues);
    // reset() with no args reverts to the form's default values — no
    // defaultValues were supplied, so an untouched field goes back to
    // undefined, not "".
    expect(result.current.methods.getValues("identifier")).toBeUndefined();
  });

  it("surfaces a thrown loginAccount error as the form's root error, without resetting", async () => {
    loginAccount.mockRejectedValue(
      new Error("Invalid login credentials. Check your email/username and password and try again."),
    );
    const { result } = renderLoginOnSubmit();

    result.current.methods.setValue("identifier", validValues.identifier);
    await act(async () => {
      await result.current.onSubmit(validValues);
    });

    expect(result.current.methods.formState.errors.root?.message).toBe(
      "Invalid login credentials. Check your email/username and password and try again.",
    );
    // Failed submit shouldn't wipe what the user typed.
    expect(result.current.methods.getValues("identifier")).toBe(
      validValues.identifier,
    );
  });

  it("falls back to a generic message when loginAccount throws a non-Error value", async () => {
    loginAccount.mockRejectedValue("network down");
    const { result } = renderLoginOnSubmit();

    await act(async () => {
      await result.current.onSubmit(validValues);
    });

    expect(result.current.methods.formState.errors.root?.message).toBe(
      "Something went wrong. Please try again.",
    );
  });
});
