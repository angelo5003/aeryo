import { act, renderHook } from "@testing-library/react";
import { useDeleteAccount } from "./useDeleteAccount";

const deleteAccount = jest.fn();
const toasterCreate = jest.fn();

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

describe("useDeleteAccount", () => {
  beforeEach(() => {
    deleteAccount.mockReset();
    toasterCreate.mockReset();
  });

  it("deletes the account without showing a toast when deletion succeeds", async () => {
    deleteAccount.mockResolvedValue(undefined);
    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(deleteAccount).toHaveBeenCalledTimes(1);
    expect(toasterCreate).not.toHaveBeenCalled();
  });

  it("sets loading true while deleteAccount is in flight, then false", async () => {
    deleteAccount.mockResolvedValue(undefined);
    const { result } = renderHook(() => useDeleteAccount());

    let deletePromise: Promise<void> = Promise.resolve();
    act(() => {
      deletePromise = result.current.deleteAccount();
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      await deletePromise;
    });
    expect(result.current.loading).toBe(false);
    expect(deleteAccount).toHaveBeenCalledTimes(1);
  });

  it("shows an error toast when deleteAccount rejects", async () => {
    deleteAccount.mockRejectedValue(new Error("network error"));
    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(toasterCreate).toHaveBeenCalledWith({
      title: "Something went wrong",
      description: "Please try again.",
      type: "error",
    });
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
