"use client";

import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useBackLinkProperties } from "@/app/_hooks/useBackLinkProperties/useBackLinkProperties";
import { routes } from "@/app/_routes/routes";
import { Box } from "@/components/primitives/Box";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Text } from "@/components/typography/Text";
import { AccountSettingsCTA } from "./AccountSettingsCTA";
import { BackLink } from "./BackLink";
import type { TopNavBarProps } from "./TopNavBar.types";

// Temporary (step 6.2b): shows the useInView result so you can see it switch.
// Replaced by the floating glass bar in step 6.4.
const TopNavBar: FC<TopNavBarProps> = ({ pageTitle, isTitleCollapsed }) => {
  const pathName = usePathname();
  const showSettings = pathName === routes.profile.href;
  const backLinkProperties = useBackLinkProperties();

  // Pages with a parent page show only the back arrow, without a background or title.
  if (backLinkProperties) {
    return (
      <Box as="header" p="4">
        <BackLink
          href={backLinkProperties.href}
          label={backLinkProperties.label}
        />
      </Box>
    );
  }

  return (
    <Box as="header" p="4" bg="bg.subtle">
      <Stack direction="row" justify="space-between" align="center">
        <Text aria-hidden>{pageTitle}</Text>
        <Text>{isTitleCollapsed ? "titel weg" : "titel zichtbaar"}</Text>
        {showSettings && <AccountSettingsCTA href={routes.settings.href} />}
      </Stack>
    </Box>
  );
};

export default TopNavBar;
