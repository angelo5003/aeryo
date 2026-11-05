/**
 * Writes `tokens.json` from the tokens the app actually uses, so nothing is
 * retyped by hand. Also prints a contrast report for each text and ground pair.
 * Run from the repository root: node docs/design-system/build/generate-tokens.mjs
 */
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { build } from "esbuild";

const SOURCE_REF = process.argv[2] ?? "unknown";

const loadSourceModule = async (sourceFile) => {
  const temporaryFolder = await mkdtemp(
    path.join(os.tmpdir(), "aeryo-tokens-"),
  );
  const outputFile = path.join(temporaryFolder, "module.mjs");
  await build({
    entryPoints: [sourceFile],
    outfile: outputFile,
    bundle: true,
    format: "esm",
    logLevel: "silent",
  });
  const loadedModule = await import(outputFile);
  await rm(temporaryFolder, { recursive: true, force: true });
  return loadedModule;
};

const { colors } = await loadSourceModule("src/design-system/tokens/colors.ts");
const { semanticTokens } = await loadSourceModule(
  "src/design-system/theme/semantic-tokens.ts",
);
const { spacing } = await loadSourceModule(
  "src/design-system/tokens/spacing.ts",
);
const { radii } = await loadSourceModule("src/design-system/tokens/radii.ts");
const { breakpoints } = await loadSourceModule(
  "src/design-system/tokens/breakpoints.ts",
);
const { fontSizes, fontWeights, lineHeights, letterSpacings, textStyles } =
  await loadSourceModule("src/design-system/tokens/typography.ts");

const getPrimitiveHex = (colorPath) => {
  const [family, step] = colorPath.split(".");
  return colors[family][step].value.toLowerCase();
};

const convertPercentToHexAlpha = (percent) =>
  Math.round((Number(percent) / 100) * 255)
    .toString(16)
    .padStart(2, "0");

/** Turns one source value into a form the design system page can read. */
const convertColorValue = (sourceValue) => {
  if (sourceValue === "white") return "#ffffff";

  const colorMixMatch = sourceValue.match(
    /^color-mix\(in srgb, \{colors\.([\w.]+)\} (\d+)%, transparent\)$/,
  );
  if (colorMixMatch) {
    const [, colorPath, percent] = colorMixMatch;
    return getPrimitiveHex(colorPath) + convertPercentToHexAlpha(percent);
  }

  const referenceWithAlphaMatch = sourceValue.match(
    /^\{colors\.([\w.]+)\/(\d+)\}$/,
  );
  if (referenceWithAlphaMatch) {
    const [, colorPath, percent] = referenceWithAlphaMatch;
    return getPrimitiveHex(colorPath) + convertPercentToHexAlpha(percent);
  }

  const referenceMatch = sourceValue.match(/^\{colors\.([\w.]+)\}$/);
  if (referenceMatch) return `{${referenceMatch[1].replace(".", "-")}}`;

  return sourceValue.startsWith("#") ? sourceValue.toLowerCase() : sourceValue;
};

const convertShadowValue = (sourceValue) =>
  sourceValue.replace(
    /\{colors\.([\w.]+)\/(\d+)\}/g,
    (_, colorPath, percent) =>
      `${getPrimitiveHex(colorPath)}${convertPercentToHexAlpha(percent)}`,
  );

const RAMP_USAGE = {
  ink: "Atmospheric scale. Reach it through `bg`, `fg` and `border`, not directly.",
  paper:
    "Cool near-white for light-mode chrome only. Reach it through `bg` and `border`.",
  teal: "The one brand primary. Reach it through `accent-solid` and the `teal-*` palette roles.",
  lime: "Wind data only, through `wind-strong`. Never on a button, badge or chrome.",
  danger:
    "Safety and status only, through the `danger-*` roles. Never decoration.",
  caution:
    "Safety and status only, through the `caution-*` roles. Never decoration.",
  success:
    "Safety and status only, through the `success-*` roles. Never decoration.",
};

const ANCHOR_USAGE = {
  "ink-50": "Brand off-white: `fg` in dark mode and all type on photos.",
  "ink-900": "North Sea Surface: dark panels.",
  "ink-950": "North Sea Ink: dark `bg` and the photo canvas.",
  "teal-300": "The mint step of teal, not a second brand color.",
  "teal-500": "AERYO Teal, the brand anchor. Solid fill in dark mode.",
  "teal-700": "Solid fill in light mode, so light text stays readable on it.",
  "lime-300": "Wind Lime, the top of the brand's wind-flow bar.",
};

