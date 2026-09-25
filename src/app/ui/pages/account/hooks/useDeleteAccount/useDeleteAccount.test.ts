import { act, renderHook } from "@testing-library/react";
import { useDeleteAccount } from "./useDeleteAccount";

const deleteAccount = jest.fn();
const toasterCreate = jest.fn();
const mockRouterReplace = jest.fn();

jest.mock(
  "@/app/ui/pages/account/utilities/accountActions/accountActions",
  () => ({
    accountActions: () => ({
      deleteAccount: (...args: unknown[]) => deleteAccount(...args),
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

describe("useDeleteAccount", () => {
  beforeEach(() => {
    deleteAccount.mockReset();
    toasterCreate.mockReset();
    mockRouterReplace.mockReset();
  });

  it("shows a success toast and redirects to /signup when the delete succeeds", async () => {
    deleteAccount.mockResolvedValue(undefined);
    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(deleteAccount).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledWith({
      title: "Account deleted",
      description: "Your account and data have been removed.",
      type: "success",
    });
    expect(mockRouterReplace).toHaveBeenCalledWith("/signup");
  });

  it("shows an error toast and stays on the page when the delete fails", async () => {
    deleteAccount.mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(toasterCreate).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledWith({
      title: "Something went wrong",
      description: "Please try again.",
      type: "error",
    });
    expect(mockRouterReplace).not.toHaveBeenCalled();
  });

  it("sets loading true while deleteAccount is in flight, then false", async () => {
    // Test decides when the delete finishes, so the in-flight state is
    // real, not a timing accident. matches useSignOutAccount.test.ts
    let resolveDelete: () => void = () => {};
    deleteAccount.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveDelete = resolve;
      }),
    );
    const { result } = renderHook(() => useDeleteAccount());

    let deletePromise: Promise<void> = Promise.resolve();
    act(() => {
      deletePromise = result.current.deleteAccount();
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveDelete();
      await deletePromise;
    });
    expect(result.current.loading).toBe(false);
    expect(deleteAccount).toHaveBeenCalledTimes(1);
  });

  it("ignores a second tap while the first delete is still in flight", async () => {
    let resolveDelete: () => void = () => {};
    deleteAccount.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveDelete = resolve;
      }),
    );
    const { result } = renderHook(() => useDeleteAccount());

    // Both taps in one act: same render, so both calls see the same closure.
    let firstTap: Promise<void> = Promise.resolve();
    let secondTap: Promise<void> = Promise.resolve();
    act(() => {
      firstTap = result.current.deleteAccount();
      secondTap = result.current.deleteAccount();
    });

    await act(async () => {
      resolveDelete();
      await Promise.all([firstTap, secondTap]);
    });
    expect(deleteAccount).toHaveBeenCalledTimes(1);
  });

  it("allows a retry after a failed delete", async () => {
    deleteAccount.mockRejectedValueOnce(new Error("network error"));
    deleteAccount.mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });
    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(deleteAccount).toHaveBeenCalledTimes(2);
  });

  it("sets loading back to false even when deleteAccount rejects", async () => {
    deleteAccount.mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(result.current.loading).toBe(false);
  });
});
