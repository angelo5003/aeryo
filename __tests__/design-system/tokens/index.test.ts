import * as tokens from "@/design-system/tokens";

describe("tokens barrel", () => {
  it("re-exports every token module", () => {
    expect(tokens.colors.teal[500].value).toBe("#19AEB5");
    expect(tokens.colors.paper[50].value).toBe("#F7FAFB");
    expect(tokens.radii.lg.value).toBe("10px");
    expect(tokens.shadows.md.value).toBe("0 8px 24px rgba(2, 8, 10, 0.5)");
    expect(tokens.fonts.heading.value).toContain("Sora");
    expect(tokens.fontSizes.xl.value).toBe("1.25rem");
    expect(tokens.spacing["4"].value).toBe("1rem");
    expect(tokens.breakpoints.md).toBe("48em");
    expect(tokens.durations.normal.value).toBe("200ms");
    expect(tokens.textStyles.body.value.fontFamily).toBe("{fonts.body}");
  });
});
