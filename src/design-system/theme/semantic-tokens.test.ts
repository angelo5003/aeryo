import { semanticTokens } from "@/design-system/theme/semantic-tokens";
import { colors } from "@/design-system/tokens/colors";

const TEXT_MINIMUM_CONTRAST = 4.5;
const MARK_MINIMUM_CONTRAST = 3;

type LightModeToken = { value: { _light: string } };

const readPrimitiveHex = (lightModeToken: LightModeToken): string => {
  const colorPath = lightModeToken.value._light.replace(/^\{colors\.|\}$/g, "");
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

const { bg, fg, border, rider, session, wind } = semanticTokens.colors;

describe("semantic tokens in light mode", () => {
  test.each([
    ["fg.subtle on bg", fg.subtle, bg.DEFAULT],
    ["fg.subtle on bg.subtle", fg.subtle, bg.subtle],
    ["fg.muted on bg", fg.muted, bg.DEFAULT],
    ["fg.muted on bg.subtle", fg.muted, bg.subtle],
    ["fg.muted on bg.muted", fg.muted, bg.muted],
  ])("should keep %s readable as text", (_pairName, foreground, ground) => {
    expect(
      getContrastRatio(readPrimitiveHex(foreground), readPrimitiveHex(ground)),
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
      getContrastRatio(readPrimitiveHex(mark), readPrimitiveHex(bg.DEFAULT)),
    ).toBeGreaterThanOrEqual(MARK_MINIMUM_CONTRAST);
  });
});
