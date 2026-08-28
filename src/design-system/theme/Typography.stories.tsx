import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Stack, Text, useToken } from "@chakra-ui/react";
import { Heading } from "@/components/typography/Heading";
import { Text as AeryoText } from "@/components/typography/Text";

/**
 * Living reference for the Aeryo type tokens in
 * `src/design-system/tokens/typography.ts`. Raw scale steps are read live
 * via `useToken`; the textStyle previews apply `textStyle="..."` directly
 * so what you see is the real resolved style, not a re-typed description.
 */
const meta = {
  title: "Foundations/Typography",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ScaleRow({
  category,
  token,
  sample,
}: {
  category: "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings";
  token: string;
  sample: string;
}) {
  const [resolved] = useToken(category, token);
  const propMap = {
    fontSizes: "fontSize",
    fontWeights: "fontWeight",
    lineHeights: "lineHeight",
    letterSpacings: "letterSpacing",
  } as const;
  const prop = propMap[category];

  return (
    <Stack direction="row" gap="6" align="baseline">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted" width="32">
        {token} &middot; {String(resolved)}
      </Text>
      <Text {...{ [prop]: token }} color="fg">
        {sample}
      </Text>
    </Stack>
  );
}

function TextStyleRow({ name }: { name: string }) {
  const onPhoto = name.endsWith(".photo");
  return (
    <Box
      bg={onPhoto ? "bg.photo" : undefined}
      px={onPhoto ? "4" : undefined}
      py={onPhoto ? "3" : undefined}
      rounded={onPhoto ? "md" : undefined}
    >
      <Stack gap="1">
        <Text
          fontSize="xs"
          fontFamily="mono"
          color={onPhoto ? "fg.photo.muted" : "fg.muted"}
        >
          textStyle=&quot;{name}&quot;
        </Text>
        <Text textStyle={name} color={onPhoto ? "fg.photo" : "fg"}>
          Wind first. Reduce complexity.
        </Text>
      </Stack>
    </Box>
  );
}

export const Typography: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" variant="title" color="fg">
            Typography
          </Heading>
          <AeryoText variant="caption" color="fg.muted">
            From src/design-system/tokens/typography.ts. Display/heading/title
            are Sora (never below title); body/caption/label are Manrope;
            body.photo/label.photo compensate light type on a dark photograph;
            mono is Geist Mono for data.
          </AeryoText>
        </Stack>

        <Stack gap="3">
          <AeryoText variant="label" color="fg.muted">
            Font sizes
          </AeryoText>
          {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"].map(
            (t) => (
              <ScaleRow key={t} category="fontSizes" token={t} sample="Aa" />
            ),
          )}
        </Stack>

        <Stack gap="3">
          <AeryoText variant="label" color="fg.muted">
            Font weights
          </AeryoText>
          {["normal", "medium", "semibold", "bold", "extrabold"].map((t) => (
            <ScaleRow
              key={t}
              category="fontWeights"
              token={t}
              sample="Wind is the central product concept"
            />
          ))}
        </Stack>

        <Stack gap="3">
          <AeryoText variant="label" color="fg.muted">
            Line heights
          </AeryoText>
          {["tight", "normal", "relaxed"].map((t) => (
            <ScaleRow
              key={t}
              category="lineHeights"
              token={t}
              sample="Should I ride? Where should I go? How was my session?"
            />
          ))}
        </Stack>

        <Stack gap="3">
          <AeryoText variant="label" color="fg.muted">
            Letter spacing
          </AeryoText>
          {["tight", "normal", "wide", "wider"].map((t) => (
            <ScaleRow
              key={t}
              category="letterSpacings"
              token={t}
              sample="AERYO"
            />
          ))}
        </Stack>

        <Stack gap="4">
          <AeryoText variant="label" color="fg.muted">
            Text styles
          </AeryoText>
          {[
            "display",
            "heading",
            "title",
            "body",
            "caption",
            "label",
            "body.photo",
            "label.photo",
          ].map((name) => (
            <TextStyleRow key={name} name={name} />
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};
