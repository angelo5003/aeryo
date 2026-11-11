import { system } from "@/design-system/theme";
import { gradientTokens } from "@/design-system/theme/gradient-tokens";

type GradientValue = string | { _light: string; _dark: string };

// Walks the nested token object and returns every `value`, with its path.
const collectGradientValues = (
  node: Record<string, unknown>,
  path: string[] = [],
): { name: string; value: GradientValue }[] =>
  Object.entries(node).flatMap(([key, child]) => {
    const childPath = [...path, key];
    const childObject = child as Record<string, unknown>;
    if ("value" in childObject) {
      return [
        {
          name: childPath.join("."),
          value: childObject.value as GradientValue,
        },
      ];
    }
    return collectGradientValues(childObject, childPath);
  });

const allGradients = collectGradientValues(gradientTokens);

const gradientStrings = (value: GradientValue): string[] =>
  typeof value === "string" ? [value] : [value._light, value._dark];

describe("gradient tokens", () => {
  it("should define the eleven gradients the design uses", () => {
    expect(allGradients.map((gradient) => gradient.name).sort()).toEqual(
      [
        "avatar",
        "fade.bottom",
        "fade.top",
        "metric",
        "panel.accent",
        "panel.danger",
        "panel.raised",
        "screenGlow",
        "photoScrim.bottom",
        "photoScrim.full",
        "photoScrim.top",
      ].sort(),
    );
  });

  it("should be registered in the Chakra system", () => {
    allGradients.forEach(({ name }) => {
      expect(system.tokens.getByName(`gradients.${name}`)).toBeDefined();
    });
  });

  it("should only reference color tokens that exist", () => {
    allGradients.forEach(({ name, value }) => {
      gradientStrings(value).forEach((gradient) => {
        const references = [...gradient.matchAll(/\{(colors\.[^}]+)\}/g)].map(
          (match) => match[1],
        );
        expect(references.length).toBeGreaterThan(0);
        references.forEach((reference) => {
          expect({
            gradient: name,
            reference,
            exists: system.tokens.getByName(reference) !== undefined,
          }).toEqual({ gradient: name, reference, exists: true });
        });
      });
    });
  });

  it("should never contain a raw color value", () => {
    allGradients.forEach(({ name, value }) => {
      gradientStrings(value).forEach((gradient) => {
        expect({
          name,
          raw: /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/i.test(gradient),
        }).toEqual({
          name,
          raw: false,
        });
      });
    });
  });

  it("should keep the metric gradient on the fg.metric endpoints in both modes", () => {
    const { metric } = gradientTokens;
    [metric.value._light, metric.value._dark].forEach((gradient) => {
      expect(gradient).toContain("{colors.fg.metric.top}");
      expect(gradient).toContain("{colors.fg.metric.bottom}");
    });
  });
});
