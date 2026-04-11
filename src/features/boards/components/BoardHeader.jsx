import { ActionsDropdown } from "@/components/ui/Dropdown";
import { Link } from "react-router-dom";

const BoardHeader = ({ id, title, status, board, openModal }) => (
  <div className="flex justify-between items-start mb-4">
    <div className="flex flex-col gap-1">
      <Link
        to={`/board/${id}`}
        className="text-xl font-extrabold text-(--text-main) hover:text-(--brand-600) transition-colors leading-tight"
      >
        {title}
      </Link>
      <span
        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md  w-fit ${status.style}`}
      >
        {status.label}
      </span>
    </div>

    <ActionsDropdown
      onEdit={() => openModal("edit-board", board)}
      onDelete={() => openModal("delete-board", board)}
      editLabel="Edit Project"
      deleteLabel="Delete Project"
    />
  </div>
);
export default BoardHeader;
