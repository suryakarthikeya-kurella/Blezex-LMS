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

import { AI_AUTOMATION_MODULES } from "./curriculum/aiAutomationData";
import { CLOUD_DEVOPS_MODULES } from "./curriculum/cloudDevopsData";
import { DATA_ANALYTICS_MODULES } from "./curriculum/dataAnalyticsData";
import { DIGITAL_MARKETING_MODULES } from "./curriculum/digitalMarketingData";
import { UI_UX_DESIGN_MODULES } from "./curriculum/uiUxDesignData";

export {
  AI_AUTOMATION_MODULES,
  CLOUD_DEVOPS_MODULES,
  DATA_ANALYTICS_MODULES,
  DIGITAL_MARKETING_MODULES,
  UI_UX_DESIGN_MODULES,
};

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
 * Universal lookup mapping course ID, slug, or title to its 6-subcourse curriculum
 */
export function getCurriculumForCourse(courseIdOrSlug?: string): CurriculumModule[] {
  if (!courseIdOrSlug) return FULL_STACK_MODULES;
  const s = courseIdOrSlug.toLowerCase();
  
  if (
    s.includes("ai-automation") ||
    s.includes("ai automation") ||
    s === "d554eb67-97aa-41d7-9af9-61735112a7c9" ||
    (s.includes("ai") && !s.includes("email") && !s.includes("trail"))
  ) {
    return AI_AUTOMATION_MODULES;
  }
  
  if (
    s.includes("cloud") ||
    s.includes("devops") ||
    s === "705f11ad-ec0d-480c-b93c-562e946a0ca8"
  ) {
    return CLOUD_DEVOPS_MODULES;
  }
  
  if (
    s.includes("data") ||
    s.includes("analytics") ||
    s === "4ea2dbff-d166-443e-817e-a54fe59244ab"
  ) {
    return DATA_ANALYTICS_MODULES;
  }
  
  if (
    s.includes("marketing") ||
    s.includes("digital") ||
    s === "373e7d95-4e2a-4dfd-9df6-606560aba857"
  ) {
    return DIGITAL_MARKETING_MODULES;
  }
  
  if (
    s.includes("ui") ||
    s.includes("ux") ||
    s.includes("design") ||
    s === "ce507e5b-4f95-4b61-a014-519a25f063ea"
  ) {
    return UI_UX_DESIGN_MODULES;
  }
  
  return FULL_STACK_MODULES;
}

export const ALL_COURSES_CURRICULA: Record<string, CurriculumModule[]> = {
  "full-stack-web": FULL_STACK_MODULES,
  "full-stack-web-development": FULL_STACK_MODULES,
  "7779e007-096a-4295-a772-be469591e24b": FULL_STACK_MODULES,
  "ai-automation": AI_AUTOMATION_MODULES,
  "d554eb67-97aa-41d7-9af9-61735112a7c9": AI_AUTOMATION_MODULES,
  "cloud-devops": CLOUD_DEVOPS_MODULES,
  "705f11ad-ec0d-480c-b93c-562e946a0ca8": CLOUD_DEVOPS_MODULES,
  "data-analytics": DATA_ANALYTICS_MODULES,
  "4ea2dbff-d166-443e-817e-a54fe59244ab": DATA_ANALYTICS_MODULES,
  "digital-marketing": DIGITAL_MARKETING_MODULES,
  "373e7d95-4e2a-4dfd-9df6-606560aba857": DIGITAL_MARKETING_MODULES,
  "ui-ux-design": UI_UX_DESIGN_MODULES,
  "ce507e5b-4f95-4b61-a014-519a25f063ea": UI_UX_DESIGN_MODULES,
};

/**
 * Search across all courses for an item by ID
 */
export function findCurriculumItem(itemId: string): { item: CurriculumItem; module: CurriculumModule; index: number } | null {
  const allModulesList = [
    ...FULL_STACK_MODULES,
    ...AI_AUTOMATION_MODULES,
    ...CLOUD_DEVOPS_MODULES,
    ...DATA_ANALYTICS_MODULES,
    ...DIGITAL_MARKETING_MODULES,
    ...UI_UX_DESIGN_MODULES
  ];
  for (const mod of allModulesList) {
    const itemIndex = mod.items.findIndex(it => it.id === itemId);
    if (itemIndex !== -1) {
      return { item: mod.items[itemIndex], module: mod, index: itemIndex };
    }
  }
  return null;
}

