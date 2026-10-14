export function isCertificateUnlocked(progressPct: number, requiredProgressPct: number): boolean {
  return progressPct >= requiredProgressPct;
}
