import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import SignedInPageWithTopNavBar from "./SignedInPageWithTopNavBar";

const mockedPathname = "/home";

jest.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
}));

// jsdom has no IntersectionObserver, but framer-motion's useInView (used for
// the large title) calls `new IntersectionObserver(...)`, observe, unobserve
// and disconnect (node_modules/framer-motion/dist/cjs/index.js, inView).
// This stub never reports an intersection, so the title counts as visible.
class IntersectionObserverStub {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

beforeAll(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserverStub,
  });
});

const buildComponent = (shouldShowBottomBar: boolean) => {
  return render(
    <Provider>
      <SignedInPageWithTopNavBar shouldShowBottomBar={shouldShowBottomBar}>
        <div>Page content</div>
      </SignedInPageWithTopNavBar>
    </Provider>,
  );
};

describe("SignedInPageWithTopNavBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show the bottom bar when shouldShowBottomBar is true", () => {
    buildComponent(true);

    expect(
      screen.getByRole("navigation", { name: "Main" }),
    ).toBeInTheDocument();
  });

  it("should not show the bottom bar when shouldShowBottomBar is false", () => {
    buildComponent(false);

    expect(
      screen.queryByRole("navigation", { name: "Main" }),
    ).not.toBeInTheDocument();
  });

  it("should show the page content and the large page title in both cases", () => {
    buildComponent(false);

    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Home" }),
    ).toBeInTheDocument();
  });
});
