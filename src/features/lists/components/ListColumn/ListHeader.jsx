import { ActionsDropdown } from "@/components/ui/Dropdown";
import { GripVertical } from "lucide-react";
import { listTypeStyles } from "../../../../utils/statusStyle";
import { useListDrag } from "../../context/hooks/useListDrag";

export default function ListHeader({ list, openModal, boardId }) {
  const { attributes, listeners, setActivatorNodeRef } = useListDrag();

  return (
    <div
      className={`p-4 flex justify-between items-center ${
        listTypeStyles[list.type]
      }  rounded-t-xl`}
    >
      <div
        ref={setActivatorNodeRef} 
        {...attributes}
        {...listeners}
        className="flex items-center gap-2 cursor-grab active:cursor-grabbing flex-1"
      >
        <GripVertical size={16} className="text-(--grey-400)" />
        <span className="font-bold">{list.title}</span>
      </div>

      {list.type === "todo" && (
        <ActionsDropdown
          triggerSize={16}
          triggerClassName="rounded-full"
          onEdit={() => openModal("edit-list", list)}
          onDelete={() => openModal("delete-list", { ...list, boardId })}
          editLabel="Edit List"
          deleteLabel="Delete List"
        />
      )}
    </div>
  );
}
