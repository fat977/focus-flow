import TaskRow from "./TaskRow";

export default function TasksList({ currentItems }) {
  return (
    <>
      {currentItems.length > 0 ? (
        <ul className="divide-y divide-(--grey-200)">
          {currentItems?.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-20 bg-(--grey-100) rounded-xl border border-dashed border-(--grey-300)">
          <p className="text-(--text-muted)">No tasks found matching your filters.</p>
        </div>
      )}
    </>
  );
}
