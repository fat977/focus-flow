import { ClipboardList, Layout, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
  board: <Layout size={16} />,
  list: <ClipboardList size={16} />,
  task: <CheckSquare size={16} />,
};


export function SearchResultItem({ item, onCloseSearch }) {
  const targetPath = item.type === "board" 
    ? `/board/${item.data.id}` 
    : `/board/${item.data.boardId || item.data.lists?.boardId}`;

  return (
    <Link
      to={targetPath}
      onClick={onCloseSearch}
      className="flex items-center gap-3 w-full px-3 py-2 hover:bg-(--grey-100) transition-colors border-b border-(--grey-200) last:border-0"
    >
      <span className="text-(--brand-500)">{icons[item.type]}</span>
      <div className="flex-1">
        <p className="text-sm text-(--text-main) font-medium">{item.data.title}</p>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-(--grey-400) uppercase tracking-wider">
            {item.type}
          </span>
          {item.type === "task" && (
            <span className="text-[10px] text-(--grey-500)">
              in {item.data.listTitle || "Board"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}