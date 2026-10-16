import { describe, expect, it } from "vitest";
import { createUserSchema, loginSchema, passwordSchema, submissionSchema } from "../lib/schemas";
describe("schemas", () => {
  it("login requires valid email and 8+ char password", () => { expect(loginSchema.safeParse({ email: "a@b.co", password: "12345678" }).success).toBe(true); expect(loginSchema.safeParse({ email: "bad", password: "1" }).success).toBe(false); });
  it("cannot create admin accounts through the UI schema", () => expect(createUserSchema.safeParse({ full_name: "Ann", email: "a@b.co", password: "12345678", role: "admin" }).success).toBe(false));
  it("password confirmation must match", () => { expect(passwordSchema.safeParse({ password: "12345678", confirm: "x" }).success).toBe(false); expect(passwordSchema.safeParse({ password: "12345678", confirm: "12345678" }).success).toBe(true); });
  it("submission needs text or a valid http(s) link", () => {
    expect(submissionSchema.safeParse({ text: "", link: "" }).success).toBe(false);
    expect(submissionSchema.safeParse({ text: "done" }).success).toBe(true);
    expect(submissionSchema.safeParse({ link: "javascript:alert(1)" }).success).toBe(false);
    expect(submissionSchema.safeParse({ link: "https://github.com/x/y" }).success).toBe(true);
  });
});
describe("schemas (bounds)", () => {
  it("create-user caps name and password length", () => {
    const base = { full_name: "Asha", email: "a@b.co", password: "12345678", role: "student" as const };
    expect(createUserSchema.safeParse(base).success).toBe(true);
    expect(createUserSchema.safeParse({ ...base, full_name: "x".repeat(121) }).success).toBe(false);
    expect(createUserSchema.safeParse({ ...base, password: "x".repeat(73) }).success).toBe(false);
    expect(createUserSchema.safeParse({ ...base, role: "admin" }).success).toBe(false);
  });
  it("password confirmation must match", () => { expect(passwordSchema.safeParse({ password: "12345678", confirm: "different" }).success).toBe(false); });
  it("submissions reject javascript: links", () => { expect(submissionSchema.safeParse({ text: "", link: "javascript:alert(1)" }).success).toBe(false); });
});
