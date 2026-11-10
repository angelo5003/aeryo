import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";

/**
 * Not a component: a living reference for the Aeryo colors.
 *
 * - **Semantic Tokens** (`src/design-system/theme/semantic-tokens.ts`) are the
 *   colors the app and the prototype use. Pick from this page.
 * - **Primitives** (`src/design-system/tokens/colors.ts`) are the raw palette
 *   the semantic tokens point to. Do not use them in components.
 *
 * Every swatch is rendered by its token name (`bg="bg.panel"`,
 * `bg="ink.900"`, …), never a hardcoded hex, so this page always reflects
 * whatever is registered on the Chakra system.
 */

// Semantic tokens resolve to `var(--chakra-colors-bg)`, not a fixed hex, so
// the swatch reads its own computed background instead. That resolves the
// value for whichever mode wraps the swatch, and works the same for raw
// palette swatches.
const toHex = (channel: number): string =>
  Math.round(channel).toString(16).padStart(2, "0");

const colorToHex = (cssColor: string): string => {
  // Computed colors come back as `rgb(...)`, `rgba(...)` or, for
  // `color-mix`, `color(srgb r g b / a)` (channels 0 to 1).
  const rgbMatch = cssColor.match(/rgba?\(([^)]+)\)/);
  const srgbMatch = cssColor.match(/color\(srgb ([^)]+)\)/);
  let red: number;
  let green: number;
  let blue: number;
  let alpha = 1;
  if (rgbMatch) {
    [red, green, blue, alpha = 1] = rgbMatch[1].split(",").map(Number);
  } else if (srgbMatch) {
    const [channels, alphaText] = srgbMatch[1].split("/");
    [red, green, blue] = channels
      .trim()
      .split(/\s+/)
      .map((channel) => Number(channel) * 255);
    alpha = alphaText === undefined ? 1 : Number(alphaText);
  } else {
    return cssColor;
  }
  // Alpha tokens show as `#RRGGBB @ 40%`, so the transparency is not lost.
  const hex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
  return alpha < 1 ? `${hex} @ ${Math.round(alpha * 100)}%` : hex;
};

