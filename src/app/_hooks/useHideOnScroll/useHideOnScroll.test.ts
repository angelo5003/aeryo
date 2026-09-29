import { fireEvent, renderHook, waitFor } from "@testing-library/react";
import { useHideOnScroll } from "./useHideOnScroll";

const buildHook = () => {
  // A fake <main> for the hook to watch, like the real scrolling page in the app.
  const scrollingElement = document.createElement("main");

  // Starts the hook; result.current is its answer: is the bottom bar hidden?
  const { result } = renderHook(() =>
    useHideOnScroll({ current: scrollingElement }),
  );

  return {
    scrollingElement,
    result,
  };
};

describe("useHideOnScroll", () => {
  it("should hide the bottom bar when scrolling down", async () => {
    const { result, scrollingElement } = buildHook();

    // Scrolls the page to 200 pixels from the top: the bar hides.
    scrollingElement.scrollTop = 200;
    // Tells the hook the page has scrolled.
    fireEvent.scroll(scrollingElement);
    // Waits for the hook to answer, because it updates one frame later.
    await waitFor(() => expect(result.current).toBe(true));
  });

  it("should show the bottom bar when scrolling up", async () => {
    const { result, scrollingElement } = buildHook();

    // Scrolls the page to 200 pixels from the top: the bar hides.
    scrollingElement.scrollTop = 200;
    // Tells the hook the page has scrolled.
    fireEvent.scroll(scrollingElement);
    // Waits for the hook to answer, because it updates one frame later.
    await waitFor(() => expect(result.current).toBe(true));

    // Scrolls back up to 100 pixels from the top: the bar returns.
    scrollingElement.scrollTop = 100;
    // Tells the hook the page has scrolled.
    fireEvent.scroll(scrollingElement);
    // Waits for the hook to answer, because it updates one frame later.
    await waitFor(() => expect(result.current).toBe(false));
  });

  it("should keep the bottom bar visible near the top", async () => {
    const { result, scrollingElement } = buildHook();

    // Scrolls the page to 12 pixels from the top: the bar hides.
    scrollingElement.scrollTop = 12;
    // Tells the hook the page has scrolled.
    fireEvent.scroll(scrollingElement);
    // Waits for the hook to answer, because it updates one frame later.
    await waitFor(() => expect(result.current).toBe(true));

    // Scrolls up only 5 pixels, a too-small step, but 7 is inside the always-show zone.
    scrollingElement.scrollTop = 7;
    // Tells the hook the page has scrolled.
    fireEvent.scroll(scrollingElement);
    // Waits for the hook to answer, because it updates one frame later.
    await waitFor(() => expect(result.current).toBe(false));
  });
});
