import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../../../tasks/components/TaskCard";

// TasksArea.jsx
export default function TasksArea({
  list,
  boardId,
  openModal,
  setDroppableRef,
  isOver,
}) {
  const sortedTasks = [...list.tasks].sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  return (
    <div
      ref={setDroppableRef}
      className={`flex-1 my-4 min-h-0 overflow-y-auto flex flex-col gap-3 custom-scrollbar ${
        isOver ? "bg-(--grey-50)" : ""
      }`}
    >
      {sortedTasks.length === 0 ? (
        <p className="p-4 text-center">no tasks yet</p>
      ) : (
        <>
          <SortableContext
            items={sortedTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                boardId={boardId}
                openModal={openModal}
              />
            ))}
          </SortableContext>

          <div className="h-6 shrink-0 pointer-events-none" />
        </>
      )}
    </div>
  );
}
