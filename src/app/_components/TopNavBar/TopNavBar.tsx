import type { FC } from "react";
import { Box } from "@/components/primitives/Box";
import { Text } from "@/components/typography/Text";
import type { TopNavBarProps } from "./TopNavBar.types";

// Temporary (step 6.2b): shows the useInView result so you can see it switch.
// Replaced by the floating glass bar in step 6.4.
const TopNavBar: FC<TopNavBarProps> = ({ pageTitle, isTitleCollapsed }) => {
  return (
    <Box as="header" p="4" bg="bg.subtle">
      <Text aria-hidden>{pageTitle}</Text>
      <Text>{isTitleCollapsed ? "titel weg" : "titel zichtbaar"}</Text>
    </Box>
  );
};

export default TopNavBar;
