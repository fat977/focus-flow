export default function MyTasksHeader({ total }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-(--text-main)">My Tasks</h1>
      <span className="text-sm text-(--text-muted)">
        Total: {total} tasks
      </span>
    </div>
  );
}
