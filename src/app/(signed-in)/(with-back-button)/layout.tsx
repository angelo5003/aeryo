import type React from "react";

interface SignedInLayoutWithBackButtonProps {
  children: React.ReactNode;
}

const SignedInLayoutWithBackButton = ({
  children,
}: SignedInLayoutWithBackButtonProps) => {
  return <div>{children}</div>;
};

export default SignedInLayoutWithBackButton;
