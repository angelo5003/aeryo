import { spacing } from "@/design-system/tokens/spacing";

describe("spacing tokens", () => {
  it("defines the full spacing scale", () => {
    expect(Object.keys(spacing)).toEqual([
      "0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24", "32",
    ]);
  });

  it("uses a 4px base unit", () => {
    expect(spacing["0"].value).toBe("0");
    expect(spacing["1"].value).toBe("0.25rem");
    expect(spacing["4"].value).toBe("1rem");
    expect(spacing["32"].value).toBe("8rem");
  });
});
