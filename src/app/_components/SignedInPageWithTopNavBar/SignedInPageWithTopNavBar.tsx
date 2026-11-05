"use client";

import { useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useRef } from "react";
import { BottomBar } from "@/app/_components/BottomTabBar";
import { TopNavBar } from "@/app/_components/TopNavBar";
import { useHideOnScroll } from "@/app/_hooks/useHideOnScroll/useHideOnScroll";
import { getRiderRoutes } from "@/app/_routes/routes";
import { Box } from "@/components/primitives/Box";
import { Heading } from "@/components/typography/Heading";
import type { SignedInPageWithTopNavBarProps } from "./SignedInPageWithTopNavBar.types";

// Moved from src/app/(signed-in)/(with-bottom-nav)/layout.tsx so the tab
// pages and Settings share one frame; only the BottomBar differs.
const SignedInPageWithTopNavBar: FC<SignedInPageWithTopNavBarProps> = ({
  children,
  shouldShowBottomBar,
}) => {
  const scrollingElementRef = useRef<HTMLDivElement>(null);
  // Always called (rules of hooks), even when there is no BottomBar.
  const isBottomBarHidden = useHideOnScroll(scrollingElementRef);

  const largeTitleRef = useRef<HTMLHeadingElement>(null);
  // per node_modules/framer-motion/dist/index.d.ts (useInView, UseInViewOptions)
  // initial: true, so the bar doesn't flash as merged before the observer reports.
  const isLargeTitleVisible = useInView(largeTitleRef, {
    root: scrollingElementRef,
    initial: true,
  });

  const pathname = usePathname();
  const pageTitle =
    getRiderRoutes().find((route) => route.href === pathname)?.label ?? "";

  return (
    // flex/minH: body is a fixed flex column (globals.css), so this box
    // takes the remaining height. The TopNavBar sits outside the scrolling
    // box, so it stays put while the large title scrolls away under it.
    <Box flex="1" minH="0" display="flex" flexDirection="column">
      <TopNavBar
        pageTitle={pageTitle}
        isTitleCollapsed={!isLargeTitleVisible}
      />
      {/* pb: room for the floating BottomBar (~62px bar + 12px gap) so the
          last item on a tab page isn't hidden under it. Without the bar no
          extra padding: body already pads by --safe-bottom (globals.css). */}
      <Box
        ref={scrollingElementRef}
        flex="1"
        minH="0"
        overflowY="auto"
        pb={shouldShowBottomBar ? "20" : undefined}
      >
        <Heading as="h2" variant="display" ref={largeTitleRef} px="4">
          {pageTitle}
        </Heading>
        {children}
        {shouldShowBottomBar && (
          <BottomBar isBottomBarHidden={isBottomBarHidden} />
        )}
      </Box>
    </Box>
  );
};

export default SignedInPageWithTopNavBar;
