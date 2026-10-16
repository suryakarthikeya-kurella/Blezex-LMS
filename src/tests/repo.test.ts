import { describe, expect, it } from "vitest";
import toml from "../../netlify.toml?raw";
import gitignore from "../../.gitignore?raw";
const raw = (g: Record<string, unknown>) => Object.entries(g).map(([path, src]) => [path, String(src)] as const);
const migrations = raw(import.meta.glob("../../supabase/migrations/*.sql", { query: "?raw", import: "default", eager: true })).sort(([a], [b]) => a.localeCompare(b));
const sources = raw(import.meta.glob(["../**/*.ts", "../**/*.tsx", "!../tests/**"], { query: "?raw", import: "default", eager: true }));
describe("migrations", () => {
  it("are numbered consecutively from 0001", () => { expect(migrations.length).toBeGreaterThanOrEqual(3); migrations.forEach(([p], i) => expect(p.split("/").pop()!.startsWith(String(i + 1).padStart(4, "0") + "_")).toBe(true)); });
  it("never destroy tables, columns or rows wholesale", () => { for (const [p, sql] of migrations) expect(sql, p).not.toMatch(/\b(drop\s+table|drop\s+column|truncate)\b/i); });
  it("re-lock public function grants after adding functions (0003)", () => { expect(migrations[2][1]).toMatch(/revoke execute on all functions in schema public from public, anon/); });
});
describe("deployment security headers", () => {
  it("ships a strict CSP", () => {
    expect(toml).toContain("Content-Security-Policy"); expect(toml).toContain("frame-ancestors 'none'"); expect(toml).toContain("object-src 'none'");
    expect(toml).not.toContain("unsafe-eval"); expect(toml).not.toMatch(/script-src[^;"]*unsafe-inline/);
  });
  it("sets clickjacking / sniffing / referrer / transport protections", () => { for (const h of ["X-Frame-Options", "X-Content-Type-Options", "Referrer-Policy", "Strict-Transport-Security"]) expect(toml).toContain(h); });
});
describe("secrets", () => {
  it(".env files are git-ignored", () => { expect(gitignore).toMatch(/^\.env$/m); expect(gitignore).toMatch(/^!\.env\.example$/m); });
  it("the service role key never appears in browser code", () => { expect(sources.length).toBeGreaterThan(20); for (const [p, src] of sources) expect(src, p).not.toMatch(/service_role|SERVICE_ROLE/); });
});
