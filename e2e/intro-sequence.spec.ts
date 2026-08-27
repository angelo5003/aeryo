import { test, expect } from "@playwright/test";

test.describe("splash → intro → home", () => {
  test("renders the intro (logo + tagline) then transitions to home", async ({
    page,
  }) => {
    await page.goto("/");

    // Intro content should be visible — Framer Motion fades these in, so
    // wait rather than asserting instantly.
    await expect(page.getByAltText("Aeryo")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Where the Unseen Leads")).toBeVisible({
      timeout: 3000,
    });

    // After the minDwellElapsed && appReady gate (2.5s dwell in
    // src/app/page.tsx), it should swap to the real app content.
    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("home page is never scrollable", async ({ page }) => {
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
