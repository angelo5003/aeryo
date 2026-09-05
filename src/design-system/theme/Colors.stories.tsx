import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";

/**
 * Not a component — a living reference for the Aeryo color tokens defined in
 * `src/design-system/tokens/colors.ts` (raw palette) and
 * `src/design-system/theme/semantic-tokens.ts` (semantic tokens). Every
 * swatch is rendered by its token name (`bg="ink.900"`, `bg="rider.riding"`,
 * …), never a hardcoded hex, so this page always reflects whatever is
 * actually registered on the Chakra system — if a token changes here, it
 * changes on this page too.
 */

// Semantic tokens resolve to `var(--chakra-colors-bg)` etc, not a fixed hex
// (see semantic-tokens.ts — per-mode via _light/_dark). `useToken` returns
// that unresolved var reference, which isn't useful on this reference page:
// you want to know *which color it actually is*. Reading the swatch's own
// computed background instead resolves it for whichever mode is currently
// rendering, and works identically for raw palette swatches (already plain
// hex) — one code path for both.
function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\(([^)]+)\)/);
  if (!match) return rgb;
  const [r, g, b, a = 1] = match[1].split(",").map(Number);
  const hex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  // Alpha-carrying tokens (e.g. `border` in dark mode, `fg.photo.muted`)
  // get an 8-digit hex so the transparency isn't silently dropped.
  return `#${hex(r)}${hex(g)}${hex(b)}${a < 1 ? hex(a * 255) : ""}`.toUpperCase();
}
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
  const [hex, setHex] = useState<string>();
  return (
    <Stack gap="2">
      <Box
        ref={(node: HTMLDivElement | null) => {
          if (node) setHex(rgbToHex(getComputedStyle(node).backgroundColor));
        }}
        bg={token}
        // `border`, not `border.muted` — and still not enough on its own.
        // `border` is a deliberately faint ~1.5:1 hairline (see
        // semantic-tokens.ts), so the darkest ramp steps (ink.950,
        // teal.950, lime.950) can read as blending into Storybook's own
        // dark chrome rather than as a distinct swatch (critique-flagged).
        // This is a documentation page, not product UI, so it borrows
        // `fg.subtle` at low width for a boundary every swatch keeps
        // regardless of how dark its own fill is — product surfaces still
        // use the faint `border` hairline; this override doesn't apply
        // there.
        borderWidth="1px"
        borderColor="fg.subtle"
        rounded="lg"
        height="14"
        width="full"
      />
      <Stack gap="0">
        <Text fontSize="xs" fontWeight="medium" color="fg">
          {label}
        </Text>
        <Text fontSize="xs" color="fg.muted" fontFamily="mono">
          {token} &middot; {hex ?? "…"}
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
            per-mode values, so the hex shown underneath each swatch is
            whichever mode (light/dark) this page is currently rendering in,
            resolved from the actual rendered swatch — not a static lookup.
          </Text>
        </Stack>

        <SemanticGroup
          title="Surfaces"
          tokens={[
            { token: "bg", label: "bg (DEFAULT)" },
            { token: "bg.subtle", label: "bg.subtle" },
            { token: "bg.muted", label: "bg.muted" },
            { token: "bg.emphasized", label: "bg.emphasized" },
            { token: "bg.panel", label: "bg.panel" },
            { token: "bg.photo", label: "bg.photo" },
          ]}
        />
        <SemanticGroup
          title="Text"
          tokens={[
            { token: "fg", label: "fg (DEFAULT)" },
            { token: "fg.emphasized", label: "fg.emphasized" },
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
