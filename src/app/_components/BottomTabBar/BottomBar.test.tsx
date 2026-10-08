import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import BottomBar from "./BottomBar";

const mockedPathname = "/home";

jest.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
}));

const buildComponent = (isBottomBarHidden: boolean) => {
  return render(
    <Provider>
      <BottomBar isBottomBarHidden={isBottomBarHidden} />
    </Provider>,
  );
};

describe("BottomBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the bottom bar when it is not hidden", () => {
    buildComponent(false);

    const bottomBar = screen.getByRole("navigation");

    expect(bottomBar).toBeInTheDocument();
  });

  it("should have the correct href attributes for the nav links", () => {
    buildComponent(false);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/home",
    );

    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/profile",
    );

    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      "/explore",
    );

    expect(screen.getByRole("link", { name: "Sessions" })).toHaveAttribute(
      "href",
      "/sessions",
    );

    expect(screen.getByRole("link", { name: "Community" })).toHaveAttribute(
      "href",
      "/community",
    );
  });

  it("should only show the rider routes that have a tab bar icon, in tab order", () => {
    buildComponent(false);

    const tabHrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    // Start ("/") and Settings are rider routes too, but have no tabBarIcon.
    expect(tabHrefs).toStrictEqual([
      "/home",
      "/explore",
      "/sessions",
      "/community",
      "/profile",
    ]);
  });

  it("should not render the bottom bar when it is hidden", () => {
    buildComponent(true);

    const bottomBar = screen.getByTestId("bottom-bar");

    expect(bottomBar).toBeInTheDocument();
    expect(bottomBar).toHaveAttribute("inert");
  });
});
