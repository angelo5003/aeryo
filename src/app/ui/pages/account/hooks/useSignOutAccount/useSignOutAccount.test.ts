import { act, renderHook } from "@testing-library/react";
import { useSignOutAccount } from "./useSignOutAccount";

const signOutAccount = jest.fn();
const toasterCreate = jest.fn();

jest.mock(
  "@/app/ui/pages/account/utilities/accountActions/accountActions",
  () => ({
    accountActions: () => ({
      signOutAccount: (...args: unknown[]) => signOutAccount(...args),
    }),
  }),
);

jest.mock("@/components/data-display/Toaster", () => ({
  toaster: {
    create: (...args: unknown[]) => toasterCreate(...args),
  },
}));

describe("useSignOutAccount", () => {
  beforeEach(() => {
    signOutAccount.mockReset();
    toasterCreate.mockReset();
  });

  it("calls signOutAccount when signOut is invoked", async () => {
    signOutAccount.mockResolvedValue(undefined);
    const { result } = renderHook(() => useSignOutAccount());

    await act(async () => {
      await result.current.signOut();
    });

    expect(signOutAccount).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
  });

  it("sets loading true while signOutAccount is in flight, then false", async () => {
    let resolveSignOut: () => void = () => {};
    signOutAccount.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveSignOut = resolve;
      }),
    );
    const { result } = renderHook(() => useSignOutAccount());

    let signOutPromise: Promise<void> = Promise.resolve();
    act(() => {
      signOutPromise = result.current.signOut();
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveSignOut();
      await signOutPromise;
    });
    expect(result.current.loading).toBe(false);
  });

  it("shows an error toast when signOutAccount rejects", async () => {
    signOutAccount.mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useSignOutAccount());

    await act(async () => {
      await result.current.signOut();
    });

    expect(toasterCreate).toHaveBeenCalledWith({
      title: "Couldn't sign you out",
      description: "Something went wrong. Please try again.",
      type: "error",
    });
  });

  it("sets loading back to false even when signOutAccount rejects", async () => {
    signOutAccount.mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useSignOutAccount());

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.loading).toBe(false);
  });
});
