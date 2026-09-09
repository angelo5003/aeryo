import { createAccountSchema } from "./create-account.schema";

const validInput = {
  email: "user@example.com",
  username: "stormrider",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
};

describe("createAccountSchema", () => {
  it("accepts a valid email/password/confirmPassword combination", () => {
    const result = createAccountSchema.safeParse(validInput);

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    const result = createAccountSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["email"],
      message: "Invalid email address",
    });
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = createAccountSchema.safeParse({
      ...validInput,
      password: "short",
      confirmPassword: "short",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["password"],
      message: "Password must be at least 8 characters",
    });
  });

  it("rejects an empty confirmPassword", () => {
    const result = createAccountSchema.safeParse({
      ...validInput,
      confirmPassword: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["confirmPassword"],
      message: "Please confirm your password",
    });
  });

  it("rejects a confirmPassword that doesn't match password", () => {
    const result = createAccountSchema.safeParse({
      ...validInput,
      confirmPassword: "SomethingElse123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  });

  it("rejects a password that contains the account's email", () => {
    const result = createAccountSchema.safeParse({
      email: "test@example.com",
      username: "stormrider",
      password: "Test@example.com123",
      confirmPassword: "Test@example.com123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["password"],
      message: "Password cannot contain email",
    });
  });

  it("rejects a username shorter than 4 characters", () => {
    const result = createAccountSchema.safeParse({ ...validInput, username: "abc" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["username"],
      message: "Username must be at least 4 characters",
    });
  });

  it("rejects a username longer than 12 characters", () => {
    const result = createAccountSchema.safeParse({
      ...validInput,
      username: "waytoolongusername",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["username"],
      message: "Username must be at most 12 characters",
    });
  });

  it("rejects a username containing a space", () => {
    const result = createAccountSchema.safeParse({
      ...validInput,
      username: "storm rider",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["username"],
      message: "Username can only contain letters, numbers, and underscores",
    });
  });

  it("accepts a username with letters, numbers, and underscores", () => {
    const result = createAccountSchema.safeParse({
      ...validInput,
      username: "storm_99",
    });

    expect(result.success).toBe(true);
  });
});
