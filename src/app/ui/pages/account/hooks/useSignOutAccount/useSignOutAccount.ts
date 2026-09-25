import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toaster } from "@/components/data-display/Toaster";
import { accountActions } from "../../utilities/accountActions/accountActions";

interface UseSignOutAccountResult {
  signOut: () => Promise<void>;
  loading: boolean;
}

export const useSignOutAccount = (): UseSignOutAccountResult => {
  const { signOutAccount } = accountActions();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Double-tap guard: blocks a second sign-out while the first is still
  // running. Same reason for a ref instead of `loading` as in useDeleteAccount.ts.
  const doubleTapSignOutGuardRef = useRef(false);

  const signOut = async () => {
    if (doubleTapSignOutGuardRef.current) return;
    doubleTapSignOutGuardRef.current = true;
    setLoading(true);
    try {
      await signOutAccount();
      toaster.create({
        title: "Signed out",
        description: "You have been signed out.",
        type: "success",
      });
      router.replace("/login");
    } catch {
      toaster.create({
        title: "Couldn't sign you out",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      doubleTapSignOutGuardRef.current = false;
      setLoading(false);
    }
  };

  return { signOut, loading };
};
