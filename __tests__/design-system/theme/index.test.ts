import { system } from "@/design-system/theme";
import { headingRecipe } from "@/design-system/theme/headingRecipe";

describe("design system theme", () => {
  it("builds a valid Chakra system", () => {
    expect(system).toBeDefined();
    expect(system.token("colors.teal.500")).toBe("#19AEB5");
    expect(system.token("colors.bg.photo")).toBeDefined();
    expect(system.token("colors.bg.emphasized")).toBeDefined();
    expect(system.token("colors.fg.photo")).toBeDefined();
    expect(system.token("colors.fg.photo.muted")).toBeDefined();
    expect(system.token("radii.lg")).toBe("10px");
    expect(system.token("shadows.md")).toBe("var(--chakra-shadows-md)");
    expect(system.token("fontSizes.xl")).toBe("1.25rem");
    expect(system.token("letterSpacings.wide")).toBe("0.04em");
    expect(system.token("letterSpacings.wider")).toBe("0.08em");
    expect(system.token("fontWeights.bold")).toBe("700");
    expect(system.token("spacing.4")).toBe("1rem");
    expect(system.token("durations.normal")).toBe("200ms");
    expect(system.token("easings.easeOut")).toBe("cubic-bezier(0, 0, 0.2, 1)");
    expect(system.breakpoints.keys()).toContain("md");
  });

  it("clamps Chakra heading sizes below title onto title", () => {
    expect(headingRecipe.variants.size.xs.textStyle).toBe("title");
    expect(headingRecipe.variants.size.sm.textStyle).toBe("title");
    expect(headingRecipe.variants.size.xl.textStyle).toBe("title");
    expect(headingRecipe.variants.size["3xl"].textStyle).toBe("heading");
    expect(headingRecipe.variants.size["5xl"].textStyle).toBe("display");
  });
});
