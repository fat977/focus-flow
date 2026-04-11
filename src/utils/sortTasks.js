export function sortTasks(tasks, sortBy) {
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  if (!tasks) return [];

  return [...tasks].sort((a, b) => {
    if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "priority")
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (sortBy === "board") return a.boardTitle.localeCompare(b.boardTitle);
    return 0;
  });
}
