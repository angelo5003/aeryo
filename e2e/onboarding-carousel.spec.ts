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

  test("dragging does not change slides — only Next does", async ({ page }) => {
    await getToOnboarding(page);

    const region = page.getByRole("region", { name: "Onboarding" });
    const box = await region.boundingBox();
    expect(box).toBeTruthy();

    await page.mouse.move(
      box!.x + box!.width * 0.8,
      box!.y + box!.height * 0.35,
    );
    await page.mouse.down();
    await page.mouse.move(
      box!.x + box!.width * 0.2,
      box!.y + box!.height * 0.35,
      { steps: 12 },
    );
    await page.mouse.up();

    await expect(
      page.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Next" }).click();
    await expect(
      page.getByRole("heading", { name: "Discover the Elements" }),
    ).toBeVisible();
  });

  // Create account opens the account sheet and does not complete onboarding yet.
  // Switch back to `test(` when signup wires through to home.
  test.skip("Next advances through all 6 slides, Create account completes and persists", async ({
    page,
  }) => {
    await getToOnboarding(page);

    const headings = [
      "Discover the Elements",
      "Master the Conditions",
      "Find Your Community",
      "Track Your Progress",
      "Ready When You Are",
    ];

    for (const heading of headings) {
      await page.getByRole("button", { name: "Next" }).click();
      await expect(page.getByRole("heading", { name: heading })).toBeVisible({
        timeout: 3000,
      });
    }

    await expect(page.getByRole("button", { name: "Skip" })).toHaveCount(0);
    await expect(page.getByRole("group")).toHaveCount(0);
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });
});
