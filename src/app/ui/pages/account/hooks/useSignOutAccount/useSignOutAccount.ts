import { useState } from "react";
import { toaster } from "@/components/data-display/Toaster";
import { accountActions } from "../../utilities/accountActions/accountActions";

interface UseSignOutAccountResult {
  signOut: () => Promise<void>;
  loading: boolean;
}

export const useSignOutAccount = (): UseSignOutAccountResult => {
  const { signOutAccount } = accountActions();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    try {
      await signOutAccount();
    } catch {
      toaster.create({
        title: "Couldn't sign you out",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading };
};
