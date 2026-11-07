import type React from "react";
import { SignedInPageWithTopNavBar } from "@/app/_components/SignedInPageWithTopNavBar";

interface SignedInLayoutWithBackButtonProps {
  children: React.ReactNode;
}

// Same frame as (with-bottom-nav)/layout.tsx, but no BottomBar. The back
// link itself is shown by TopNavBar when the path is /settings.
const SignedInLayoutWithBackButton = ({
  children,
}: SignedInLayoutWithBackButtonProps) => {
  return (
    <SignedInPageWithTopNavBar shouldShowBottomBar={false}>
      {children}
    </SignedInPageWithTopNavBar>
  );
};

export default SignedInLayoutWithBackButton;
