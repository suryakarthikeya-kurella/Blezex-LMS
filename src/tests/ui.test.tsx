import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { cell } from "../components/DataTable";
import { Field, StatusBadge } from "../components/admin/kit";
const html = (n: any) => renderToStaticMarkup(<StaticRouter location="/">{n}</StaticRouter>);
describe("report cell formatting", () => {
  it("shows a dash for empty values and Yes/No for booleans", () => { expect(html(cell("x", null))).toContain("—"); expect(html(cell("eligible", true))).toBe("Yes"); expect(html(cell("eligible", false))).toBe("No"); });
  it("appends % to *_pct columns", () => { expect(html(cell("progress_pct", 60.5))).toBe("60.5%"); expect(html(cell("attendance_pct", "100"))).toBe("100%"); });
  it("formats ISO timestamps instead of printing them raw", () => { const out = html(cell("created_at", "2026-10-15T09:30:00Z")); expect(out).not.toContain("T09:30:00Z"); expect(out).toMatch(/2026/); });
  it("shortens uuids but keeps the full value in the tooltip", () => { const id = "e1c2d3f4-1111-2222-3333-444455556666"; const out = html(cell("id", id)); expect(out).toContain("e1c2d3f4…"); expect(out).toContain(`title="${id}"`); });
  it("links verification ids to the public verify page", () => { expect(html(cell("verification_id", "BLZX-ABC"))).toContain('href="/verify/BLZX-ABC"'); });
  it("renders status as a badge", () => { expect(html(cell("status", "active"))).toContain("active"); });
});
describe("StatusBadge", () => {
  it("uses distinct tones for success / warning / danger", () => {
    expect(html(<StatusBadge value="active" />)).toContain("green"); expect(html(<StatusBadge value="paused" />)).toContain("amber"); expect(html(<StatusBadge value="suspended" />)).toContain("red");
    expect(html(<StatusBadge value="graded" />)).toContain("green"); expect(html(<StatusBadge value="submitted" />)).toContain("amber");
  });
  it("falls back to neutral for unknown values", () => { expect(html(<StatusBadge value="whatever" />)).toContain("bg-paper"); });
});
describe("Field", () => {
  it("links label and control, announces required fields, and shows errors as alerts", () => {
    const out = html(<Field label="Email" htmlFor="em" required error="Valid email required"><input id="em" /></Field>);
    expect(out).toContain('for="em"'); expect(out).toContain("(required)"); expect(out).toContain('role="alert"'); expect(out).toContain("Valid email required");
  });
});
