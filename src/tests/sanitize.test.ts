// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { sanitizeHtml } from "../lib/sanitize";
describe("sanitizeHtml", () => {
  it("removes script tags", () => expect(sanitizeHtml('<p>a</p><script>alert(1)</script>')).not.toContain("script"));
  it("removes inline event handlers", () => expect(sanitizeHtml('<img src=x onerror="alert(1)">')).not.toContain("onerror"));
  it("removes javascript: URLs", () => expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).not.toContain("javascript:"));
  it("keeps headings, tables and inline SVG", () => {
    const out = sanitizeHtml('<h2>T</h2><table><tr><td>1</td></tr></table><svg viewBox="0 0 10 10"><rect width="5" height="5"/></svg>');
    expect(out).toContain("<h2>"); expect(out).toContain("<table>"); expect(out).toContain("<svg"); expect(out).toContain("<rect");
  });
  it("blocks iframes from non-allowlisted hosts", () => expect(sanitizeHtml('<iframe src="https://evil.example/x"></iframe>')).not.toContain("iframe"));
  it("allows YouTube no-cookie embeds", () => expect(sanitizeHtml('<iframe src="https://www.youtube-nocookie.com/embed/abc"></iframe>')).toContain("iframe"));
  it("strips style, form and object tags", () => { const o = sanitizeHtml('<style>*{}</style><form><input></form><object data="x"></object>'); expect(o).not.toMatch(/<(style|form|object)/); });
});
