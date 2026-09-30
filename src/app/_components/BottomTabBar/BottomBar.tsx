"use client";
import { Icon } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import type React from "react";
import { Box } from "@/components/primitives/Box";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Link } from "@/components/typography/Link";
import { navItems } from "./navItems";

export interface BottomBarProps {
  isBottomBarHidden: boolean;
}

const BottomBar: React.FC<BottomBarProps> = () => {
  const pathname = usePathname();

  return (
    <Stack
      as="nav"
      aria-label="Main"
      position="fixed"
      bottom={"calc(var(--safe-bottom) + 12px)"}
      left={4}
      right={4}
      zIndex="sticky"
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
            <Box as="li" key={navItem.id}>
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
                _active={{ color: isCurrentPage ? "teal.fg" : "fg" }}
                _visited={{ color: "fg" }}
                minW={10}
                minH={10}
              >
                <Icon as={navItem.icon} size="md" aria-hidden />
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
  );
};

export default BottomBar;
