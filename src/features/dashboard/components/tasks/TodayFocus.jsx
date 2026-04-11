import { Flame, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { useDashboard } from "../../hooks/useDashboard";

export default function TodaysFocus() {
  const user = useSelector((state) => state.auth.user);

  const { data: stats } = useDashboard(user?.uid);
 
  return (
    <div className="rounded-2xl bg-(--grey-50) border border-(--grey-200) p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-(--text-main) font-semibold">Today's Focus</h3>
      </div>
      <header className="flex items-center gap-2 px-4 py-3 border-b border-(--grey-200)">
        <h2 className="text-(--text-main) font-medium">Overdue Tasks</h2>
      </header>
      {stats?.overdueTasks?.map((task) => (
        <section
          key={task.id}
          className="rounded-xl bg-(--grey-100) border border-(--grey-200)"
        >
          <li className="flex items-center justify-between px-4 py-3 hover:bg-(--grey-200) transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-(--text-main) text-sm">{task.title}</span>
            </div>

            <span className="text-xs text-(--text-muted)">{task.boards.title}</span>
          </li>
        </section>
      ))}

      <header className="flex items-center gap-2 px-4 py-3 border-b border-(--grey-200)">
        <h2 className="text-(--text-main) font-medium">Due Today Tasks</h2>
      </header>
      {stats?.dueTodayTasks?.map((task) => (
        <section
          key={task.id}
          className="rounded-xl bg-(--grey-100) border border-(--grey-200)"
        >
          <li className="flex items-center justify-between px-4 py-3 hover:bg-(--grey-200) transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-(--text-main) text-sm">{task.title}</span>
            </div>

            <span className="text-xs text-(--text-muted)">{task.boards.title}</span>
          </li>
        </section>
      ))}

      <header className="flex items-center gap-2 px-4 py-3 border-b border-(--grey-200)">
        <h2 className="text-(--text-main) font-medium">Urgent Tasks</h2>
      </header>
      {stats?.totalTasks
        .filter((task) => task.priority === "high")
        .map((task) => (
          <section
            key={task.id}
            className="rounded-xl bg-(--grey-100) border border-(--grey-200)"
          >
            <li className="flex items-center justify-between px-4 py-3 hover:bg-(--grey-200) transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-(--text-main) text-sm">{task.title}</span>
              </div>

              <span className="text-xs text-(--text-muted)">{task.boards.title}</span>
            </li>
          </section>
        ))}
    </div>
  );
}

function FocusItem({ icon, title, label, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-(--text-main) text-sm">{title}</span>
      </div>
      <span
        className={`text-xs ${
          highlight ? "text-(--success-600)" : "text-(--text-muted)"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
