import type React from "react";
import { Separator } from "@/components/primitives/Separator/Separator";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Text } from "@/components/typography/Text/Text";

const ContinueWithBox: React.FC = () => {
  return (
    <Stack direction="column" align="center" gap="4" width="full" as="section">
      <Stack direction="row" align="center" gap="4" width="full">
        <Separator flex="1" borderColor="bg.emphasized" />
        <Text flexShrink="0">OR CONTINUE WITH</Text>
        <Separator flex="1" borderColor="bg.emphasized" />
      </Stack>
      <Stack
        direction="row"
        align="center"
        gap="4"
        flexWrap="wrap"
        as="ul"
        justifyContent="center"
        alignItems="center"
      >
        <li>Google</li>
        <li>Facebook</li>
        <li>Apple</li>
      </Stack>
    </Stack>
  );
};

export default ContinueWithBox;
