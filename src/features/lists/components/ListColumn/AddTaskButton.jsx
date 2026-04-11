import { Plus } from "lucide-react";
import {Button} from "@/components/ui/Buttons";

export default function AddTaskButton({ boardId, listId, openModal }) {
  return (
    <Button
      variant="card"
      onClick={() => openModal("task", { boardId, listId })}
    >
      <Plus size={14} />
      Add a card
    </Button>
  );
}
