import type React from "react";
import { Fragment } from "react";
import { BottomBar } from "@/app/_components/BottomTabBar";

interface SignedInLayoutWithBottomNavProps {
  children: React.ReactNode;
}

const SignedInLayoutWithBottomNav = ({
  children,
}: SignedInLayoutWithBottomNavProps) => {
  return (
    <Fragment>
      {children}
      <BottomBar isBottomBarHidden={false} />
    </Fragment>
  );
};

export default SignedInLayoutWithBottomNav;
