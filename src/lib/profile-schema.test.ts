import { describe, expect, test } from "bun:test";
import { profileSchema } from "./profile-schema";

describe("personal profile updates", () => {
  test("accepts editable personal information", () => {
    expect(profileSchema.parse({ full_name: " Jane ", company: "RobotAI", phone: "+972 555 0100" }))
      .toEqual({ full_name: "Jane", company: "RobotAI", phone: "+972 555 0100" });
  });
  test("cannot choose another account's identity", () => {
    expect(profileSchema.safeParse({ full_name: "Jane", company: "", phone: "", user_id: "another-user" }).success).toBe(false);
  });
});