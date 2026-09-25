import { durations, easings, motion } from "@/design-system/tokens/motion";

describe("motion tokens", () => {
  it("defines fast/normal/slow durations", () => {
    expect(durations.fast.value).toBe("120ms");
    expect(durations.normal.value).toBe("200ms");
    expect(durations.slow.value).toBe("320ms");
  });

  it("defines easeIn/easeOut/easeInOut curves", () => {
    expect(Object.keys(easings)).toEqual(["easeIn", "easeOut", "easeInOut"]);
    expect(easings.easeOut.value).toBe("cubic-bezier(0, 0, 0.2, 1)");
  });

  it("groups both under a single motion export", () => {
    expect(motion).toEqual({ durations, easings });
  });
});
