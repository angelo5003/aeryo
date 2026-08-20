import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  textStyles,
} from "@/design-system/tokens/typography";

describe("typography tokens", () => {
  it("defines the font family tokens", () => {
    expect(fonts.heading.value).toContain("Sora");
    expect(fonts.body.value).toContain("Inter");
  });

  it("defines the full type scale", () => {
    expect(Object.keys(fontSizes)).toEqual([
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
    ]);
    expect(Object.keys(fontWeights)).toEqual([
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
    ]);
    expect(Object.keys(lineHeights)).toEqual(["tight", "normal", "relaxed"]);
    expect(Object.keys(letterSpacings)).toEqual(["tight", "normal", "wide"]);
  });

  it("defines the named textStyles bundles", () => {
    expect(Object.keys(textStyles)).toEqual([
      "display",
      "heading",
      "title",
      "body",
      "caption",
      "label",
    ]);
    expect(textStyles.display.value.fontFamily).toBe("{fonts.heading}");
    expect(textStyles.body.value.fontFamily).toBe("{fonts.body}");
  });
});
