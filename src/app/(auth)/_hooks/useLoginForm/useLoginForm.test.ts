import { act, renderHook } from "@testing-library/react";
import { useLoginForm } from "./useLoginForm";

// react-hook-form's `formState` is a Proxy that only re-renders the hook
// for fields actually read during render — `errors` has to be touched
// here, or `result.current` keeps returning the pre-validation snapshot
// after `trigger()`. See react-hook-form's `useFormState`/proxy docs.
const renderLoginForm = () =>
  renderHook(() => {
    const methods = useLoginForm();
    void methods.formState.errors;
    return methods;
  });

describe("useLoginForm", () => {
  it("wires react-hook-form to loginSchema via the zod resolver", async () => {
    const { result } = renderLoginForm();

    act(() => {
      result.current.setValue("identifier", "not-an-email@");
      result.current.setValue("password", "SecurePass123");
    });
    await act(async () => {
      await result.current.trigger();
    });

    expect(result.current.formState.errors.identifier?.message).toBe(
      "Invalid email address",
    );
  });

  it("reports no errors once the values satisfy the schema", async () => {
    const { result } = renderLoginForm();

    act(() => {
      result.current.setValue("identifier", "user@example.com");
      result.current.setValue("password", "SecurePass123");
    });
    await act(async () => {
      await result.current.trigger();
    });

    expect(result.current.formState.errors).toEqual({});
  });

  it("rejects a username identifier shorter than 4 characters", async () => {
    const { result } = renderLoginForm();

    act(() => {
      result.current.setValue("identifier", "ab");
      result.current.setValue("password", "SecurePass123");
    });
    await act(async () => {
      await result.current.trigger();
    });

    expect(result.current.formState.errors.identifier?.message).toBe(
      "Username must be at least 4 characters",
    );
  });
});
