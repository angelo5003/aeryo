import { useState } from "react";
import { toaster } from "@/components/data-display/Toaster";
import { accountActions } from "../../utilities/accountActions/accountActions";

interface UseDeleteAccountResult {
  deleteAccount: () => Promise<void>;
  loading: boolean;
}

export const useDeleteAccount = (): UseDeleteAccountResult => {
  const { deleteAccount: deleteAccountAction } = accountActions();
  const [loading, setLoading] = useState(false);

  const deleteAccount = async () => {
    setLoading(true);
    try {
      await deleteAccountAction();
    } catch {
      toaster.create({
        title: "Something went wrong",
        description: "Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading };
};
