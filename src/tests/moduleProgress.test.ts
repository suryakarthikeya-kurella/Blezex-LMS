import { describe, expect, it } from "vitest";
import { isModuleUnlocked } from "../lib/moduleProgress";

const modules = [
  { lessons: [{ id: "html-1", status: "published" }, { id: "html-2", status: "published" }] },
  { lessons: [{ id: "css-1", status: "published" }] },
  { lessons: [{ id: "js-1", status: "published" }] },
];

describe("isModuleUnlocked", () => {
  it("allows the first module", () => {
    expect(isModuleUnlocked(0, modules, new Set())).toBe(true);
  });

  it("keeps the next module locked until every lesson in the previous module is complete", () => {
    expect(isModuleUnlocked(1, modules, new Set(["html-1"]))).toBe(false);
  });

  it("unlocks the next module when the previous module is complete", () => {
    expect(isModuleUnlocked(1, modules, new Set(["html-1", "html-2"]))).toBe(true);
  });

  it("requires all earlier modules to be complete", () => {
    expect(isModuleUnlocked(2, modules, new Set(["html-1", "html-2"]))).toBe(false);
    expect(isModuleUnlocked(2, modules, new Set(["html-1", "html-2", "css-1"]))).toBe(true);
  });

  it("does not unlock an invalid module index", () => {
    expect(isModuleUnlocked(-1, modules, new Set())).toBe(false);
    expect(isModuleUnlocked(3, modules, new Set())).toBe(false);
  });
});
