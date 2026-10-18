type ModuleLessons = { lessons?: Array<{ id: string; status?: string }> };

export function isModuleUnlocked(
  moduleIndex: number,
  modules: ModuleLessons[],
  completedLessonIds: Set<string>,
): boolean {
  if (moduleIndex < 0 || moduleIndex >= modules.length) return false;
  return modules.slice(0, moduleIndex).every(module =>
    (module.lessons ?? [])
      .filter(lesson => lesson.status === undefined || lesson.status === "published")
      .every(lesson => completedLessonIds.has(lesson.id)),
  );
}
