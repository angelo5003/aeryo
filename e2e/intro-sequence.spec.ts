import { test, expect } from "@playwright/test";

test.describe("splash → intro → onboarding → home", () => {
  test("first launch: intro transitions to onboarding, not home", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByAltText("Aeryo")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Where the Unseen Leads")).toBeVisible({
      timeout: 3000,
    });

    await expect(
      page.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("returning user (onboarding already seen) goes straight to home", async ({
    page,
  }) => {
    // Simulate a returning user: pre-seed the flag `onboardingStorage.ts`
    // checks, using the same key/value it writes on web
    // (`@capacitor/preferences` prefixes keys with `CapacitorStorage.` in
    // localStorage).
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "CapacitorStorage.aeryo:onboarding-seen",
        "true",
      );
    });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("home page is never scrollable", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "CapacitorStorage.aeryo:onboarding-seen",
        "true",
      );
    });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    const { scrollHeight, clientHeight } = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    }));

    expect(scrollHeight).toBeLessThanOrEqual(clientHeight);
  });
});
