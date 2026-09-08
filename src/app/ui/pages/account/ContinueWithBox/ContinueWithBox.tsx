import type React from "react";
import { Separator } from "@/components/primitives/Separator/Separator";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Link } from "@/components/typography/Link/Link";
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
      <Stack direction="column" gap="4" as="ul" width="full">
        <SocialAccountCTA />
      </Stack>
      <Stack
        direction="row"
        align="center"
        justify="center"
        gap="1"
        flexWrap="wrap"
      >
        <Text color="fg.muted" fontSize="md">
          Already have an account?
        </Text>
        <Link href="#" fontWeight="medium" color="rider.riding" fontSize="md">
          Log in
        </Link>
      </Stack>
    </Stack>
  );
};

export default ContinueWithBox;
