export * from "./curriculumTypes";
import { CurriculumModule, CurriculumItem } from "./curriculumTypes";
import { htmlCssSubCourse } from "./curriculum/htmlCssData";
import { jsFundamentalsSubCourse } from "./curriculum/javascriptFundamentalsData";
import { databaseSqlSubCourse } from "./curriculum/databaseSqlData";
import { nodeExpressSubCourse } from "./curriculum/nodeExpressData";
import { reactJsSubCourse } from "./curriculum/reactJsData";
import { gitBasicsSubCourse } from "./curriculum/gitBasicsData";

/**
 * Parse human duration string (e.g., "25 mins", "1 hour, 30 mins", "90 mins") into minutes.
 */
export function parseDurationMinutes(durationStr?: string): number {
  if (!durationStr) return 0;
  let total = 0;
  const hrMatch = durationStr.match(/(\d+)\s*(?:hours?|hrs?)/i);
  const minMatch = durationStr.match(/(\d+)\s*(?:minutes?|mins?|m\b)/i);
  if (hrMatch) total += parseInt(hrMatch[1], 10) * 60;
  if (minMatch) total += parseInt(minMatch[1], 10);
  return total;
}

/**
 * Format minutes into a friendly string like "45 hours, 10 mins" or "25 mins".
 */
export function formatMinutesToHuman(totalMinutes: number): string {
  if (totalMinutes <= 0) return "0 mins";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours > 0 && mins > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}, ${mins} mins`;
  }
  if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `${mins} mins`;
}

/**
 * Format minutes into a compact string like "45h 10m".
 */
export function formatMinutesCompact(totalMinutes: number): string {
  if (totalMinutes <= 0) return "0m";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

/**
 * Calculate the exact total minutes for any module from its items.
 */
export function getModuleTotalMinutes(mod: { items?: Array<{ duration?: string }> }): number {
  if (!mod?.items || !Array.isArray(mod.items)) return 0;
  return mod.items.reduce((sum, it) => sum + parseDurationMinutes(it.duration), 0);
}

/**
 * Calculate the exact total minutes for a full course across all modules.
 */
export function getCourseTotalMinutes(mods: Array<{ items?: Array<{ duration?: string }> }>): number {
  if (!mods || !Array.isArray(mods)) return 0;
  return mods.reduce((sum, m) => sum + getModuleTotalMinutes(m), 0);
}

export const getSubCourseTotalMinutes = getModuleTotalMinutes;

// =========================================================================
// FULL STACK WEB DEVELOPMENT CURRICULUM (6 SUB-COURSES)
// =========================================================================

export const FULL_STACK_MODULES: CurriculumModule[] = [
  htmlCssSubCourse,
  jsFundamentalsSubCourse,
  databaseSqlSubCourse,
  nodeExpressSubCourse,
  reactJsSubCourse,
  gitBasicsSubCourse
];

export const FULL_STACK_SUB_COURSES = FULL_STACK_MODULES;

/**
 * Search across all 6 subcourses for an item by ID
 */
export function findCurriculumItem(itemId: string): { item: CurriculumItem; module: CurriculumModule; index: number } | null {
  for (const mod of FULL_STACK_MODULES) {
    const itemIndex = mod.items.findIndex(it => it.id === itemId);
    if (itemIndex !== -1) {
      return { item: mod.items[itemIndex], module: mod, index: itemIndex };
    }
  }
  return null;
}
