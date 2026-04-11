export const getFilteredTasks = (tasks, filters, searchQuery) => {
  if (!tasks) return [];

  return tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = filters.priority === "all" || task.priority === filters.priority;

    const matchesBoard = filters.board === "all" || task.boardTitle === filters.board;

    const matchesDate = () => {
      if (filters.date === "all") return true;
      
      const todayStr = new Date().toISOString().substring(0, 10);
      const taskDateStr = task.dueDate ? task.dueDate.substring(0, 10) : "";

      if (filters.date === "today") {
        return taskDateStr === todayStr;
      }
      
      if (filters.date === "upcoming") {
        return taskDateStr > todayStr;
      }

      return true;
    };

    return matchesSearch && matchesPriority && matchesBoard && matchesDate();
  });
};