const SEMANTIC_USAGE = {
  bg: "Page background.",
  "bg-subtle": "Quiet section behind content.",
  "bg-muted": "Input wells and raised groups.",
  "bg-emphasized":
    "Strongest ground. Use `fg` on it in dark mode; `fg-muted` and `fg-subtle` do not fit.",
  "bg-panel": "Cards and panels.",
  "bg-chrome":
    "Frosted top bar and bottom tab bar. Mostly opaque so labels hold over photos.",
  "bg-photo":
    "Canvas behind full-bleed photos. Does not change with color mode.",
  "bg-error": "Wash behind an error message.",
  "bg-warning": "Wash behind a warning message.",
  "bg-success": "Wash behind a success message.",
  "bg-info": "Wash behind an info message.",
  fg: "Body text on `bg`, `bg-subtle`, `bg-muted`, `bg-emphasized` and `bg-panel`.",
  "fg-muted": "Supporting text on `bg`, `bg-subtle` and `bg-muted`.",
  "fg-subtle": "Quietest text on `bg` and `bg-subtle` only.",
  "fg-emphasized":
    "Field labels and list titles on `bg`, `bg-subtle` and `bg-muted`.",
  "fg-photo":
    "Type on `bg-photo` only, 17.49:1. Does not change with color mode, so never place it on `bg`, `bg-subtle` or `bg-panel`.",
  "fg-photo-muted":
    "Inactive marks on `bg-photo` only, such as resting progress dots, 3.61:1. A decorative mark, not text, and it does not change with color mode.",
  "fg-photo-accent":
    "Teal link text on `bg-photo` only, 7.01:1. Does not change with color mode, so never place it on `bg` or `bg-panel`.",
  "fg-error": "Error text on `bg`, `bg-subtle` and `bg-error`.",
  "fg-warning": "Warning text on `bg`, `bg-subtle` and `bg-warning`.",
  "fg-success": "Success text on `bg`, `bg-subtle` and `bg-success`.",
  "fg-info": "Info text on `bg`, `bg-subtle` and `bg-info`.",
  border: "Decorative hairline. Never the only sign of an interactive edge.",
  "border-muted": "Quieter hairline for resting cards.",
  "border-error": "Invalid input edge.",
  "border-warning": "Warning edge.",
  "border-success": "Success edge.",
  "border-info": "Info edge.",
  "accent-solid": "Default fill for primary actions.",
  "accent-contrast": "Text on `accent-solid`.",
  "rider-riding": "Rider presence: riding now.",
  "rider-planning": "Rider presence: planning to ride.",
  "rider-offline": "Rider presence: offline.",
  "session-planning": "Session status: on the calendar.",
  "session-active": "Session status: happening now.",
  "session-completed": "Session status: finished.",
  "session-cancelled": "Session status: cancelled.",
  "wind-calm": "Wind scale, calm. Pair with a label and a number.",
  "wind-light": "Wind scale, light. Pair with a label and a number.",
  "wind-good": "Wind scale, good. Pair with a label and a number.",
  "wind-strong": "Wind scale, strong. The only role that uses lime.",
  "wind-extreme": "Wind scale, extreme. A safety state, so it uses caution.",
};

const PALETTE_ROLE_USAGE = {
  fg: "Palette text on its `subtle` and `muted` fills, and in ghost or outline buttons.",
  solid: "Palette fill for solid buttons, badges and toasts.",
  contrast: "Text on this palette's `solid` fill.",
  subtle: "Palette's quiet fill.",
  muted: "Palette's stronger quiet fill.",
  emphasized: "Palette's strongest quiet fill.",
  focusRing: "Palette's focus ring.",
  border: "Palette's outline.",
};

const TOKENS_WITH_KNOWN_GAPS = {
  "success-border":
    "Outline for success badges. Light mode reaches 1.78:1 on `bg`, under the 3:1 target, so pair it with a word.",
};

const PALETTE_NAMES = ["teal", "ink", "danger", "caution", "success"];