const meta = {
  title: "Foundations/Colors",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Swatch = ({
  token,
  onHexResolved,
}: {
  token: string;
  onHexResolved?: (hex: string) => void;
}) => (
  <Box
    ref={(node: HTMLDivElement | null) => {
      if (node)
        onHexResolved?.(colorToHex(getComputedStyle(node).backgroundColor));
    }}
    bg={token}
    // `border` is a deliberately faint hairline, so the darkest swatches would
    // blend into the page. This is a documentation page, not product UI, so
    // it borrows `fg.subtle` for a boundary every swatch keeps.
    borderWidth="1px"
    borderColor="fg.subtle"
    rounded="lg"
    height="14"
    width="full"
  />
);

// One card per token: the same swatch rendered in light mode and in dark
// mode, so both values are visible without switching the toolbar.
const SemanticTokenCard = ({
  token,
  label,
  usedFor,
}: {
  token: string;
  label: string;
  usedFor: string;
}) => {
  const [lightHex, setLightHex] = useState<string>();
  const [darkHex, setDarkHex] = useState<string>();
  return (
    <Stack gap="2">
      <Grid templateColumns="1fr 1fr" gap="2">
        <LightMode>
          <Swatch token={token} onHexResolved={setLightHex} />
        </LightMode>
        <DarkMode>
          <Swatch token={token} onHexResolved={setDarkHex} />
        </DarkMode>
      </Grid>
      <Stack gap="0">
        <Text fontSize="xs" fontWeight="medium" color="fg" fontFamily="mono">
          {label}
        </Text>
        <Text fontSize="xs" color="fg.muted">
          {usedFor}
        </Text>
        <Text fontSize="xs" color="fg.muted" fontFamily="mono">
          Light {lightHex ?? "…"}
        </Text>
        <Text fontSize="xs" color="fg.muted" fontFamily="mono">
          Dark {darkHex ?? "…"}
        </Text>
      </Stack>
    </Stack>
  );
};

const PrimitiveSwatch = ({
  token,
  label,
}: {
  token: string;
  label: string;
}) => {
  const [hex, setHex] = useState<string>();
  return (
    <Stack gap="2">
      <Swatch token={token} onHexResolved={setHex} />
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
};

const Scale = ({ family, steps }: { family: string; steps: number[] }) => (
  <Stack gap="3">
    <Heading as="h3" size="sm" color="fg" textTransform="capitalize">
      {family}
    </Heading>
    <Grid templateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap="4">
      {steps.map((step) => (
        <PrimitiveSwatch
          key={step}
          token={`${family}.${step}`}
          label={String(step)}
        />
      ))}
    </Grid>
  </Stack>
);

type SemanticTokenEntry = { token: string; label: string; usedFor: string };

const SemanticGroup = ({
  title,
  tokens,
}: {
  title: string;
  tokens: SemanticTokenEntry[];
}) => (
  <Stack gap="3">
    <Heading as="h3" size="sm" color="fg">
      {title}
    </Heading>
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="4">
      {tokens.map((entry) => (
        <SemanticTokenCard key={entry.token} {...entry} />
      ))}
    </Grid>
  </Stack>
);

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export const SemanticTokens: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Semantic tokens
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            Use these in the app and the prototype. Each card shows the light
            and the dark value side by side, resolved from the real rendered
            swatch. Alpha colors show as hex @ percent. The raw palette is on
            the Primitives page and is not for components.
          </Text>
        </Stack>

        <SemanticGroup
          title="Surfaces"
          tokens={[
            { token: "bg", label: "bg", usedFor: "Page background" },
            {
              token: "bg.subtle",
              label: "bg.subtle",
              usedFor: "Quiet section",
            },
            {
              token: "bg.muted",
              label: "bg.muted",
              usedFor: "Filled surface, pressed row",
            },
            {
              token: "bg.emphasized",
              label: "bg.emphasized",
              usedFor: "Next lift after muted",
            },
            {
              token: "bg.panel",
              label: "bg.panel",
              usedFor: "Card and sheet background",
            },
            {
              token: "bg.chrome",
              label: "bg.chrome",
              usedFor: "Top bar and tab bar (frosted)",
            },
            {
              token: "bg.photo",
              label: "bg.photo",
              usedFor: "Full-bleed photo canvas",
            },
            {
              token: "bg.scrim",
              label: "bg.scrim",
              usedFor: "Backdrop behind sheets and dialogs",
            },
            {
              token: "bg.overlay.soft",
              label: "bg.overlay.soft",
              usedFor: "Light dimming on photos",
            },
            {
              token: "bg.overlay.medium",
              label: "bg.overlay.medium",
              usedFor: "Glass labels on photos",
            },
            {
              token: "bg.overlay.strong",
              label: "bg.overlay.strong",
              usedFor: "Near-solid bars over photos",
            },
          ]}
        />
        <SemanticGroup
          title="Text"
          tokens={[
            { token: "fg", label: "fg", usedFor: "Main text and icons" },
            {
              token: "fg.emphasized",
              label: "fg.emphasized",
              usedFor: "Labels and list titles",
            },
            { token: "fg.muted", label: "fg.muted", usedFor: "Secondary text" },
            {
              token: "fg.subtle",
              label: "fg.subtle",
              usedFor: "Tertiary text (bg and bg.subtle only)",
            },
            { token: "fg.photo", label: "fg.photo", usedFor: "Text on photos" },
            {
              token: "fg.photo.muted",
              label: "fg.photo.muted",
              usedFor: "Inactive marks on photos",
            },
            {
              token: "fg.metric.top",
              label: "fg.metric.top",
              usedFor: "Top of big wind numbers",
            },
            {
              token: "fg.metric.bottom",
              label: "fg.metric.bottom",
              usedFor: "Bottom of big wind numbers",
            },
          ]}
        />
        <SemanticGroup
          title="Borders"
          tokens={[
            {
              token: "border",
              label: "border",
              usedFor: "Hairlines and row separators",
            },
            {
              token: "border.muted",
              label: "border.muted",
              usedFor: "Quieter hairline",
            },
            {
              token: "border.photo",
              label: "border.photo",
              usedFor: "Hairline on photos and glass",
            },
            {
              token: "border.accent",
              label: "border.accent",
              usedFor: "Selected or active outline",
            },
            {
              token: "border.error",
              label: "border.error",
              usedFor: "Invalid field outline",
            },
          ]}
        />
        <SemanticGroup
          title="Accent"
          tokens={[
            {
              token: "accent.solid",
              label: "accent.solid",
              usedFor: "Primary button, selected chip",
            },
            {
              token: "accent.contrast",
              label: "accent.contrast",
              usedFor: "Text on accent.solid",
            },
            {
              token: "photo.solid",
              label: "photo.solid",
              usedFor: "Light button on a photo",
            },
            {
              token: "photo.accent",
              label: "photo.accent",
              usedFor: "Teal button or badge on a photo",
            },
            {
              token: "photo.contrast",
              label: "photo.contrast",
              usedFor: "Text on photo.solid and photo.accent",
            },
            {
              token: "mark.accent",
              label: "mark.accent",
              usedFor:
                "Progress fill, current step, active-tab dot, best chart bar",
            },
            {
              token: "mark.muted",
              label: "mark.muted",
              usedFor: "Inactive chart bar, switch thumb when off",
            },
            {
              token: "mark.subtle",
              label: "mark.subtle",
              usedFor: "Sheet drag handle",
            },
            {
              token: "mark.strong",
              label: "mark.strong",
              usedFor: "Pin, now line, home indicator",
            },
            {
              token: "bg.inverted",
              label: "bg.inverted",
              usedFor: "Toast, snackbar, Apple sign-in button",
            },
            {
              token: "fg.inverted",
              label: "fg.inverted",
              usedFor: "Text on bg.inverted",
            },
            {
              token: "teal.fg",
              label: "teal.fg",
              usedFor: "Active tab, links, teal text",
            },
          ]}
        />
        <SemanticGroup
          title="Error"
          tokens={[
            { token: "bg.error", label: "bg.error", usedFor: "Error surface" },
            { token: "fg.error", label: "fg.error", usedFor: "Error text" },
            {
              token: "danger.solid",
              label: "danger.solid",
              usedFor: "Delete button",
            },
            {
              token: "danger.contrast",
              label: "danger.contrast",
              usedFor: "Text on danger.solid",
            },
          ]}
        />
        <SemanticGroup
          title="Rider presence"
          tokens={[
            {
              token: "rider.riding",
              label: "rider.riding",
              usedFor: "Riding now",
            },
            {
              token: "rider.planning",
              label: "rider.planning",
              usedFor: "Planning a session",
            },
            {
              token: "rider.offline",
              label: "rider.offline",
              usedFor: "Offline",
            },
          ]}
        />
        <SemanticGroup
          title="Session status"
          tokens={[
            {
              token: "session.planning",
              label: "session.planning",
              usedFor: "Planned",
            },
            {
              token: "session.active",
              label: "session.active",
              usedFor: "Happening now",
            },
            {
              token: "session.completed",
              label: "session.completed",
              usedFor: "Done",
            },
            {
              token: "session.cancelled",
              label: "session.cancelled",
              usedFor: "Cancelled",
            },
          ]}
        />
        <SemanticGroup
          title="Wind intensity"
          tokens={[
            { token: "wind.calm", label: "wind.calm", usedFor: "Calm" },
            { token: "wind.light", label: "wind.light", usedFor: "Light" },
            { token: "wind.good", label: "wind.good", usedFor: "Good" },
            {
              token: "wind.strong",
              label: "wind.strong",
              usedFor: "Strong (lime, wind only)",
            },
            {
              token: "wind.extreme",
              label: "wind.extreme",
              usedFor: "Extreme (safety)",
            },
          ]}
        />
      </Stack>
    </Box>
  ),
};

export const Primitives: Story = {
  name: "Primitives (do not use in components)",
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Primitives
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            The raw scales from src/design-system/tokens/colors.ts. Components
            use the Semantic Tokens page, not these. `teal` (the one primary)
            also works as `colorPalette` on any Chakra component. `lime` is for
            wind data only. `danger`, `caution` and `success` are safety-only,
            never decorative. `paper` is light-mode chrome only.
          </Text>
        </Stack>
        <Scale
          family="ink"
          steps={[
            50, 200, 300, 350, 400, 450, 500, 550, 600, 700, 800, 900, 950,
          ]}
        />
        <Scale family="paper" steps={[0, 50, 100, 200, 300]} />
        <Scale family="teal" steps={[50, 300, 400, 500, 600, 700, 800, 950]} />
        <Scale family="lime" steps={[400, 700]} />
        <Scale family="danger" steps={SCALE_STEPS} />
        <Scale family="caution" steps={SCALE_STEPS} />
        <Scale family="success" steps={SCALE_STEPS} />
      </Stack>
    </Box>
  ),
};
