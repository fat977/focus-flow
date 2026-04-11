// hooks/useTaskAlerts.js
import { useMemo } from "react";

export function useTaskAlerts(tasks = []) {
  const alerts = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().substring(0, 10);
    const generatedAlerts = [];

    tasks.forEach((task) => {
      if (!task.dueDate) return;

      const taskDate = new Date(task.dueDate);
      const taskDateStr = task.dueDate.substring(0, 10);

      if (taskDate < now && taskDateStr !== todayStr && task.listType !== "done") {
        generatedAlerts.push({
          id: `overdue-${task.id}`,
          type: "overdue",
          iconName: "alert", 
          message: `Task "${task.title}" is overdue`,
          colorClass: "text-(--danger-600)", 
        });
      }

      else if (taskDateStr === todayStr && task.listType !== "done") {
        generatedAlerts.push({
          id: `today-${task.id}`,
          type: "today",
          iconName: "calendar",
          message: `Task "${task.title}" is due today`,
          colorClass: "text-(--brand-600)",
        });

        const diffInMs = taskDate - now;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours > 0 && diffInHours <= 2) {
          generatedAlerts.push({
            id: `near-${task.id}`,
            type: "near",
            iconName: "clock",
            message: `Task "${task.title}" in less than 2h!`,
            colorClass: "text-(--warning-600)",
          });
        }
      }
    });

    return generatedAlerts;
  }, [tasks]);

  return alerts;
}