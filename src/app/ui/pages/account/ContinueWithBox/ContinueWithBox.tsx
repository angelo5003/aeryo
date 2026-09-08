import type React from "react";
import { Separator } from "@/components/primitives/Separator/Separator";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Text } from "@/components/typography/Text/Text";
import SocialAccountCTA from "../SocialAccount/SocialAccountCTA";

const CONTINUE_WITH_LABEL_ID = "continue-with";

const ContinueWithBox: React.FC = () => {
  return (
    <Stack
      direction="column"
      align="stretch"
      gap="8"
      width="full"
      as="section"
      aria-labelledby={CONTINUE_WITH_LABEL_ID}
    >
      <Stack direction="row" align="center" gap="4" width="full">
        <Separator flex="1" borderColor="bg.emphasized" aria-hidden="true" />
        <Text
          id={CONTINUE_WITH_LABEL_ID}
          flexShrink="0"
          textTransform="uppercase"
          as="p"
        >
          Or Continue With
        </Text>
        <Separator flex="1" borderColor="bg.emphasized" aria-hidden="true" />
      </Stack>
      <Stack direction="column" gap="3" as="ul" width="full">
        <SocialAccountCTA />
      </Stack>
    </Stack>
  );
};

export default ContinueWithBox;
