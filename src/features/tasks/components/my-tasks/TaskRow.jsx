import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react"; // إضافة أيقونات لتحسين المظهر
import { getDeadlineInfo } from "../../../../utils/getDeadlineInfo";
import { priorityStyles } from "../../../../utils/statusStyle";

function TaskRow({ task }) {
  const deadline = getDeadlineInfo(task.dueDate);

  return (
    <div className="group flex flex-col p-5 bg-(--grey-50) border border-(--grey-200) rounded-2xl hover:border-(--brand-500)/40 transition-all duration-300 mb-4 shadow-sm">
      
      {/* Top section: title and action */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-(--text-main) group-hover:text-(--brand-500) transition-colors">
            {task.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-(--text-muted) uppercase tracking-widest">
            <span>{task.boardTitle}</span>
            <span className="w-1 h-1 rounded-full bg-(--grey-300)"></span>
            <span>{task.listType}</span>
          </div>
        </div>
        
        <Link 
          to={`/board/${task.boardId}`} 
          className="flex items-center gap-1 text-xs text-(--brand-500) hover:text-(--brand-600) font-medium transition-colors"
        >
          Open Board <ChevronRight size={14} />
        </Link>
      </div>

      {/* Bottom section: Badges */}
      <div className="flex items-center justify-between pt-4 border-t border-(--grey-200)">
        <div className="flex items-center gap-3">
          
          {/* Deadline Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-medium border ${deadline.style}`}>
            <Calendar size={12} />
            {deadline.text}
          </div>

          {/* Priority Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${
              priorityStyles[task.priority] || "text-(--grey-500)"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full${
              priorityStyles[task.priority] || "text-(--grey-500)"
            }`}></span>
            {task.priority}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskRow;