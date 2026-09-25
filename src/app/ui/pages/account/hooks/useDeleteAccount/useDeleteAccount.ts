import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toaster } from "@/components/data-display/Toaster";
import { accountActions } from "../../utilities/accountActions/accountActions";

interface UseDeleteAccountResult {
  deleteAccount: () => Promise<void>;
  loading: boolean;
}

export const useDeleteAccount = (): UseDeleteAccountResult => {
  const { deleteAccount: deleteAccountAction } = accountActions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Double-tap guard: blocks a second delete while the first is still running.
  // This is a ref, not the `loading` state, because a ref updates instantly.
  // `loading` only changes after React re-renders, so without this ref a fast
  // second tap would still read `false` and send a second delete request.
  // The ref is already `true` by then, so the second tap stops at the `return`.
  const doubleTapDeleteGuardRef = useRef(false);

  const deleteAccount = async () => {
    if (doubleTapDeleteGuardRef.current) return;
    doubleTapDeleteGuardRef.current = true;
    setLoading(true);
    try {
      await deleteAccountAction();
      toaster.create({
        title: "Account deleted",
        description: "Your account and data have been removed.",
        type: "success",
      });
      router.replace("/signup");
    } catch {
      toaster.create({
        title: "Something went wrong",
        description: "Please try again.",
        type: "error",
      });
    } finally {
      doubleTapDeleteGuardRef.current = false;
      setLoading(false);
    }
  };

  return { deleteAccount, loading };
};
