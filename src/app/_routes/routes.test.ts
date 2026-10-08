import { getPublicRoutes, getRiderRoutes } from "./routes";

describe("Routes for access", () => {
  it("should return the public routes when the access is public", () => {
    const publicRoutes = getPublicRoutes();

    const publicRouteHrefs = publicRoutes.map((route) => route.href);

    expect(publicRouteHrefs).toStrictEqual(["/", "/login", "/signup"]);
  });

  it("should return the rider routes when the access is rider", () => {
    const riderRoutes = getRiderRoutes();

    const riderRouteHrefs = riderRoutes.map((route) => route.href);

    expect(riderRouteHrefs).toStrictEqual([
      "/",
      "/home",
      "/explore",
      "/sessions",
      "/community",
      "/profile",
      "/settings",
    ]);
  });
});
