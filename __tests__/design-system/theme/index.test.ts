import { system } from "@/design-system/theme";

describe("design system theme", () => {
  it("builds a valid Chakra system", () => {
    expect(system).toBeDefined();
    expect(system.token("colors.teal.500")).toBe("#19AEB5");
    expect(system.token("radii.lg")).toBe("10px");
    expect(system.token("shadows.md")).toBe("var(--chakra-shadows-md)");
    expect(system.token("fontSizes.xl")).toBe("1.25rem");
    expect(system.token("fontWeights.bold")).toBe("700");
    expect(system.token("spacing.4")).toBe("1rem");
    expect(system.breakpoints.keys()).toContain("md");
  });
});
