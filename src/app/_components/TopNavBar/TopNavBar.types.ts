import type React from "react";

export interface TopNavBarProps {
  pageTitle: string;
  /** True once the large page title is out of view (from framer-motion useInView in the layout). */
  isTitleCollapsed: boolean;
  leftSideButton?: React.ReactNode;
  rightSideButton?: React.ReactNode;
}
