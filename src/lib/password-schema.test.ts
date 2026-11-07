import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { passwordFormSchema } from "./password-schema";

describe("password recovery form", () => {
  test("rejects a new password that is too short", () => {
    const result = passwordFormSchema.safeParse({ password: "abc12", confirm: "abc12" });
    assert.equal(result.success, false);
  });

  test("rejects a new password that does not match its confirmation", () => {
    const result = passwordFormSchema.safeParse({ password: "secret123", confirm: "secret124" });
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].path[0], "confirm");
  });

  test("accepts a new password entered twice", () => {
    const result = passwordFormSchema.safeParse({ password: "secret123", confirm: "secret123" });
    assert.equal(result.success, true);
  });
});
