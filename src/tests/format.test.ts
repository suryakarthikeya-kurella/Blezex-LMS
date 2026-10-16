import { describe, expect, it } from "vitest";
import { auditLabel, fmtDate, short, todayLocal } from "../lib/format";
describe("todayLocal", () => {
  it("uses the local calendar date, not the UTC date", () => {
    expect(todayLocal(new Date(2026, 0, 5, 0, 30))).toBe("2026-01-05");   // 00:30 local: toISOString() would give the previous day in UTC+ zones
    expect(todayLocal(new Date(2026, 11, 31, 23, 59))).toBe("2026-12-31"); // 23:59 local: toISOString() would give the next day in UTC- zones
  });
  it("zero-pads month and day", () => { expect(todayLocal(new Date(2026, 2, 3, 12))).toBe("2026-03-03"); });
});
describe("auditLabel", () => {
  it("names the events the database writes", () => {
    expect(auditLabel({ action: "INSERT_enrollment" })).toBe("Granted course access");
    expect(auditLabel({ action: "UPDATE_enrollment", details: { status: "paused" } })).toBe("Updated an enrollment (now paused)");
    expect(auditLabel({ action: "create_user", details: { role: "mentor" } })).toBe("Created mentor account");
    expect(auditLabel({ action: "set_status_suspended" })).toBe("Suspended an account");
    expect(auditLabel({ action: "set_status_active" })).toBe("Reactivated an account");
    expect(auditLabel({ action: "issue_certificate" })).toBe("Issued a certificate");
    expect(auditLabel({ action: "certificate_revoked" })).toBe("Revoked a certificate");
    expect(auditLabel({ action: "course_published" })).toBe("Published a course");
    expect(auditLabel({ action: "course_draft" })).toBe("Unpublished a course");
  });
  it("falls back to readable text for unknown actions", () => { expect(auditLabel({ action: "some_new_action" })).toBe("some new action"); });
});
describe("helpers", () => {
  it("short() abbreviates long ids only", () => { expect(short("e1c2d3f4-1111-2222-3333-444455556666")).toBe("e1c2d3f4…"); expect(short("s1")).toBe("s1"); });
  it("fmtDate renders a readable string", () => { expect(fmtDate("2026-10-15T09:30:00Z")).toMatch(/2026/); });
});
