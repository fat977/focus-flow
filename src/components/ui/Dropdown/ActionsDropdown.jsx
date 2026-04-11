import { Ellipsis, SquarePen, Trash } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Buttons";

export default function ActionsDropdown({
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
  triggerSize = 22,
  triggerClassName = "",
}) {
  return (
    <Dropdown
      align="bottom-right"
      trigger={
        <Button variant="secondary" className={triggerClassName}>
          <Ellipsis size={triggerSize} />
        </Button>
      }
    >
      <div className="p-1 min-w-40">
        <Button variant="secondary" onClick={onEdit}>
          <SquarePen size={16} className="text-(--brand-500)" />
          <span className="text-sm">{editLabel}</span>
        </Button>

        <Button variant="danger" onClick={onDelete} fullWidth>
          <Trash size={16} />
          <span className="text-sm">{deleteLabel}</span>
        </Button>
      </div>
    </Dropdown>
  );
}
