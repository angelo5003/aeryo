import { renderHook } from "@testing-library/react";
import { useBackLinkProperties } from "./useBackLinkProperties";

let mockedPathname: string = "/profile";

jest.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
}));

const buildHook = () => {
  return renderHook(() => useBackLinkProperties());
};

describe("useBackLinkProperties", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null when the path is not an existing route", () => {
    mockedPathname = "/some-page";
    const { result } = buildHook();
    expect(result.current).toBeNull();
  });

  it("should return the profile link when the path is /settings that has a parentHref", () => {
    mockedPathname = "/settings";
    const { result } = buildHook();
    expect(result.current).toEqual({
      label: "Profile",
      href: "/profile",
    });
  });

  it("should return null when the page has no parentHref", () => {
    mockedPathname = "/profile";
    const { result } = buildHook();
    expect(result.current).toBeNull();
  });
});