const describeSemanticToken = (tokenName) => {
  if (TOKENS_WITH_KNOWN_GAPS[tokenName])
    return TOKENS_WITH_KNOWN_GAPS[tokenName];
  if (SEMANTIC_USAGE[tokenName]) return SEMANTIC_USAGE[tokenName];
  const palette = PALETTE_NAMES.find((paletteName) =>
    tokenName.startsWith(`${paletteName}-`),
  );
  const role = palette && tokenName.slice(palette.length + 1);
  return PALETTE_ROLE_USAGE[role] ?? "";
};

const primitiveColorTokens = Object.entries(colors).flatMap(([family, steps]) =>
  Object.entries(steps).map(([step, { value }]) => {
    const tokenName = `${family}-${step}`;
    return {
      name: tokenName,
      value: value.toLowerCase(),
      usage: ANCHOR_USAGE[tokenName] ?? RAMP_USAGE[family],
    };
  }),
);

/** Walks nested semantic tokens. `DEFAULT` is the family's own base value. */
const collectSemanticTokens = (tokenGroup, namePrefix = "") =>
  Object.entries(tokenGroup).flatMap(([key, entry]) => {
    const tokenName =
      key === "DEFAULT"
        ? namePrefix
        : [namePrefix, key].filter(Boolean).join("-");
    if (entry.value) {
      return [
        {
          name: tokenName,
          value: {
            light: convertColorValue(entry.value._light),
            dark: convertColorValue(entry.value._dark),
          },
          usage: describeSemanticToken(tokenName),
        },
      ];
    }
    return collectSemanticTokens(entry, tokenName);
  });

const semanticColorTokens = collectSemanticTokens(semanticTokens.colors);

const SPACING_USAGE = {
  1: "Tight gap inside a compact row.",
  2: "Gap between an icon and its label.",
  4: "Default padding inside a card.",
  6: "Gap between groups on a screen.",
};

const RADIUS_USAGE = {
  xs: "Small inner details.",
  sm: "Small controls and inner details.",
  md: "Buttons and fields. The default for primary actions.",
  lg: "Larger buttons and fields.",
  xl: "Cards.",
  "2xl": "Cards and large panels.",
  "3xl": "Sheets and very large panels.",
  full: "Avatars and small status chips only, never a default button.",
};

const SHADOW_USAGE = {
  xs: "Smallest lift at rest.",
  sm: "Pressable card on hover.",
  md: "Menus and popovers.",
  lg: "Dialogs.",
  xl: "Rare, large overlays.",
  "2xl": "Largest overlay lift.",
  inner: "Pressed-in well.",
  inset: "One-pixel inner edge.",
};

const getTypeStyle = (styleName, usage, sample) => {
  const { value } = textStyles[styleName];
  const readReference = (reference) =>
    reference.replace(/[{}]/g, "").split(".").slice(1).join(".");
  return {
    name: styleName,
    fontSize: fontSizes[readReference(value.fontSize)].value,
    lineHeight: lineHeights[readReference(value.lineHeight)].value,
    fontWeight: Number(fontWeights[readReference(value.fontWeight)].value),
    letterSpacing: letterSpacings[readReference(value.letterSpacing)].value,
    sample,
    usage,
  };
};

