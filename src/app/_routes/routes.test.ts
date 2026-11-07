import type { AppRoute } from "./routes";
import {
  getPublicRoutes,
  getRiderRoutes,
  getRouteByHref,
  routes,
} from "./routes";

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

describe("getRouteByHref", () => {
  it("should return the settings route when the href is /settings", () => {
    const childPageRoute = getRouteByHref("/settings");
    expect(childPageRoute).toMatchObject({
      href: "/settings",
      parentHref: "/profile",
    });
  });

  it("should return the profile route when the href is /profile", () => {
    const parentPageRoute = getRouteByHref("/profile");
    expect(parentPageRoute?.href).toBe("/profile");
    expect(parentPageRoute).not.toHaveProperty("parentHref");
  });

  it("should return the start route when the href is /", () => {
    const startRoute = getRouteByHref("/");
    expect(startRoute?.href).toBe("/");
    expect(startRoute).not.toHaveProperty("parentHref");
  });

  it("should return undefined when the href is not a valid route", () => {
    const route = getRouteByHref("/not-a-valid-route");
    expect(route).toBeUndefined();
  });

  it("should point every parentHref to an existing route", () => {
    // Typed as AppRoute[] so every route has the optional parentHref field.
    const allRoutes: AppRoute[] = Object.values(routes);
    // First take every parentHref, then drop the empty ones. TypeScript 5.5+
    // sees that the filter removes undefined, so no type cast is needed.
    const parentHrefs = allRoutes
      .map((route) => route.parentHref)
      .filter((parentHref) => parentHref !== undefined);

    // Guard: without this the test would pass without checking anything.
    expect(parentHrefs).not.toHaveLength(0);

    const foundParentHrefs = parentHrefs.map(
      (parentHref) => getRouteByHref(parentHref)?.href,
    );

    // A missing parent shows up as undefined in this list.
    expect(foundParentHrefs).toStrictEqual(parentHrefs);
  });
});
