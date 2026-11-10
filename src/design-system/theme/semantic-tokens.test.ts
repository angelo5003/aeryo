import { readFileSync } from "node:fs";
import { join } from "node:path";
import { semanticTokens } from "@/design-system/theme/semantic-tokens";
import { colors } from "@/design-system/tokens/colors";

const TEXT_MINIMUM_CONTRAST = 4.5;
const MARK_MINIMUM_CONTRAST = 3;

type ColorModeKey = "_light" | "_dark";
type TokenWithBothModes = { value: Record<ColorModeKey, string> };

const readPrimitiveHex = (
  token: TokenWithBothModes,
  colorModeKey: ColorModeKey,
): string => {
  const tokenValue = token.value[colorModeKey];
  const colorPath = tokenValue.replace(/^\{colors\.|\}$/g, "");
  const [family, step] = colorPath.split(".");
  const colorFamily = colors[family as keyof typeof colors] as Record<
    string,
    { value: string }
  >;
  return colorFamily[step].value;
};

const getRelativeLuminance = (hexColor: string): number => {
  const [red, green, blue] = [1, 3, 5].map((startIndex) => {
    const channel =
      parseInt(hexColor.slice(startIndex, startIndex + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const getContrastRatio = (firstHex: string, secondHex: string): number => {
  const firstLuminance = getRelativeLuminance(firstHex);
  const secondLuminance = getRelativeLuminance(secondHex);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
};

const { bg, fg, border, rider, session, wind, ink, photo } =
  semanticTokens.colors;
const LARGE_TEXT_MINIMUM_CONTRAST = 3;

describe("semantic tokens in light mode", () => {
  test.each([
    ["fg.subtle on bg", fg.subtle, bg.DEFAULT],
    ["fg.subtle on bg.subtle", fg.subtle, bg.subtle],
    ["fg.muted on bg", fg.muted, bg.DEFAULT],
    ["fg.muted on bg.subtle", fg.muted, bg.subtle],
    ["fg.muted on bg.muted", fg.muted, bg.muted],
  ])("should keep %s readable as text", (_pairName, foreground, ground) => {
    expect(
      getContrastRatio(
        readPrimitiveHex(foreground, "_light"),
        readPrimitiveHex(ground, "_light"),
      ),
    ).toBeGreaterThanOrEqual(TEXT_MINIMUM_CONTRAST);
  });

  test.each([
    ["rider.offline", rider.offline],
    ["session.completed", session.completed],
    ["wind.calm", wind.calm],
    ["wind.strong", wind.strong],
    ["border.success", border.success],
    ["border.info", border.info],
  ])("should keep %s visible as a mark on bg", (_tokenName, mark) => {
    expect(
      getContrastRatio(
        readPrimitiveHex(mark, "_light"),
        readPrimitiveHex(bg.DEFAULT, "_light"),
      ),
    ).toBeGreaterThanOrEqual(MARK_MINIMUM_CONTRAST);
  });
});

describe.each([
  ["light", "_light"],
  ["dark", "_dark"],
] as const)("the ink button outline in %s mode", (_modeName, colorModeKey) => {
  test.each([
    ["bg", bg.DEFAULT],
    ["bg.subtle", bg.subtle],
    ["bg.muted", bg.muted],
    ["bg.panel", bg.panel],
  ])("should stay visible on %s", (_groundName, ground) => {
    expect(
      getContrastRatio(
        readPrimitiveHex(ink.border, colorModeKey),
        readPrimitiveHex(ground, colorModeKey),
      ),
    ).toBeGreaterThanOrEqual(MARK_MINIMUM_CONTRAST);
  });
});

describe.each([
  ["light", "_light"],
  ["dark", "_dark"],
] as const)("the wind numeral colors in %s mode", (_modeName, colorModeKey) => {
  test.each([
    ["fg.metric.top", fg.metric.top],
    ["fg.metric.bottom", fg.metric.bottom],
  ])("should keep %s readable as large text on bg", (_tokenName, numeral) => {
    expect(
      getContrastRatio(
        readPrimitiveHex(numeral, colorModeKey),
        readPrimitiveHex(bg.DEFAULT, colorModeKey),
      ),
    ).toBeGreaterThanOrEqual(LARGE_TEXT_MINIMUM_CONTRAST);
  });
});

test("should keep border.accent visible as a boundary on bg in light mode", () => {
  expect(
    getContrastRatio(
      readPrimitiveHex(border.accent, "_light"),
      readPrimitiveHex(bg.DEFAULT, "_light"),
    ),
  ).toBeGreaterThanOrEqual(MARK_MINIMUM_CONTRAST);
});

describe("semantic-tokens.ts source", () => {
  const sourceWithoutComments = readFileSync(
    join(__dirname, "semantic-tokens.ts"),
    "utf8",
  )
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");

  test("should reference the palette instead of holding raw colors", () => {
    const rawColorPattern =
      /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|"white"|"black"/;
    expect(sourceWithoutComments).not.toMatch(rawColorPattern);
  });
});

test.each([
  ["photo.solid", photo.solid],
  ["photo.accent", photo.accent],
])("should keep photo.contrast readable as text on %s", (_tokenName, fill) => {
  expect(
    getContrastRatio(
      readPrimitiveHex(photo.contrast, "_dark"),
      readPrimitiveHex(fill, "_dark"),
    ),
  ).toBeGreaterThanOrEqual(TEXT_MINIMUM_CONTRAST);
});

test.each(["solid", "accent", "contrast"] as const)(
  "should keep photo.%s the same in light and dark mode",
  (tokenName) => {
    expect(photo[tokenName].value._light).toBe(photo[tokenName].value._dark);
  },
);
