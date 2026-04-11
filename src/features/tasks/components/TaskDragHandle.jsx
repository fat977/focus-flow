// tasks/components/TaskDragHandle.jsx
import { GripVertical } from "lucide-react";
import { useTaskDrag } from "../context/hooks/useTaskDrag";
import { Button } from "@/components/ui/Buttons";

export function TaskDragHandle() {
  const { attributes, listeners, setActivatorNodeRef } = useTaskDrag();

  return (
    <Button
    variant="secondary"
      ref={setActivatorNodeRef} 
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <GripVertical size={16} />
    </Button>
  );
}