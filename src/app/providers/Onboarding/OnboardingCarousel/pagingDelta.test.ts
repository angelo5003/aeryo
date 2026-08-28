import {
  pagingDelta,
  SWIPE_DISTANCE_RATIO,
  SWIPE_VELOCITY,
} from "./pagingDelta";

const WIDTH = 390;

describe("pagingDelta", () => {
  it("stays put on a short, slow drag", () => {
    expect(pagingDelta(-WIDTH * 0.1, -200, WIDTH)).toBe(0);
    expect(pagingDelta(WIDTH * 0.1, 200, WIDTH)).toBe(0);
  });

  it("advances exactly one slide when dragged left past the threshold", () => {
    expect(pagingDelta(-WIDTH * SWIPE_DISTANCE_RATIO, 0, WIDTH)).toBe(1);
    expect(pagingDelta(-WIDTH * 2.4, -1800, WIDTH)).toBe(1);
  });

  it("goes back exactly one slide when dragged right past the threshold", () => {
    expect(pagingDelta(WIDTH * SWIPE_DISTANCE_RATIO, 0, WIDTH)).toBe(-1);
    expect(pagingDelta(WIDTH * 2.4, 1800, WIDTH)).toBe(-1);
  });

  it("commits a short flick from velocity alone, still only one page", () => {
    expect(pagingDelta(-20, -SWIPE_VELOCITY, WIDTH)).toBe(1);
    expect(pagingDelta(20, SWIPE_VELOCITY, WIDTH)).toBe(-1);
  });

  it("returns 0 when width is not measurable yet", () => {
    expect(pagingDelta(-200, -900, 0)).toBe(0);
  });
});
