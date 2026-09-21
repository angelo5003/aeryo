import { test, expect } from "@playwright/test";

// Logged-out visitors with onboarding already seen land on `/signup`,
// whose AuthLayout uses the same `bg` token the old home screen did.
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

    await expect(page.getByRole("heading", { name: "AERYO" })).toBeVisible({
      timeout: 5000,
    });

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

    await expect(page.getByRole("heading", { name: "AERYO" })).toBeVisible({
      timeout: 5000,
    });

    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(bg).toBe("rgb(247, 250, 251)");
  });
});
