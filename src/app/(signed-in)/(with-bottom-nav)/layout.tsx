import type React from "react";

interface SignedInLayoutWithBottomNavProps {
  children: React.ReactNode;
}

const SignedInLayoutWithBottomNav = ({
  children,
}: SignedInLayoutWithBottomNavProps) => {
  return <div>{children}</div>;
};

export default SignedInLayoutWithBottomNav;
