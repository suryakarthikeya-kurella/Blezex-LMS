/**
 * BlezeX Streak Service
 * Tracks student daily learning activity, consecutive streak calculation,
 * maximum historical streak, and weekly attendance calendar.
 *
 * Scoped strictly per individual student ID. Each student has their own
 * independent learning streak, calendar, and activity records.
 */

export interface WeekDayStatus {
  dayName: string; // "Mon", "Tue", etc.
  date: string;    // "YYYY-MM-DD"
  hasActivity: boolean;
  isToday: boolean;
  isFuture: boolean;
}

export interface StreakInfo {
  currentStreak: number;
  maxStreak: number;
  isActiveToday: boolean;
  lastActiveDate: string | null;
  totalActiveDays: number;
  weekDays: WeekDayStatus[];
  message: string;
}

// Clean up old un-scoped legacy keys from earlier versions so they never pollute any student
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem("blezex_activity_dates");
    localStorage.removeItem("blezex_max_streak");
  } catch {}
}

/**
 * Format a Date object to YYYY-MM-DD using local time
 */
export function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Safely resolves the active student's unique ID.
 * Hierarchy:
 * 1. Explicit userId parameter if provided
 * 2. localStorage "blezex_active_user_id"
 * 3. Supabase session token in localStorage
 * 4. Fallback to "guest"
 */
export function resolveActiveUserId(userId?: string | null): string {
  if (userId && typeof userId === "string" && userId.trim()) {
    return userId.trim();
  }
  if (typeof window !== "undefined") {
    try {
      const explicit = localStorage.getItem("blezex_active_user_id");
      if (explicit && explicit.trim()) return explicit.trim();

      // Check for Supabase session auth token in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("sb-") && key.endsWith("-auth-token")) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            const uid = parsed?.user?.id || parsed?.currentSession?.user?.id;
            if (uid) return String(uid);
          }
        }
      }
    } catch {}
  }
  return "guest";
}

export function getActivityDatesKey(uid: string): string {
  return `blezex_activity_dates_${uid}`;
}

export function getMaxStreakKey(uid: string): string {
  return `blezex_max_streak_${uid}`;
}

/**
 * Helper to build 7-day Monday-to-Sunday calendar
 */
function buildWeekDays(today: Date, todayStr: string, activeDates: Set<string>): WeekDayStatus[] {
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
  const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today);
  monday.setDate(monday.getDate() - distanceToMonday);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDays: WeekDayStatus[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dStr = formatLocalDate(d);
    weekDays.push({
      dayName: dayNames[i],
      date: dStr,
      hasActivity: activeDates.has(dStr),
      isToday: dStr === todayStr,
      isFuture: dStr > todayStr,
    });
  }
  return weekDays;
}

/**
 * Get all dates on which THIS specific student completed or submitted any course material.
 * Strictly checks user-scoped keys only — never cross-pollutes between students.
 */
