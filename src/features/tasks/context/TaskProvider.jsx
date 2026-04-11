// tasks/components/TaskProvider.jsx
import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskContext } from "./task-context";


export function TaskProvider({ children, task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: { type: "task", task }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const value = useMemo(() => ({
    attributes,
    listeners,
    setActivatorNodeRef
  }), [attributes, listeners, setActivatorNodeRef]);

  return (
    <TaskContext.Provider value={value}>
      <div ref={setNodeRef} style={style} className="task-card-container">
        {children}
      </div>
    </TaskContext.Provider>
  );
}
