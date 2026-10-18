/**
 * BlezeX Streak Service
 * Tracks student daily learning activity, consecutive streak calculation,
 * maximum historical streak, and weekly attendance calendar.
 */

const ACTIVITY_DATES_KEY = "blezex_activity_dates";
const MAX_STREAK_KEY = "blezex_max_streak";

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
 * Get all dates on which the user completed or submitted any course material
 */
export function getActivityDates(): Set<string> {
  const dates = new Set<string>();

  // 1. Read dedicated activity dates storage
  try {
    const raw = localStorage.getItem(ACTIVITY_DATES_KEY);
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

  // 2. Scan journey events for timestamps
  try {
    const rawEvents = localStorage.getItem("blezex_journey_events");
    if (rawEvents) {
      const events = JSON.parse(rawEvents);
      if (Array.isArray(events)) {
        events.forEach(e => {
          if (e.created_at) {
            const dt = new Date(e.created_at);
            if (!isNaN(dt.getTime())) {
              dates.add(formatLocalDate(dt));
            }
          }
        });
      }
    }
  } catch {}

  // 3. Scan quiz attempts
  try {
    const rawQuizzes = localStorage.getItem("blezex_quiz_attempts");
    if (rawQuizzes) {
      const quizzes = JSON.parse(rawQuizzes);
      if (Array.isArray(quizzes)) {
        quizzes.forEach(q => {
          if (q.created_at) {
            const dt = new Date(q.created_at);
            if (!isNaN(dt.getTime())) {
              dates.add(formatLocalDate(dt));
            }
          }
        });
      }
    }
  } catch {}

  // 4. Scan assignment submissions
  try {
    const rawSubs = localStorage.getItem("blezex_assignment_submissions");
    if (rawSubs) {
      const subs = JSON.parse(rawSubs);
      if (Array.isArray(subs)) {
        subs.forEach(s => {
          if (s.created_at) {
            const dt = new Date(s.created_at);
            if (!isNaN(dt.getTime())) {
              dates.add(formatLocalDate(dt));
            }
          }
        });
      }
    }
  } catch {}

  return dates;
}

/**
 * Record learning activity for today (or a specific date)
 */
export function recordDailyActivity(specificDate?: Date | string) {
  let dateStr: string;
  if (specificDate instanceof Date) {
    dateStr = formatLocalDate(specificDate);
  } else if (typeof specificDate === "string") {
    dateStr = specificDate.slice(0, 10);
  } else {
    dateStr = formatLocalDate(new Date());
  }

  const existingDates = getActivityDates();
  existingDates.add(dateStr);

  try {
    localStorage.setItem(ACTIVITY_DATES_KEY, JSON.stringify(Array.from(existingDates)));
  } catch {}

  // Recalculate streak & update max streak
  const streak = calculateStreakInfo();
  if (streak.currentStreak > streak.maxStreak) {
    try {
      localStorage.setItem(MAX_STREAK_KEY, String(streak.currentStreak));
    } catch {}
  }

  // Broadcast update event to all listening components
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("blezex:streak-updated"));
      window.dispatchEvent(new CustomEvent("blezex:progress-updated"));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  }

  return streak;
}

/**
 * Calculate the exact streak according to consecutive day rules:
 * - If user has activity today: count backwards from today.
 * - Else if user has activity yesterday: count backwards from yesterday (streak is preserved).
 * - Else (no activity today AND no activity yesterday): missed a day -> streak resets to 0!
 * - Track maximum historical streak.
 * - Build the Monday-Sunday week day breakdown.
 */
export function calculateStreakInfo(): StreakInfo {
  const activeDates = getActivityDates();
  const today = new Date();
  const todayStr = formatLocalDate(today);

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

  // Calculate highest historical max streak
  let storedMax = 0;
  try {
    const rawMax = localStorage.getItem(MAX_STREAK_KEY);
    if (rawMax) storedMax = parseInt(rawMax, 10) || 0;
  } catch {}

  // Also check longest consecutive run in all active dates
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

  const maxStreak = Math.max(storedMax, longestRun, currentStreak);
  if (maxStreak > storedMax) {
    try {
      localStorage.setItem(MAX_STREAK_KEY, String(maxStreak));
    } catch {}
  }

  // Calculate Monday through Sunday for current week
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
  // Determine Monday of current week:
  // If today is Sunday (0), Monday was 6 days ago. Otherwise Monday was (dayOfWeek - 1) days ago.
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

  // Friendly motivational message
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
