import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { OnboardingProvider } from "@/app/_providers/Onboarding/Provider/OnboardingProvider";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";
import { useCreateAccountSubmit } from "./useCreateAccountSubmit";

const createAccount = jest.fn();

jest.mock(
  "@/lib/account/accountActions",
  () => ({
    accountActions: () => ({
      createAccount: (...args: unknown[]) => createAccount(...args),
    }),
  }),
);

// OnboardingProvider reads this on mount — stub it so the provider settles
// synchronously instead of leaving `hasCompletedOnboarding` stuck at null.
const hasSeenOnboarding = jest.fn();
const markOnboardingSeen = jest.fn();

jest.mock("@/app/_providers/Onboarding/Provider/onboardingStorage", () => ({
  hasSeenOnboarding: () => hasSeenOnboarding(),
  markOnboardingSeen: () => markOnboardingSeen(),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <OnboardingProvider>{children}</OnboardingProvider>
);

const validValues: CreateAccountValues = {
  email: "user@example.com",
  username: "stormrider",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
};

// Real react-hook-form instance, same as the component wires up — a fake
// object here would let the hook pass without proving reset()/setError()
// land on real form state.
const renderCreateAccountSubmit = () =>
  renderHook(
    () => {
      const methods = useForm<CreateAccountValues>();
      const submit = useCreateAccountSubmit(methods);
      void methods.formState.errors; // touch the proxy — see useCreateAccountForm.test.ts
      return { methods, ...submit };
    },
    { wrapper },
  );

describe("useCreateAccountSubmit", () => {
  beforeEach(() => {
    createAccount.mockReset();
    hasSeenOnboarding.mockReset().mockResolvedValue(false);
    markOnboardingSeen.mockReset().mockResolvedValue(undefined);
  });

  it("completes onboarding and resets the form when signUp returns a session", async () => {
    createAccount.mockResolvedValue({ access_token: "token" });
    const { result } = renderCreateAccountSubmit();

    result.current.methods.setValue("email", validValues.email);
    await act(async () => {
      await result.current.onSubmit(validValues);
    });

    expect(markOnboardingSeen).toHaveBeenCalledTimes(1);
    // reset() with no args reverts to the form's default values — no
    // defaultValues were supplied, so an untouched field goes back to
    // undefined, not "". (register()'s own default is "", but nothing
    // here calls register().)
    expect(result.current.methods.getValues("email")).toBeUndefined();
    expect(result.current.needsConfirmation).toBe(false);
  });

  it("asks to check inbox instead of completing onboarding when signUp returns no session", async () => {
    createAccount.mockResolvedValue(null);
    const { result } = renderCreateAccountSubmit();

    result.current.methods.setValue("email", validValues.email);
    await act(async () => {
      await result.current.onSubmit(validValues);
    });

    expect(markOnboardingSeen).not.toHaveBeenCalled();
    expect(result.current.methods.getValues("email")).toBe(validValues.email);
    expect(result.current.needsConfirmation).toBe(true);
  });

  it("surfaces a thrown signUp error as the form's root error", async () => {
    createAccount.mockRejectedValue(new Error("Email already registered"));
    const { result } = renderCreateAccountSubmit();

    await act(async () => {
      await result.current.onSubmit(validValues);
    });

    expect(result.current.methods.formState.errors.root?.message).toBe(
      "Email already registered",
    );
    expect(markOnboardingSeen).not.toHaveBeenCalled();
    expect(result.current.needsConfirmation).toBe(false);
  });
});
