import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { profileSchema } from "./profile-schema";

describe("personal profile updates", () => {
  test("accepts editable personal information", () => {
    assert.deepEqual(profileSchema.parse({ full_name: " Jane ", company: "RobotAI", phone: "+972 555 0100" }),
      { full_name: "Jane", company: "RobotAI", phone: "+972 555 0100" });
  });
  test("cannot choose another account's identity", () => {
    assert.equal(profileSchema.safeParse({ full_name: "Jane", company: "", phone: "", user_id: "another-user" }).success, false);
  });
});