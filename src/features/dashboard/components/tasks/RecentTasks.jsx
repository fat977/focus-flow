import { listTypeStyles } from "../../../../utils/statusStyle";
import { useRecentTasks } from "../../hooks/useDashboard";

export default function RecentTasks({ userId }) {
  const { isLoading, recentTasks, error } = useRecentTasks(userId);
  if (isLoading) return <p>Loading recent tasks...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="rounded-2xl border border-(--grey-200) space-y-4">
      <div className="flex items-center justify-between rounded-t p-4 bg-(--grey-50)">
        <h3 className="text-(--text-main) font-semibold">Recent Tasks</h3>
      </div>

      <ul className="space-y-3 p-4">
        {recentTasks.map((task) => (
          <RecentTask key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

function RecentTask({ task }) {
  return (
    <li
      key={task.id}
      className="flex justify-between items-center border-b border-(--grey-200)  last:border-0 pb-2"
    >
      <div>
        <p className="font-medium text-sm">{task.title}</p>
        <span className="text-xs text-(--text-muted)">{task.boardTitle}</span>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          listTypeStyles[task.listType]
        }`}
      >
        {task.listType}
      </span>
    </li>
  );
}
