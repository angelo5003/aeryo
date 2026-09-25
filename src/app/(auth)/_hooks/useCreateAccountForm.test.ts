import { act, renderHook } from "@testing-library/react";
import { useCreateAccountForm } from "./useCreateAccountForm";

// react-hook-form's `formState` is a Proxy that only re-renders the hook
// for fields actually read during render — `errors` has to be touched
// here, or `result.current` keeps returning the pre-validation snapshot
// after `trigger()`. See react-hook-form's `useFormState`/proxy docs.
const renderCreateAccountForm = () =>
  renderHook(() => {
    const methods = useCreateAccountForm();
    void methods.formState.errors;
    return methods;
  });

describe("useCreateAccountForm", () => {
  it("wires react-hook-form to createAccountSchema via the zod resolver", async () => {
    const { result } = renderCreateAccountForm();

    act(() => {
      result.current.setValue("email", "not-an-email");
      result.current.setValue("username", "stormrider");
      result.current.setValue("password", "SecurePass123");
      result.current.setValue("confirmPassword", "SecurePass123");
    });
    await act(async () => {
      await result.current.trigger();
    });

    expect(result.current.formState.errors.email?.message).toBe(
      "Invalid email address",
    );
  });

  it("reports no errors once the values satisfy the schema", async () => {
    const { result } = renderCreateAccountForm();

    act(() => {
      result.current.setValue("email", "user@example.com");
      result.current.setValue("username", "stormrider");
      result.current.setValue("password", "SecurePass123");
      result.current.setValue("confirmPassword", "SecurePass123");
    });
    await act(async () => {
      await result.current.trigger();
    });

    expect(result.current.formState.errors).toEqual({});
  });

  it("rejects a username shorter than 4 characters", async () => {
    const { result } = renderCreateAccountForm();

    act(() => {
      result.current.setValue("email", "user@example.com");
      result.current.setValue("username", "ab");
      result.current.setValue("password", "SecurePass123");
      result.current.setValue("confirmPassword", "SecurePass123");
    });
    await act(async () => {
      await result.current.trigger();
    });

    expect(result.current.formState.errors.username?.message).toBe(
      "Username must be at least 4 characters",
    );
  });
});
