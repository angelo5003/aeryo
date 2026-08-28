import { test, expect } from "@playwright/test";

// These tests deliberately start from a fresh (unseeded) `localStorage` —
// that's what puts a first launch on the onboarding carousel at all.
test.describe("onboarding carousel", () => {
  async function getToOnboarding(page: import("@playwright/test").Page) {
    await page.goto("/");
    const background = page.locator('img[alt=""]').first();
    await background.dispatchEvent("load");
    await expect(
      page.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible({ timeout: 5000 });
  }

  test("Skip goes straight to home and persists across a reload", async ({
    page,
  }) => {
    await getToOnboarding(page);
    await page.getByRole("button", { name: "Skip" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("Next advances through all 5 slides, Get Started completes and persists", async ({
    page,
  }) => {
    await getToOnboarding(page);

    const headings = [
      "Discover the Elements",
      "Master the Conditions",
      "Find Your Community",
      "Track Your Progress",
    ];

    for (const heading of headings) {
      await page.getByRole("button", { name: "Next" }).click();
      await expect(page.getByRole("heading", { name: heading })).toBeVisible({
        timeout: 3000,
      });
    }

    await expect(page.getByRole("button", { name: "Skip" })).toHaveCount(0);
    await page.getByRole("button", { name: "Get Started" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });
});
