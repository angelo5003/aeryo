import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Grid, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Not a component — a living reference for the Aeryo color tokens defined in
 * `src/design-system/tokens/colors.ts` (raw palette) and
 * `src/design-system/theme/semantic-tokens.ts` (semantic tokens). Every
 * swatch is rendered by its token name (`bg="ink.900"`, `bg="rider.riding"`,
 * …), never a hardcoded hex, so this page always reflects whatever is
 * actually registered on the Chakra system — if a token changes here, it
 * changes on this page too.
 */
const meta = {
  title: "Foundations/Colors",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ token, label }: { token: string; label: string }) {
  const [resolved] = useToken("colors", token);
  return (
    <Stack gap="2">
      <Box
        bg={token}
        borderWidth="1px"
        borderColor="border"
        rounded="lg"
        height="14"
        width="full"
      />
      <Stack gap="0">
        <Text fontSize="xs" fontWeight="medium" color="fg">
          {label}
        </Text>
        <Text fontSize="xs" color="fg.muted" fontFamily="mono">
          {token} &middot; {resolved}
        </Text>
      </Stack>
    </Stack>
  );
}

function Scale({ family, steps }: { family: string; steps: number[] }) {
  return (
    <Stack gap="3">
      <Heading as="h3" size="sm" color="fg" textTransform="capitalize">
        {family}
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap="4">
        {steps.map((step) => (
          <Swatch key={step} token={`${family}.${step}`} label={String(step)} />
        ))}
      </Grid>
    </Stack>
  );
}

function SemanticGroup({
  title,
  tokens,
}: {
  title: string;
  tokens: { token: string; label: string }[];
}) {
  return (
    <Stack gap="3">
      <Heading as="h3" size="sm" color="fg">
        {title}
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap="4">
        {tokens.map((t) => (
          <Swatch key={t.token} token={t.token} label={t.label} />
        ))}
      </Grid>
    </Stack>
  );
}

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export const RawPalette: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Raw palette
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            The base scales from src/design-system/tokens/colors.ts. `teal` (the
            one primary) also works directly as `colorPalette` on any Chakra
            component. `lime` is reserved for wind data only — see the Wind
            intensity group below, not general UI. `danger`/`caution` are
            safety-only — never reach for them decoratively.
          </Text>
        </Stack>
        <Scale family="ink" steps={SCALE_STEPS} />
        <Scale family="teal" steps={SCALE_STEPS} />
        <Scale family="lime" steps={SCALE_STEPS} />
        <Scale family="danger" steps={SCALE_STEPS} />
        <Scale family="caution" steps={SCALE_STEPS} />
      </Stack>
    </Box>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Semantic tokens
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/theme/semantic-tokens.ts. These carry
            per-mode values, so each swatch shows the CSS variable it resolves
            through rather than a fixed hex — the color you see is whichever
            mode (light/dark) this page is currently rendering in.
          </Text>
        </Stack>

        <SemanticGroup
          title="Surfaces"
          tokens={[
            { token: "bg", label: "bg (DEFAULT)" },
            { token: "bg.subtle", label: "bg.subtle" },
            { token: "bg.muted", label: "bg.muted" },
            { token: "bg.panel", label: "bg.panel" },
            { token: "bg.photo", label: "bg.photo" },
          ]}
        />
        <SemanticGroup
          title="Text"
          tokens={[
            { token: "fg", label: "fg (DEFAULT)" },
            { token: "fg.muted", label: "fg.muted" },
            { token: "fg.subtle", label: "fg.subtle" },
            { token: "fg.photo", label: "fg.photo" },
            { token: "fg.photo.muted", label: "fg.photo.muted" },
          ]}
        />
        <SemanticGroup
          title="Borders"
          tokens={[
            { token: "border", label: "border (DEFAULT)" },
            { token: "border.muted", label: "border.muted" },
          ]}
        />
        <SemanticGroup
          title="Accent"
          tokens={[
            { token: "accent.solid", label: "accent.solid" },
            { token: "accent.contrast", label: "accent.contrast" },
          ]}
        />
        <SemanticGroup
          title="Rider presence"
          tokens={[
            { token: "rider.riding", label: "rider.riding" },
            { token: "rider.planning", label: "rider.planning" },
            { token: "rider.offline", label: "rider.offline" },
          ]}
        />
        <SemanticGroup
          title="Session status"
          tokens={[
            { token: "session.planning", label: "session.planning" },
            { token: "session.active", label: "session.active" },
            { token: "session.completed", label: "session.completed" },
            { token: "session.cancelled", label: "session.cancelled" },
          ]}
        />
        <SemanticGroup
          title="Wind intensity"
          tokens={[
            { token: "wind.calm", label: "wind.calm" },
            { token: "wind.light", label: "wind.light" },
            { token: "wind.good", label: "wind.good" },
            { token: "wind.strong", label: "wind.strong" },
            { token: "wind.extreme", label: "wind.extreme" },
          ]}
        />
      </Stack>
    </Box>
  ),
};
