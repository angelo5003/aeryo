import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import TopNavBar from "./TopNavBar";

// Name starts with "mock" so jest.mock may read it; read lazily inside
// usePathname, so each test can set its own path (same idea as
// mockedInitialSession in src/app/(signed-in)/layout.test.tsx).
let mockedPathname: string = "/profile";

jest.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
}));

const buildComponent = (pageTitle: string) => {
  return render(
    <Provider>
      <TopNavBar pageTitle={pageTitle} isTitleCollapsed={false} />
    </Provider>,
  );
};

describe("TopNavBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedPathname = "/profile";
  });

  it("should show only the back link when the path is /settings", () => {
    mockedPathname = "/settings";
    buildComponent("Settings");

    expect(
      screen.getByRole("link", { name: "Back to Profile" }),
    ).toHaveAttribute("href", "/profile");
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Settings" }),
    ).not.toBeInTheDocument();
  });

  it("should show the settings link and the page title when the path is /profile", () => {
    mockedPathname = "/profile";
    buildComponent("Profile");

    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "/settings",
    );
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Back to Profile" }),
    ).not.toBeInTheDocument();
  });
});