const tokens = {
  name: "AERYO",
  version: 1,
  meta: {
    source: "github",
    repo: "angelo5003/aeryo",
    ref: SOURCE_REF,
    paths: {
      tokens: ["src/design-system/tokens", "src/design-system/theme"],
      fonts: ["src/app/layout.tsx"],
      assets: [
        "public/logo.svg",
        "public/logo-mark.svg",
        "public/assets/onboarding",
      ],
      docs: ["DESIGN.md", "PRODUCT.md", "docs/guides/aeryo-branding.md"],
    },
    synced: new Date().toISOString().slice(0, 10),
  },
  color: {
    themes: [
      { id: "light", name: "Light" },
      { id: "dark", name: "Dark" },
    ],
    tokens: [...primitiveColorTokens, ...semanticColorTokens],
  },
  type: {
    fonts: [
      {
        family: "Sora",
        file: "fonts/Sora-latin.woff2",
        weight: "400 800",
        style: "normal",
      },
      {
        family: "Manrope",
        file: "fonts/Manrope-latin.woff2",
        weight: "400 700",
        style: "normal",
      },
      {
        family: "Geist Mono",
        file: "fonts/GeistMono-latin.woff2",
        weight: "100 900",
        style: "normal",
      },
    ],
    families: {
      heading: '"Sora", sans-serif',
      body: '"Manrope", sans-serif',
      mono: '"Geist Mono", ui-monospace, monospace',
    },
    groups: [
      {
        name: "Headings",
        family: "heading",
        styles: [
          getTypeStyle(
            "display",
            'Rare hero type. `Heading variant="display"`.',
            "Adventure Awaits",
          ),
          getTypeStyle(
            "heading",
            'Screen titles. `Heading variant="heading"`, the default.',
            "Wijk aan Zee",
          ),
          getTypeStyle(
            "title",
            "Card titles and onboarding headings. Sora never goes smaller.",
            "Find Your Community",
          ),
        ],
      },
      {
        name: "Text",
        family: "body",
        styles: [
          getTypeStyle(
            "body",
            'Default reading text. `Text variant="body"`.',
            "Know before you go. See what's building, and when it's worth the drive.",
          ),
          getTypeStyle(
            "caption",
            'Supporting copy. `Text variant="caption"`.',
            "3 riders planning from 16:00",
          ),
          getTypeStyle(
            "label",
            'Meta and compact UI. `Text variant="label"`.',
            "18 kn NW",
          ),
        ],
      },
      {
        name: "On photos",
        family: "body",
        styles: [
          getTypeStyle(
            "body.photo",
            'Light type on a dark photo. `Text variant="body.photo"`.',
            "Know before you go. See what's building, and when it's worth the drive.",
          ),
          getTypeStyle(
            "label.photo",
            'Meta on a dark photo. `Text variant="label.photo"`.',
            "IJmuiden",
          ),
        ],
      },
    ],
  },
  spacing: {
    note: "A 4px base. These are the sanctioned steps; `safe.*` insets are listed in the README because they read live device values.",
    tokens: Object.entries(spacing).map(([step, { value }]) => ({
      name: `space-${step}`,
      value,
      usage: SPACING_USAGE[step] ?? `Spacing step \`${step}\` in style props.`,
    })),
  },
  radius: {
    tokens: Object.entries(radii).map(([radiusName, { value }]) => ({
      name: `radius-${radiusName}`,
      value,
      usage: RADIUS_USAGE[radiusName],
    })),
  },
  shadow: {
    note: "Tinted with ink, heavier in dark mode. Shadows are for things that float or can be pressed.",
    tokens: Object.entries(semanticTokens.shadows).map(
      ([shadowName, { value }]) => ({
        name: `shadow-${shadowName}`,
        value: {
          light: convertShadowValue(value._light),
          dark: convertShadowValue(value._dark),
        },
        usage: SHADOW_USAGE[shadowName],
      }),
    ),
  },
  breakpoint: {
    note: "Chakra's standard scale. The app ships portrait-only on phones, so these mostly serve previews.",
    tokens: Object.entries(breakpoints).map(([breakpointName, value]) => ({
      name: `breakpoint-${breakpointName}`,
      value,
      usage: `Styles from \`${breakpointName}\` upward.`,
    })),
  },
};

await writeFile(
  "docs/design-system/tokens.json",
  `${JSON.stringify(tokens, null, 2)}\n`,
);

// Contrast report

const allColorTokens = new Map(
  tokens.color.tokens.map((colorToken) => [colorToken.name, colorToken]),
);

const resolveThemeValue = (tokenName, themeId) => {
  const { value } = allColorTokens.get(tokenName);
  const themeValue = typeof value === "string" ? value : value[themeId];
  const aliasMatch = themeValue.match(/^\{(.+)\}$/);
  return aliasMatch ? resolveThemeValue(aliasMatch[1], themeId) : themeValue;
};

const parseColor = (colorValue) => {
  const rgbaMatch = colorValue.match(/rgba?\(([^)]+)\)/);
  if (rgbaMatch) {
    const [red, green, blue, alpha = 1] = rgbaMatch[1]
      .split(",")
      .map((channel) => Number(channel));
    return { red, green, blue, alpha };
  }
  const hexDigits = colorValue.slice(1);
  return {
    red: parseInt(hexDigits.slice(0, 2), 16),
    green: parseInt(hexDigits.slice(2, 4), 16),
    blue: parseInt(hexDigits.slice(4, 6), 16),
    alpha:
      hexDigits.length === 8 ? parseInt(hexDigits.slice(6, 8), 16) / 255 : 1,
  };
};

