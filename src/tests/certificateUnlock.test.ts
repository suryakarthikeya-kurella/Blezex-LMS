import { describe, expect, it } from "vitest";
import { isCertificateUnlocked } from "../lib/certificateUnlock";

describe("isCertificateUnlocked", () => {
  it("keeps the certificate locked below the required progress", () => {
    expect(isCertificateUnlocked(79, 80)).toBe(false);
  });

  it("unlocks the certificate at the required progress", () => {
    expect(isCertificateUnlocked(80, 80)).toBe(true);
  });

  it("unlocks the certificate above the required progress", () => {
    expect(isCertificateUnlocked(96, 80)).toBe(true);
  });
});