export function getActivityDates(
  userId?: string | null,
  additionalDates?: (string | Date | null | undefined)[]
): Set<string> {
  const uid = resolveActiveUserId(userId);
  const dates = new Set<string>();

  // If unauthenticated or guest, return completely empty set
  if (!uid || uid === "guest") {
    return dates;
  }

  // 1. Read dedicated activity dates storage for THIS user only
  try {
    const raw = localStorage.getItem(getActivityDatesKey(uid));
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        arr.forEach(d => {
          if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
            dates.add(d);
          }
        });
      }
    }
  } catch {}

  // 2. Scan journey events ONLY belonging to THIS user
  try {
    const rawEvents = localStorage.getItem(`blezex_journey_events_${uid}`);
    if (rawEvents) {
      const events = JSON.parse(rawEvents);
      if (Array.isArray(events)) {
        events.forEach(e => {
          if (e && e.user_id === uid && e.created_at) {
            const dt = new Date(e.created_at);
            if (!isNaN(dt.getTime())) {
              dates.add(formatLocalDate(dt));
            }
          }
        });
      }
    }
  } catch {}

  // 3. Scan quiz attempts ONLY belonging to THIS user
  try {
    const rawQuizzes = localStorage.getItem(`blezex_quiz_attempts_${uid}`);
    if (rawQuizzes) {
      const quizzes = JSON.parse(rawQuizzes);
      if (Array.isArray(quizzes)) {
        quizzes.forEach(q => {
          if (q && q.user_id === uid && q.created_at) {
            const dt = new Date(q.created_at);
            if (!isNaN(dt.getTime())) {
              dates.add(formatLocalDate(dt));
            }
          }
        });
      }
    }
  } catch {}

  // 4. Scan assignment submissions ONLY belonging to THIS user
  try {
    const rawSubs = localStorage.getItem(`blezex_assignment_submissions_${uid}`);
    if (rawSubs) {
      const subs = JSON.parse(rawSubs);
      if (Array.isArray(subs)) {
        subs.forEach(s => {
          if (s && s.user_id === uid && s.created_at) {
            const dt = new Date(s.created_at);
            if (!isNaN(dt.getTime())) {
              dates.add(formatLocalDate(dt));
            }
          }
        });
      }
    }
  } catch {}

  // 5. Add any additional verified dates passed from database for this student
  if (Array.isArray(additionalDates)) {
    additionalDates.forEach(item => {
      if (!item) return;
      if (item instanceof Date && !isNaN(item.getTime())) {
        dates.add(formatLocalDate(item));
      } else if (typeof item === "string") {
        if (/^\d{4}-\d{2}-\d{2}$/.test(item)) {
          dates.add(item);
        } else {
          const dt = new Date(item);
          if (!isNaN(dt.getTime())) {
            dates.add(formatLocalDate(dt));
          }
        }
      }
    });
  }

  return dates;
}

/**
 * Record learning activity for today (or a specific date) for THIS specific student
 */
export function recordDailyActivity(
  specificDate?: Date | string,
  userId?: string | null
): StreakInfo {
  const uid = resolveActiveUserId(userId);
  if (!uid || uid === "guest") {
    return calculateStreakInfo(uid);
  }

  let dateStr: string;
  if (specificDate instanceof Date) {
    dateStr = formatLocalDate(specificDate);
  } else if (typeof specificDate === "string") {
    dateStr = specificDate.slice(0, 10);
  } else {
    dateStr = formatLocalDate(new Date());
  }

  const existingDates = getActivityDates(uid);
  existingDates.add(dateStr);

  try {
    localStorage.setItem(getActivityDatesKey(uid), JSON.stringify(Array.from(existingDates)));
  } catch {}

  // Recalculate streak & update max streak for this student
  const streak = calculateStreakInfo(uid);
  if (streak.currentStreak > streak.maxStreak) {
    try {
      localStorage.setItem(getMaxStreakKey(uid), String(streak.currentStreak));
    } catch {}
  }

  // Broadcast update event to all listening components
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("blezex:streak-updated", { detail: { userId: uid } }));
      window.dispatchEvent(new CustomEvent("blezex:progress-updated", { detail: { userId: uid } }));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  }

  return streak;
}

/**
 * Calculate the exact streak for a student according to consecutive day rules:
 * - Scoped uniquely to userId!
 * - If user has 0 active days: streak is 0, max is 0. Clean up any stale data.
 * - If user has activity today: count backwards from today.
 * - Else if user has activity yesterday: count backwards from yesterday (streak is preserved).
 * - Else (no activity today AND no activity yesterday): missed a day -> streak resets to 0!
 * - maxStreak can NEVER exceed total active days!
 */