const getRelativeLuminance = ({ red, green, blue }) => {
  const convertChannel = (channel) => {
    const scaledChannel = channel / 255;
    return scaledChannel <= 0.03928
      ? scaledChannel / 12.92
      : ((scaledChannel + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * convertChannel(red) +
    0.7152 * convertChannel(green) +
    0.0722 * convertChannel(blue)
  );
};

const getContrastRatio = (foregroundToken, groundToken, themeId) => {
  const ground = parseColor(resolveThemeValue(groundToken, themeId));
  const foreground = parseColor(resolveThemeValue(foregroundToken, themeId));
  const blendOverGround = (channel) =>
    foreground[channel] * foreground.alpha +
    ground[channel] * (1 - foreground.alpha);
  const lighter = getRelativeLuminance(ground);
  const darker = getRelativeLuminance({
    red: blendOverGround("red"),
    green: blendOverGround("green"),
    blue: blendOverGround("blue"),
  });
  const [high, low] = lighter > darker ? [lighter, darker] : [darker, lighter];
  return (high + 0.05) / (low + 0.05);
};

const TEXT_PAIRS = [
  ...["bg", "bg-subtle", "bg-muted", "bg-emphasized", "bg-panel"].map(
    (ground) => ["fg", ground],
  ),
  ...["bg", "bg-subtle", "bg-muted"].flatMap((ground) => [
    ["fg-muted", ground],
    ["fg-emphasized", ground],
  ]),
  ["fg-subtle", "bg"],
  ["fg-subtle", "bg-subtle"],
  ["fg-photo", "bg-photo"],
  ["fg-photo-accent", "bg-photo"],
  ["accent-contrast", "accent-solid"],
  ["teal-contrast", "teal-solid"],
  ["ink-contrast", "ink-solid"],
  ["danger-contrast", "danger-solid"],
  ["caution-contrast", "caution-solid"],
  ["success-contrast", "success-solid"],
  ...["error", "warning", "success", "info"].flatMap((status) => [
    [`fg-${status}`, "bg"],
    [`fg-${status}`, "bg-subtle"],
    [`fg-${status}`, `bg-${status}`],
  ]),
  ...["danger", "caution", "success", "ink"].flatMap((palette) => [
    [`${palette}-fg`, `${palette}-subtle`],
    [`${palette}-fg`, `${palette}-muted`],
  ]),
];

const MARK_PAIRS = [
  ...["rider-riding", "rider-planning", "rider-offline"].map((mark) => [
    mark,
    "bg",
  ]),
  ...[
    "session-planning",
    "session-active",
    "session-completed",
    "session-cancelled",
  ].map((mark) => [mark, "bg"]),
  ...[
    "wind-calm",
    "wind-light",
    "wind-good",
    "wind-strong",
    "wind-extreme",
  ].map((mark) => [mark, "bg"]),
  ["border-error", "bg"],
  ["border-warning", "bg"],
  ["border-success", "bg"],
  ["border-info", "bg"],
  ["fg-photo-muted", "bg-photo"],
  ["danger-border", "bg"],
  ["caution-border", "bg"],
  ["success-border", "bg"],
];

const reportFailingPairs = (pairs, minimumRatio, label) => {
  for (const [foregroundToken, groundToken] of pairs) {
    for (const themeId of ["light", "dark"]) {
      const ratio = getContrastRatio(foregroundToken, groundToken, themeId);
      if (ratio < minimumRatio) {
        console.log(
          `${label} ${themeId}: ${foregroundToken} on ${groundToken} = ${ratio.toFixed(2)}:1 (needs ${minimumRatio}:1)`,
        );
      }
    }
  }
};

reportFailingPairs(TEXT_PAIRS, 4.5, "text");
reportFailingPairs(MARK_PAIRS, 3, "mark");
console.log(
  `Wrote ${tokens.color.tokens.length} colors, ${tokens.spacing.tokens.length} spacing steps, ${tokens.radius.tokens.length} radii, ${tokens.shadow.tokens.length} shadows.`,
);
