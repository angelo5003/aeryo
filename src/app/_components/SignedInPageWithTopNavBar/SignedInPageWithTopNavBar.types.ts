import type React from "react";

export interface SignedInPageWithTopNavBarProps {
  children: React.ReactNode;
  /** True on tab pages (floating BottomBar), false on pages like Settings. */
  shouldShowBottomBar: boolean;
}
