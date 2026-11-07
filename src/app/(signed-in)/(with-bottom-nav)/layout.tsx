import type React from "react";
import { SignedInPageWithTopNavBar } from "@/app/_components/SignedInPageWithTopNavBar";

interface SignedInLayoutWithBottomNavProps {
  children: React.ReactNode;
}

// No "use client": this only passes children on. The client code lives in
// SignedInPageWithTopNavBar. Server Components run at `next build` and ship
// as static HTML, per node_modules/next/dist/docs/01-app/02-guides/static-exports.md
const SignedInLayoutWithBottomNav = ({
  children,
}: SignedInLayoutWithBottomNavProps) => {
  return (
    <SignedInPageWithTopNavBar shouldShowBottomBar>
      {children}
    </SignedInPageWithTopNavBar>
  );
};

export default SignedInLayoutWithBottomNav;
