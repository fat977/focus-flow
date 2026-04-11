export const calculateProgress = (lists = []) => {
  const total = lists.reduce((acc, list) => acc + (list.tasks?.length || 0), 0);
  const completed = lists.reduce((acc, list) => 
    list.type === "done" ? acc + (list.tasks?.length || 0) : acc, 0
  );
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, progress };
};