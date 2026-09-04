import type React from "react";
import { Separator } from "@/components/primitives/Separator/Separator";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Text } from "@/components/typography/Text/Text";

const ContinueWithBox: React.FC = () => {
  return (
    <Stack direction="column" align="center" gap="4" width="full">
      <Stack direction="row" align="center" gap="4" width="full">
        <Separator flex="1" borderColor="red" />
        <Text flexShrink="0">Continue with</Text>
        <Separator flex="1" borderColor="red" />
      </Stack>
    </Stack>
  );
};

export default ContinueWithBox;
