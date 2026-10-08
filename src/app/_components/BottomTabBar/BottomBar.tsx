"use client";
import { Icon } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type React from "react";
import { Box } from "@/components/primitives/Box";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Link } from "@/components/typography/Link";
import { navItems } from "./navItems";

export interface BottomBarProps {
  isBottomBarHidden: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({ isBottomBarHidden }) => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    // asChild: Box keeps token props (left={4} = 16px, zIndex) and hands
    // them to motion.div, matches src/components/typography/Link/Link.tsx.
    // Fixed position lives on the animated element itself, so the
    // transform moves the bar instead of re-anchoring it.
    <Box
      asChild
      position="fixed"
      bottom="calc(var(--safe-bottom) + 12px)"
      left={4}
      right={4}
      zIndex="sticky"
      // inert: hidden bar can't be tapped or tabbed to (matters for the
      // reduced-motion fade, where it stays on screen at opacity 0).
      inert={isBottomBarHidden}
      data-testid="bottom-bar"
    >
      <motion.div
        animate={
          reduceMotion
            ? { opacity: isBottomBarHidden ? 0 : 1 }
            : // ponytail: 200% of bar height (~124px) clears bar + 12px gap +
              // safe-bottom up to ~50px; switch to a measured px value if a
              // device inset ever exceeds that.
              { y: isBottomBarHidden ? "200%" : "0%" }
        }
        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      >
        <Stack
          as="nav"
          aria-label="Main"
          bg="bg.chrome"
          backdropFilter="auto"
          backdropBlur="md"
          borderWidth="1px"
          borderColor="border"
          rounded="full"
          shadow="lg"
        >
          <Stack
            as="ul"
            direction="row"
            align="center"
            justify="space-around"
            py={1}
            px={2}
          >
            {navItems.map((navItem) => {
              const isCurrentPage =
                pathname === navItem.href ||
                pathname.startsWith(navItem.href + "/");
              return (
                <Box as="li" key={navItem.href} flex={1}>
                  <Link
                    href={navItem.href}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    position="relative"
                    p={2}
                    color="fg"
                    _currentPage={{ color: "teal.fg", fontWeight: "semibold" }}
                    aria-current={isCurrentPage ? "page" : undefined}
                    _active={{
                      color: isCurrentPage ? "teal.fg" : "fg",
                      transform: "scale(0.94)",
                    }}
                    _visited={{ color: "fg" }}
                    minW={11}
                    minH={11}
                    _hover={{ textDecoration: "none" }}
                    transition="transform {durations.fast} {easings.easeOut}"
                  >
                    <Icon as={navItem.tabBarIcon} size="md" aria-hidden />
                    {navItem.label}
                    {isCurrentPage && (
                      // Dot under the active tab; absolute so the label never shifts.
                      <Box
                        aria-hidden
                        position="absolute"
                        bottom="0.5"
                        left="0"
                        right="0"
                        mx="auto"
                        boxSize="1"
                        rounded="full"
                        bg="teal.fg"
                      />
                    )}
                  </Link>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default BottomBar;
