import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  it("accepts a valid email identifier", () => {
    const result = loginSchema.safeParse({
      identifier: "user@example.com",
      password: "SecurePass123",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a valid username identifier", () => {
    const result = loginSchema.safeParse({
      identifier: "stormrider",
      password: "SecurePass123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an identifier with '@' that isn't a valid email", () => {
    const result = loginSchema.safeParse({
      identifier: "not-an-email@",
      password: "SecurePass123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["identifier"],
      message: "Invalid email address",
    });
  });

  it("rejects an identifier without '@' that fails the username rule", () => {
    const result = loginSchema.safeParse({
      identifier: "ab",
      password: "SecurePass123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["identifier"],
      message: "Username must be at least 4 characters",
    });
  });

  it("rejects an empty identifier", () => {
    const result = loginSchema.safeParse({
      identifier: "",
      password: "SecurePass123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["identifier"],
      message: "Email or username is required",
    });
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      identifier: "stormrider",
      password: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["password"],
      message: "Password is required",
    });
  });
});
