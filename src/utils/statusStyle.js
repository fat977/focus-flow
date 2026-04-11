const BADGE_BASE =
  "px-2 py-0.5 border rounded-full flex items-center gap-1 w-fit";


export const statusColors = {
  danger: "bg-(--danger-50)  text-(--danger-600)  border-(--danger-100)",
  warning: "bg-(--warning-50) text-(--warning-600) border-(--warning-100)",
  success: "bg-(--success-50) text-(--success-600) border-(--success-100)",
  brand: "bg-(--brand-50)   text-(--brand-600)   border-(--brand-100)",
  grey: "bg-(--grey-100)  text-(--grey-600)    border-(--grey-200)",
};

export const pureColors = {
  success: "bg-(--success-600)",
  warning: "bg-(--warning-600)",
  danger: "bg-(--danger-600)",
  brand: "bg-(--brand-600)",
};

export const statusSettings = {
  Completed: { color: "success", iconName: "check", label: "Completed" },
  "On Track": { color: "brand", iconName: "play", label: "On Track" },
  "At Risk": { color: "warning", iconName: "alert", label: "At Risk" },
  Delayed: { color: "danger", iconName: "x", label: "Delayed" },
  "Not Started": { color: "grey", iconName: "clock", label: "Not Started" },
};

export const priorityStyles = {
  high: statusColors.danger,
  medium: statusColors.warning,
  low: statusColors.success,
};

export const priorityDotStyles = {
  high: "bg-[var(--danger-600)]",
  medium: "bg-[var(--warning-600)]",
  low: "bg-[var(--success-600)]",
};

export const listTypeStyles = {
  todo: statusColors.grey, 
  "in-progress": statusColors.warning,
  done: statusColors.success,
};

export const getBoardStatus = (lists = [], totalTasks, completedTasks) => {
  if (totalTasks === 0) return { label: "Empty", style: statusColors.grey };
  if (completedTasks === totalTasks)
    return { label: "Completed", style: statusColors.success };

  const hasTasksInProgress = lists.some(
    (l) => l.type === "in-progress" && l.tasks?.length > 0,
  );

  if (
    hasTasksInProgress ||
    (completedTasks > 0 && completedTasks < totalTasks)
  ) {
    return { label: "In Progress", style: statusColors.warning };
  }

  return { label: "Not Started", style: statusColors.grey }; 
};
