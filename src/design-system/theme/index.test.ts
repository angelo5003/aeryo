import { system } from "@/design-system/theme";
import { headingRecipe } from "@/design-system/theme/headingRecipe";
import { semanticTokens } from "@/design-system/theme/semantic-tokens";

describe("design system theme", () => {
  it("builds a valid Chakra system", () => {
    expect(system).toBeDefined();
    expect(system.token("colors.teal.500")).toBe("#19AEB5");
    expect(system.token("colors.paper.50")).toBe("#F7FAFB");
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

  it("maps light surfaces to paper instead of mint ink.50", () => {
    expect(semanticTokens.colors.bg.DEFAULT.value._light).toBe(
      "{colors.paper.50}",
    );
    expect(semanticTokens.colors.bg.subtle.value._light).toBe(
      "{colors.paper.100}",
    );
    expect(semanticTokens.colors.bg.muted.value._light).toBe(
      "{colors.paper.200}",
    );
    expect(semanticTokens.colors.bg.emphasized.value._light).toBe(
      "{colors.paper.300}",
    );
    expect(semanticTokens.colors.border.DEFAULT.value._light).toBe(
      "{colors.paper.300}",
    );
    expect(semanticTokens.colors.bg.DEFAULT.value._dark).toBe(
      "{colors.ink.950}",
    );
    expect(semanticTokens.colors.fg.DEFAULT.value._light).toBe(
      "{colors.ink.950}",
    );
    expect(semanticTokens.colors.fg.photo.DEFAULT.value._light).toBe(
      "{colors.ink.50}",
    );
  });

  it("tints every shadow with ink, never Chakra gray or raw rgba", () => {
    const steps = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "inner",
      "inset",
    ] as const;
    for (const step of steps) {
      const { _light, _dark } = semanticTokens.shadows[step].value;
      expect(_light).toContain("{colors.ink.");
      expect(_dark).toContain("{colors.ink.");
      expect(_light).not.toMatch(/gray|black|rgba\(/);
      expect(_dark).not.toMatch(/gray|black|rgba\(/);
    }
    const css = JSON.stringify(system.getTokenCss());
    expect(css).toContain("--chakra-shadows-sm");
    expect(css).toContain("--chakra-colors-ink-950");
    const shadowDeclarations = [
      ...css.matchAll(/"--chakra-shadows-[^"]+":\s*"([^"]+)"/g),
    ].map((match) => match[1]);
    expect(shadowDeclarations.length).toBeGreaterThan(0);
    for (const value of shadowDeclarations) {
      expect(value).toMatch(/ink-950|ink-50/);
      expect(value).not.toMatch(/gray|black|rgba\(/);
    }
  });
});
