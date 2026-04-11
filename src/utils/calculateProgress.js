export function calculateProgress(lists = []) {
  let totalTasks = 0;
  let completedTasks = 0;

  lists.forEach((list) => {
    const isDoneList =
      list.type === "done" ||
      list.title?.toLowerCase() === "done";

    list.tasks?.forEach(() => {
      totalTasks++;
      if (isDoneList) {
        completedTasks++;
      }
    });
  });

  if (totalTasks === 0) return 0;

  return Math.round((completedTasks / totalTasks) * 100);
}
