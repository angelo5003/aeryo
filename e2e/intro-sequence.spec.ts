import { test, expect } from "@playwright/test";

test.describe("splash → intro → onboarding → signup", () => {
  test("first launch: intro transitions to onboarding, not signup", async ({
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

  test("returning user (onboarding already seen) goes straight to signup", async ({
    page,
  }) => {
    // Simulate a returning user: pre-seed the flag `onboardingStorage.ts`
    // checks, using the same key/value it writes on web
    // (`@capacitor/preferences` prefixes keys with `CapacitorStorage.` in
    // localStorage). Logged-out visitors with slides already seen are sent
    // to `/signup` — there is no logged-out home screen.
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "CapacitorStorage.aeryo:onboarding-seen",
        "true",
      );
    });
    await page.goto("/");

    await expect(page).toHaveURL(/\/signup\/?$/, { timeout: 5000 });
    await expect(page.getByRole("heading", { name: "AERYO" })).toBeVisible({
      timeout: 5000,
    });
    await expect(
      page.getByRole("button", { name: "Create Account" }),
    ).toBeVisible();

    await page.reload();
    await expect(page).toHaveURL(/\/signup\/?$/);
    await expect(page.getByRole("heading", { name: "AERYO" })).toBeVisible({
      timeout: 5000,
    });
  });
});
