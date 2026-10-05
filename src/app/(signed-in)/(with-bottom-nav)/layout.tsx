"use client";

import type React from "react";
import { useRef } from "react";
import { BottomBar } from "@/app/_components/BottomTabBar";
import { useHideOnScroll } from "@/app/_hooks/useHideOnScroll/useHideOnScroll";
import { Box } from "@/components/primitives/Box";

interface SignedInLayoutWithBottomNavProps {
  children: React.ReactNode;
}

const SignedInLayoutWithBottomNav = ({
  children,
}: SignedInLayoutWithBottomNavProps) => {
  const scrollingElementRef = useRef<HTMLDivElement>(null);
  const isBottomBarHidden = useHideOnScroll(scrollingElementRef);

  return (
    // flex/minH: body is a fixed flex column (globals.css), so this box
    // takes the remaining height and scrolls instead of growing.
    // pb: room for the floating BottomBar (~62px bar + 12px gap) so the
    // last item on a tab page isn't hidden under it.
    <Box ref={scrollingElementRef} flex="1" minH="0" overflowY="auto" pb="20">
      {children}
      <BottomBar isBottomBarHidden={isBottomBarHidden} />
    </Box>
  );
};

export default SignedInLayoutWithBottomNav;
