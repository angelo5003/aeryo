import { act, renderHook } from "@testing-library/react";
import { useSignOutAccount } from "./useSignOutAccount";

const signOutAccount = jest.fn();
const toasterCreate = jest.fn();
const mockRouterReplace = jest.fn();
jest.mock(
  "@/lib/account/accountActions",
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

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockRouterReplace,
  }),
}));

describe("useSignOutAccount", () => {
  beforeEach(() => {
    signOutAccount.mockReset();
    toasterCreate.mockReset();
    mockRouterReplace.mockReset();
  });

  it("shows a success toast and redirects to /login when sign-out succeeds", async () => {
    signOutAccount.mockResolvedValue(undefined);
    const { result } = renderHook(() => useSignOutAccount());

    await act(async () => {
      await result.current.signOut();
    });

    expect(signOutAccount).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledWith({
      title: "Signed out",
      description: "You have been signed out.",
      type: "success",
    });
    expect(result.current.loading).toBe(false);
    expect(mockRouterReplace).toHaveBeenCalledWith("/login");
  });

  it("shows an error toast and stays on the page when sign-out fails", async () => {
    signOutAccount.mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useSignOutAccount());

    await act(async () => {
      await result.current.signOut();
    });

    expect(toasterCreate).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledWith({
      title: "Couldn't sign you out",
      description: "Something went wrong. Please try again.",
      type: "error",
    });
    expect(mockRouterReplace).not.toHaveBeenCalled();
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

  it("ignores a second tap while the first sign-out is still in flight", async () => {
    let resolveSignOut: () => void = () => {};
    signOutAccount.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveSignOut = resolve;
      }),
    );
    const { result } = renderHook(() => useSignOutAccount());

    let firstTap: Promise<void> = Promise.resolve();
    let secondTap: Promise<void> = Promise.resolve();
    act(() => {
      firstTap = result.current.signOut();
      secondTap = result.current.signOut();
    });

    await act(async () => {
      resolveSignOut();
      await Promise.all([firstTap, secondTap]);
    });
    expect(signOutAccount).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledTimes(1);
    expect(mockRouterReplace).toHaveBeenCalledTimes(1);
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