export function calculateStreakInfo(
  userId?: string | null,
  additionalDates?: (string | Date | null | undefined)[]
): StreakInfo {
  const uid = resolveActiveUserId(userId);
  const today = new Date();
  const todayStr = formatLocalDate(today);

  // If no authenticated user, return completely clean 0 streak
  if (!uid || uid === "guest") {
    return {
      currentStreak: 0,
      maxStreak: 0,
      isActiveToday: false,
      lastActiveDate: null,
      totalActiveDays: 0,
      weekDays: buildWeekDays(today, todayStr, new Set()),
      message: "Complete any lesson, quiz, or project today to start your streak!",
    };
  }

  const activeDates = getActivityDates(uid, additionalDates);

  // ZERO ACTIVITY GUARD:
  // If this student has submitted no lessons or quizzes, streak and max streak are unconditionally 0!
  if (activeDates.size === 0) {
    try {
      localStorage.removeItem(getMaxStreakKey(uid));
      localStorage.removeItem(getActivityDatesKey(uid));
    } catch {}
    return {
      currentStreak: 0,
      maxStreak: 0,
      isActiveToday: false,
      lastActiveDate: null,
      totalActiveDays: 0,
      weekDays: buildWeekDays(today, todayStr, activeDates),
      message: "Complete any lesson, quiz, or project today to start your streak!",
    };
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatLocalDate(yesterday);

  const isActiveToday = activeDates.has(todayStr);
  const isActiveYesterday = activeDates.has(yesterdayStr);

  let currentStreak = 0;

  if (isActiveToday) {
    // Count consecutive days ending today
    currentStreak = 1;
    let checkDate = new Date(today);
    while (true) {
      checkDate.setDate(checkDate.getDate() - 1);
      const str = formatLocalDate(checkDate);
      if (activeDates.has(str)) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else if (isActiveYesterday) {
    // Preserved streak: count consecutive days ending yesterday
    currentStreak = 1;
    let checkDate = new Date(yesterday);
    while (true) {
      checkDate.setDate(checkDate.getDate() - 1);
      const str = formatLocalDate(checkDate);
      if (activeDates.has(str)) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else {
    // Missed yesterday and today: streak is 0
    currentStreak = 0;
  }

  // Calculate highest historical max streak for THIS student
  let storedMax = 0;
  try {
    const rawMax = localStorage.getItem(getMaxStreakKey(uid));
    if (rawMax) storedMax = parseInt(rawMax, 10) || 0;
  } catch {}

  // Stored max can never exceed actual lifetime active days
  storedMax = Math.min(storedMax, activeDates.size);

  // Calculate longest consecutive run in all active dates for this student
  const sortedDates = Array.from(activeDates).sort();
  let longestRun = 0;
  let tempRun = 0;
  let prevTime: number | null = null;

  for (const dStr of sortedDates) {
    const time = new Date(`${dStr}T00:00:00`).getTime();
    if (prevTime === null) {
      tempRun = 1;
    } else {
      const diffDays = Math.round((time - prevTime) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempRun++;
      } else if (diffDays > 1) {
        tempRun = 1;
      }
    }
    if (tempRun > longestRun) longestRun = tempRun;
    prevTime = time;
  }

  // maxStreak is bounded by activeDates.size:
  const maxStreak = Math.min(Math.max(storedMax, longestRun, currentStreak), activeDates.size);
  if (maxStreak > storedMax) {
    try {
      localStorage.setItem(getMaxStreakKey(uid), String(maxStreak));
    } catch {}
  }

  const weekDays = buildWeekDays(today, todayStr, activeDates);

  let message = "Complete any lesson, quiz, or project today to start your streak!";
  if (isActiveToday) {
    message = `🔥 ${currentStreak} day streak! Great work keeping your momentum.`;
  } else if (currentStreak > 0) {
    message = `⚡ Keep your ${currentStreak}-day streak alive! Complete a topic today.`;
  }

  return {
    currentStreak,
    maxStreak,
    isActiveToday,
    lastActiveDate: sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : null,
    totalActiveDays: activeDates.size,
    weekDays,
    message,
  };
}
