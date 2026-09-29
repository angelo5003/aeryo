"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import type React from "react";
import { useRef, useState } from "react";

const ALWAYS_SHOW_BOTTOM_BAR_WITHIN_TOP_PIXELS = 8;

const MINIMUM_SCROLL_PIXELS_TO_TOGGLE_BOTTOM_BAR = 6;

export const useHideOnScroll = (
  scrollingElementRef: React.RefObject<HTMLElement | null>,
): boolean => {
  const { scrollY: scrollPositionFromTop } = useScroll({
    container: scrollingElementRef,
  });

  const lastCheckedScrollPosition = useRef(0);

  const [isBottomBarHidden, setIsBottomBarHidden] = useState(false);

  useMotionValueEvent(scrollPositionFromTop, "change", (newScrollPosition) => {
    const isNearTopOfPage =
      newScrollPosition < ALWAYS_SHOW_BOTTOM_BAR_WITHIN_TOP_PIXELS;

    const scrolledDistanceInPixels = Math.abs(
      newScrollPosition - lastCheckedScrollPosition.current,
    );

    const isScrollStepTooSmall =
      scrolledDistanceInPixels < MINIMUM_SCROLL_PIXELS_TO_TOGGLE_BOTTOM_BAR;

    const isScrollingDown =
      newScrollPosition > lastCheckedScrollPosition.current;

    if (isNearTopOfPage) {
      setIsBottomBarHidden(false);
      lastCheckedScrollPosition.current = newScrollPosition;
      return; // near the top: always show the bar
    }

    if (isScrollStepTooSmall) {
      return; // too small a step: wait until it adds up
    }

    setIsBottomBarHidden(isScrollingDown);
    lastCheckedScrollPosition.current = newScrollPosition;
  });

  return isBottomBarHidden;
};
