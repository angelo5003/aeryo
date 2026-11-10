import { spacing } from "@/design-system/tokens/spacing";

describe("spacing tokens", () => {
  it("defines the full spacing scale", () => {
    expect(Object.keys(spacing).sort((a, b) => Number(a) - Number(b))).toEqual([
      "0",
      "0.5",
      "1",
      "1.5",
      "2",
      "2.5",
      "3",
      "3.5",
      "4",
      "4.5",
      "5",
      "6",
      "8",
      "10",
      "12",
      "16",
      "20",
      "24",
      "32",
    ]);
  });

  it("uses a 4px base unit", () => {
    expect(spacing["0"].value).toBe("0");
    expect(spacing["1"].value).toBe("0.25rem");
    expect(spacing["4"].value).toBe("1rem");
    expect(spacing["32"].value).toBe("8rem");
  });

  it("adds half steps for the 2, 6, 10, 14 and 18px values", () => {
    expect(spacing["0.5"].value).toBe("0.125rem");
    expect(spacing["1.5"].value).toBe("0.375rem");
    expect(spacing["2.5"].value).toBe("0.625rem");
    expect(spacing["3.5"].value).toBe("0.875rem");
    expect(spacing["4.5"].value).toBe("1.125rem");
  });
});
