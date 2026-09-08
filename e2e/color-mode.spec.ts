import { test, expect } from "@playwright/test";

test.describe("color mode rendering", () => {
  test("renders the dark bg token under dark system preference", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "CapacitorStorage.aeryo:onboarding-seen",
        "true",
      );
    });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Hello world",
    });
    await expect(heading).toBeVisible({ timeout: 5000 });

    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(bg).toBe("rgb(7, 18, 22)");
  });

  test("renders the light bg token under light system preference", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "CapacitorStorage.aeryo:onboarding-seen",
        "true",
      );
    });
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Hello world",
    });
    await expect(heading).toBeVisible({ timeout: 5000 });

    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(bg).toBe("rgb(247, 250, 251)");
  });
});
